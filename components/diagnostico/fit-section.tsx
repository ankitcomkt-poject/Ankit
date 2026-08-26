import { Container } from "@/components/design-system/layout/container"
import { Section } from "@/components/design-system/layout/section"
import { SectionKicker } from "@/components/design-system/typography/section-kicker"
import { Reveal } from "@/components/design-system/motion/reveal"
import { TitleReveal } from "@/components/design-system/motion/title-reveal"

/**
 * El bloque estratégicamente más importante de la página: deja que el
 * visitante se autoevalúe antes de escribir, en vez de un formulario
 * genérico que filtra después (o nunca). Los criterios no son nuevos
 * — son los mismos que ya vive la Etapa 01 (Diagnóstico) en
 * /sistema#proceso ("economía del cliente, demanda real, capacidad
 * operativa... disposición a operar distinto... datos suficientes
 * para medir"), aplicados aquí en segunda persona. Es la prueba de
 * que "no trabajamos con cualquier negocio" (Nosotros) es real y no
 * solo una frase — alguien puede leer esto y decidir que no aplica.
 */
const fits = [
  "Ya tienes algo de demanda o tráfico, pero se pierde en el camino antes de convertirse en cliente.",
  "Tu operación puede sostener más pacientes o clientes si el crecimiento realmente llega.",
  "Estás dispuesto a cambiar cómo opera tu negocio, no solo a subir el presupuesto de anuncios.",
  "Puedes compartir datos básicos de tu negocio para que el diagnóstico sea real, no una suposición.",
]

const notFits = [
  "Todavía no tienes historial de clientes ni datos que evaluar.",
  "Buscas resultados inmediatos sin cambiar nada del proceso actual.",
  "No hay presupuesto para construir un sistema, solo para \"probar algo\".",
]

export function FitSection() {
  return (
    <Section stack className="border-t border-white/10 py-20 md:py-28 xl:py-32">
      <Container>
        <SectionKicker index="02" label="¿Es esto para ti?" />

        <TitleReveal className="mt-7">
          <h2 className="max-w-[26ch] text-[clamp(2.5rem,4.8vw,3.75rem)] font-bold leading-[1.05] tracking-[-0.025em] text-white">
            Preferimos que lo sepas <span className="text-brand-red">antes</span> de escribirnos.
          </h2>
        </TitleReveal>

        <div className="mt-14 grid grid-cols-1 gap-10 border-t border-white/10 pt-10 md:grid-cols-2">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-accent">Tiene sentido si</p>
            <ul className="mt-5 space-y-4">
              {fits.map((item) => (
                <li key={item} className="flex gap-3 text-[15px] leading-6 text-white/75">
                  <span className="mt-1 text-accent" aria-hidden="true">＋</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={80}>
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-white/40">
              Probablemente no es el momento si
            </p>
            <ul className="mt-5 space-y-4">
              {notFits.map((item) => (
                <li key={item} className="flex gap-3 text-[15px] leading-6 text-white/50">
                  <span className="mt-1 text-white/30" aria-hidden="true">−</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}
