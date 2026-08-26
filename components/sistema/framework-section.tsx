import { Container } from "@/components/design-system/layout/container"
import { Section } from "@/components/design-system/layout/section"
import { SectionKicker } from "@/components/design-system/typography/section-kicker"
import { Reveal } from "@/components/design-system/motion/reveal"

/**
 * Sección corta a propósito — el "respiro" entre el Hero y las dos
 * secciones densas que siguen (Pilares, Proceso), mismo principio de
 * ritmo que ya se usó en Especialización dentro del home. Una sola
 * cita grande, nada más.
 */
export function FrameworkSection() {
  return (
    <Section stack className="border-t border-white/10 py-16 md:py-20 xl:py-24">
      <Container>
        <SectionKicker index="02" label="El marco" />

        <Reveal className="mt-8">
          <p className="max-w-[42ch] text-[clamp(2.25rem,4.6vw,3.75rem)] font-bold leading-[1.12] tracking-[-0.025em] text-white md:max-w-[46ch]">
            Diagnóstico dice qué está pasando. Diseño determina qué se va a construir.{" "}
            <span className="text-brand-red">Implementación construye lo diseñado.</span> Optimización determina
            qué cambiar después de verlo funcionar.
          </p>
        </Reveal>

        <Reveal delay={100} className="mt-7">
          <p className="max-w-[64ch] font-mono text-sm leading-6 text-white/45 md:text-[15px]">
            No le llamamos "estrategia" a las cuatro por igual — cada etapa tiene un trabajo distinto, y esa
            separación es la que hace que el sistema se pueda construir en orden.
          </p>
        </Reveal>
      </Container>
    </Section>
  )
}
