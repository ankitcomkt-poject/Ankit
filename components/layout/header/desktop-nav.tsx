"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

// "Diagnóstico" no entra a este arreglo — vive fuera de la cápsula
// como botón de acción (ver header.tsx), no como página de navegación
// entre pares. isActive para /diagnostico se resuelve aparte, en el
// propio botón del header, comparando el pathname igual que las demás
// rutas.
// `placeholder?` se deja tipado aunque hoy ningún item lo use (Blog ya
// es una ruta real): el mecanismo de "link visible pero desactivado,
// con tooltip Próximamente" queda disponible para la próxima página
// que se anuncie antes de tener contenido, sin tener que reinventar el
// campo. Sin esta anotación, TypeScript infiere el tipo del array
// literal actual (sin `placeholder`) y las referencias a
// `item.placeholder` más abajo dejan de compilar.
const navigation: { label: string; href: string; placeholder?: boolean }[] = [
  { label: "Sistema", href: "/sistema" },
  { label: "Soluciones", href: "/soluciones" },
  { label: "Resultados", href: "/resultados" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Blog", href: "/blog" },
]

/**
 * Orden reordenado a pedido del cliente para que siga la misma lógica
 * narrativa que él definió para las páginas (Sistema explica → Soluciones
 * aplica → Resultados demuestra → Nosotros cierra confianza justo antes
 * del botón de Diagnóstico). El orden anterior (Blog primero, Resultados
 * antes que Soluciones) no respetaba esa secuencia. Blog queda último:
 * sigue siendo la página con menos contenido (una sola pantalla de
 * "en construcción", ver app/blog/page.tsx) y la menos relevante para
 * alguien decidiendo si contactar a Ankit por primera vez — no tiene
 * sentido que sea lo primero que se lee en el nav. Ya no lleva
 * `placeholder: true` ni href="#": /blog es una página real (honesta
 * sobre no tener artículos todavía, no una promesa rota), así que el
 * link funciona igual que los demás — mismo trato que se le dio a
 * Términos y a la 404, no un estado especial "casi listo".
 *
 * "Recursos" se quitó del todo (no solo se dejó atenuado): a diferencia
 * de Blog, que sí es una página confirmada a futuro, Recursos no tenía
 * contenido real ni una razón para existir aparte de Blog — mantenerlo
 * como placeholder habría prometido una página que no está planeada.
 * Con esta lista además se pierde el acceso directo a Proceso y
 * Preguntas desde el header, aunque las secciones siguen existiendo en
 * la página — vale la pena confirmar si eso es a propósito o conviene
 * que vivan en el footer.
 *
 * Sistema, Resultados, Soluciones y Nosotros ya son páginas reales. El
 * home conserva secciones-vitrina (id="sistema", id="resultados") con
 * su propio enlace "ver todo" hacia la página completa, pero el nav ya
 * no depende de esos anchors. trackedAnchors queda vacío por ahora — se
 * conserva el mecanismo de scroll-spy por si un futuro ítem del nav
 * vuelve a ser un ancla de una sola página.
 */

// Solo los anchors de una sola página (href="#algo") entran al
// scroll-spy — las rutas reales (href="/algo") se resuelven aparte,
// comparando el pathname.
const trackedAnchors = navigation
  .filter((item) => !item.placeholder && item.href.startsWith("#"))
  .map((item) => item.href.replace("#", ""))

export function DesktopNav() {
  // Referencia visual: el usuario pidió que la opción activa se vea
  // "mantenida", como el ícono relleno del tab bar de referencia. Sin
  // íconos, el equivalente sobrio es una cápsula de fondo detrás del
  // texto de la sección que está en pantalla — no un cambio de color a
  // rojo (el rojo se reserva para el CTA/acento, no para navegación).
  const [activeAnchor, setActiveAnchor] = useState<string | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    if (trackedAnchors.length === 0) return

    const elements = trackedAnchors
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting)
        if (visible.length === 0) return

        // Si varias secciones se solapan brevemente durante el scroll,
        // toma la más cercana al centro de la franja de detección para
        // evitar que el estado activo parpadee entre dos ítems.
        const closest = visible.reduce((a, b) =>
          Math.abs(a.boundingClientRect.top) < Math.abs(b.boundingClientRect.top) ? a : b
        )
        setActiveAnchor(closest.target.id)
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
    // Se re-observa al cambiar de página: en /sistema estos ids no
    // existen (el observer simplemente no encuentra elementos), y si
    // se vuelve al home deben volver a observarse desde cero.
  }, [pathname])

  return (
    <nav className="hidden items-center gap-1.5 xl:gap-2 lg:flex">
      {navigation.map((item) => {
        const isRoute = item.href.startsWith("/")
        const isActive = !item.placeholder && (
          isRoute ? pathname === item.href : activeAnchor === item.href.replace("#", "")
        )

        const className = `
          rounded-full
          px-4
          py-2
          font-display
          font-bold
          text-[11px]
          xl:text-[12px]
          uppercase
          tracking-[0.16em]
          xl:tracking-[0.18em]
          transition-colors
          duration-300
          ${
            item.placeholder
              ? "text-white/35 hover:text-white/60"
              : isActive
                ? "bg-white/10 text-white"
                : "text-white/70 hover:text-white"
          }
        `

        if (isRoute) {
          return (
            <Link key={item.label} href={item.href} aria-current={isActive ? "true" : undefined} className={className}>
              {item.label}
            </Link>
          )
        }

        return (
          <a
            key={item.label}
            href={item.href}
            aria-disabled={item.placeholder || undefined}
            aria-current={isActive ? "true" : undefined}
            title={item.placeholder ? "Próximamente" : undefined}
            className={className}
          >
            {item.label}
          </a>
        )
      })}
    </nav>
  )
}
