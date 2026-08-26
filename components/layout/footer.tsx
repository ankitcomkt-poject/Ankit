import Link from "next/link"
import { Container } from "@/components/design-system/layout/container"
import { Reveal } from "@/components/design-system/motion/reveal"
import { Logo } from "@/components/layout/header/logo"

/**
 * Antes de este componente, el sitio no tenía footer real: el único
 * candidato (`components/colophon-section.tsx`) nunca se importaba en
 * ninguna página — era boilerplate muerto de la plantilla original,
 * con marca ("Signal Studio"), tipografías (Bebas Neue/Inter/Geist
 * Mono) y contacto (hello@signal.studio) que no son de Ankit.
 *
 * Estructura: tres columnas reales (Marca / Navegación / Contacto),
 * no "créditos técnicos" (Design/Stack/Typography) — esas categorías
 * tenían sentido como flex de portafolio, no en el sitio de un
 * cliente real. Navegación solo lista páginas que existen: Blog ya
 * entra a esta lista (antes se dejaba fuera, igual que se dejó fuera
 * "Recursos" del header, por no tener una página real detrás) — ahora
 * que /blog existe como página "en construcción" honesta, aplica el
 * mismo criterio y sí se lista.
 *
 * Animación con `Reveal` (el sistema del resto del sitio) en vez del
 * GSAP+ScrollTrigger que traía colophon-section.tsx — no había
 * justificación para que el footer fuera la única sección con su
 * propio motor de animación aparte.
 */

const NAV_LINKS = [
  { label: "Sistema", href: "/sistema" },
  { label: "Soluciones", href: "/soluciones" },
  { label: "Resultados", href: "/resultados" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Diagnóstico", href: "/diagnostico" },
  { label: "Blog", href: "/blog" },
]

const CONTACT_LINKS = [
  {
    label: "WhatsApp",
    href: "https://wa.me/573227201989?text=" + encodeURIComponent("Hola, vengo del sitio de Ankit."),
    external: true,
  },
  { label: "Email", href: "mailto:ankitcomkt@gmail.com", external: false },
  { label: "Instagram", href: "https://www.instagram.com/joselondonoco/", external: true },
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61577447855031", external: true },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/jose-manuel-londoño-ledesma-4670b5385/",
    external: true,
  },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-white/10 bg-background py-16 md:py-20">
      <Container>
        <Reveal>
          {/*
            Mobile: Navegación y Contacto se veían como dos listas
            verticales larguísimas, una debajo de la otra — con 6 y 5
            links respectivamente, eso es fácil que sea más scroll que
            el resto del footer junto. Quedan lado a lado en dos
            columnas (grid-cols-2) en vez de apiladas; marca+descripción
            arriba, ocupando el ancho completo (col-span-2), porque es
            un párrafo de lectura, no una lista — no gana nada
            angostándolo a la mitad. Desde `md` se vuelve al layout de
            siempre (3 columnas asimétricas, marca/nav/contacto lado a
            lado) — eso ya se veía bien y no se tocó.
          */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-[1.2fr_1fr_1fr] md:gap-12">
            <div className="col-span-2 md:col-span-1">
              <Logo />
              <p className="mt-5 max-w-[36ch] text-sm leading-6 text-white/50">
                Sistemas de crecimiento para clínicas de implantología y estética oral en Latinoamérica.
              </p>
            </div>

            <div>
              <h3 className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/40">Navegación</h3>
              <ul className="mt-5 space-y-3">
                {NAV_LINKS.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-white/70 transition-colors duration-200 hover:text-accent"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/40">Contacto</h3>
              <ul className="mt-5 space-y-3">
                {CONTACT_LINKS.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noopener noreferrer" : undefined}
                      className="text-sm text-white/70 transition-colors duration-200 hover:text-accent"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-white/40">
            © {year} Ankit. Todos los derechos reservados.
          </p>
          <Link
            href="/terminos"
            className="font-mono text-[11px] uppercase tracking-[0.15em] text-white/40 transition-colors duration-200 hover:text-accent"
          >
            Términos y condiciones
          </Link>
        </div>
      </Container>
    </footer>
  )
}
