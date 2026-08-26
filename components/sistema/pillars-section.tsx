import { Container } from "@/components/design-system/layout/container"
import { Section } from "@/components/design-system/layout/section"
import { SectionKicker } from "@/components/design-system/typography/section-kicker"
import { Reveal } from "@/components/design-system/motion/reveal"
import { TitleReveal } from "@/components/design-system/motion/title-reveal"

interface Pillar {
  index: string
  title: string
  slug: string
  mechanism: string
  callout: string
  calloutLabel: string
}

// slug por pilar para poder enlazar directo desde afuera (Soluciones
// enlaza a "el mecanismo completo" de cada pilar en vez de repetirlo).
const pillars: Pillar[] = [
  {
    index: "01",
    title: "Posicionamiento",
    slug: "posicionamiento",
    mechanism:
      "No se inventa un diferencial en una sesión creativa. Se identifican los factores que realmente pesan en la decisión de un paciente — confianza, experiencia percibida, resultado esperado, tecnología, especialización, financiación, ubicación — y se cruzan con lo que la clínica puede demostrar de verdad y con lo que ya dice la competencia. El posicionamiento sale de esa intersección. El resultado: una propuesta de valor en una frase, mensajes por segmento de paciente, y las pruebas que los sostienen.",
    calloutLabel: "El error que se evita",
    callout:
      "\"Somos una clínica integral, profesional y con tecnología de punta\" no diferencia a nadie si todas dicen lo mismo.",
  },
  {
    index: "02",
    title: "Captación",
    slug: "captacion",
    mechanism:
      "El canal se elige por dónde existe demanda real y por la economía del tratamiento — no por el canal que ya se sabe ejecutar. Se descartan a propósito los canales donde no se puede justificar una oportunidad comercial.",
    calloutLabel: "El criterio de escalamiento",
    callout:
      "Un CPL de $10 puede ser peor que uno de $30, si el segundo trae pacientes que compran tratamientos de mayor valor. El presupuesto escala cuando los datos lo sostienen, no cuando el costo por lead se ve bien.",
  },
  {
    index: "03",
    title: "Conversión",
    slug: "conversion",
    mechanism:
      "Lead → contacto → calificación → resolución de objeciones → agendamiento → confirmación → asistencia → consulta → tratamiento. Cada tramo se diseña, se instala y se mide: guiones por tipo de objeción, tiempos de respuesta, cadencia de seguimiento, criterios para insistir o descartar.",
    calloutLabel: "El diferenciador",
    callout:
      "Muchas agencias consideran que su trabajo termina cuando llega el lead. En los sistemas que hemos construido, buena parte de la fuga suele aparecer justo después — y ahí es donde más se nota si alguien está midiendo o solo generando leads.",
  },
  {
    index: "04",
    title: "Retención",
    slug: "retencion",
    mechanism:
      "La experiencia clínica es lo que más determina si un paciente vuelve o refiere a alguien más — y eso lo controla la clínica, no Ankit. El trabajo de Ankit aquí es distinto: asegurar que esa buena experiencia se traduzca en más retorno y más referidos, en lugar de perderse por falta de seguimiento.",
    calloutLabel: "El límite, dicho con claridad",
    callout: "La automatización sostiene la relación. No la reemplaza, y no pretende reemplazarla.",
  },
  {
    index: "05",
    title: "Automatización",
    slug: "automatizacion",
    mechanism:
      "Conversación inicial, calificación, agendamiento, seguimiento y gestión del contexto de cada conversación — todo lo repetitivo se automatiza para que ningún lead desaparezca. Lo que no se automatiza: la atención clínica, las conversaciones que requieren criterio médico, y cualquier situación sensible o excepcional. Ahí el sistema deriva a una persona.",
    calloutLabel: "La frase que lo resume",
    callout:
      "La automatización no reemplaza al equipo. Le devuelve el tiempo que estaba perdiendo en tareas repetitivas.",
  },
]

export function PillarsSection() {
  return (
    <Section id="pilares" className="border-t border-white/10 py-20 md:py-28 xl:py-32">
      <Container>
        <SectionKicker index="03" label="Los cinco pilares" />

        <TitleReveal className="mt-7">
          <h2 className="text-[clamp(2.5rem,4.8vw,3.75rem)] font-bold leading-[1.05] tracking-[-0.025em] text-white">
            No son cinco servicios.
            <br />
            Son cinco piezas del <span className="text-brand-red">mismo sistema</span>.
          </h2>
        </TitleReveal>

        <div className="mt-14 border-t border-white/10">
          {pillars.map((pillar, i) => (
            <div key={pillar.index} id={`pilar-${pillar.slug}`} className="scroll-mt-28">
            <Reveal delay={i * 60} className="border-b border-white/10 py-10 md:py-12">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-10">
                <div className="lg:col-span-4">
                  <span className="font-mono text-[12px] text-accent">{pillar.index}</span>
                  <p className="mt-2 text-2xl font-bold tracking-tight text-white md:text-3xl">{pillar.title}</p>
                </div>

                <div className="lg:col-span-8">
                  <p className="max-w-[64ch] text-base leading-7 text-white/65 md:text-lg">{pillar.mechanism}</p>

                  <div className="mt-6 border-l-2 border-brand-red/40 pl-5">
                    <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/40">
                      {pillar.calloutLabel}
                    </p>
                    <p className="mt-2 max-w-[58ch] text-[15px] leading-6 text-white/80">{pillar.callout}</p>
                  </div>
                </div>
              </div>
            </Reveal>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
