import Link from "next/link"
import { PageWrapper } from "@/components/layout/page-wrapper"
import { Container } from "@/components/design-system/layout/container"
import { Section } from "@/components/design-system/layout/section"
import { OriginButton } from "@/components/design-system/buttons/origin-button"

/**
 * Hallazgo de la auditoría: sin este archivo, Next.js sirve su 404 por
 * defecto — página en blanco, texto en inglés, sin header ni footer,
 * ninguna forma de volver al sitio. Con todo el resto del sitio ya
 * pulido, ese era el punto de quiebre visible más probable (un enlace
 * viejo, un typo en la URL) y el más descuidado. Usa PageWrapper para
 * que el visitante conserve el header (con el logo que ya vuelve a "/")
 * y el footer completo, no una pantalla muerta.
 */
export default function NotFound() {
  return (
    <PageWrapper>
      <Section className="flex min-h-[70vh] items-center pt-36 md:pt-44">
        <Container>
          <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-accent">Error 404</p>
          <h1 className="mt-6 max-w-[22ch] text-[clamp(2.5rem,5.4vw,4.25rem)] font-bold leading-[1.05] tracking-[-0.025em] text-white">
            Esta página no existe.
          </h1>
          <p className="mt-6 max-w-[52ch] text-lg leading-8 text-white/60">
            Puede que el enlace esté roto o que la dirección tenga un error. Volvamos a algo que sí existe.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <OriginButton href="/" size="lg" variant="primary">
              Volver al inicio
            </OriginButton>
            <Link
              href="/diagnostico"
              className="font-mono text-[12px] uppercase tracking-[0.16em] text-white/60 underline decoration-white/25 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
            >
              Agenda un diagnóstico
            </Link>
          </div>
        </Container>
      </Section>
    </PageWrapper>
  )
}
