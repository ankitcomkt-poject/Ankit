import type React from "react"
import { cn } from "@/lib/utils"

interface PrimaryButtonProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  variant?: "solid" | "outline" | "outline-inverted"
  size?: "sm" | "md" | "lg"
  className?: string
  type?: "button" | "submit"
  /** Para enlaces externos (ej. wa.me) que deben abrir en pestaña nueva. */
  target?: string
  rel?: string
}

const sizeClasses: Record<NonNullable<PrimaryButtonProps["size"]>, string> = {
  sm: "h-11 px-5 text-[11px]",
  md: "h-12 px-7 text-[12px]",
  lg: "h-16 px-9 text-[13px]",
}

const variantClasses: Record<NonNullable<PrimaryButtonProps["variant"]>, string> = {
  solid:
    "border border-brand-red bg-brand-red text-brand-cream hover:bg-transparent hover:text-brand-red",
  outline:
    "border border-white/20 text-white/80 hover:border-white hover:text-white",
  "outline-inverted":
    "border border-black/25 text-black/80 hover:border-black hover:bg-black hover:text-brand-cream",
}

/**
 * CTA única para todo el sitio (header, hero, cierre). Antes había
 * markup repetido y ligeramente distinto en cada lugar; esto asegura
 * que el botón de mayor jerarquía de acción se vea y se comporte
 * exactamente igual en cualquier parte del home.
 */
export function PrimaryButton({
  children,
  href,
  onClick,
  variant = "solid",
  size = "md",
  className,
  type = "button",
  target,
  rel,
}: PrimaryButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 font-mono font-medium uppercase tracking-[0.18em] transition-all duration-200",
    sizeClasses[size],
    variantClasses[variant],
    className,
  )

  if (href) {
    return (
      <a href={href} onClick={onClick} className={classes} target={target} rel={rel}>
        {children}
      </a>
    )
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  )
}
