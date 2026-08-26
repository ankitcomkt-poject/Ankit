import { Container } from "@/components/design-system/layout/container"
import { ParallaxSection } from "@/components/design-system/motion/parallax-section"
import { SectionKicker } from "@/components/design-system/typography/section-kicker"
import { FlowSteps, type FlowStep } from "@/components/design-system/layout/flow-steps"
import { Reveal } from "@/components/design-system/motion/reveal"

const steps: FlowStep[] = [
  { index: "01", label: "Oferta" },
  { index: "02", label: "Posicionamiento" },
  { index: "03", label: "Proceso comercial" },
  { index: "04", label: "Automatización" },
  { index: "05", label: "Publicidad" },
  { index: "06", label: "Optimización" },
]

export function MindsetSection() {
  return (
    <ParallaxSection className="border-t border-white/10">
      <Container>
        <SectionKicker index="03" label="El enfoque cambia el resultado" />

        {/* Antes eran dos cajas espejadas 50/50 — dos afirmaciones con el
            mismo peso visual no comunican "una es el camino, la otra no".
            Ahora la de Ankit domina el espacio (7/12 vs 5/12) y crece en
            tamaño tipográfico; la de "la mayoría" además queda más chica
            y más apagada, reforzando con la propia composición cuál es
            la respuesta. */}
        <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-12 lg:items-stretch lg:gap-4">
          <Reveal className="flex flex-col justify-center border border-white/10 bg-white/[0.015] p-8 lg:col-span-5 md:p-10">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-white/40">La mayoría</p>
            <p className="mt-4 text-xl font-medium leading-snug text-white/45 line-through decoration-white/25 md:text-2xl">
              Optimiza campañas
            </p>
          </Reveal>

          <Reveal
            delay={100}
            className="flex flex-col justify-center border border-brand-red/50 bg-brand-red/[0.06] p-8 lg:col-span-7 md:p-12"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-accent">Ankit</p>
            <p className="mt-4 text-3xl font-bold leading-snug text-white md:text-4xl">
              Optimiza negocios
            </p>
          </Reveal>
        </div>

        <Reveal delay={180} className="mt-16">
          <p className="mb-5 font-mono text-[12px] uppercase tracking-[0.2em] text-white/40">
            El orden en el que trabajamos
          </p>
          <FlowSteps steps={steps} variant="compact" />
        </Reveal>
      </Container>
    </ParallaxSection>
  )
}
