import { Container } from "@/components/design-system/layout/container"
import { ParallaxSection } from "@/components/design-system/motion/parallax-section"
import { SectionKicker } from "@/components/design-system/typography/section-kicker"
import { Reveal } from "@/components/design-system/motion/reveal"
import { TitleReveal } from "@/components/design-system/motion/title-reveal"

interface Belief {
  index: string
  title: string
  text: string
}

/**
 * Solo 3, no 4 — la cuarta creencia del borrador original
 * ("Transparencia sobre control") decía exactamente lo mismo que
 * "No prometemos lo que no controlamos" en Lo que no somos. Repetir
 * la misma idea en positivo y en negativo en la misma página no suma
 * una creencia más, resta precisión a las otras tres.
 */
const beliefs: Belief[] = [
  {
    index: "01",
    title: "Evidencia antes que opinión",
    text: "Las decisiones deben poder contrastarse con datos y comportamiento real.",
  },
  {
    index: "02",
    title: "Sistema antes que herramienta",
    text: "Una herramienta no resuelve un problema que todavía no entendemos.",
  },
  {
    index: "03",
    title: "Automatización con criterio",
    text: "Automatizamos lo repetitivo. Mantenemos humano aquello que requiere juicio, contexto o confianza.",
  },
]

export function BeliefsSection() {
  return (
    <ParallaxSection className="border-t border-white/10 py-20 md:py-28 xl:py-32">
      <Container>
        <SectionKicker index="03" label="Qué creemos" />

        <TitleReveal className="mt-7">
          <h2 className="text-[clamp(2.5rem,4.8vw,3.75rem)] font-bold leading-[1.05] tracking-[-0.025em] text-white">
            No son diez valores <span className="text-brand-red">corporativos</span>. Son tres.
          </h2>
        </TitleReveal>

        <div className="mt-14 grid grid-cols-1 gap-10 border-t border-white/10 pt-10 md:grid-cols-3">
          {beliefs.map((belief, i) => (
            <Reveal key={belief.index} delay={i * 80}>
              <span className="font-mono text-[12px] text-accent">{belief.index}</span>
              <p className="mt-3 text-lg font-bold leading-snug tracking-tight text-white md:text-xl">
                {belief.title}
              </p>
              <p className="mt-3 max-w-[34ch] text-[15px] leading-6 text-white/60">{belief.text}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </ParallaxSection>
  )
}
