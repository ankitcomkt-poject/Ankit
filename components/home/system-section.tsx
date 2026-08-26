import Link from "next/link"
import { Container } from "@/components/design-system/layout/container"
import { Section } from "@/components/design-system/layout/section"
import { SectionKicker } from "@/components/design-system/typography/section-kicker"
import { Reveal } from "@/components/design-system/motion/reveal"
import { TitleReveal } from "@/components/design-system/motion/title-reveal"
import { PillarCard, type Pillar } from "@/components/design-system/cards/pillar-card"

const pillars: Pillar[] = [
  { index: "01", title: "Posicionamiento", subtitle: "Por qué te escogen" },
  { index: "02", title: "Captación", subtitle: "Cómo llegan" },
  { index: "03", title: "Conversión", subtitle: "A clientes" },
  { index: "04", title: "Retención", subtitle: "Cómo vuelven" },
  { index: "05", title: "Automatización", subtitle: "Menos trabajo manual" },
]

export function SystemSection() {
  return (
    <Section id="sistema" stack className="border-t border-white/10 py-16 md:py-24 xl:py-28">
      <Container>
        <SectionKicker index="05" label="Lo que construimos" />

        <TitleReveal className="mt-7">
          <h2 className="text-[clamp(2.75rem,5.4vw,4.25rem)] font-bold leading-[1.02] tracking-[-0.025em] text-white">
            No vendemos campañas.
            <br />
            Construimos sistemas.
          </h2>
        </TitleReveal>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {pillars.map((pillar, i) => (
            <PillarCard key={pillar.index} pillar={pillar} delay={i * 70} />
          ))}
        </div>

        <Reveal delay={350} className="mt-8">
          <Link
            href="/sistema"
            className="group inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.16em] text-white/70 transition-colors hover:text-accent"
          >
            <span className="underline decoration-white/25 underline-offset-4 group-hover:decoration-accent">
              Conoce el sistema completo
            </span>
            <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </Reveal>
      </Container>
    </Section>
  )
}
