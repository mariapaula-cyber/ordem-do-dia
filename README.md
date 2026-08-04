# Ordem do Dia — Locaweb & KingHost

Gerador de Ordem do Dia para gravações de vídeo para redes sociais.  
Suporta importação via IA (colar texto ou upload de PDF/DOCX/TXT).

## Deploy no Netlify (5 minutos)

### 1. Suba o projeto no GitHub

```bash
cd ordem-do-dia
git init
git add .
git commit -m "inicial"
# Crie um repositório no github.com e siga as instruções para conectar
git remote add origin https://github.com/SEU_USER/ordem-do-dia.git
git push -u origin main
```

### 2. Conecte no Netlify

1. Acesse [app.netlify.com](https://app.netlify.com) e faça login
2. Clique em **"Add new site" → "Import an existing project"**
3. Conecte sua conta GitHub e selecione o repositório `ordem-do-dia`
4. As configurações de build já estão no `netlify.toml` — não precisa mudar nada
5. Clique em **"Deploy site"**

### 3. Adicione a chave da API Anthropic

1. No painel do Netlify, vá em **Site configuration → Environment variables**
2. Clique em **"Add a variable"**
3. Key: `ANTHROPIC_API_KEY`
4. Value: sua chave da API (encontre em [console.anthropic.com](https://console.anthropic.com))
5. Clique em **Save** e faça um novo deploy (Deploys → Trigger deploy)

### Pronto!

Sua URL será algo como `https://ordem-do-dia-xyz.netlify.app`  
Compartilhe com o time — a chave de API fica segura no servidor, nunca exposta no browser.

---

## Rodando localmente

```bash
npm install
npm run dev
```

> Para testar a função de IA localmente, instale o [Netlify CLI](https://docs.netlify.com/cli/get-started/):
> ```bash
> npm install -g netlify-cli
> netlify dev
> ```

## Funcionalidades

- 🎨 Alternância entre marcas **Locaweb** e **KingHost**
- 🤖 **Importar com IA** — cole texto ou suba PDF/DOCX/TXT
- 📱 Campos específicos para **redes sociais**: formato, plataforma, proporção, duração, teleprompter, referência
- 👥 Separação de **Elenco** e **Equipe Técnica**
- 📋 Blocos de **Cena**, **Preparação** e **Intervalo**
- 🖼️ Upload de logo e imagens de referência de câmera
- 📄 **Exportar PDF** direto do browser
