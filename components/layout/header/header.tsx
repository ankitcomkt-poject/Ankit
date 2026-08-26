"use client"

import { Container } from "@/components/design-system/layout/container"
import { OriginButton } from "@/components/design-system/buttons/origin-button"
import { GlassSurface } from "@/components/design-system/surfaces/glass-surface"
import { Logo } from "./logo"
import { DesktopNav } from "./desktop-nav"
import { MobileMenu } from "./mobile-menu"

/**
 * Header "burbuja": única excepción a los bordes rectos del resto del
 * sitio (Container, Section, cards, el panel del Hero — todo ahí es
 * sin radius, a propósito, por sistema). Se contiene aquí porque el
 * cliente lo pidió explícitamente para el header ("efecto burbuja muy
 * sobrio y elegante"); no se propaga a ningún otro componente salvo el
 * sistema de botones (ver nota de OriginButton).
 *
 * La cápsula de navegación ahora es `GlassSurface` en vez de estilos de
 * vidrio hechos a mano — mismo look, pero con el seguimiento de cursor
 * "dark liquid glass" que pidió el cliente para el chrome de
 * navegación (brief #3). Diagnóstico usa `OriginButton`, el sistema de
 * botones de contenido (brief #4). Antes, al sacar ANKIT y Diagnóstico
 * de la cápsula, este botón volvía a esquinas rectas porque ya no
 * estaba anidado en un contenedor redondeado. Esa excepción ya no
 * aplica: el cliente pidió explícitamente geometría de cápsula para
 * todo el sistema de botones (border-radius: 9999px, repetido en su
 * brief), así que Diagnóstico vuelve a ser redondeado — ahora por
 * sistema, no por anidamiento.
 */
export function Header() {
  return (
    <header
      id="site-header"
      style={{ opacity: "var(--header-opacity, 1)" }}
      className="fixed inset-x-0 top-4 z-50 px-4 md:top-6"
    >
      {/* `id`+CSS var: en el home, components/home/intro-reveal.tsx
          controla esta opacity por scroll (oculto durante el "ANKIT"
          grande, aparece gradual al entrar al Hero) y agrega la clase
          `header-hidden` a <html> para sacarlo del tab order mientras
          está invisible (ver la regla en globals.css). El fallback
          `, 1` en el var() es lo que mantiene el header SIEMPRE visible
          en cualquier otra página — ninguna de ellas define esa
          variable, así que nunca se ve afectado el comportamiento
          normal fuera del home. */}
      <Container className="flex items-center justify-between px-0 xl:px-0">
        <Logo />

        {/* hidden hasta lg: por debajo de ese breakpoint DesktopNav no
            renderiza nada (su propio <nav> es "hidden lg:flex"), así
            que la cápsula tiene que ocultarse con él — si no, queda
            flotando vacía en mobile/tablet. */}
        <GlassSurface className="hidden px-2.5 py-2.5 lg:flex md:py-3">
          <DesktopNav />
        </GlassSurface>

        <div className="flex items-center gap-3">
          <OriginButton href="/diagnostico" size="md" variant="primary" className="hidden sm:inline-flex">
            Diagnóstico
          </OriginButton>
          <MobileMenu />
        </div>
      </Container>
    </header>
  )
}
