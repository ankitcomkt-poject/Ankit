import { Container } from "@/components/design-system/layout/container"
import { Section } from "@/components/design-system/layout/section"
import { SectionKicker } from "@/components/design-system/typography/section-kicker"
import { Reveal } from "@/components/design-system/motion/reveal"

/**
 * A propósito NO es otra columna label-izquierda/contenido-derecha —
 * esa forma ya la usan FAQ, Hero y Problema. Esta es la sección
 * "respiro" del recorrido (baja densidad, ver principio de ritmo del
 * Hero): una sola columna centrada, más angosta, con padding vertical
 * reducido — se siente como una nota al margen, no como un capítulo
 * más del mismo tamaño que los demás.
 */
export function SpecializationSection() {
  return (
    <Section className="border-t border-white/10 py-16 md:py-20 xl:py-24">
      <Container>
        <div className="mx-auto flex max-w-[760px] flex-col items-center text-center">
          <SectionKicker index="07" label="Especialización" />

          <Reveal delay={80} className="mt-7 inline-flex items-center gap-2 border border-white/15 px-3 py-1.5">
            <span className="h-1.5 w-1.5 bg-accent" />
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/60">
              Implantología &amp; estética oral
            </span>
          </Reveal>

          <Reveal delay={140} className="mt-7">
            <p className="text-[clamp(2rem,3.6vw,2.75rem)] font-medium leading-[1.25] text-white">
              Actualmente estamos aplicando esta metodología en clínicas odontológicas de implantología y
              estética oral.
            </p>
            <p className="mx-auto mt-6 max-w-[46ch] text-base leading-7 text-white/55 md:text-lg">
              Nuestro objetivo es adaptar sistemas de crecimiento probados internacionalmente a la realidad
              del mercado latinoamericano.
            </p>
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}
