import { Container } from "@/components/design-system/layout/container"
import { Section } from "@/components/design-system/layout/section"
import { SectionKicker } from "@/components/design-system/typography/section-kicker"
import { Eyebrow } from "@/components/design-system/typography/eyebrow"
import { Reveal } from "@/components/design-system/motion/reveal"
import { TitleReveal } from "@/components/design-system/motion/title-reveal"
import { FragmentedSystem } from "./problem/fragmented-system"

/**
 * Capítulo 2 de la narrativa, no una página nueva: mismo panel técnico
 * con header/footer que el Hero, misma tipografía mono para labels,
 * mismo rojo usado solo como señal. El titular tiene dos niveles reales
 * (no solo dos tamaños parecidos): la primera línea queda deliberadamente
 * chica y apagada, la segunda salta a ~70% del tamaño máximo del Hero
 * para que el peso visual sea inconfundible, no sutil.
 */
export function ProblemSection() {
  return (
    <Section id="problema" stack className="border-t border-white/10">
      <Container>
        <SectionKicker index="02" label="El problema" />

        <div className="mt-10 grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-8">
          {/* Izquierda — narrativa (~5 cols) */}
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow accent>Marketing fragmentado</Eyebrow>
            </Reveal>

            <TitleReveal delay={60} className="mt-5">
              <h2 className="leading-[1.05] tracking-[-0.015em]">
                <span className="block text-[clamp(1.4rem,2.3vw,1.75rem)] font-medium text-white/50">
                  No necesitas hacer más.
                </span>
                <span className="mt-1 block text-[clamp(2.75rem,5.4vw,4.25rem)] font-bold text-white">
                  Necesitas <span className="text-brand-red">conectar</span> mejor.
                </span>
              </h2>
            </TitleReveal>

            <Reveal delay={160}>
              <p className="mt-7 max-w-[46ch] text-lg leading-8 text-white/60">
                Publicidad, contenido, ventas, automatización e inteligencia artificial pueden generar
                actividad sin generar un sistema. Cuando cada pieza funciona por separado, el crecimiento
                depende de esfuerzos constantes, decisiones aisladas y{" "}
                <span className="font-medium text-white/90">procesos difíciles de escalar</span>.
              </p>
            </Reveal>

            <Reveal delay={120} className="mt-10 hidden lg:block">
              <p className="max-w-[32ch] text-right font-mono text-sm leading-6 text-white/40">
                Más herramientas no solucionan un <span className="text-accent">sistema desconectado</span>.
              </p>
            </Reveal>
          </div>

          {/* Derecha — el sistema desordenado (~7 cols) */}
          <Reveal delay={100} className="lg:col-span-7">
            <FragmentedSystem />
          </Reveal>
        </div>

        {/* Frase de cierre — en mobile va después del diagrama, no flotando a la derecha */}
        <Reveal delay={120} className="mt-10 lg:hidden">
          <p className="text-right font-mono text-sm leading-6 text-white/40">
            Más herramientas no solucionan un <span className="text-accent">sistema desconectado</span>.
          </p>
        </Reveal>
      </Container>
    </Section>
  )
}
