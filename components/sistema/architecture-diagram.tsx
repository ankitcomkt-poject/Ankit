"use client"

import { useState } from "react"

const nodes = [
  {
    id: "oferta",
    label: "Oferta",
    description: "El tratamiento y el mensaje que se van a promover — se define en Diseño, no se improvisa en el anuncio.",
  },
  {
    id: "captacion",
    label: "Captación",
    description: "El canal se elige por dónde hay demanda real y por la economía del tratamiento, no por comodidad.",
  },
  {
    id: "landing",
    label: "Landing / Destino",
    description: "El lugar donde aterriza el lead — la primera prueba de que el mensaje y la oferta son coherentes.",
  },
  {
    id: "agente",
    label: "Agente",
    description: "La conversación inicial: responde, orienta, recopila información y guía al prospecto.",
  },
  {
    id: "calificacion",
    label: "Calificación",
    description: "Identifica la información relevante para decidir cómo sigue la conversación.",
  },
  {
    id: "seguimiento",
    label: "Seguimiento",
    description: "Si la persona no agenda de inmediato, el sistema continúa la conversación.",
  },
  {
    id: "agendamiento",
    label: "Agendamiento",
    description: "Guía el proceso hacia la reserva de la cita cuando el prospecto está listo.",
  },
  {
    id: "datos",
    label: "Datos",
    description: "Cada tramo se mide — de ahí sale lo que entra a Optimización.",
  },
] as const

/**
 * La pieza visual central de /sistema: reemplaza la ilustración
 * decorativa por un diagrama real de cómo se conectan las piezas — el
 * mismo idioma visual de hero-visual.tsx (panel con header tipo
 * mono, nodos numerados, un solo estado activo que atenúa al resto),
 * pero horizontal en vez de vertical, y bastante más grande, porque
 * aquí el diagrama ES el contenido, no un acompañamiento del hero.
 *
 * Nota importante para cuando se escriba el texto alrededor de esto:
 * este es el orden en que un lead VIVE el sistema (recorrido), no el
 * orden en que Ankit CONSTRUYE las piezas (que en Implementación deja
 * "Campañas" — captación — al final a propósito). Son dos vistas
 * distintas del mismo sistema; si ambas aparecen en la página hace
 * falta una frase que lo distinga, si no lee como una contradicción.
 */
export function ArchitectureDiagram() {
  const [active, setActive] = useState<string | null>(null)

  const toggle = (id: string) => setActive((prev) => (prev === id ? null : id))
  const activeNode = nodes.find((node) => node.id === active) ?? null

  return (
    <div className="overflow-hidden border border-white/10 bg-black/20">
      <div className="flex h-14 items-center justify-between border-b border-white/10 px-5">
        <div className="flex items-center gap-3">
          <span className="h-1.5 w-1.5 bg-accent" aria-hidden="true" />
          <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-white/55">
            Ankit / Arquitectura del sistema
          </span>
        </div>
        <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-white/30">8 piezas</span>
      </div>

      <div className="px-5 py-8 md:px-8 md:py-10">
        <div className="flex flex-col gap-1 md:flex-row md:items-stretch md:gap-0">
          {nodes.map((node, i) => {
            const isActive = active === node.id
            const isDimmed = active !== null && !isActive

            return (
              <div key={node.id} className="flex items-center md:flex-1">
                <button
                  type="button"
                  onMouseEnter={() => setActive(node.id)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(node.id)}
                  onBlur={() => setActive(null)}
                  onClick={() => toggle(node.id)}
                  aria-pressed={isActive}
                  aria-label={`${String(i + 1).padStart(2, "0")} ${node.label} — ${node.description}`}
                  className={`group flex w-full items-center gap-3 px-2 py-3 text-left outline-none transition-opacity duration-300 md:flex-col md:items-start md:gap-4 md:py-2 ${
                    isDimmed ? "opacity-40" : "opacity-100"
                  }`}
                >
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center border font-mono text-[10px] transition-all duration-300 ${
                      isActive
                        ? "border-accent bg-accent text-brand-cream"
                        : "border-white/20 bg-background text-white/50 group-hover:border-white/40"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`text-sm font-medium leading-tight transition-colors duration-300 md:text-[13px] ${
                      isActive ? "text-white" : "text-white/70"
                    }`}
                  >
                    {node.label}
                  </span>
                </button>

                {i < nodes.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="hidden shrink-0 px-1 font-mono text-xs text-white/20 md:block"
                  >
                    →
                  </span>
                )}
              </div>
            )
          })}
        </div>

        <div className="mt-8 min-h-[64px] border-t border-white/10 pt-6">
          {activeNode ? (
            <>
              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-accent">
                {activeNode.label}
              </span>
              <p className="mt-2 max-w-[54ch] text-[15px] leading-6 text-white/70">{activeNode.description}</p>
            </>
          ) : (
            <p className="font-mono text-[12px] uppercase tracking-[0.16em] text-white/35">
              Pasá el cursor — o tocá cada pieza — para ver cómo se conecta con el resto.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
