import { useState, useRef, useCallback, useEffect } from "react";

const WEEKS = 24;
const WEEK_WIDTH = 50;
const ROW_HEIGHT = 40;
const HEADER_HEIGHT = 80;
const SIDEBAR_WIDTH = 320;
// Paleta FLOW & FOOD by Alsea (Manual de imagen): verde menta, naranja, verde oscuro, amarillo
const COLORS = {
  tech: "#5FB8A8",    // Verde menta claro (cuerpo principal / tech)
  brand: "#E07C24",   // Naranja (franja, acentos, branding)
  legal: "#1B5E4D",   // Verde oscuro (texto y marco legal)
  alliance: "#CA8A04", // Amarillo/dorado (alianzas)
};
// Tema claro — fondo beige/gris neutro según manual
const THEME = {
  bg: "#F2EDE6",           // Beige/gris neutro
  bgAlt: "#E8E4DE",        // Alternancia suave
  surface: "#FAF8F5",      // Barras/sidebar
  surfaceHover: "#E8E4DE",
  border: "#D4CFC6",
  borderLight: "#E5E2DB",
  text: "#1B5E4D",         // Verde oscuro (texto principal marca)
  textSecondary: "#5A6B5D",
  textMuted: "#7D8B7F",
  scrollbarTrack: "#E5E2DB",
  scrollbarThumb: "#B8B2A6",
  scrollbarThumbHover: "#9C9588",
};
const CAT_LABELS = {
  tech: "Arquitectura Tecnológica",
  brand: "Branding & MKT",
  legal: "Logística y Marco Legal",
  alliance: "Alianzas Estratégicas",
};

const initialActivities = [
  { id: 1, name: "Web/app Shopify (setup inicial)", cat: "tech", start: 0, dur: 4 },
  { id: 2, name: "Selección agencia desarrollo", cat: "tech", start: 0, dur: 2 },
  { id: 3, name: "Wireframes y arquitectura", cat: "tech", start: 2, dur: 2 },
  { id: 4, name: "Desarrollo frontend Shopify", cat: "tech", start: 4, dur: 2 },
  { id: 5, name: "Integración pagos Conekta", cat: "tech", start: 4, dur: 4 },
  { id: 6, name: "Primer test end-to-end", cat: "tech", start: 7, dur: 1 },
  { id: 7, name: "Adaptación look & feel definitivo", cat: "tech", start: 8, dur: 2 },
  { id: 8, name: "Push notifications (Firebase+OneSignal)", cat: "tech", start: 10, dur: 2 },
  { id: 9, name: "WhatsApp Business API", cat: "tech", start: 10, dur: 2 },
  { id: 10, name: "Setup SAP Business One", cat: "tech", start: 12, dur: 4 },
  { id: 11, name: "App driver/stock (desarrollo)", cat: "tech", start: 14, dur: 4 },
  { id: 12, name: "Integración SAP ↔ Shopify", cat: "tech", start: 16, dur: 2 },
  { id: 13, name: "QA integral y go-live", cat: "tech", start: 18, dur: 2 },
  { id: 14, name: "Selección agencia branding", cat: "brand", start: 0, dur: 2 },
  { id: 15, name: "Brief estratégico + naming", cat: "brand", start: 2, dur: 2 },
  { id: 16, name: "Diseño logotipo y sistema visual", cat: "brand", start: 4, dur: 2 },
  { id: 17, name: "Manual de marca completo", cat: "brand", start: 6, dur: 2 },
  { id: 18, name: "Diseño menú + packaging", cat: "brand", start: 6, dur: 2 },
  { id: 19, name: "Sesión fotográfica profesional", cat: "brand", start: 8, dur: 2 },
  { id: 20, name: "Diseño + instalación vinilado (3 trucks)", cat: "brand", start: 9, dur: 4 },
  { id: 21, name: "Pre-lanzamiento RRSS (teaser)", cat: "brand", start: 10, dur: 2 },
  { id: 22, name: "Campaña micro-influencers", cat: "brand", start: 12, dur: 8 },
  { id: 23, name: "Lanzamiento oficial marca", cat: "brand", start: 12, dur: 2 },
  { id: 24, name: "Cross marketing ALSEA / Wow+", cat: "brand", start: 14, dur: 10 },
  { id: 25, name: "Pauta digital Meta Ads", cat: "brand", start: 16, dur: 8 },
  { id: 26, name: "Evaluación KPIs marca", cat: "brand", start: 20, dur: 4 },
  { id: 27, name: "Constitución persona moral + RFC", cat: "legal", start: 0, dur: 1 },
  { id: 28, name: "Apertura cuenta bancaria", cat: "legal", start: 1, dur: 2 },
  { id: 29, name: "Registro marca IMPI", cat: "legal", start: 1, dur: 20 },
  { id: 30, name: "Aviso funcionamiento COFEPRIS", cat: "legal", start: 2, dur: 2 },
  { id: 31, name: "Permisos alcaldía dark kitchen", cat: "legal", start: 4, dur: 2 },
  { id: 32, name: "Registro IMSS + INFONAVIT", cat: "legal", start: 6, dur: 2 },
  { id: 33, name: "Contratación personal dark kitchen", cat: "legal", start: 6, dur: 2 },
  { id: 34, name: "Adquisición/renta food trucks", cat: "legal", start: 8, dur: 4 },
  { id: 35, name: "Permisos comercio vía pública", cat: "legal", start: 10, dur: 2 },
  { id: 36, name: "Contratación personal (3 trucks)", cat: "legal", start: 12, dur: 2 },
  { id: 37, name: "Implementación pet-friendly", cat: "legal", start: 14, dur: 2 },
  { id: 38, name: "Soft launch (1 truck piloto)", cat: "legal", start: 18, dur: 2 },
  { id: 39, name: "Despliegue 3 trucks + estabilización", cat: "legal", start: 20, dur: 4 },
  { id: 40, name: "Selección dark kitchen", cat: "alliance", start: 0, dur: 2 },
  { id: 41, name: "Contratos proveedores insumos", cat: "alliance", start: 2, dur: 2 },
  { id: 42, name: "Proveedor packaging sostenible", cat: "alliance", start: 4, dur: 2 },
  { id: 43, name: "Proveedores bebidas saludables", cat: "alliance", start: 6, dur: 2 },
  { id: 44, name: "Alta Uber Eats / Rappi / DiDi", cat: "alliance", start: 8, dur: 2 },
  { id: 45, name: "Negociación ALSEA → delivery", cat: "alliance", start: 10, dur: 2 },
  { id: 46, name: "Transición dark kitchen → comisaría", cat: "alliance", start: 12, dur: 2 },
  { id: 47, name: "Renegociación proveedores (volumen)", cat: "alliance", start: 14, dur: 2 },
  { id: 48, name: "Estabilización cadena suministro", cat: "alliance", start: 16, dur: 4 },
];

const initialDeps = [
  { from: 27, to: 28, type: "FS" },
  { from: 28, to: 5, type: "FS" },
  { from: 17, to: 7, type: "FS" },
  { from: 17, to: 20, type: "FS" },
  { from: 6, to: 7, type: "FS" },
  { from: 40, to: 41, type: "FS" },
  { from: 30, to: 44, type: "FS" },
  { from: 34, to: 20, type: "SS" },
];

function weekToMonth(w) {
  return Math.floor(w / 4) + 1;
}

function getMonthHeaders() {
  const months = [];
  for (let m = 0; m < 6; m++) {
    months.push({ label: `Mes ${m + 1}`, startWeek: m * 4, weeks: 4 });
  }
  return months;
}

export default function GanttChart() {
  const [activities, setActivities] = useState(initialActivities);
  const [deps, setDeps] = useState(initialDeps);
  const [dragging, setDragging] = useState(null);
  const [resizing, setResizing] = useState(null);
  const [linking, setLinking] = useState(null);
  const [linkMouse, setLinkMouse] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [selectedCat, setSelectedCat] = useState("all");
  const [tooltip, setTooltip] = useState(null);
  const svgRef = useRef(null);
  const containerRef = useRef(null);
  const fileInputRef = useRef(null);

  const filtered = selectedCat === "all" ? activities : activities.filter((a) => a.cat === selectedCat);
  const sortedActivities = [...filtered].sort((a, b) => {
    const catOrder = ["tech", "brand", "legal", "alliance"];
    const ci = catOrder.indexOf(a.cat) - catOrder.indexOf(b.cat);
    if (ci !== 0) return ci;
    return a.start - b.start;
  });

  const totalWidth = WEEKS * WEEK_WIDTH;
  const totalHeight = sortedActivities.length * ROW_HEIGHT + HEADER_HEIGHT + 20;

  const getActivityRow = useCallback(
    (id) => sortedActivities.findIndex((a) => a.id === id),
    [sortedActivities]
  );

  const getBarX = (a) => a.start * WEEK_WIDTH;
  const getBarW = (a) => Math.max(a.dur * WEEK_WIDTH - 4, 12);
  const getBarY = (idx) => HEADER_HEIGHT + idx * ROW_HEIGHT + 8;
  const BAR_H = ROW_HEIGHT - 16;

  const handleMouseDown = (e, activity, action) => {
    e.stopPropagation();
    e.preventDefault();
    const svgRect = svgRef.current.getBoundingClientRect();
    const scrollLeft = containerRef.current?.scrollLeft || 0;
    const startMouseX = e.clientX - svgRect.left + scrollLeft;

    if (action === "move") {
      setDragging({ id: activity.id, origStart: activity.start, mouseStartX: startMouseX });
    } else if (action === "resize") {
      setResizing({ id: activity.id, origDur: activity.dur, mouseStartX: startMouseX });
    }
  };

  const handleLinkStart = (e, activity, end) => {
    e.stopPropagation();
    e.preventDefault();
    const svgRect = svgRef.current.getBoundingClientRect();
    const scrollLeft = containerRef.current?.scrollLeft || 0;
    const scrollTop = containerRef.current?.scrollTop || 0;
    setLinking({ fromId: activity.id, fromEnd: end });
    setLinkMouse({ x: e.clientX - svgRect.left + scrollLeft, y: e.clientY - svgRect.top + scrollTop });
  };

  const handleMouseMove = useCallback(
    (e) => {
      if (!svgRef.current) return;
      const svgRect = svgRef.current.getBoundingClientRect();
      const scrollLeft = containerRef.current?.scrollLeft || 0;
      const scrollTop = containerRef.current?.scrollTop || 0;
      const mouseX = e.clientX - svgRect.left + scrollLeft;
      const mouseY = e.clientY - svgRect.top + scrollTop;

      if (dragging) {
        const dx = mouseX - dragging.mouseStartX;
        const newStart = Math.max(0, Math.min(WEEKS - 1, Math.round(dragging.origStart + dx / WEEK_WIDTH)));
        setActivities((prev) => prev.map((a) => (a.id === dragging.id ? { ...a, start: newStart } : a)));
      } else if (resizing) {
        const dx = mouseX - resizing.mouseStartX;
        const newDur = Math.max(1, Math.round(resizing.origDur + dx / WEEK_WIDTH));
        setActivities((prev) => prev.map((a) => (a.id === resizing.id ? { ...a, dur: newDur } : a)));
      } else if (linking) {
        setLinkMouse({ x: mouseX, y: mouseY });
      }
    },
    [dragging, resizing, linking]
  );

  const handleMouseUp = useCallback(
    (e) => {
      if (linking) {
        const svgRect = svgRef.current.getBoundingClientRect();
        const scrollLeft = containerRef.current?.scrollLeft || 0;
        const scrollTop = containerRef.current?.scrollTop || 0;
        const mouseX = e.clientX - svgRect.left + scrollLeft;
        const mouseY = e.clientY - svgRect.top + scrollTop;

        const rowIdx = Math.floor((mouseY - HEADER_HEIGHT) / ROW_HEIGHT);
        if (rowIdx >= 0 && rowIdx < sortedActivities.length) {
          const target = sortedActivities[rowIdx];
          if (target.id !== linking.fromId) {
            const targetBarX = getBarX(target);
            const targetBarEnd = targetBarX + getBarW(target);
            const targetMid = (targetBarX + targetBarEnd) / 2;
            const toEnd = mouseX > targetMid ? "end" : "start";
            const type = linking.fromEnd === "end" && toEnd === "start" ? "FS" : linking.fromEnd === "start" && toEnd === "start" ? "SS" : linking.fromEnd === "end" && toEnd === "end" ? "FF" : "SF";
            const exists = deps.some((d) => d.from === linking.fromId && d.to === target.id);
            if (!exists) {
              setDeps((prev) => [...prev, { from: linking.fromId, to: target.id, type }]);
            }
          }
        }
      }
      setDragging(null);
      setResizing(null);
      setLinking(null);
      setLinkMouse(null);
    },
    [linking, sortedActivities, deps]
  );

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  const addActivity = (cat) => {
    const maxId = activities.reduce((m, a) => Math.max(m, a.id), 0);
    setActivities((prev) => [...prev, { id: maxId + 1, name: "Nueva actividad", cat, start: 0, dur: 2 }]);
  };

  const deleteActivity = (id) => {
    setActivities((prev) => prev.filter((a) => a.id !== id));
    setDeps((prev) => prev.filter((d) => d.from !== id && d.to !== id));
  };

  const deleteDep = (from, to) => {
    setDeps((prev) => prev.filter((d) => !(d.from === from && d.to === to)));
  };

  const startEdit = (a) => {
    setEditingId(a.id);
    setEditName(a.name);
  };

  const saveEdit = () => {
    if (editingId && editName.trim()) {
      setActivities((prev) => prev.map((a) => (a.id === editingId ? { ...a, name: editName.trim() } : a)));
    }
    setEditingId(null);
  };

  const handleExport = () => {
    const data = { activities, deps };
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cronograma.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        if (!Array.isArray(data.activities) || !Array.isArray(data.deps)) {
          alert("Formato de archivo no válido. Debe contener 'activities' y 'deps' como arrays.");
          return;
        }
        const validActivity = (a) =>
          typeof a.id === "number" &&
          typeof a.name === "string" &&
          ["tech", "brand", "legal", "alliance"].includes(a.cat) &&
          typeof a.start === "number" &&
          typeof a.dur === "number";
        const validDep = (d) =>
          typeof d.from === "number" && typeof d.to === "number" && typeof d.type === "string";
        if (!data.activities.every(validActivity) || !data.deps.every(validDep)) {
          alert("Formato de archivo no válido. Revisa la estructura de actividades y dependencias.");
          return;
        }
        setActivities(data.activities);
        setDeps(data.deps);
      } catch {
        alert("Formato de archivo no válido. No se pudo leer el JSON.");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const renderDepLines = () => {
    return deps.map((d, i) => {
      const fromIdx = getActivityRow(d.from);
      const toIdx = getActivityRow(d.to);
      if (fromIdx === -1 || toIdx === -1) return null;
      const fromA = sortedActivities[fromIdx];
      const toA = sortedActivities[toIdx];

      let x1, y1, x2, y2;
      const fromBarX = getBarX(fromA);
      const fromBarEnd = fromBarX + getBarW(fromA);
      const toBarX = getBarX(toA);
      const toBarEnd = toBarX + getBarW(toA);
      const fromBarY = getBarY(fromIdx) + BAR_H / 2;
      const toBarY = getBarY(toIdx) + BAR_H / 2;

      if (d.type === "FS") { x1 = fromBarEnd + 2; x2 = toBarX - 2; }
      else if (d.type === "SS") { x1 = fromBarX - 2; x2 = toBarX - 2; }
      else if (d.type === "FF") { x1 = fromBarEnd + 2; x2 = toBarEnd + 2; }
      else { x1 = fromBarX - 2; x2 = toBarEnd + 2; }

      y1 = fromBarY;
      y2 = toBarY;

      const midX = (x1 + x2) / 2;
      const path = `M${x1},${y1} C${midX},${y1} ${midX},${y2} ${x2},${y2}`;

      return (
        <g key={`dep-${i}`} onClick={() => deleteDep(d.from, d.to)} style={{ cursor: "pointer" }}>
          <path d={path} fill="none" stroke={THEME.textMuted} strokeWidth={1.5} strokeDasharray="6,3" markerEnd="url(#arrow)" />
          <path d={path} fill="none" stroke="transparent" strokeWidth={12} />
          <text x={midX} y={Math.min(y1, y2) - 6} textAnchor="middle" fill={THEME.textMuted} fontSize={9} fontFamily="monospace">
            {d.type}
          </text>
        </g>
      );
    });
  };

  const renderLinkingLine = () => {
    if (!linking || !linkMouse) return null;
    const fromIdx = getActivityRow(linking.fromId);
    if (fromIdx === -1) return null;
    const fromA = sortedActivities[fromIdx];
    const fromBarX = getBarX(fromA);
    const fromBarEnd = fromBarX + getBarW(fromA);
    const fromBarY = getBarY(fromIdx) + BAR_H / 2;
    const x1 = linking.fromEnd === "end" ? fromBarEnd : fromBarX;

    return <line x1={x1} y1={fromBarY} x2={linkMouse.x} y2={linkMouse.y} stroke={COLORS.brand} strokeWidth={2} strokeDasharray="4,4" />;
  };

  return (
    <div style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif", background: THEME.bg, color: THEME.text, height: "100vh", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-track { background: ${THEME.scrollbarTrack}; }
        ::-webkit-scrollbar-thumb { background: ${THEME.scrollbarThumb}; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: ${THEME.scrollbarThumbHover}; }
      `}</style>

      {/* Top bar */}
      <div style={{ background: THEME.surface, borderBottom: `1px solid ${THEME.border}`, padding: "12px 20px", display: "flex", alignItems: "center", gap: 16, flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 28, height: 28, background: "linear-gradient(135deg, #5FB8A8, #7EC8C3)", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>📊</div>
          <span style={{ fontWeight: 700, fontSize: 16, letterSpacing: "-0.02em", color: THEME.text }}>Food Truck CDMX — Roadmap</span>
        </div>
        <div style={{ flex: 1 }} />

        <div style={{ display: "flex", gap: 6 }}>
          {["all", "tech", "brand", "legal", "alliance"].map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCat(c)}
              style={{
                padding: "5px 12px",
                borderRadius: 6,
                border: selectedCat === c ? "1.5px solid" : `1px solid ${THEME.border}`,
                borderColor: selectedCat === c ? (c === "all" ? THEME.text : COLORS[c]) : THEME.border,
                background: selectedCat === c ? (c === "all" ? THEME.bgAlt : COLORS[c] + "22") : "transparent",
                color: selectedCat === c ? (c === "all" ? THEME.text : COLORS[c]) : THEME.textSecondary,
                cursor: "pointer",
                fontSize: 12,
                fontWeight: 600,
                fontFamily: "inherit",
              }}
            >
              {c === "all" ? "Todas" : CAT_LABELS[c]}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", gap: 6 }}>
          {Object.keys(COLORS).map((cat) => (
            <button
              key={cat}
              onClick={() => addActivity(cat)}
              style={{
                padding: "5px 10px",
                borderRadius: 6,
                border: `1px solid ${COLORS[cat]}66`,
                background: COLORS[cat] + "18",
                color: COLORS[cat],
                cursor: "pointer",
                fontSize: 11,
                fontWeight: 600,
                fontFamily: "inherit",
              }}
            >
              + {CAT_LABELS[cat].split(" ")[0]}
            </button>
          ))}
        </div>

        <input
          type="file"
          ref={fileInputRef}
          accept=".json,application/json"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        <div style={{ display: "flex", gap: 6 }}>
          <button
            onClick={handleExport}
            style={{
              padding: "5px 12px",
              borderRadius: 6,
              border: `1px solid ${THEME.border}`,
              background: THEME.bgAlt,
              color: THEME.textSecondary,
              cursor: "pointer",
              fontSize: 12,
              fontWeight: 600,
              fontFamily: "inherit",
            }}
          >
            Exportar JSON
          </button>
          <button
            onClick={handleImportClick}
            style={{
              padding: "5px 12px",
              borderRadius: 6,
              border: `1px solid ${THEME.border}`,
              background: THEME.bgAlt,
              color: THEME.textSecondary,
              cursor: "pointer",
              fontSize: 12,
              fontWeight: 600,
              fontFamily: "inherit",
            }}
          >
            Importar JSON
          </button>
        </div>
      </div>

      {/* Instructions bar */}
      <div style={{ background: THEME.bgAlt, padding: "6px 20px", fontSize: 11, color: THEME.textMuted, display: "flex", gap: 20, flexShrink: 0, borderBottom: `1px solid ${THEME.borderLight}` }}>
        <span>⬅➡ <b>Arrastrar</b> barra = mover</span>
        <span>↔ <b>Borde derecho</b> = cambiar duración</span>
        <span>🔵 <b>Círculos</b> en extremos = crear dependencia (arrastra de uno a otro)</span>
        <span>📝 <b>Doble clic</b> nombre = renombrar</span>
        <span>🗑 <b>Clic</b> en línea de dependencia = eliminar</span>
      </div>

      {/* Main area */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        {/* Sidebar */}
        <div style={{ width: SIDEBAR_WIDTH, flexShrink: 0, background: THEME.surface, borderRight: `1px solid ${THEME.border}`, overflow: "auto" }}>
          <div style={{ height: HEADER_HEIGHT, display: "flex", alignItems: "flex-end", padding: "0 12px 8px", borderBottom: `1px solid ${THEME.border}` }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: THEME.textMuted, textTransform: "uppercase", letterSpacing: "0.05em" }}>Actividad</span>
          </div>
          {sortedActivities.map((a, i) => {
            const isFirst = i === 0 || sortedActivities[i - 1].cat !== a.cat;
            return (
              <div key={a.id}>
                {isFirst && (
                  <div style={{ padding: "6px 12px", background: COLORS[a.cat] + "18", borderLeft: `3px solid ${COLORS[a.cat]}`, fontSize: 10, fontWeight: 700, color: COLORS[a.cat], textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    {CAT_LABELS[a.cat]}
                  </div>
                )}
                <div
                  style={{
                    height: ROW_HEIGHT,
                    display: "flex",
                    alignItems: "center",
                    padding: "0 12px",
                    borderBottom: `1px solid ${THEME.borderLight}`,
                    gap: 8,
                    background: tooltip?.id === a.id ? THEME.surfaceHover : "transparent",
                  }}
                  onMouseEnter={() => setTooltip({ id: a.id })}
                  onMouseLeave={() => setTooltip(null)}
                >
                  <div style={{ width: 4, height: 20, borderRadius: 2, background: COLORS[a.cat], flexShrink: 0 }} />
                  {editingId === a.id ? (
                    <input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      onBlur={saveEdit}
                      onKeyDown={(e) => e.key === "Enter" && saveEdit()}
                      autoFocus
                      style={{ flex: 1, background: THEME.bg, border: `1px solid ${THEME.border}`, borderRadius: 4, padding: "2px 6px", color: THEME.text, fontSize: 12, fontFamily: "inherit", outline: "none" }}
                    />
                  ) : (
                    <span
                      onDoubleClick={() => startEdit(a)}
                      style={{ flex: 1, fontSize: 12, color: THEME.textSecondary, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", cursor: "text" }}
                      title={a.name}
                    >
                      {a.name}
                    </span>
                  )}
                  <span style={{ fontSize: 10, color: THEME.textMuted, flexShrink: 0 }}>S{a.start + 1}-{a.start + a.dur}</span>
                  {tooltip?.id === a.id && (
                    <button
                      onClick={() => deleteActivity(a.id)}
                      style={{ width: 20, height: 20, borderRadius: 4, border: "none", background: "#B91C1C", color: "#fff", cursor: "pointer", fontSize: 11, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontFamily: "inherit" }}
                    >
                      ×
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Chart area */}
        <div ref={containerRef} style={{ flex: 1, overflow: "auto", position: "relative" }}>
          <svg
            ref={svgRef}
            width={totalWidth}
            height={totalHeight}
            style={{ display: "block", cursor: dragging ? "grabbing" : resizing ? "ew-resize" : "default" }}
          >
            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M0,0 L10,5 L0,10 z" fill={THEME.textMuted} />
              </marker>
              <linearGradient id="todayLine" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={COLORS.brand} stopOpacity="0.8" />
                <stop offset="100%" stopColor={COLORS.brand} stopOpacity="0.1" />
              </linearGradient>
            </defs>

            {/* Background */}
            <rect width={totalWidth} height={totalHeight} fill={THEME.bg} />

            {/* Week columns */}
            {Array.from({ length: WEEKS }).map((_, w) => (
              <g key={`w-${w}`}>
                <rect x={w * WEEK_WIDTH} y={HEADER_HEIGHT} width={WEEK_WIDTH} height={totalHeight - HEADER_HEIGHT} fill={w % 2 === 0 ? THEME.bg : THEME.bgAlt} />
                <line x1={w * WEEK_WIDTH} y1={HEADER_HEIGHT} x2={w * WEEK_WIDTH} y2={totalHeight} stroke={THEME.borderLight} strokeWidth={1} />
              </g>
            ))}

            {/* Month headers */}
            {getMonthHeaders().map((m, i) => (
              <g key={`m-${i}`}>
                <rect x={m.startWeek * WEEK_WIDTH} y={0} width={m.weeks * WEEK_WIDTH} height={40} fill={THEME.surface} stroke={THEME.border} strokeWidth={1} />
                <text x={m.startWeek * WEEK_WIDTH + (m.weeks * WEEK_WIDTH) / 2} y={26} textAnchor="middle" fill={THEME.text} fontSize={13} fontWeight="600" fontFamily="'DM Sans', sans-serif">
                  {m.label}
                </text>
              </g>
            ))}

            {/* Week numbers */}
            {Array.from({ length: WEEKS }).map((_, w) => (
              <text key={`wn-${w}`} x={w * WEEK_WIDTH + WEEK_WIDTH / 2} y={58} textAnchor="middle" fill={THEME.textMuted} fontSize={10} fontFamily="'DM Sans', sans-serif">
                S{w + 1}
              </text>
            ))}

            <line x1={0} y1={HEADER_HEIGHT} x2={totalWidth} y2={HEADER_HEIGHT} stroke={THEME.border} strokeWidth={1} />

            {/* Row backgrounds */}
            {sortedActivities.map((a, i) => (
              <rect key={`row-${a.id}`} x={0} y={HEADER_HEIGHT + i * ROW_HEIGHT} width={totalWidth} height={ROW_HEIGHT} fill={tooltip?.id === a.id ? THEME.surfaceHover : "transparent"} onMouseEnter={() => setTooltip({ id: a.id })} onMouseLeave={() => setTooltip(null)} />
            ))}

            {/* Dependency lines */}
            {renderDepLines()}
            {renderLinkingLine()}

            {/* Bars */}
            {sortedActivities.map((a, i) => {
              const x = getBarX(a);
              const w = getBarW(a);
              const y = getBarY(i);
              const color = COLORS[a.cat];

              return (
                <g key={`bar-${a.id}`}>
                  {/* Bar body - draggable */}
                  <rect
                    x={x}
                    y={y}
                    width={w}
                    height={BAR_H}
                    rx={4}
                    fill={color + "44"}
                    stroke={color}
                    strokeWidth={1.5}
                    style={{ cursor: "grab" }}
                    onMouseDown={(e) => handleMouseDown(e, a, "move")}
                    onMouseEnter={() => setTooltip({ id: a.id })}
                    onMouseLeave={() => setTooltip(null)}
                  />
                  {/* Progress fill */}
                  <rect x={x + 1} y={y + 1} width={w - 2} height={BAR_H - 2} rx={3} fill={color} opacity={0.25} />

                  {/* Label on bar */}
                  {w > 60 && (
                    <text x={x + 8} y={y + BAR_H / 2 + 4} fill={THEME.text} fontSize={10} fontWeight="500" fontFamily="'DM Sans', sans-serif" style={{ pointerEvents: "none" }}>
                      {a.name.length > Math.floor(w / 7) ? a.name.slice(0, Math.floor(w / 7)) + "…" : a.name}
                    </text>
                  )}

                  {/* Resize handle (right edge) */}
                  <rect
                    x={x + w - 8}
                    y={y}
                    width={8}
                    height={BAR_H}
                    fill="transparent"
                    style={{ cursor: "ew-resize" }}
                    onMouseDown={(e) => handleMouseDown(e, a, "resize")}
                  />

                  {/* Link circles - start */}
                  <circle
                    cx={x - 1}
                    cy={y + BAR_H / 2}
                    r={5}
                    fill={THEME.bg}
                    stroke={color}
                    strokeWidth={1.5}
                    style={{ cursor: "crosshair", opacity: tooltip?.id === a.id ? 1 : 0 }}
                    onMouseDown={(e) => handleLinkStart(e, a, "start")}
                  />
                  {/* Link circles - end */}
                  <circle
                    cx={x + w + 1}
                    cy={y + BAR_H / 2}
                    r={5}
                    fill={THEME.bg}
                    stroke={color}
                    strokeWidth={1.5}
                    style={{ cursor: "crosshair", opacity: tooltip?.id === a.id ? 1 : 0 }}
                    onMouseDown={(e) => handleLinkStart(e, a, "end")}
                  />
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Bottom stats */}
      <div style={{ background: THEME.surface, borderTop: `1px solid ${THEME.border}`, padding: "8px 20px", display: "flex", gap: 24, fontSize: 11, color: THEME.textMuted, flexShrink: 0 }}>
        <span>{sortedActivities.length} actividades</span>
        <span>{deps.length} dependencias</span>
        {Object.keys(COLORS).map((c) => (
          <span key={c} style={{ color: COLORS[c] }}>● {CAT_LABELS[c]}: {sortedActivities.filter((a) => a.cat === c).length}</span>
        ))}
      </div>
    </div>
  );
}
