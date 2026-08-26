import { Container } from "@/components/design-system/layout/container"
import { Section } from "@/components/design-system/layout/section"
import { SectionKicker } from "@/components/design-system/typography/section-kicker"
import { Reveal } from "@/components/design-system/motion/reveal"
import { TitleReveal } from "@/components/design-system/motion/title-reveal"

interface Moment {
  label: string
  text: string
}

/**
 * Los 5 momentos son el mismo framework que "07 Metodología de casos"
 * en la propuesta original del cliente — a propósito NO existe una
 * sección separada de "antes/después": ese contraste vive adentro de
 * Contexto (antes) y Datos (después). Contarlo dos veces con dos
 * estructuras distintas, con solo un caso documentado a este nivel,
 * se leería como estirar el mismo material — no como más contenido.
 */
const caso01Moments: Moment[] = [
  {
    label: "Contexto",
    text: "El negocio funcionaba, pero los ingresos venían cayendo desde hacía varios meses. Nunca había sentido la necesidad de entrar al medio digital — todo su crecimiento histórico venía del voz a voz.",
  },
  {
    label: "Diagnóstico",
    text: "Le mostramos evidencia concreta: su competencia directa se estaba llevando a sus clientes potenciales por redes, página y anuncios que este negocio simplemente no tenía.",
  },
  {
    label: "Decisión",
    text: "Construir la presencia digital completa antes que cualquier otra cosa. No tenía sentido pautar sin un lugar al que llevar ese tráfico.",
  },
  {
    label: "Implementación",
    text: "Identidad para redes sociales, página web y las campañas de anuncios. Cuando el presupuesto lo permitió, se sumaron agentes automatizados — la persona que atendía mensajes y clientes en el sitio al mismo tiempo ya no daba abasto con el volumen nuevo.",
  },
  {
    label: "Datos",
    text: "Los primeros cambios se vieron en la primera semana de activación. La inversión se recuperó en la segunda. A los 40 días, el cliente decidió por su cuenta aumentar el presupuesto — la señal más clara de que confiaba en lo que estaba viendo.",
  },
]

const caso01Stats = ["+225% en nuevos clientes", "6.616 conversaciones iniciadas", "$600 COP por conversación"]

export function CasesSection() {
  return (
    <Section className="border-t border-white/10 py-20 md:py-28 xl:py-32">
      <Container>
        <SectionKicker index="03" label="Los casos" />

        <TitleReveal className="mt-7">
          <h2 className="text-[clamp(2.5rem,4.8vw,3.75rem)] font-bold leading-[1.05] tracking-[-0.025em] text-white">
            Dos negocios, dos puntos de partida.
            <br />
            <span className="text-brand-red">El mismo criterio</span> aplicado.
          </h2>
        </TitleReveal>

        {/* Caso 01 — el único documentado con este nivel de detalle. Panel
            grande a propósito, mismo lenguaje visual que los paneles de
            nota (CTA, "Por qué solo cuatro checkpoints" en /sistema).
            El id/scroll-mt van en un div envolvente porque Reveal no
            reenvía props arbitrarios (como id) al elemento que renderiza. */}
        <div id="caso-1" className="mt-14 scroll-mt-28">
        <Reveal delay={100} className="overflow-hidden border border-white/10 bg-black/20">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-6 py-5 md:px-8">
            <div className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 animate-pulse bg-accent" aria-hidden="true" />
              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-accent">Caso 01</span>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">
              Nombre del cliente omitido por confidencialidad
            </span>
          </div>

          <div className="px-6 py-8 md:px-8 md:py-10">
            <p className="max-w-[46ch] text-2xl font-bold leading-snug tracking-tight text-white md:text-3xl">
              Cuando un negocio depende completamente del voz a voz.
            </p>

            <div className="mt-10 border-t border-white/10">
              {caso01Moments.map((moment, i) => (
                <div key={moment.label} className="grid grid-cols-1 gap-4 border-b border-white/10 py-8 lg:grid-cols-12 lg:gap-10">
                  <div className="lg:col-span-3">
                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/45">
                      {String(i + 1).padStart(2, "0")} · {moment.label}
                    </span>
                  </div>
                  <div className="lg:col-span-9">
                    <p className="max-w-[64ch] text-base leading-7 text-white/65 md:text-lg">{moment.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 border border-white/10 bg-black/25 p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-white/45">Resultados</p>
              <ul className="mt-4 space-y-2.5">
                {caso01Stats.map((stat) => (
                  <li key={stat} className="flex gap-2 text-[15px] leading-6 text-white/80">
                    <span className="text-accent">•</span>
                    <span>{stat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
        </div>

        {/* Caso 02 — contrapunto deliberadamente más corto: es todo lo
            que hay documentado hoy. Sin el framework de 5 momentos (no
            hay material real para llenarlo) y sin CTA de "leer más" —
            ya estamos en la página de resultados, no hace falta un
            enlace que no lleve a ningún lado nuevo. */}
        <div id="caso-2" className="mt-8 scroll-mt-28">
        <Reveal delay={160} className="border border-white/10 bg-white/[0.015] p-6 md:p-8">
          <span className="font-mono text-[11px] font-normal text-accent">Caso 02</span>
          <p className="mt-2 max-w-[46ch] text-xl font-medium leading-snug text-white md:text-2xl">
            Una organización perdió credibilidad frente a su mercado.
          </p>
          <p className="mt-4 max-w-[54ch] text-base leading-7 text-white/60">
            Antes de lanzar campañas, descubrimos que el verdadero problema no era la falta de anuncios, sino
            una identidad poco clara y una comunicación que no reflejaba el valor real de la marca.
          </p>

          <div className="mt-6 border border-white/10 bg-black/25 p-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-white/45">Resultados</p>
            <ul className="mt-4 space-y-2.5">
              {["Nueva identidad de marca", "Estrategia de contenido definida", "Sistema preparado para escalar"].map(
                (stat) => (
                  <li key={stat} className="flex gap-2 text-[15px] leading-6 text-white/80">
                    <span className="text-accent">•</span>
                    <span>{stat}</span>
                  </li>
                ),
              )}
            </ul>
          </div>
        </Reveal>
        </div>
      </Container>
    </Section>
  )
}
