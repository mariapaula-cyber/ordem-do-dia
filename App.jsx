import { useState, useRef, useEffect } from "react";
import {
  Camera, Plus, Trash2, Printer, MapPin, Clock, ChevronDown,
  Upload, FileText, Sparkles, X, AlertCircle, Monitor,
  Link, Timer, Ratio, Mic2, ChevronUp, GripVertical
} from "lucide-react";

// ─── BRANDS ───────────────────────────────────────────────────────────────────
const BRANDS = {
  locaweb: {
    name: "Locaweb",
    primary: "#E30613",
    headerBg: "#1A1A2E",
    logoPlaceholder: "LOCAWEB",
    clientDefault: "LOCAWEB",
    addressDefault: "Estúdio LWSA — São Paulo, SP",
  },
  kinghost: {
    name: "KingHost",
    primary: "#F7941D",
    headerBg: "#1C2B4A",
    logoPlaceholder: "KINGHOST",
    clientDefault: "KINGHOST",
    addressDefault: "Estúdio KingHost — Porto Alegre, RS",
  },
};

// ─── OPTIONS ──────────────────────────────────────────────────────────────────
const FORMAT_OPTIONS = ["Talking Head", "Entrevista", "Tutorial", "UGC", "Depoimento", "B-Roll", "Apresentação Direta", "Demonstração de Produto", "Reels Dinâmico"];
const PLATFORM_OPTIONS = ["Instagram Reels", "Instagram Feed", "YouTube Shorts", "YouTube", "TikTok", "LinkedIn", "Multiplatforma"];
const RATIO_OPTIONS = ["9:16", "16:9", "1:1", "4:5"];
const DURATION_OPTIONS = ["15s", "30s", "45s", "1min", "2min", "3min", "5min", "+5min"];
const ROLE_OPTIONS = ["Apresentador(a)", "Convidado(a)", "Host", "Entrevistador(a)", "Ator/Atriz", "Diretor(a)", "Câmera", "Luz / Gaffer", "Som", "Maquiagem", "Roteirista", "Produtor(a)", "Assistente"];

// ─── COMBOBOX ─────────────────────────────────────────────────────────────────
function ComboBox({ value, onChange, options = [], placeholder = "", inputClass = "", dropUp = false }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const filtered = options.filter(o => o.toLowerCase().includes(value.toLowerCase()));

  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  return (
    <div ref={ref} className="relative group/cb w-full">
      <input
        type="text" value={value} placeholder={placeholder}
        onChange={(e) => { onChange(e.target.value); setOpen(true); }}
        onFocus={() => setOpen(true)}
        className={`w-full bg-transparent outline-none ${inputClass}`}
      />
      {open && filtered.length > 0 && (
        <div className={`absolute ${dropUp ? "bottom-full mb-1" : "top-full mt-1"} left-0 min-w-[160px] bg-white border border-gray-200 shadow-2xl rounded-xl z-50 print-hidden max-h-48 overflow-y-auto`}>
          {filtered.map((o) => (
            <div key={o} onClick={() => { onChange(o); setOpen(false); }}
              className="px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-0 first:rounded-t-xl last:rounded-b-xl">
              {o}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── TOGGLE PILL ──────────────────────────────────────────────────────────────
function TogglePill({ value, onChange, label, color }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!value)}
      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border transition-all ${
        value
          ? "border-transparent text-white"
          : "border-gray-200 text-gray-400 bg-white"
      }`}
      style={value ? { backgroundColor: color } : {}}
    >
      <Mic2 size={10} />
      {label}
    </button>
  );
}

// ─── SCENE TAGS (format/platform/ratio/duration) ──────────────────────────────
function SceneMeta({ block, onChange, primaryColor }) {
  return (
    <div className="mt-2 pt-2 border-t border-gray-100 grid grid-cols-2 gap-x-4 gap-y-1.5">
      {/* Format */}
      <div className="flex items-center gap-1.5">
        <Monitor size={11} className="text-gray-400 shrink-0" />
        <ComboBox
          value={block.format || ""}
          onChange={(v) => onChange({ ...block, format: v })}
          options={FORMAT_OPTIONS}
          placeholder="Formato"
          inputClass="text-[11px] text-gray-600 placeholder-gray-300"
        />
      </div>
      {/* Platform */}
      <div className="flex items-center gap-1.5">
        <svg className="w-3 h-3 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
        <ComboBox
          value={block.platform || ""}
          onChange={(v) => onChange({ ...block, platform: v })}
          options={PLATFORM_OPTIONS}
          placeholder="Plataforma"
          inputClass="text-[11px] text-gray-600 placeholder-gray-300"
        />
      </div>
      {/* Ratio */}
      <div className="flex items-center gap-1.5">
        <svg className="w-3 h-3 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><rect x="3" y="5" width="18" height="14" rx="2" strokeWidth={2}/></svg>
        <ComboBox
          value={block.ratio || ""}
          onChange={(v) => onChange({ ...block, ratio: v })}
          options={RATIO_OPTIONS}
          placeholder="Proporção"
          inputClass="text-[11px] text-gray-600 placeholder-gray-300"
        />
      </div>
      {/* Duration */}
      <div className="flex items-center gap-1.5">
        <Timer size={11} className="text-gray-400 shrink-0" />
        <ComboBox
          value={block.duration || ""}
          onChange={(v) => onChange({ ...block, duration: v })}
          options={DURATION_OPTIONS}
          placeholder="Duração final"
          inputClass="text-[11px] text-gray-600 placeholder-gray-300"
        />
      </div>
      {/* Reference */}
      <div className="col-span-2 flex items-center gap-1.5">
        <Link size={11} className="text-gray-400 shrink-0" />
        <input
          value={block.reference || ""}
          onChange={(e) => onChange({ ...block, reference: e.target.value })}
          placeholder="Referência (link ou descrição visual)"
          className="w-full text-[11px] text-gray-600 placeholder-gray-300 bg-transparent outline-none"
        />
      </div>
      {/* Teleprompter toggle */}
      <div className="col-span-2 flex items-center gap-2 mt-0.5">
        <TogglePill
          value={block.teleprompter || false}
          onChange={(v) => onChange({ ...block, teleprompter: v })}
          label="Teleprompter"
          color={primaryColor}
        />
      </div>
    </div>
  );
}

// ─── AI IMPORT PANEL ──────────────────────────────────────────────────────────
function AIImportPanel({ brand, onApply, onClose }) {
  const B = BRANDS[brand];
  const [mode, setMode] = useState("text");
  const [text, setText] = useState("");
  const [fileName, setFileName] = useState("");
  const [filePayload, setFilePayload] = useState(null); // { type: "text"|"pdf", content: string }
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef(null);

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setError("");
    setFilePayload(null);
    const ext = file.name.split(".").pop().toLowerCase();

    if (ext === "txt" || ext === "md") {
      const t = await file.text();
      setFilePayload({ type: "text", content: t });
      return;
    }
    if (ext === "pdf") {
      const reader = new FileReader();
      reader.onloadend = () => {
        const b64 = reader.result.split(",")[1];
        setFilePayload({ type: "pdf", content: b64 });
      };
      reader.readAsDataURL(file);
      return;
    }
    if (ext === "docx") {
      try {
        const mammoth = (await import("mammoth")).default;
        const ab = await file.arrayBuffer();
        const result = await mammoth.extractRawValue({ arrayBuffer: ab });
        setFilePayload({ type: "text", content: result.value });
      } catch {
        setError("Não foi possível ler o DOCX. Tente colar o texto.");
      }
      return;
    }
    setError("Formato não suportado. Use PDF, DOCX ou TXT.");
  };

  const handleGenerate = async () => {
    const hasText = mode === "text" && text.trim();
    const hasFile = mode === "file" && filePayload;
    if (!hasText && !hasFile) { setError("Adicione um briefing ou arquivo primeiro."); return; }
    setLoading(true); setError("");

    try {
      const body = filePayload?.type === "pdf"
        ? { pdfBase64: filePayload.content }
        : { text: mode === "text" ? text : filePayload?.content };

      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Erro desconhecido");
      }

      const parsed = await res.json();
      const finalPeople = (parsed.people || []).map((p, i) => ({ ...p, id: String(i + 1), image: null }));
      const finalSchedule = (parsed.schedule || []).map((s, i) => ({ ...s, id: `s${i}`, image: null }));
      onApply({ header: parsed.header, people: finalPeople, schedule: finalSchedule });
      onClose();
    } catch (err) {
      setError(err.message || "Erro ao processar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const activeHasContent = mode === "text" ? text.trim() : !!filePayload;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 print-hidden"
      style={{ backgroundColor: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}>
      <div className="bg-white w-full sm:max-w-lg rounded-t-3xl sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden max-h-[90vh]">

        {/* Handle bar (mobile) */}
        <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mt-3 mb-1 sm:hidden" />

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${B.primary}15` }}>
              <Sparkles size={16} style={{ color: B.primary }} />
            </div>
            <div>
              <p className="font-black text-gray-900 text-sm">Gerar com IA</p>
              <p className="text-[10px] text-gray-400">Cole um briefing ou suba um arquivo</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors">
            <X size={16} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-100 px-6 gap-0">
          {[
            { key: "text", icon: FileText, label: "Colar texto" },
            { key: "file", icon: Upload, label: "Upload de arquivo" },
          ].map(({ key, icon: Icon, label }) => (
            <button key={key} onClick={() => { setMode(key); setError(""); }}
              className={`flex items-center gap-1.5 px-4 py-3 text-xs font-bold border-b-2 transition-all ${
                mode === key ? "border-current" : "border-transparent text-gray-400"
              }`}
              style={mode === key ? { color: B.primary, borderColor: B.primary } : {}}>
              <Icon size={13} />{label}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="p-6 flex flex-col gap-4 overflow-y-auto">
          {mode === "text" ? (
            <textarea
              value={text}
              onChange={(e) => { setText(e.target.value); setError(""); }}
              placeholder={`Cole aqui o briefing, roteiro, ou qualquer descrição da gravação.\n\nExemplo:\n\nCliente: Locaweb\nProjeto: Série Dicas de Produto — Agosto\nData: 15/08 — São Paulo\nLocal: Estúdio LWSA\n\nElenco:\n- Ana (Apresentadora) — chega 8h, grava 9h\n- Carlos (Câmera) — chega 7h30\n\nCronograma:\n07:30 Set up de câmera e luz\n09:00 Gravação bloco 1 — Talking head intro (Reels, 9:16, 30s)\n10:00 Intervalo\n10:30 Gravação bloco 2 — Tutorial produto (YouTube, 16:9, 3min)`}
              className="w-full h-56 text-sm text-gray-700 border border-gray-200 rounded-xl p-4 resize-none outline-none focus:border-gray-300 transition-colors leading-relaxed"
            />
          ) : (
            <div>
              <div
                onClick={() => fileRef.current?.click()}
                className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center gap-3 cursor-pointer hover:border-gray-300 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform"
                  style={{ backgroundColor: `${B.primary}10` }}>
                  <Upload size={22} style={{ color: B.primary }} />
                </div>
                {fileName ? (
                  <div className="text-center">
                    <p className="font-bold text-gray-800 text-sm">{fileName}</p>
                    <p className="text-xs mt-0.5" style={{ color: filePayload ? "#16a34a" : "#9ca3af" }}>
                      {filePayload ? "✓ Pronto para gerar" : "⏳ Lendo arquivo..."}
                    </p>
                  </div>
                ) : (
                  <div className="text-center">
                    <p className="font-semibold text-gray-600 text-sm">Clique para selecionar</p>
                    <p className="text-xs text-gray-400 mt-0.5">PDF, DOCX ou TXT</p>
                  </div>
                )}
                <input ref={fileRef} type="file" accept=".pdf,.docx,.txt,.md" className="hidden" onChange={handleFile} />
              </div>

              {filePayload && filePayload.type === "text" && (
                <div className="mt-3 bg-gray-50 rounded-xl p-3 max-h-24 overflow-y-auto">
                  <p className="text-[11px] text-gray-500 font-mono leading-relaxed whitespace-pre-wrap">
                    {filePayload.content.slice(0, 500)}{filePayload.content.length > 500 ? "…" : ""}
                  </p>
                </div>
              )}
              {filePayload?.type === "pdf" && (
                <div className="mt-3 flex items-center gap-2 bg-green-50 border border-green-100 rounded-xl px-4 py-3">
                  <FileText size={14} className="text-green-600 shrink-0" />
                  <p className="text-xs text-green-700 font-medium">PDF carregado — a IA vai ler e extrair as informações.</p>
                </div>
              )}
            </div>
          )}

          {error && (
            <div className="flex items-start gap-2 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
              <AlertCircle size={14} className="text-red-500 mt-0.5 shrink-0" />
              <p className="text-xs text-red-700">{error}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 pt-2 flex items-center gap-3">
          <p className="text-[10px] text-gray-400 flex-1 leading-relaxed">
            A IA interpreta o briefing e preenche a ordem do dia automaticamente. Você pode editar tudo depois.
          </p>
          <button
            onClick={handleGenerate}
            disabled={loading || !activeHasContent}
            className="flex items-center gap-2 px-5 py-3 rounded-xl text-white font-bold text-sm transition-all shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ backgroundColor: B.primary }}
          >
            {loading ? (
              <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Gerando...</>
            ) : (
              <><Sparkles size={15} />Gerar</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── PERSON CARD ──────────────────────────────────────────────────────────────
function PersonCard({ person, onUpdate, onRemove, primaryColor }) {
  return (
    <div className="relative group bg-white border border-gray-150 rounded-2xl p-3 flex gap-3 shadow-sm hover:shadow-md transition-all hover:border-gray-200">
      <button onClick={onRemove}
        className="print-hidden absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity z-10 shadow-sm">
        <Trash2 size={10} />
      </button>

      {/* Avatar */}
      <div className="relative w-14 h-14 rounded-xl shrink-0 overflow-hidden group/av"
        style={person.image
          ? { backgroundImage: `url(${person.image})`, backgroundSize: "cover", backgroundPosition: "center" }
          : { backgroundColor: "#f3f4f6" }}>
        {!person.image && (
          <div className="w-full h-full flex items-center justify-center text-gray-300">
            <Camera size={18} />
          </div>
        )}
        <label className="absolute inset-0 cursor-pointer bg-black/50 flex items-center justify-center opacity-0 group-hover/av:opacity-100 print-hidden transition-opacity rounded-xl">
          <Camera size={14} className="text-white" />
          <input type="file" accept="image/*" className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              const r = new FileReader();
              r.onloadend = () => onUpdate({ ...person, image: r.result });
              r.readAsDataURL(file);
            }} />
        </label>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 flex flex-col gap-0.5 pt-0.5">
        <ComboBox
          value={person.name}
          onChange={(v) => onUpdate({ ...person, name: v })}
          options={[]}
          placeholder="Nome"
          inputClass="font-bold text-gray-900 text-sm placeholder-gray-300"
        />
        <ComboBox
          value={person.role}
          onChange={(v) => onUpdate({ ...person, role: v })}
          options={ROLE_OPTIONS}
          placeholder="Função"
          inputClass="text-xs font-medium text-gray-500 placeholder-gray-300"
        />
        <div className="flex gap-3 mt-1.5 font-mono text-[10px]" style={{ color: primaryColor }}>
          <label className="flex items-center gap-1 text-gray-400">
            CHEG
            <input type="time" value={person.timeArrival}
              onChange={(e) => onUpdate({ ...person, timeArrival: e.target.value })}
              className="ml-1 bg-transparent border-b border-gray-200 focus:border-gray-400 outline-none text-gray-700 cursor-pointer w-16" />
          </label>
          <label className="flex items-center gap-1 text-gray-400">
            CENA
            <input type="time" value={person.timeAction}
              onChange={(e) => onUpdate({ ...person, timeAction: e.target.value })}
              className="ml-1 bg-transparent border-b border-gray-200 focus:border-gray-400 outline-none text-gray-700 cursor-pointer w-16" />
          </label>
        </div>
      </div>
    </div>
  );
}

// ─── SCHEDULE BLOCK ───────────────────────────────────────────────────────────
function ScheduleBlock({ block, onUpdate, onRemove, primaryColor }) {
  const [expanded, setExpanded] = useState(true);

  const updateBlock = (updates) => onUpdate({ ...block, ...updates });

  return (
    <div className="relative group flex min-h-[48px]">
      {/* Delete */}
      <div className="print-hidden absolute -left-7 top-3 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <button onClick={onRemove} className="w-6 h-6 rounded-full bg-red-50 flex items-center justify-center text-red-400 hover:bg-red-100 hover:text-red-600 transition-colors">
          <Trash2 size={12} />
        </button>
      </div>

      {/* Time column */}
      <div className="w-[76px] shrink-0 font-mono font-bold text-gray-600 text-center flex flex-col justify-center border-r border-gray-100 bg-white z-10 px-1 text-[11px] gap-0.5">
        <input type="time" value={block.timeStart}
          onChange={(e) => updateBlock({ timeStart: e.target.value })}
          className="w-full text-center bg-transparent outline-none hover:bg-gray-50 rounded cursor-pointer" />
        <span className="text-gray-200 text-[8px] text-center">│</span>
        <input type="time" value={block.timeEnd}
          onChange={(e) => updateBlock({ timeEnd: e.target.value })}
          className="w-full text-center bg-transparent outline-none hover:bg-gray-50 rounded cursor-pointer" />
      </div>

      {/* ACTION */}
      {block.type === "action" && (
        <div className="flex-1 flex border border-gray-150 ml-[-1px] rounded-r-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
          <div className="w-1 shrink-0" style={{ backgroundColor: primaryColor }} />

          {/* Main content */}
          <div className="flex-1 p-3 border-r border-gray-100 flex flex-col min-w-0">
            <div className="flex items-start gap-2">
              <div className="flex-1 min-w-0">
                <input
                  value={block.title}
                  onChange={(e) => updateBlock({ title: e.target.value })}
                  placeholder="Título da cena"
                  className="font-bold text-gray-900 w-full border-b border-transparent focus:border-gray-200 outline-none bg-transparent text-sm placeholder-gray-300"
                />
              </div>
              <button
                onClick={() => setExpanded(!expanded)}
                className="print-hidden shrink-0 w-5 h-5 rounded-md flex items-center justify-center text-gray-300 hover:text-gray-500 hover:bg-gray-100 transition-colors mt-0.5"
              >
                {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
              </button>
            </div>

            {expanded && (
              <>
                <textarea
                  value={block.description}
                  onChange={(e) => { updateBlock({ description: e.target.value }); e.target.style.height = "auto"; e.target.style.height = e.target.scrollHeight + "px"; }}
                  placeholder="Descrição, roteiro ou observações..."
                  className="mt-1.5 text-xs text-gray-500 w-full bg-transparent resize-none border border-transparent focus:border-gray-200 rounded-lg outline-none min-h-[32px] placeholder-gray-300 leading-relaxed"
                />

                {/* Cast row */}
                <div className="mt-2 flex items-center gap-1.5 text-xs">
                  <span className="text-gray-300 font-semibold shrink-0 text-[10px] uppercase tracking-wide">Com</span>
                  <input
                    value={block.cast}
                    onChange={(e) => updateBlock({ cast: e.target.value })}
                    placeholder="Quem aparece nesta cena"
                    className="flex-1 font-semibold bg-transparent border-b border-transparent focus:border-gray-200 outline-none placeholder-gray-300"
                    style={{ color: primaryColor }}
                  />
                </div>

                {/* Social meta fields */}
                <SceneMeta block={block} onChange={onUpdate} primaryColor={primaryColor} />
              </>
            )}

            {/* Collapsed summary pills */}
            {!expanded && (
              <div className="flex flex-wrap gap-1 mt-1.5">
                {block.format && <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 font-medium">{block.format}</span>}
                {block.platform && <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 font-medium">{block.platform}</span>}
                {block.ratio && <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 font-medium">{block.ratio}</span>}
                {block.duration && <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 font-medium">{block.duration}</span>}
                {block.teleprompter && <span className="text-[10px] px-2 py-0.5 rounded-full text-white font-medium" style={{ backgroundColor: primaryColor }}>Teleprompter</span>}
              </div>
            )}
          </div>

          {/* Location + image */}
          <div className="w-40 shrink-0 bg-gray-50/80 flex flex-col group/img">
            <div className="p-2 pt-3 flex-1">
              <textarea
                value={block.location}
                onChange={(e) => { updateBlock({ location: e.target.value }); e.target.style.height = "auto"; e.target.style.height = e.target.scrollHeight + "px"; }}
                placeholder="Cenário / Local"
                className="text-[11px] text-gray-400 text-center w-full min-h-[28px] resize-none bg-transparent outline-none placeholder-gray-300 leading-relaxed"
              />
            </div>
            <div
              className="h-20 border-t border-gray-100 relative shrink-0"
              style={block.image
                ? { backgroundImage: `url(${block.image})`, backgroundSize: "cover", backgroundPosition: "center" }
                : { backgroundColor: "#f9fafb" }}
            >
              {!block.image && (
                <div className="w-full h-full flex flex-col justify-center items-center text-gray-300 gap-1">
                  <Camera size={14} />
                  <span className="text-[9px]">Ref. câmera</span>
                </div>
              )}
              <label className="absolute inset-0 cursor-pointer bg-black/50 flex items-center justify-center opacity-0 group-hover/img:opacity-100 print-hidden transition-opacity">
                <Camera size={14} className="text-white" />
                <input type="file" accept="image/*" className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    const r = new FileReader();
                    r.onloadend = () => updateBlock({ image: r.result });
                    r.readAsDataURL(file);
                  }} />
              </label>
            </div>
          </div>
        </div>
      )}

      {/* PREP / BREAK */}
      {(block.type === "prep" || block.type === "break") && (
        <div
          className="flex-1 border border-gray-150 ml-[-1px] rounded-r-2xl flex items-center justify-center px-4 min-h-[48px] gap-2"
          style={{
            backgroundColor: block.type === "break" ? `${primaryColor}10` : "#F8F9FA",
            borderLeft: `3px solid ${block.type === "break" ? primaryColor : "#E5E7EB"}`,
          }}
        >
          <input
            value={block.title}
            onChange={(e) => updateBlock({ title: e.target.value })}
            className="font-bold text-center w-full bg-transparent outline-none text-xs tracking-widest uppercase placeholder-gray-300"
            style={{ color: block.type === "break" ? primaryColor : "#9CA3AF" }}
            placeholder="DESCRIÇÃO"
          />
        </div>
      )}
    </div>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [brand, setBrand] = useState("locaweb");
  const [showImport, setShowImport] = useState(false);
  const [toast, setToast] = useState("");
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const B = BRANDS[brand];

  const today = () => {
    const d = new Date();
    return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()} — SÃO PAULO`;
  };

  const [header, setHeader] = useState({
    client: "LOCAWEB", project: "TÍTULO | MÊS",
    date: today(), address: "Estúdio LWSA — São Paulo, SP", logoImage: null,
  });

  const [people, setPeople] = useState([
    { id: "1", name: "", role: "Apresentador(a)", timeArrival: "08:00", timeAction: "09:00", image: null, type: "cast" },
    { id: "2", name: "", role: "Convidado(a)",    timeArrival: "08:30", timeAction: "09:00", image: null, type: "cast" },
    { id: "3", name: "", role: "Diretor(a)",      timeArrival: "07:00", timeAction: "08:00", image: null, type: "crew" },
    { id: "4", name: "", role: "Câmera",          timeArrival: "07:00", timeAction: "08:00", image: null, type: "crew" },
  ]);

  const [schedule, setSchedule] = useState([
    { id: "s0", timeStart: "07:30", timeEnd: "09:00", type: "prep",   title: "MONTAGEM / SET UP",  description: "", cast: "", location: "", image: null, format: "", platform: "", ratio: "", duration: "", teleprompter: false, reference: "" },
    { id: "s1", timeStart: "09:00", timeEnd: "10:00", type: "action", title: "",                   description: "", cast: "", location: "", image: null, format: "", platform: "", ratio: "", duration: "", teleprompter: false, reference: "" },
    { id: "s2", timeStart: "10:00", timeEnd: "10:30", type: "break",  title: "INTERVALO / COFFEE", description: "", cast: "", location: "", image: null, format: "", platform: "", ratio: "", duration: "", teleprompter: false, reference: "" },
  ]);

  const prevBrand = useRef(brand);
  useEffect(() => {
    if (prevBrand.current !== brand) {
      setHeader(h => ({ ...h, client: B.clientDefault, address: B.addressDefault, logoImage: null }));
      prevBrand.current = brand;
    }
  }, [brand]);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(""), 3000); };

  const handleApplyAI = ({ header: h, people: p, schedule: s }) => {
    setHeader(prev => ({ ...prev, ...h, logoImage: prev.logoImage }));
    setPeople(p);
    setSchedule(s);
    showToast("✨ Ordem do Dia gerada com sucesso!");
  };

  const updatePerson = (id, data) => setPeople(people.map(p => p.id === id ? data : p));
  const removePerson = (id) => setPeople(people.filter(p => p.id !== id));
  const updateBlock  = (id, data) => setSchedule(schedule.map(s => s.id === id ? data : s));
  const removeBlock  = (id) => setSchedule(schedule.filter(s => s.id !== id));

  const addPerson = (type) => setPeople([...people, {
    id: Date.now().toString(), name: "", role: type === "cast" ? "Apresentador(a)" : "Câmera",
    timeArrival: "08:00", timeAction: "09:00", image: null, type,
  }]);

  const newBlock = (type) => ({
    id: Date.now().toString(), timeStart: "10:00", timeEnd: "11:00",
    type, image: null, format: "", platform: "", ratio: "", duration: "", teleprompter: false, reference: "",
    title: type === "action" ? "" : type === "break" ? "INTERVALO" : "PREPARAÇÃO",
    description: "", cast: "", location: "",
  });

  const uploadImage = (e, cb) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const r = new FileReader();
    r.onloadend = () => cb(r.result);
    r.readAsDataURL(file);
  };

  const loadScript = (src) => new Promise((res, rej) => {
    const s = document.createElement("script"); s.src = src; s.onload = res; s.onerror = rej;
    document.head.appendChild(s);
  });

  const exportPDF = async () => {
    const el = document.getElementById("pdf-content");
    if (!el) return;
    setIsGeneratingPDF(true);
    try {
      if (!window.html2canvas) await loadScript("https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js");
      if (!window.jspdf)      await loadScript("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js");
      el.querySelectorAll("input,textarea").forEach(i => {
        if (i.tagName === "TEXTAREA") i.textContent = i.value;
        else i.setAttribute("value", i.value);
      });
      window.scrollTo(0, 0);
      const canvas = await window.html2canvas(el, {
        scale: 2, useCORS: true, backgroundColor: "#fff",
        windowWidth: el.scrollWidth, windowHeight: el.scrollHeight,
        onclone: (doc) => {
          doc.querySelectorAll(".print-hidden").forEach(e => e.style.display = "none");
          doc.querySelectorAll("textarea").forEach(ta => {
            const d = doc.createElement("div");
            d.textContent = ta.value || ta.textContent; d.className = ta.className;
            d.style.height = "auto"; d.style.whiteSpace = "pre-wrap";
            ta.parentNode.replaceChild(d, ta);
          });
          doc.querySelectorAll("input:not([type=file])").forEach(inp => {
            const d = doc.createElement("div");
            d.textContent = inp.getAttribute("value") || ""; d.className = inp.className;
            d.style.whiteSpace = "normal";
            inp.parentNode.replaceChild(d, inp);
          });
        },
      });
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF("p", "mm", "a4");
      const pw = pdf.internal.pageSize.getWidth(), ph = pdf.internal.pageSize.getHeight();
      const img = canvas.toDataURL("image/jpeg", 0.95);
      const totalH = (canvas.height * pw) / canvas.width;
      let left = totalH, pos = 0;
      pdf.addImage(img, "JPEG", 0, pos, pw, totalH); left -= ph;
      while (left > 0) { pos -= ph; pdf.addPage(); pdf.addImage(img, "JPEG", 0, pos, pw, totalH); left -= ph; }
      pdf.save(`OrdemDoDia_${B.name}.pdf`);
      showToast("PDF gerado com sucesso!");
    } catch { showToast("Erro ao gerar PDF. Tente novamente."); }
    finally { setIsGeneratingPDF(false); }
  };

  const cast = people.filter(p => p.type === "cast");
  const crew = people.filter(p => p.type === "crew");

  return (
    <div className="min-h-screen bg-[#F0F2F5] py-8 print:py-0 print:bg-white font-sans text-sm">

      {showImport && <AIImportPanel brand={brand} onApply={handleApplyAI} onClose={() => setShowImport(false)} />}

      {/* Toast */}
      {toast && (
        <div className="print-hidden fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-gray-900 text-white px-5 py-3 rounded-2xl shadow-2xl font-semibold text-sm flex items-center gap-2 animate-bounce">
          {toast}
        </div>
      )}

      {/* Brand switcher */}
      <div className="print-hidden fixed top-4 left-1/2 -translate-x-1/2 z-40 flex bg-white rounded-2xl shadow-lg p-1 gap-1 border border-gray-100">
        {Object.entries(BRANDS).map(([key, b]) => (
          <button key={key} onClick={() => setBrand(key)}
            className={`px-5 py-2 rounded-xl text-sm font-bold transition-all ${brand === key ? "text-white shadow-sm" : "text-gray-400 hover:text-gray-600"}`}
            style={brand === key ? { backgroundColor: b.primary } : {}}>
            {b.name}
          </button>
        ))}
      </div>

      {/* AI Import button */}
      <button onClick={() => setShowImport(true)}
        className="print-hidden fixed bottom-8 left-8 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 z-40 font-bold hover:opacity-90 transition-all hover:scale-105 text-sm"
        style={{ backgroundColor: B.primary }}>
        <Sparkles size={16} />
        Importar com IA
      </button>

      {/* PDF button */}
      <button onClick={exportPDF} disabled={isGeneratingPDF}
        className="print-hidden fixed bottom-8 right-8 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 z-40 font-bold hover:opacity-90 transition-all hover:scale-105 text-sm"
        style={{ backgroundColor: isGeneratingPDF ? "#9ca3af" : "#111827" }}>
        <Printer size={16} className={isGeneratingPDF ? "animate-pulse" : ""} />
        {isGeneratingPDF ? "Gerando..." : "Gerar PDF"}
      </button>

      {/* ── DOCUMENT ── */}
      <div id="pdf-content" className="max-w-4xl mx-auto bg-white shadow-xl print:shadow-none min-h-[297mm] mt-16 print:mt-0 rounded-2xl overflow-hidden">

        {/* Header */}
        <header style={{ borderBottom: `4px solid ${B.primary}` }}>
          {/* Logo */}
          <div className="w-full h-28 relative group flex items-center justify-center"
            style={{ backgroundColor: B.headerBg, ...(header.logoImage ? { backgroundImage: `url(${header.logoImage})`, backgroundSize: "contain", backgroundPosition: "center", backgroundRepeat: "no-repeat" } : {}) }}>
            {!header.logoImage && (
              <span className="font-black text-4xl tracking-[0.2em] select-none" style={{ color: B.primary }}>
                {B.logoPlaceholder}
              </span>
            )}
            <label className="absolute inset-0 cursor-pointer bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 print-hidden transition-opacity text-white text-xs gap-1.5">
              <Camera size={20} /><span className="font-semibold">Adicionar Logo</span>
              <input type="file" accept="image/*" className="hidden" onChange={e => uploadImage(e, img => setHeader({ ...header, logoImage: img }))} />
            </label>
          </div>

          <div className="p-8 pb-6">
            <input value={header.client} onChange={e => setHeader({ ...header, client: e.target.value })}
              className="text-[10px] font-black tracking-[0.3em] uppercase w-full outline-none focus:bg-gray-50 rounded px-1 block mb-1"
              style={{ color: B.primary }} placeholder="CLIENTE" />
            <input value={header.project} onChange={e => setHeader({ ...header, project: e.target.value })}
              className="text-3xl font-black text-gray-900 w-full outline-none focus:bg-gray-50 rounded px-1 block leading-tight"
              placeholder="Título do Projeto" />

            <div className="flex items-center gap-2 mt-3 text-gray-500 text-xs">
              <Clock size={13} />
              <input value={header.date} onChange={e => setHeader({ ...header, date: e.target.value })}
                className="bg-transparent outline-none focus:bg-gray-50 rounded px-1 text-gray-600 font-medium" />
            </div>

            <div className="mt-5 bg-gray-50 rounded-2xl p-4">
              <div className="flex items-center gap-1.5 mb-2" style={{ color: B.primary }}>
                <MapPin size={13} />
                <span className="text-[10px] font-black uppercase tracking-wide">Locação</span>
              </div>
              <textarea value={header.address}
                onChange={e => { setHeader({ ...header, address: e.target.value }); e.target.style.height = "auto"; e.target.style.height = e.target.scrollHeight + "px"; }}
                className="w-full bg-transparent font-medium text-gray-700 resize-none min-h-[32px] outline-none border border-transparent focus:border-gray-200 rounded-lg p-1 text-sm leading-relaxed" />
            </div>
          </div>
        </header>

        {/* Elenco */}
        <section className="px-8 py-6">
          <div className="flex items-center justify-between mb-4" style={{ borderBottom: `2px solid ${B.primary}`, paddingBottom: "10px" }}>
            <h2 className="text-xs font-black uppercase tracking-wider text-gray-900">🎬 Elenco</h2>
            <button onClick={() => addPerson("cast")}
              className="print-hidden flex items-center gap-1 text-[11px] font-bold transition-colors"
              style={{ color: B.primary }}>
              <Plus size={13} /> Adicionar
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {cast.map(p => (
              <PersonCard key={p.id} person={p}
                onUpdate={(data) => updatePerson(p.id, data)}
                onRemove={() => removePerson(p.id)}
                primaryColor={B.primary} />
            ))}
            {cast.length === 0 && (
              <button onClick={() => addPerson("cast")}
                className="print-hidden col-span-3 h-16 border-2 border-dashed border-gray-200 rounded-2xl flex items-center justify-center gap-2 text-gray-400 hover:border-gray-300 hover:text-gray-500 transition-colors text-xs font-semibold">
                <Plus size={14} /> Adicionar membro do elenco
              </button>
            )}
          </div>
        </section>

        {/* Equipe */}
        <section className="px-8 pb-6">
          <div className="flex items-center justify-between mb-4 border-b-2 border-gray-100 pb-2.5">
            <h2 className="text-xs font-black uppercase tracking-wider text-gray-900">🎥 Equipe Técnica</h2>
            <button onClick={() => addPerson("crew")}
              className="print-hidden flex items-center gap-1 text-[11px] font-bold text-gray-400 hover:text-gray-600 transition-colors">
              <Plus size={13} /> Adicionar
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {crew.map(p => (
              <PersonCard key={p.id} person={p}
                onUpdate={(data) => updatePerson(p.id, data)}
                onRemove={() => removePerson(p.id)}
                primaryColor={B.primary} />
            ))}
            {crew.length === 0 && (
              <button onClick={() => addPerson("crew")}
                className="print-hidden col-span-4 h-14 border-2 border-dashed border-gray-200 rounded-2xl flex items-center justify-center gap-2 text-gray-400 hover:border-gray-300 transition-colors text-xs font-semibold">
                <Plus size={14} /> Adicionar membro da equipe
              </button>
            )}
          </div>
        </section>

        {/* Ordem do Dia */}
        <section className="px-8 pb-10">
          <div className="flex items-center justify-between mb-5" style={{ borderBottom: `2px solid ${B.primary}`, paddingBottom: "10px" }}>
            <h2 className="text-xs font-black uppercase tracking-wider text-gray-900">📋 Ordem do Dia</h2>
            <div className="print-hidden flex gap-2">
              <button onClick={() => setSchedule([...schedule, newBlock("prep")])}
                className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1.5 rounded-xl text-[11px] font-bold transition-colors">
                + Prep
              </button>
              <button onClick={() => setSchedule([...schedule, newBlock("break")])}
                className="px-3 py-1.5 rounded-xl text-[11px] font-bold transition-colors"
                style={{ backgroundColor: `${B.primary}12`, color: B.primary }}>
                + Intervalo
              </button>
              <button onClick={() => setSchedule([...schedule, newBlock("action")])}
                className="text-white px-3 py-1.5 rounded-xl text-[11px] font-bold transition-colors hover:opacity-90"
                style={{ backgroundColor: B.primary }}>
                + Cena
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2 pl-8">
            {schedule.map(block => (
              <ScheduleBlock
                key={block.id}
                block={block}
                onUpdate={(data) => updateBlock(block.id, data)}
                onRemove={() => removeBlock(block.id)}
                primaryColor={B.primary}
              />
            ))}
            {schedule.length === 0 && (
              <div className="print-hidden flex flex-col items-center justify-center py-12 text-gray-300 gap-2">
                <Clock size={28} />
                <p className="text-xs font-semibold">Nenhum bloco adicionado</p>
                <button onClick={() => setSchedule([newBlock("action")])}
                  className="mt-1 text-xs font-bold px-4 py-2 rounded-xl text-white"
                  style={{ backgroundColor: B.primary }}>
                  Adicionar primeira cena
                </button>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="mt-12 pt-4 border-t border-gray-100 flex items-center justify-between">
            <span className="text-[10px] text-gray-300">Gerado em {new Date().toLocaleDateString("pt-BR")}</span>
            <span className="text-[10px] font-black tracking-widest" style={{ color: B.primary }}>
              {B.name} — ORDEM DO DIA
            </span>
          </div>
        </section>
      </div>
    </div>
  );
}
