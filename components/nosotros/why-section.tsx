import { Container } from "@/components/design-system/layout/container"
import { Section } from "@/components/design-system/layout/section"
import { SectionKicker } from "@/components/design-system/typography/section-kicker"
import { Reveal } from "@/components/design-system/motion/reveal"
import { TitleReveal } from "@/components/design-system/motion/title-reveal"

const thesis = ["Más tráfico ≠ más clientes", "Más leads ≠ más ventas", "Más herramientas ≠ mejor sistema"]

/**
 * Cuenta la razón de ser, no la cronología — a propósito no hay fechas
 * ni historia personal aquí, según lo que definió el cliente.
 */
export function WhySection() {
  return (
    <Section stack className="border-t border-white/10 py-20 md:py-28 xl:py-32">
      <Container>
        <SectionKicker index="02" label="Por qué existe Ankit" />

        <TitleReveal className="mt-7">
          <h2 className="max-w-[24ch] text-[clamp(2.5rem,4.8vw,3.75rem)] font-bold leading-[1.05] tracking-[-0.025em] text-white">
            El problema no siempre es conseguir más clientes.
          </h2>
        </TitleReveal>

        <Reveal delay={80} className="mt-6">
          <p className="max-w-[60ch] text-base leading-7 text-white/65 md:text-lg">
            Muchas empresas invierten en publicidad, contenido o herramientas sin preguntarse qué ocurre
            después de que aparece una oportunidad.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-4 border-t border-white/10 pt-10 sm:grid-cols-3">
          {thesis.map((line, i) => (
            <Reveal key={line} delay={i * 70}>
              <p className="font-mono text-lg text-white/50 md:text-xl">{line}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={220} className="mt-10">
          <p className="max-w-[54ch] text-lg font-bold leading-8 text-white md:text-xl">
            El crecimiento empieza cuando las piezas dejan de funcionar de manera aislada y empiezan a trabajar
            como <span className="text-brand-red">un sistema</span>.
          </p>
        </Reveal>
      </Container>
    </Section>
  )
}
