"use client"

import { cn } from "@/lib/utils"
import { Reveal } from "@/components/design-system/motion/reveal"

export interface FlowStep {
  index: string
  label: string
  description?: string
}

interface FlowStepsProps {
  steps: FlowStep[]
  className?: string
  /** "compact" = fila de etiquetas (uso en comparativas). "detailed" = tarjetas con descripción. */
  variant?: "compact" | "detailed"
}

/**
 * Gramática visual reutilizada para todo contenido "secuencial" del
 * home (el proceso de 6 pasos en la sección 03 y el proceso de 4
 * pasos en la 08). Usar siempre el mismo lenguaje para "esto ocurre
 * en orden" y un lenguaje distinto (grid modular) para "estos son
 * componentes del sistema" es lo que hace legible la jerarquía sin
 * necesidad de explicarla.
 *
 * Hover reforzado a pedido explícito (referencia en video de tarjetas
 * que reaccionan al mouse): al pasar por encima, el label pasa a rojo
 * de marca y aparece un tinte de fondo muy sutil detrás del paso. El
 * tinte vive en un <span> absoluto con z-index negativo — no en el
 * className de <Reveal> — por la misma razón que en PillarCard: Reveal
 * ya trae su propia transición (700ms) y cualquier `transition-*`/
 * `duration-*` pasado por fuera se la pisa entera vía twMerge.
 */
export function FlowSteps({ steps, className, variant = "detailed" }: FlowStepsProps) {
  return (
    <div
      className={cn(
        "flex flex-col divide-y divide-white/10 border border-white/10 md:flex-row md:divide-x md:divide-y-0",
        className,
      )}
    >
      {steps.map((step, i) => (
        <Reveal
          as="div"
          key={step.index}
          delay={i * 70}
          className={cn(
            "group relative flex-1 px-6 py-7 md:px-6",
            variant === "detailed" ? "md:py-9" : "md:py-7",
          )}
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 bg-brand-red/0 transition-colors duration-300 group-hover:bg-brand-red/[0.045]"
          />

          <div className="flex items-baseline gap-3 md:block md:gap-0">
            <span className="font-mono text-[12px] text-accent">{step.index}</span>
            <p
              className={cn(
                "font-semibold tracking-[-0.01em] text-white transition-colors duration-300 group-hover:text-accent",
                variant === "detailed" ? "mt-0 text-xl md:mt-3 md:text-xl" : "mt-0 text-base md:mt-3 md:text-lg",
              )}
            >
              {step.label}
            </p>
          </div>

          {step.description && variant === "detailed" && (
            <p className="mt-3 max-w-[24ch] text-[15px] leading-6 text-white/50">{step.description}</p>
          )}

          {/* Conector entre pasos */}
          {i < steps.length - 1 && (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute right-0 top-1/2 hidden h-5 w-5 -translate-y-1/2 translate-x-1/2 items-center justify-center bg-background text-white/25 md:flex"
            >
              →
            </span>
          )}
        </Reveal>
      ))}
    </div>
  )
}
