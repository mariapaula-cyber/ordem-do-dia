// netlify/functions/generate.js
// Secure backend proxy — API key never reaches the browser

export const handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return { statusCode: 500, body: JSON.stringify({ error: "API key not configured" }) };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: "Invalid JSON" }) };
  }

  const { text, pdfBase64 } = body;

  const systemPrompt = `Você é um assistente de produção audiovisual especializado em vídeos para redes sociais.
Analise o briefing/roteiro recebido e extraia as informações para montar uma Ordem do Dia para gravação.

Retorne APENAS um JSON válido (sem markdown, sem texto extra) com esta estrutura:
{
  "header": {
    "client": "nome do cliente",
    "project": "título do projeto | mês",
    "date": "DD/MM/AAAA — CIDADE",
    "address": "local da gravação"
  },
  "people": [
    {
      "id": "1",
      "name": "nome",
      "role": "função",
      "timeArrival": "HH:MM",
      "timeAction": "HH:MM",
      "type": "cast"
    }
  ],
  "schedule": [
    {
      "id": "s1",
      "timeStart": "HH:MM",
      "timeEnd": "HH:MM",
      "type": "prep",
      "title": "MONTAGEM",
      "description": "",
      "cast": "",
      "location": "",
      "format": "",
      "platform": "",
      "ratio": "",
      "duration": "",
      "teleprompter": false,
      "reference": ""
    }
  ]
}

Regras:
- type pessoa: "cast" para apresentadores/atores, "crew" para equipe técnica
- type bloco: "action" para cenas, "prep" para montagem/preparação, "break" para intervalos
- format: infira o formato do vídeo (Talking Head, Entrevista, Tutorial, UGC, Depoimento, B-Roll, etc.)
- platform: infira a plataforma (Instagram Reels, YouTube, TikTok, LinkedIn, etc.)
- ratio: infira a proporção (9:16, 16:9, 1:1)
- duration: duração estimada do vídeo final (ex: "30s", "1min", "3min")
- teleprompter: true se mencionado
- reference: link ou descrição de referência visual se mencionado
- Se uma info não existir, deixe string vazia ou false
- Extraia TODOS os blocos do cronograma em ordem
- Horários em HH:MM (24h). Se não houver, estime a partir das 08:00`;

  let messages;
  if (pdfBase64) {
    messages = [
      {
        role: "user",
        content: [
          {
            type: "document",
            source: { type: "base64", media_type: "application/pdf", data: pdfBase64 },
          },
          { type: "text", text: "Analise este documento e gere a Ordem do Dia conforme instruções." },
        ],
      },
    ];
  } else {
    messages = [
      {
        role: "user",
        content: `Analise este briefing e gere a Ordem do Dia:\n\n${text}`,
      },
    ];
  }

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 2000,
        system: systemPrompt,
        messages,
      }),
    });

    const data = await response.json();
    const raw = data.content?.find((b) => b.type === "text")?.text || "";
    const clean = raw.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(clean);

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed),
    };
  } catch (err) {
    console.error("Claude API error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Erro ao processar com IA. Tente novamente." }),
    };
  }
};
