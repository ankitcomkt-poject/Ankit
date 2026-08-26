"use client"

import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { OriginButton } from "@/components/design-system/buttons/origin-button"
import { GlassSurface } from "@/components/design-system/surfaces/glass-surface"
import { Logo } from "./logo"

// Ver el mismo comentario en desktop-nav.tsx: `placeholder?` se deja
// tipado aunque ningún item lo use hoy, para que quede disponible sin
// reinventar el campo si una futura página se anuncia antes de existir.
const navigation: { label: string; href: string; placeholder?: boolean }[] = [
  { label: "Sistema", href: "/sistema" },
  { label: "Soluciones", href: "/soluciones" },
  { label: "Resultados", href: "/resultados" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Blog", href: "/blog" },
]

export function MobileMenu() {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (!open) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }

    document.addEventListener("keydown", onKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("keydown", onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [open])

  const panel = open && (
    <div className="fixed inset-0 z-[100] flex flex-col bg-background backdrop-blur-xl">
      {/* bg-background es 100% opaco a propósito: el blur es un extra
          puramente decorativo, nunca la única defensa de legibilidad.
          El panel se monta con un portal directo a <body> — anidado
          dentro del header (que ya es "position: fixed") algunos
          motores de render resuelven mal su "containing block" y el
          overlay queda encogido/mal posicionado, dejando pasar el
          contenido de atrás. Como panel de body, ese problema
          desaparece por diseño. */}
      <div className="flex items-center justify-between border-b border-white/10 px-6 py-6">
        <Logo onClick={() => setOpen(false)} />
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Cerrar menú"
          className="flex h-9 w-9 items-center justify-center border border-white/15 font-mono text-lg text-white/70"
        >
          ×
        </button>
      </div>

      <nav className="flex flex-1 flex-col justify-center gap-2 px-6">
        {navigation.map((item, i) => {
          const isRoute = item.href.startsWith("/")
          const isActive = isRoute && pathname === item.href
          const className = `border-b border-white/10 py-4 font-display font-bold text-lg uppercase tracking-[0.1em] transition-colors hover:text-accent ${
            item.placeholder ? "text-white/35" : isActive ? "text-accent" : "text-white/80"
          }`

          if (isRoute) {
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={isActive ? "true" : undefined}
                className={className}
                style={{ transitionDelay: `${i * 30}ms` }}
              >
                {item.label}
              </Link>
            )
          }

          return (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setOpen(false)}
              aria-disabled={item.placeholder || undefined}
              className={className}
              style={{ transitionDelay: `${i * 30}ms` }}
            >
              {item.label}
            </a>
          )
        })}
      </nav>

      <div className="border-t border-white/10 px-6 py-6">
        <OriginButton href="/diagnostico" size="lg" className="w-full" onClick={() => setOpen(false)}>
          Solicitar diagnóstico
        </OriginButton>
      </div>
    </div>
  )

  return (
    <div className="lg:hidden">
      {/* Botón hamburguesa en GlassSurface: es chrome de navegación, no
          un CTA de contenido, así que usa el mismo lenguaje "dark
          liquid glass" que la cápsula de desktop en vez de OriginButton. */}
      <GlassSurface className="h-9 w-9 p-0">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          aria-label="Abrir menú"
          className="flex h-full w-full flex-col items-center justify-center gap-[5px]"
        >
          <span className="h-px w-4 bg-white" />
          <span className="h-px w-4 bg-white" />
        </button>
      </GlassSurface>

      {mounted && panel ? createPortal(panel, document.body) : null}
    </div>
  )
}
