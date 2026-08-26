"use client"

import { useRef } from "react"
import { cn } from "@/lib/utils"

interface GlassSurfaceProps {
  children: React.ReactNode
  className?: string
}

/**
 * Tercera versión. Las dos anteriores eran demasiado sutiles — "sé
 * sutil" del brief original se interpretó como "casi invisible", y el
 * cliente no veía ningún cambio real en la barra de navegación. Mandó
 * un video de referencia (pastillas "Small / Generate / Submit") que
 * aclara el objetivo: no es solo un fondo translúcido con una lucecita
 * que sigue al cursor, es un vidrio con un brillo AMBIENTE permanente —
 * como si la luz le pegara desde arriba — visible sin necesidad de
 * hover. Esa es la señal de "vidrio" que faltaba.
 *
 * Tres capas, de atrás hacia adelante:
 * 1. Fondo más opaco (antes bg-black/45, ahora /70) — ya no se lava
 *    contra el fondo de la página.
 * 2. Brillo superior permanente (gradiente blanco muy tenue de arriba
 *    hacia el centro) + bisel de dos bordes (highlight interno arriba,
 *    sombra interna abajo) — el "liquid glass" del video, siempre
 *    visible, no condicionado a hover.
 * 3. La luz que sigue al cursor (ya existía) se mantiene como acento
 *    adicional en hover, no como el único indicio de que esto es
 *    vidrio.
 *
 * El seguimiento del cursor solo actualiza variables CSS (--mx/--my),
 * nunca dispara un re-render de React — mismo principio de performance
 * que pidió el cliente para el sistema Glass.
 */
export function GlassSurface({ children, className }: GlassSurfaceProps) {
  const ref = useRef<HTMLDivElement>(null)

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty("--mx", `${((e.clientX - rect.left) / rect.width) * 100}%`)
    el.style.setProperty("--my", `${((e.clientY - rect.top) / rect.height) * 100}%`)
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      className={cn(
        "group relative isolate overflow-hidden rounded-full border border-white/[0.14] bg-black/70 backdrop-blur-xl",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.16),inset_0_-1px_0_rgba(0,0,0,0.65),0_25px_60px_-20px_rgba(0,0,0,0.9)]",
        className,
      )}
      style={{ ["--mx" as string]: "50%", ["--my" as string]: "50%" }}
    >
      {/* Brillo superior permanente — la señal de "vidrio" que antes
          dependía solo del cursor y por eso no se notaba. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-b from-white/[0.10] via-white/[0.02] to-transparent"
      />
      {/* Highlight interno — segunda capa de borde, da sensación de espesor */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-[1px] rounded-full border border-white/[0.07]"
      />
      {/* Luz que sigue al cursor — acento adicional en hover, con un toque de rojo Ankit */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,0.12), rgba(198,40,40,0.08) 35%, transparent 55%)",
        }}
      />
      <span className="relative z-10 flex h-full w-full items-center">{children}</span>
    </div>
  )
}
