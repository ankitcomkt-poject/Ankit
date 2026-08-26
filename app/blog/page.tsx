import type { Metadata } from "next"
import Link from "next/link"
import { PageWrapper } from "@/components/layout/page-wrapper"
import { Container } from "@/components/design-system/layout/container"
import { Section } from "@/components/design-system/layout/section"
import { OriginButton } from "@/components/design-system/buttons/origin-button"

export const metadata: Metadata = {
  title: "Blog — Ankit",
  description: "El blog de Ankit está en construcción. Mientras tanto, escríbenos directamente o agenda un diagnóstico.",
}

/**
 * Mismo patrón estructural que not-found.tsx (Section con min-h-[70vh]
 * + items-center, kicker + h1 + cuerpo + CTAs): ambas son páginas de
 * "un solo mensaje, sin scroll", así que reusan el mismo armazón en vez
 * de inventar uno nuevo para esta. Por la misma razón, el h1 acá NO
 * lleva `Reveal` — el contenido ya está dentro del viewport al cargar
 * (no hay nada que "aparecer al bajar"), igual que en not-found.tsx y
 * terminos/page.tsx. El efecto de aparición al hacer scroll es para
 * títulos de sección más abajo en una página larga, no para esto.
 *
 * Nada de contenido de blog inventado (ni un post de relleno, ni una
 * fecha de "próximamente" que nadie confirmó): mismo criterio que ya
 * se aplicó en terminos/page.tsx con el texto legal — un placeholder
 * honesto, no una promesa sin fecha real detrás.
 *
 * El nav (header y footer) ya apunta acá con link activo — dejar de
 * ser `placeholder: true` fue parte de este mismo cambio, no algo
 * separado. Si esta página se elimina o se reemplaza, revisar
 * components/layout/header/desktop-nav.tsx, mobile-menu.tsx y
 * footer.tsx — los tres referencian "/blog" directamente.
 */
export default function BlogPage() {
  return (
    <PageWrapper>
      <Section className="flex min-h-[70vh] items-center pt-36 md:pt-44">
        <Container>
          <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-accent">Blog</p>
          <h1 className="mt-6 max-w-[22ch] text-[clamp(2.5rem,5.4vw,4.25rem)] font-bold leading-[1.05] tracking-[-0.025em] text-white">
            Estamos construyendo esta página.
          </h1>
          <p className="mt-6 max-w-[52ch] text-lg leading-8 text-white/60">
            Todavía no hay artículos publicados. Si tienes una pregunta puntual mientras tanto, escríbenos
            directamente — o agenda un diagnóstico y hablamos de tu negocio.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <OriginButton href="/diagnostico" size="lg" variant="primary">
              Agenda un diagnóstico
            </OriginButton>
            <Link
              href="/"
              className="font-mono text-[12px] uppercase tracking-[0.16em] text-white/60 underline decoration-white/25 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
            >
              Volver al inicio
            </Link>
          </div>
        </Container>
      </Section>
    </PageWrapper>
  )
}
