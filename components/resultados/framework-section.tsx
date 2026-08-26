import { Container } from "@/components/design-system/layout/container"
import { Section } from "@/components/design-system/layout/section"
import { SectionKicker } from "@/components/design-system/typography/section-kicker"
import { Reveal } from "@/components/design-system/motion/reveal"

const axes = [
  {
    label: "Negocio",
    text: "Ingresos, pacientes, decisiones que cambian de verdad — no impresiones ni alcance.",
  },
  {
    label: "Sistema",
    text: "Lo que queda funcionando después de que Ankit se va. No una campaña que termina, una estructura que sigue.",
  },
  {
    label: "Datos",
    text: "Lo que permite decidir el siguiente paso sin adivinar.",
  },
]

/**
 * Mismo principio de ritmo que "El marco" en /sistema: sección corta,
 * una idea central, el respiro antes de la sección densa de casos.
 * El triple Negocio/Sistema/Datos sostiene el titular sin necesitar
 * ningún dato de cliente — es lenguaje de posicionamiento, no data.
 */
export function ResultadosFrameworkSection() {
  return (
    <Section stack className="border-t border-white/10 py-16 md:py-20 xl:py-24">
      <Container>
        <SectionKicker index="02" label="Resultado ≠ número" />

        <Reveal className="mt-8">
          <p className="max-w-[42ch] text-[clamp(2.25rem,4.6vw,3.75rem)] font-bold leading-[1.12] tracking-[-0.025em] text-white md:max-w-[46ch]">
            Un resultado no vive en una sola cifra. Vive en{" "}
            <span className="text-brand-red">tres lugares a la vez</span>.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-8 border-t border-white/10 pt-10 sm:grid-cols-3">
          {axes.map((axis, i) => (
            <Reveal key={axis.label} delay={i * 80}>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">{axis.label}</span>
              <p className="mt-3 max-w-[32ch] text-[15px] leading-6 text-white/65">{axis.text}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}
