import { Container } from "@/components/design-system/layout/container"
import { Section } from "@/components/design-system/layout/section"
import { SectionKicker } from "@/components/design-system/typography/section-kicker"
import { Reveal } from "@/components/design-system/motion/reveal"
import { TitleReveal } from "@/components/design-system/motion/title-reveal"
import { ArchitectureDiagram } from "./architecture-diagram"

interface Stage {
  index: string
  title: string
  description: string
  checkpoint: string
}

const stages: Stage[] = [
  {
    index: "01",
    title: "Diagnóstico",
    description:
      "Antes de tocar campañas o automatizaciones, se evalúa si el proyecto tiene sentido: economía del cliente, demanda real, capacidad operativa, la oferta, la disposición a operar distinto, y si hay datos suficientes para medir. Si el negocio no pasa este filtro, no se toma.",
    checkpoint: "Esto es lo que encontramos.",
  },
  {
    index: "02",
    title: "Diseño",
    description:
      "Se decide qué piezas necesita el negocio y en qué orden — no la automatización primero porque es lo que se vende, sino lo que la siguiente pieza necesita para tener sentido.",
    checkpoint: "Esto es lo que vamos a construir y por qué.",
  },
  {
    index: "03",
    title: "Implementación",
    description:
      "No se enciende tráfico antes de tener listo el recorrido completo del lead — sería absurdo generar cien leads sin saber todavía qué les pasa cuando llegan. Primero se construye el sistema completo y se prueba a fondo: conversaciones, agendamiento, seguimiento, derivación a humano, casos límite. Recién entonces se lanza, sin prisa por escalar.",
    checkpoint: "Esto ya está construido y probado.",
  },
  {
    index: "04",
    title: "Optimización",
    description:
      "Datos → análisis → hipótesis → cambio → nuevos datos. El monitoreo operativo es continuo, el rendimiento se revisa cada semana, y las decisiones estratégicas se toman cada mes — con presupuestos o volumen bajos, una sola semana de datos nunca alcanza para cambiar de rumbo.",
    checkpoint: "Esto dicen los datos y esto proponemos cambiar.",
  },
]

/**
 * El diagrama de arquitectura vive dentro de la etapa 02 (Diseño) — es
 * literalmente lo que se decide ahí. A propósito solo hay UN diagrama
 * en toda la sección: la etapa 03 describe en texto el orden de
 * construcción (que deja "Campañas" al final), sin un segundo diagrama
 * que compita visualmente con el de arriba — evita que dos diagramas
 * parecidos-pero-no-iguales lean como una contradicción.
 */
export function SistemaProcessSection() {
  return (
    <Section id="proceso" className="border-t border-white/10 py-20 md:py-28 xl:py-32">
      <Container>
        <SectionKicker index="04" label="Cómo se construye" />

        <TitleReveal className="mt-7">
          <h2 className="text-[clamp(2.75rem,5.4vw,4.5rem)] font-bold leading-[1.05] tracking-[-0.025em] text-white">
            Cuatro etapas. Cuatro checkpoints.
            <br />
            <span className="text-brand-red">Cero reuniones</span> por cada mensaje de WhatsApp.
          </h2>
        </TitleReveal>

        <div className="mt-14">
          {stages.map((stage, i) => (
            <Reveal key={stage.index} delay={i * 60} className="border-t border-white/10 py-10 md:py-12">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
                <div className="lg:col-span-3">
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                    Etapa {stage.index}
                  </span>
                  <p className="mt-2 text-2xl font-bold tracking-tight text-white md:text-[28px]">{stage.title}</p>
                </div>

                <div className="lg:col-span-9">
                  <p className="max-w-[64ch] text-base leading-7 text-white/65 md:text-lg">{stage.description}</p>

                  {stage.index === "02" && (
                    <div className="mt-8">
                      <ArchitectureDiagram />
                    </div>
                  )}

                  <div className="mt-7 inline-flex flex-col border border-white/10 bg-black/20 px-5 py-4">
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-brand-red">
                      Checkpoint {stage.index}
                    </span>
                    <span className="mt-2 max-w-[46ch] text-[15px] italic leading-6 text-white/85">
                      "{stage.checkpoint}"
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={80} className="mt-14 overflow-hidden border border-white/10 bg-black/20">
          <div className="flex h-14 items-center gap-3 border-b border-white/10 px-5">
            <span className="h-1.5 w-1.5 animate-pulse bg-accent" aria-hidden="true" />
            <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-accent">
              Por qué solo cuatro checkpoints
            </span>
          </div>
          <div className="px-6 py-7 md:px-8 md:py-8">
            <p className="max-w-[70ch] text-[15px] leading-7 text-white/65 md:text-base">
              Cuatro checkpoints formales evitan los dos extremos malos: tener al cliente encima de cada tarea
              pequeña, o desaparecer semanas y volver solo con un reporte. El cliente aprueba decisiones
              estratégicas en los checkpoints; Ankit ejecuta la arquitectura acordada sin pedir permiso para
              cada mensaje de WhatsApp, cada automatización o cada anuncio.
            </p>
            <p className="mt-5 max-w-[70ch] font-mono text-sm leading-6 text-white">
              Cliente valida dirección → Ankit construye → datos validan → Ankit optimiza → cliente recibe
              visibilidad.
            </p>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
