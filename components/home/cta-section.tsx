import type { ReactNode } from "react"
import { Container } from "@/components/design-system/layout/container"
import { SectionKicker } from "@/components/design-system/typography/section-kicker"
import { OriginButton } from "@/components/design-system/buttons/origin-button"
import { Reveal } from "@/components/design-system/motion/reveal"
import { TitleReveal } from "@/components/design-system/motion/title-reveal"
import { RotatingWord } from "@/components/design-system/motion/rotating-word"

// Las mismas etapas que ya usa el sistema en otras partes del sitio
// (Captación → Conversión → Seguimiento), más "crecimiento" — el
// mismo término que rota en el Hero — para que el cierre se sienta
// como el mismo sistema, no palabras nuevas inventadas para acá.
const closingFocus = ["captación", "conversión", "seguimiento", "crecimiento"]

interface CTASectionProps {
  /** Cada página numera sus propias secciones (el home llega a "10";
   * una página más corta como /sistema no debería heredar ese número
   * solo porque reutiliza este componente). */
  index?: string
  /** Nosotros necesitaba un cierre propio ("antes de hablar de
   * herramientas, campañas o presupuesto...") en vez del genérico de
   * las demás páginas — mejor parametrizar el componente compartido
   * que duplicar todo su markup por un cambio de copy. */
  heading?: ReactNode
  subheading?: ReactNode
}

export function CTASection({
  index = "10",
  heading = "La primera conversación no es para venderte.",
  subheading = (
    <>
      Es para entender si podemos ayudarte con tu <RotatingWord words={closingFocus} />.
    </>
  ),
}: CTASectionProps) {
  return (
    <section id="diagnostico" className="theme-cream relative overflow-hidden py-24 md:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, black 1px, transparent 1px), linear-gradient(to bottom, black 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <Container className="relative z-10">
        <div className="flex flex-col items-center text-center">
          <SectionKicker index={index} tone="inverted" />

          <TitleReveal delay={80} className="mt-8">
            <h2 className="max-w-[20ch] text-[clamp(2.25rem,5.4vw,4rem)] font-bold leading-[1.1] tracking-[-0.02em] text-black">
              {heading}
              <span className="block text-black/50">{subheading}</span>
            </h2>
          </TitleReveal>

          <Reveal delay={160} className="mt-10">
            <OriginButton href="/diagnostico" size="lg" variant="primary">
              Agenda un diagnóstico
            </OriginButton>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
