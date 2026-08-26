"use client"

import { useState } from "react"

const stages = [
  { id: "01", label: "Posicionamiento", note: "por qué te eligen" },
  { id: "02", label: "Captación", note: "cómo llegan" },
  { id: "03", label: "Conversión", note: "se agenda la cita" },
  { id: "04", label: "Seguimiento", note: "no se pierden en el camino" },
] as const

/**
 * Núcleo + nodos: ANKIT es el controlador del sistema (núcleo, arriba)
 * y gobierna cuatro componentes conectados. A propósito NO son
 * capacidades genéricas de "growth" (Strategy/Acquisition/Automation/
 * Intelligence) — son las etapas reales del recorrido de un paciente,
 * en español, porque eso es lo que hace que el diagrama se sienta de
 * Ankit y no de una plantilla de agencia. El resultado del sistema
 * (un paciente recurrente) se muestra como salida al final de la
 * cadena, no como un nodo más de proceso.
 *
 * Núcleo, nodos y resultado comparten UNA sola columna de alineación:
 * cada fila tiene un "junction" a la misma coordenada x, detrás del
 * cual corre un único tronco continuo. (Una versión anterior centraba
 * el núcleo sobre todo el panel mientras los nodos quedaban alineados
 * a la izquierda — el conector quedaba roto, sin tocar el primer nodo.
 * Esta versión lo evita por construcción, no por ajuste de píxeles.)
 *
 * Interacción: hover para mouse, focus para teclado, y click/tap para
 * pantallas táctiles que no tienen hover real — las tres alternan el
 * mismo estado `active`, con aria-pressed para lectores de pantalla.
 */
export function HeroVisual() {
  const [active, setActive] = useState<string | null>(null)

  const toggle = (id: string) => setActive((prev) => (prev === id ? null : id))

  return (
    <div className="overflow-hidden border border-white/10 bg-black/20">
      {/* Identificador superior */}
      <div className="flex h-14 items-center justify-between border-b border-white/10 px-5">
        <div className="flex items-center gap-3">
          <span className="h-1.5 w-1.5 bg-accent" />
          <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-white/55">
            Ankit / Sistema de crecimiento
          </span>
        </div>
        <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-white/30">Sistema 01</span>
      </div>

      <div className="px-6 py-5 md:px-7 md:py-6">
        <div className="relative">
          {/* Tronco único: corre detrás de núcleo, nodos y resultado */}
          <div
            aria-hidden="true"
            className="absolute left-[26px] top-6 bottom-6 w-px bg-white/10 md:left-[29px]"
          />

          <div className="relative flex flex-col">
            {/* Núcleo — el controlador, no un nodo más */}
            <div className="flex items-center gap-4 py-4">
              <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center border border-accent bg-accent/10 md:h-10 md:w-10">
                <span className="h-2 w-2 bg-accent" aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-mono text-[9px] uppercase tracking-[0.28em] text-white/40">
                  Núcleo
                </span>
                <span className="block text-xl font-bold tracking-tight text-white md:text-2xl">ANKIT</span>
              </span>
            </div>

            {/* Nodos — las etapas del sistema */}
            <ol className="flex flex-col">
              {stages.map((stage) => {
                const isActive = active === stage.id
                const isDimmed = active !== null && !isActive
                return (
                  <li key={stage.id}>
                    <button
                      type="button"
                      onMouseEnter={() => setActive(stage.id)}
                      onMouseLeave={() => setActive(null)}
                      onFocus={() => setActive(stage.id)}
                      onBlur={() => setActive(null)}
                      onClick={() => toggle(stage.id)}
                      aria-pressed={isActive}
                      className={`group flex w-full items-center gap-4 py-3 text-left outline-none transition-opacity duration-300 ${
                        isDimmed ? "opacity-50" : "opacity-100"
                      }`}
                      aria-label={`${stage.id} ${stage.label} — ${stage.note}`}
                    >
                      <span
                        className={`relative z-10 flex h-9 w-9 shrink-0 items-center justify-center border font-mono text-[10px] transition-all duration-300 md:h-10 md:w-10 ${
                          isActive
                            ? "border-accent bg-accent text-brand-cream"
                            : "border-white/20 bg-background text-white/50 group-hover:border-white/40"
                        }`}
                      >
                        {stage.id}
                      </span>

                      <span className="min-w-0 flex-1">
                        <span
                          className={`block truncate text-lg font-medium tracking-tight transition-colors duration-300 md:text-xl ${
                            isActive ? "text-white" : "text-white/70"
                          }`}
                        >
                          {stage.label}
                        </span>
                        <span
                          className={`mt-0.5 block font-mono text-[11px] uppercase tracking-[0.1em] transition-colors duration-300 ${
                            isActive ? "text-accent" : "text-white/35"
                          }`}
                        >
                          {stage.note}
                        </span>
                      </span>

                      <span
                        aria-hidden="true"
                        className={`font-mono text-[10px] transition-opacity duration-300 ${
                          isActive ? "opacity-100 text-accent" : "opacity-0"
                        }`}
                      >
                        →
                      </span>
                    </button>
                  </li>
                )
              })}
            </ol>

            {/* Resultado — la salida del sistema, no un paso más */}
            <div className="flex items-center gap-4 py-4">
              <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center border border-white/20 bg-background md:h-10 md:w-10">
                <span className="h-1.5 w-1.5 bg-accent" aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-mono text-[9px] uppercase tracking-[0.24em] text-white/35">
                  Resultado
                </span>
                <span className="block text-base font-semibold text-white">Paciente recurrente</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Estado del sistema — metadatos reales, no inventados */}
      <div className="grid grid-cols-2 border-t border-white/10">
        <div className="p-5">
          <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/35">Bogotá, CO</p>
          <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.25em] text-white/35">
            04.7110° N / 74.0721° O
          </p>
        </div>
        <div className="flex items-center justify-end border-l border-white/10 p-5">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 animate-pulse bg-accent" />
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-accent">Sistema activo</span>
          </div>
        </div>
      </div>
    </div>
  )
}
