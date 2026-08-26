import Link from "next/link"
import { Container } from "@/components/design-system/layout/container"
import { ParallaxSection } from "@/components/design-system/motion/parallax-section"
import { SectionKicker } from "@/components/design-system/typography/section-kicker"
import { Reveal } from "@/components/design-system/motion/reveal"
import { TitleReveal } from "@/components/design-system/motion/title-reveal"

interface Problem {
  index: string
  title: string
  pain: string
  activates: string
  mechanism: string
  href: string
}

/**
 * Solo 4 bloques, no 5: Posicionamiento y Retención se quedan sin
 * entrada propia aquí a propósito — nadie llega diciendo "tengo un
 * problema de posicionamiento", y Retención ya vive explicada del
 * todo en /sistema. "Convertir" y "Recuperar oportunidades" empiezan
 * como dos problemas separados en el borrador original y se fusionan
 * en uno solo: son la misma fuga de conversión vista desde dos
 * ángulos (falla en el proceso activo vs. leads fríos sin seguimiento),
 * y separarlos se leía como inflar la lista, no como precisión.
 *
 * Cada card NO repite el mecanismo completo de su pilar en /sistema —
 * solo dice qué se activa, con una línea de mecanismo a modo de
 * anticipo, y enlaza al pilar real para quien quiera el detalle
 * completo. Esa es la diferencia entre "aplicar" (esta página) y
 * "explicar" (Sistema).
 */
const problems: Problem[] = [
  {
    index: "01",
    title: "Generar demanda",
    pain: "Tu negocio necesita un canal de adquisición predecible.",
    activates: "Se activa Captación",
    mechanism: "El canal se elige por dónde existe demanda real, no por el canal que ya se sabe ejecutar.",
    href: "/sistema#pilar-captacion",
  },
  {
    index: "02",
    title: "Convertir y recuperar oportunidades",
    pain: "Tienes leads, pero muchos se pierden antes de convertirse en clientes — algunos porque el proceso falla, otros porque nadie vuelve a contactarlos.",
    activates: "Se activa Conversión",
    mechanism: "Lead → contacto → calificación → resolución de objeciones → agendamiento → confirmación. Cada tramo se diseña, se instala y se mide.",
    href: "/sistema#pilar-conversion",
  },
  {
    index: "03",
    title: "Automatizar operaciones comerciales",
    pain: "Tu equipo está desperdiciando tiempo en conversaciones y tareas repetitivas.",
    activates: "Se activa Automatización",
    mechanism: "Todo lo repetitivo se automatiza para que ningún lead desaparezca. La atención clínica y las conversaciones que requieren criterio médico, no.",
    href: "/sistema#pilar-automatizacion",
  },
  {
    index: "04",
    title: "Construir el sistema completo",
    pain: "Necesitas conectar adquisición, conversión y seguimiento en una sola arquitectura, no piezas sueltas.",
    activates: "Se activan los cinco pilares",
    mechanism: "En el orden que el Diagnóstico determine que el negocio necesita — no en el orden que sea más fácil de vender.",
    href: "/sistema#proceso",
  },
]

export function ProblemsSection() {
  return (
    <ParallaxSection id="problemas" className="border-t border-white/10 py-20 md:py-28 xl:py-32">
      <Container>
        <SectionKicker index="03" label="¿Cuál es tu problema?" />

        <TitleReveal className="mt-7">
          <h2 className="text-[clamp(2.5rem,4.8vw,3.75rem)] font-bold leading-[1.05] tracking-[-0.025em] text-white">
            Elige por dónde te está <span className="text-brand-red">fallando el negocio</span>, no por lo que
            crees que necesitas comprar.
          </h2>
        </TitleReveal>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2">
          {problems.map((problem, i) => (
            <Reveal key={problem.index} delay={i * 70}>
              <div className="group flex h-full flex-col border border-white/10 bg-white/[0.015] p-7 transition-[border-color,background-color,box-shadow] duration-300 hover:border-accent/60 hover:bg-brand-red/[0.05] hover:shadow-[0_0_56px_-20px_rgba(198,40,40,0.55)] md:p-8">
                <span className="font-mono text-[12px] text-white/35 transition-colors duration-300 group-hover:text-accent">
                  {problem.index}
                </span>

                <p className="mt-6 text-xl font-bold leading-tight tracking-tight text-white transition-colors duration-300 group-hover:text-accent md:text-2xl">
                  {problem.title}
                </p>

                <p className="mt-3 max-w-[46ch] text-[15px] leading-6 text-white/65">{problem.pain}</p>

                <div className="mt-6 border-l-2 border-brand-red/40 pl-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/40">
                    {problem.activates}
                  </p>
                  <p className="mt-2 max-w-[42ch] text-[14px] leading-6 text-white/70">{problem.mechanism}</p>
                </div>

                <Link
                  href={problem.href}
                  className="mt-7 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-white/60 transition-colors hover:text-accent"
                >
                  <span className="underline decoration-white/20 underline-offset-4 group-hover:decoration-accent">
                    Ver el mecanismo completo
                  </span>
                  <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </ParallaxSection>
  )
}
