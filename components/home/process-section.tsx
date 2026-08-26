import { Container } from "@/components/design-system/layout/container"
import { Section } from "@/components/design-system/layout/section"
import { SectionKicker } from "@/components/design-system/typography/section-kicker"
import { FlowSteps, type FlowStep } from "@/components/design-system/layout/flow-steps"
import { TitleReveal } from "@/components/design-system/motion/title-reveal"

const steps: FlowStep[] = [
  {
    index: "01",
    label: "Diagnóstico",
    description: "Entendemos tu negocio, tu proceso comercial y tus datos reales.",
  },
  {
    index: "02",
    label: "Diseño",
    description: "Definimos el sistema: oferta, posicionamiento y proceso comercial.",
  },
  {
    index: "03",
    label: "Implementación",
    description: "Construimos la automatización, la captación y el seguimiento.",
  },
  {
    index: "04",
    label: "Optimización",
    description: "Ajustamos con datos reales hasta hacer el crecimiento predecible.",
  },
]

export function ProcessSection() {
  return (
    <Section id="proceso" stack className="border-t border-white/10 py-24 md:py-32 xl:py-36">
      <Container>
        <SectionKicker index="08" label="Proceso" />

        <TitleReveal className="mt-7">
          <h2 className="text-[clamp(2.75rem,5vw,3.9rem)] font-bold leading-[1.04] tracking-[-0.025em] text-white">
            Cuatro etapas,
            <br />
            un solo sistema.
          </h2>
        </TitleReveal>

        <div className="mt-10">
          <FlowSteps steps={steps} variant="detailed" />
        </div>
      </Container>
    </Section>
  )
}
