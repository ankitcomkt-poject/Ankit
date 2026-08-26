import { Container } from "@/components/design-system/layout/container"
import { ParallaxSection } from "@/components/design-system/motion/parallax-section"
import { SectionKicker } from "@/components/design-system/typography/section-kicker"
import { Reveal } from "@/components/design-system/motion/reveal"
import { TitleReveal } from "@/components/design-system/motion/title-reveal"

interface Learning {
  index: string
  title: string
  text: string
}

/**
 * Esta sección existe a propósito para no depender de más casos: son
 * principios de criterio, no cifras de cliente, así que se sostienen
 * solas aunque el catálogo de casos siga siendo corto por ahora.
 * Las tres están ancladas en lo que de verdad pasó en el Caso 01 — no
 * son afirmaciones genéricas de agencia.
 */
const learnings: Learning[] = [
  {
    index: "01",
    title: "El orden importa más que la velocidad.",
    text: "No se lanza tráfico pagado antes de tener a dónde llevarlo. Primero la casa, después la fiesta.",
  },
  {
    index: "02",
    title: "La automatización se gana, no se asume.",
    text: "No llega el día uno. Llega cuando el volumen ya supera lo que una persona puede atender bien — antes de eso, es resolver un problema que todavía no existe.",
  },
  {
    index: "03",
    title: "El cliente reinvierte cuando ve el retorno, no antes.",
    text: "Ninguna proyección inicial convence tanto como ver la inversión recuperada con datos propios.",
  },
]

export function LearningsSection() {
  return (
    <ParallaxSection className="border-t border-white/10 py-20 md:py-28 xl:py-32">
      <Container>
        <SectionKicker index="04" label="Aprendizajes" />

        <TitleReveal className="mt-7">
          <h2 className="text-[clamp(2.5rem,4.8vw,3.75rem)] font-bold leading-[1.05] tracking-[-0.025em] text-white">
            Lo que aprendimos <span className="text-brand-red">construyendo esto</span>.
          </h2>
        </TitleReveal>

        <div className="mt-14 grid grid-cols-1 gap-10 border-t border-white/10 pt-10 md:grid-cols-3">
          {learnings.map((learning, i) => (
            <Reveal key={learning.index} delay={i * 80}>
              <span className="font-mono text-[12px] text-accent">{learning.index}</span>
              <p className="mt-3 text-lg font-bold leading-snug tracking-tight text-white md:text-xl">
                {learning.title}
              </p>
              <p className="mt-3 max-w-[36ch] text-[15px] leading-6 text-white/60">{learning.text}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </ParallaxSection>
  )
}
