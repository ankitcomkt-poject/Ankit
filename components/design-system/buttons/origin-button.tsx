"use client"

import type React from "react"
import { useRef, useState } from "react"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface OriginButtonProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  variant?: "primary" | "secondary"
  size?: "sm" | "md" | "lg"
  icon?: boolean
  className?: string
  type?: "button" | "submit"
  target?: string
  rel?: string
  disabled?: boolean
}

const sizeClasses: Record<NonNullable<OriginButtonProps["size"]>, string> = {
  sm: "h-11 px-5 text-[11px]",
  md: "h-12 px-7 text-[12px]",
  lg: "h-16 px-9 text-[13px]",
}

/**
 * Segunda versión — la primera no reproducía el efecto real. El cliente
 * mandó un video de referencia ("Origin Button" / "Flow Button" lado a
 * lado) y el comportamiento es mucho más específico de lo que el texto
 * del brief dejaba ver: no es una transición de color de fondo, es un
 * "liquid wipe" — un círculo que crece desde el punto exacto del cursor
 * (clip-path, no solo opacidad), y el texto cambia de color justo donde
 * pasa el borde del círculo, no de golpe. Por eso hay dos copias del
 * contenido superpuestas: una capa base siempre visible, y una capa de
 * "relleno" recortada con clip-path que revela su propio texto (de
 * color opuesto) solo en el área ya cubierta por el círculo.
 *
 * `primary` reproduce el patrón de "Origin Button" del video: reposo
 * oscuro (cápsula ligeramente más clara que el fondo, texto blanco),
 * hover = el círculo blanco crece desde el cursor y voltea el texto a
 * negro a su paso. Al sacar el cursor, el círculo se encoge de vuelta
 * hacia el mismo punto por donde salió (no se resetea al centro).
 *
 * `secondary` reproduce "Flow Button": reposo transparente con solo
 * borde, un resplandor suave seguía al cursor en hover (mismo lenguaje
 * de "luz" que `GlassSurface`, aquí en blanco/gris en vez del radial
 * rojo tenue), y al presionar (`:active`, mientras el botón del mouse
 * está abajo) se llena de negro sólido — un "flash" más rápido, no el
 * wipe completo de `primary`.
 */
export function OriginButton({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  icon = true,
  className,
  type = "button",
  target,
  rel,
  disabled,
}: OriginButtonProps) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null)
  const [hovered, setHovered] = useState(false)
  const [pos, setPos] = useState({ x: "50%", y: "50%" })

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    setPos({
      x: `${((e.clientX - rect.left) / rect.width) * 100}%`,
      y: `${((e.clientY - rect.top) / rect.height) * 100}%`,
    })
  }

  const sharedHandlers = {
    onMouseMove: handleMove,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
  }

  const wipeStyle: React.CSSProperties =
    variant === "primary"
      ? { clipPath: `circle(${hovered ? "150%" : "0%"} at ${pos.x} ${pos.y})` }
      : { ["--mx" as string]: pos.x, ["--my" as string]: pos.y }

  const classes = cn(
    "group relative isolate inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full font-mono font-medium uppercase tracking-[0.16em]",
    "transition-transform duration-300 ease-out hover:-translate-y-px",
    "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-40",
    sizeClasses[size],
    variant === "primary"
      ? "border border-white/[0.14] bg-white/[0.06] text-white"
      : "border border-white/20 bg-transparent text-white/70 transition-colors duration-200 hover:border-white/40 hover:text-white active:border-black active:bg-black active:text-white",
    className,
  )

  // Microacento rojo: mismo lenguaje en las dos capas (base + relleno)
  // para que no "desaparezca" a mitad del wipe.
  const accent = (dark: boolean) => (
    <span
      aria-hidden="true"
      className={cn(
        "h-[5px] w-[5px] shrink-0 rounded-full transition-colors duration-300",
        dark ? "bg-brand-red" : variant === "primary" ? "bg-brand-red/50" : "bg-brand-red/0 group-hover:bg-brand-red/60",
      )}
    />
  )

  const label = (dark: boolean) => (
    <>
      {children}
      {icon && (
        <ArrowRight
          aria-hidden="true"
          className={cn(
            "h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5",
          )}
        />
      )}
      {accent(dark)}
    </>
  )

  const overlay =
    variant === "primary" ? (
      // Capa de relleno: círculo blanco que crece desde el cursor
      // (clip-path, no opacidad) con su propia copia del contenido en
      // negro — así el texto solo "voltea" en el área ya cubierta.
      <span
        aria-hidden="true"
        style={wipeStyle}
        className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center gap-2.5 bg-white text-black transition-[clip-path] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
      >
        {label(true)}
      </span>
    ) : (
      // Resplandor que sigue al cursor — solo una insinuación, nunca un
      // relleno; el relleno real de `secondary` lo hace `:active`.
      <span
        aria-hidden="true"
        style={wipeStyle}
        className="pointer-events-none absolute inset-0 z-10 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      >
        <span
          className="absolute h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.08] blur-xl"
          style={{ left: "var(--mx)", top: "var(--my)" }}
        />
      </span>
    )

  const content = (
    <>
      <span className="relative z-0 flex items-center justify-center gap-2.5">{label(false)}</span>
      {overlay}
    </>
  )

  if (href) {
    return (
      <a href={href} onClick={onClick} className={classes} target={target} rel={rel} ref={ref} {...sharedHandlers}>
        {content}
      </a>
    )
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes} ref={ref} {...sharedHandlers}>
      {content}
    </button>
  )
}
