import { Container } from "@/components/design-system/layout/container"
import { Section } from "@/components/design-system/layout/section"
import { SectionKicker } from "@/components/design-system/typography/section-kicker"
import { Reveal } from "@/components/design-system/motion/reveal"
import { TitleReveal } from "@/components/design-system/motion/title-reveal"

interface Stage {
  index: string
  title: string
  text: string
}

/**
 * Mismas 4 etiquetas que el proceso de /sistema, a propósito — pero el
 * contenido de cada una NO repite qué se construye (eso ya lo explica
 * Sistema): describe la experiencia del cliente en ese momento — con
 * quién habla, qué decide él, qué decide Ankit, cada cuánto hay
 * contacto. Esa es la diferencia real entre "qué construimos" y "cómo
 * es trabajar con nosotros", no solo una versión más corta del mismo
 * texto.
 */
const stages: Stage[] = [
  {
    index: "01",
    title: "Diagnóstico",
    text: "Antes de proponer nada, entendemos tu negocio y encontramos dónde se están perdiendo oportunidades. Esta conversación no tiene costo ni compromiso — es donde decidimos, juntos, si hay algo real que construir.",
  },
  {
    index: "02",
    title: "Diseño",
    text: "Te mostramos exactamente qué se va a construir y en qué orden, antes de tocar una sola pieza. Es un checkpoint que tú apruebas, no una reunión de actualización.",
  },
  {
    index: "03",
    title: "Implementación",
    text: "Construimos sin pedirte que estés encima de cada tarea. No hay reportes por cada mensaje de WhatsApp — hay checkpoints en los momentos que importan.",
  },
  {
    index: "04",
    title: "Optimización",
    text: "Los datos que genera el sistema son tuyos, siempre visibles. Te mostramos qué está funcionando y qué proponemos cambiar — la decisión de seguir ese camino es tuya.",
  },
]

export function HowWeWorkSection() {
  return (
    <Section stack className="border-t border-white/10 py-20 md:py-28 xl:py-32">
      <Container>
        <SectionKicker index="05" label="Cómo trabajamos contigo" />

        <TitleReveal className="mt-7">
          <h2 className="text-[clamp(2.5rem,4.8vw,3.75rem)] font-bold leading-[1.05] tracking-[-0.025em] text-white">
            Sistema explica <span className="text-brand-red">qué construimos</span>. Esto es cómo se siente
            trabajar con nosotros.
          </h2>
        </TitleReveal>

        <div className="mt-14 border-t border-white/10">
          {stages.map((stage, i) => (
            <Reveal key={stage.index} delay={i * 60} className="border-b border-white/10 py-8 md:py-10">
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-10">
                <div className="lg:col-span-3">
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                    Etapa {stage.index}
                  </span>
                  <p className="mt-2 text-xl font-bold tracking-tight text-white md:text-2xl">{stage.title}</p>
                </div>
                <div className="lg:col-span-9">
                  <p className="max-w-[64ch] text-base leading-7 text-white/65 md:text-lg">{stage.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}
