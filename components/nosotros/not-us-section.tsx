import { Container } from "@/components/design-system/layout/container"
import { ParallaxSection } from "@/components/design-system/motion/parallax-section"
import { SectionKicker } from "@/components/design-system/typography/section-kicker"
import { Reveal } from "@/components/design-system/motion/reveal"
import { TitleReveal } from "@/components/design-system/motion/title-reveal"

interface Point {
  claim: string
  reason: string
}

const points: Point[] = [
  {
    claim: "No somos una fábrica de anuncios.",
    reason: "No creemos que aumentar campañas sea una estrategia.",
  },
  {
    claim: "No automatizamos por moda.",
    reason: "La tecnología debe resolver una fricción real.",
  },
  {
    claim: "No prometemos lo que no controlamos.",
    reason: "El crecimiento tiene variables que dependen de ambas partes.",
  },
  {
    claim: "No trabajamos con cualquier negocio.",
    reason: "Si la economía, la oferta o la operación no permiten construir un sistema viable, lo decimos.",
  },
]

/**
 * La sección más distintiva de la página — decir que no en voz alta
 * es justo lo que la mayoría de agencias evita. No se toca el texto
 * original del cliente, ya venía bien resuelto.
 */
export function NotUsSection() {
  return (
    <ParallaxSection className="border-t border-white/10 py-20 md:py-28 xl:py-32">
      <Container>
        <SectionKicker index="06" label="Lo que no somos" />

        <TitleReveal className="mt-7">
          <h2 className="text-[clamp(2.5rem,4.8vw,3.75rem)] font-bold leading-[1.05] tracking-[-0.025em] text-white">
            También sabemos cuándo decir <span className="text-brand-red">que no</span>.
          </h2>
        </TitleReveal>

        <div className="mt-12 grid grid-cols-1 gap-8 border-t border-white/10 pt-10 sm:grid-cols-2">
          {points.map((point, i) => (
            <Reveal key={point.claim} delay={i * 70} className="border-l-2 border-brand-red/40 pl-6">
              <p className="text-lg font-bold leading-snug text-white md:text-xl">{point.claim}</p>
              <p className="mt-2 max-w-[40ch] text-[15px] leading-6 text-white/60">{point.reason}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={300} className="mt-12 border-t border-white/10 pt-8">
          <p className="max-w-[54ch] font-mono text-sm leading-6 text-white/45">
            Esto transmite algo que las agencias suelen intentar esconder: criterio.
          </p>
        </Reveal>
      </Container>
    </ParallaxSection>
  )
}
