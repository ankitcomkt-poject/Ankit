import { Container } from "@/components/design-system/layout/container"
import { ParallaxSection } from "@/components/design-system/motion/parallax-section"
import { SectionKicker } from "@/components/design-system/typography/section-kicker"
import { Reveal } from "@/components/design-system/motion/reveal"
import { TitleReveal } from "@/components/design-system/motion/title-reveal"

const limits = [
  "No prometemos pacientes en siete días.",
  "No competimos por precio.",
  "No trabajamos con negocios que buscan una solución rápida para un problema estructural.",
  "No medimos éxito por likes.",
  "No empezamos una campaña sin entender primero el negocio.",
  "No diseñamos un sistema sin acceso a datos reales del negocio.",
]

/**
 * El "beat de alto impacto" de este tramo de la página: después de
 * varias secciones seguidas con headlines del mismo rango de tamaño, este
 * titular rompe la escala a propósito (más grande que cualquier otro
 * H2 del home, incluyendo Sistema y Proceso) y la lista se extiende
 * a 3 columnas en pantallas grandes en vez de repetir el 2-col de
 * siempre — más padding vertical también, para que se sienta como
 * un golpe, no como un capítulo más del mismo tamaño.
 */
export function LimitsSection() {
  return (
    <ParallaxSection className="border-t border-white/10 py-24 md:py-32 xl:py-40">
      <Container>
        <SectionKicker index="06" label="Límites" />

        <TitleReveal className="mt-8">
          <h2 className="text-[clamp(2.75rem,6vw,4.75rem)] font-bold uppercase leading-[0.98] tracking-[-0.03em] text-white">
            Lo que no
            <br />
            hacemos
          </h2>
        </TitleReveal>

        <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-1 border-t border-white/10 sm:grid-cols-2 xl:grid-cols-3">
          {limits.map((limit, i) => (
            <Reveal
              key={limit}
              delay={i * 60}
              className="flex items-start gap-3 border-b border-white/10 py-6"
            >
              <span aria-hidden="true" className="mt-1 shrink-0 font-mono text-base text-brand-red">
                ✕
              </span>
              <span className="text-base leading-7 text-white/75">{limit}</span>
            </Reveal>
          ))}
        </div>
      </Container>
    </ParallaxSection>
  )
}
