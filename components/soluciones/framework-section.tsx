import { Container } from "@/components/design-system/layout/container"
import { Section } from "@/components/design-system/layout/section"
import { SectionKicker } from "@/components/design-system/typography/section-kicker"
import { Reveal } from "@/components/design-system/motion/reveal"

/**
 * Sección corta a propósito — mismo rol de "respiro" que cumplen
 * Framework/Marco en /sistema y /resultados. Aquí conecta
 * explícitamente con la Etapa 01 (Diagnóstico) que ya vive en
 * /sistema#proceso, en vez de repetir esa explicación: el punto es
 * que la elección de qué construir no la hace el cliente solo leyendo
 * esta página, la confirma el diagnóstico.
 */
export function SolucionesFrameworkSection() {
  return (
    <Section stack className="border-t border-white/10 py-16 md:py-20 xl:py-24">
      <Container>
        <SectionKicker index="02" label="Cómo se elige" />

        <Reveal className="mt-8">
          <p className="max-w-[42ch] text-[clamp(2.25rem,4.6vw,3.75rem)] font-bold leading-[1.12] tracking-[-0.025em] text-white md:max-w-[46ch]">
            Los bloques de abajo son puntos de partida,{" "}
            <span className="text-brand-red">no son un catálogo para escoger solo</span>.
          </p>
        </Reveal>

        <Reveal delay={100} className="mt-7">
          <p className="max-w-[64ch] font-mono text-sm leading-6 text-white/45 md:text-[15px]">
            Cuál aplica de verdad se confirma en el Diagnóstico — la primera etapa del proceso, donde se evalúa
            si el negocio tiene sentido antes de tocar nada. Esta página existe para que llegues a esa
            conversación ya sabiendo nombrar tu problema, no para que la reemplaces.
          </p>
        </Reveal>
      </Container>
    </Section>
  )
}
