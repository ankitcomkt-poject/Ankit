const nodes = ["Demanda", "Sistema", "Conversión", "Datos", "Decisiones"]

/**
 * Apoyo visual del Hero de Nosotros — a propósito NO es una foto (así
 * lo pidió el cliente): es el mismo lenguaje visual de panel que ya
 * usan ArchitectureDiagram y los paneles de nota (borde, barra de
 * cabecera mono, punto pulsante). Es el único diagrama de "ciclo" que
 * queda en la página — Nosotros tenía 4 versiones distintas del mismo
 * loop (Hero, "Cómo pensamos", "Cómo trabajamos", "Cómo medimos");
 * se recortó a esta sola, la que mejor representa la tesis fundacional.
 */
export function ThesisDiagram() {
  return (
    <div className="border border-white/10 bg-black/20">
      <div className="flex h-12 items-center gap-3 border-b border-white/10 px-5">
        <span className="h-1.5 w-1.5 animate-pulse bg-accent" aria-hidden="true" />
        <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-accent">La tesis de Ankit</span>
      </div>

      <div className="flex flex-col items-center gap-0 px-8 py-10">
        {nodes.map((node, i) => (
          <div key={node} className="flex flex-col items-center">
            <div className="border border-white/15 bg-white/[0.02] px-7 py-3 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-white">
              {node}
            </div>
            {i < nodes.length - 1 && (
              <div className="flex h-8 flex-col items-center justify-center">
                <div className="h-full w-px bg-white/15" />
              </div>
            )}
          </div>
        ))}

        <div className="mt-5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
          <span aria-hidden="true">↺</span>
          <span>El ciclo se repite</span>
        </div>
      </div>
    </div>
  )
}
