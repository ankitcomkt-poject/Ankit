import { cn } from "@/lib/utils"

interface SectionKickerProps {
  index: string
  /** Opcional: el cierre del home (CTASection) ya no lleva palabra
   * después del número — el cliente pidió quitarla puntualmente ahí.
   * El resto de secciones sigue pasando su label normalmente. */
  label?: string
  className?: string
  tone?: "default" | "inverted"
}

/**
 * Etiqueta numerada que abre cada sección del home ("02 · El problema real").
 * Es el ancla principal de la jerarquía visual: al repetirse de forma
 * idéntica en cada sección, convierte la página en un índice navegable
 * de un vistazo — refuerza la identidad de "sistema", no de sitio de
 * agencia genérica.
 */
export function SectionKicker({
  index,
  label,
  className,
  tone = "default",
}: SectionKickerProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span
        className={cn(
          "font-mono text-[12px] tracking-[0.2em]",
          tone === "inverted" ? "text-brand-red" : "text-accent",
        )}
      >
        {index}
      </span>
      {label && (
        <>
          <span
            className={cn(
              "h-px w-8",
              tone === "inverted" ? "bg-black/20" : "bg-white/15",
            )}
          />
          <span
            className={cn(
              "font-mono text-[12px] uppercase tracking-[0.28em]",
              tone === "inverted" ? "text-black/55" : "text-white/45",
            )}
          >
            {label}
          </span>
        </>
      )}
    </div>
  )
}
