import { Container } from "@/components/design-system/layout/container"
import { Section } from "@/components/design-system/layout/section"
import { SectionKicker } from "@/components/design-system/typography/section-kicker"
import { Reveal } from "@/components/design-system/motion/reveal"
import { TitleReveal } from "@/components/design-system/motion/title-reveal"

/**
 * Revisado: el cliente decidió que su identidad SÍ esté presente
 * (antes había pedido explícitamente lo contrario — equipo sin
 * nombre ni bio). Se nombra directamente, pero sigue sin ser una
 * biografía: sin historia personal, sin credenciales, solo nombre,
 * rol, y la misma afirmación de que es un equipo, no una sola
 * persona operando todo.
 */
export function TeamSection() {
  return (
    <Section className="border-t border-white/10 py-20 md:py-28 xl:py-32">
      <Container>
        <SectionKicker index="04" label="El equipo" />

        <TitleReveal className="mt-7">
          <h2 className="max-w-[24ch] text-[clamp(2.5rem,4.8vw,3.75rem)] font-bold leading-[1.05] tracking-[-0.025em] text-white">
            Detrás del sistema hay un equipo — liderado por <span className="text-brand-red">Jose</span>.
          </h2>
        </TitleReveal>

        <Reveal delay={100} className="mt-8">
          <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-accent">
            Jose — Fundador / Director Estratégico
          </p>
          <p className="mt-4 max-w-[58ch] text-base leading-7 text-white/65 md:text-lg">
            Jose dirige la estrategia, el diseño de sistemas y la implementación de cada proyecto en Ankit — y
            suma especialistas y colaboradores según lo que cada implementación requiera.
          </p>
        </Reveal>
      </Container>
    </Section>
  )
}
