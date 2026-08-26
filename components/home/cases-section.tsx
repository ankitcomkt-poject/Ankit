import Link from "next/link"
import { Container } from "@/components/design-system/layout/container"
import { Section } from "@/components/design-system/layout/section"
import { SectionKicker } from "@/components/design-system/typography/section-kicker"
import { Reveal } from "@/components/design-system/motion/reveal"
import { TitleReveal } from "@/components/design-system/motion/title-reveal"
import { CaseCard, type CaseStudy } from "@/components/design-system/cards/case-card"

// Antes "Ver cómo lo resolvimos" apuntaba a "#resultados" por defecto,
// es decir, a sí misma — un CTA muerto. Ahora existe /resultados con
// el desarrollo completo de cada caso (Caso 01 a fondo, Caso 02 como
// contrapunto), así que cada tarjeta enlaza a su bloque real.
const cases: CaseStudy[] = [
  {
    index: "Problema 01",
    title: "Cuando un negocio depende completamente del voz a voz.",
    description:
      "Durante años, el negocio consiguió clientes gracias a su reputación y a las recomendaciones. Aunque eso funcionó durante mucho tiempo, el crecimiento era impredecible y no existía una forma consistente de atraer nuevos pacientes.",
    stats: ["+225% en nuevos clientes", "6.616 conversaciones iniciadas", "$600 COP por conversación"],
    ctaLabel: "Ver cómo lo resolvimos",
    href: "/resultados#caso-1",
  },
  {
    index: "Problema 02",
    title: "Una organización perdió credibilidad frente a su mercado.",
    description:
      "Antes de lanzar campañas, descubrimos que el verdadero problema no era la falta de anuncios, sino una identidad poco clara y una comunicación que no reflejaba el valor real de la marca.",
    stats: ["Nueva identidad de marca", "Estrategia de contenido definida", "Sistema preparado para escalar"],
    ctaLabel: "Ver cómo lo resolvimos",
    href: "/resultados#caso-2",
  },
]

export function CasesSection() {
  return (
    <Section id="resultados" className="border-t border-white/10">
      <Container>
        <SectionKicker index="04" label="Casos" />

        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <TitleReveal>
              <h2 className="text-[clamp(2.5rem,4.6vw,3.75rem)] font-bold leading-[1.05] tracking-[-0.02em] text-white">
                Las industrias cambian.
                <br />
                Los problemas de crecimiento no.
              </h2>
            </TitleReveal>
            <Reveal delay={100} className="mt-5">
              <p className="max-w-[55ch] text-base leading-7 text-white/55 md:text-lg">
                Hemos trabajado con empresas de distintos sectores, pero todas compartían el mismo desafío:
                crecer de forma consistente. Estos son algunos de los problemas que ayudamos a resolver.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Antes era una grilla pareja de 2 columnas idénticas — con solo
            dos casos, eso se lee como una lista, no como una selección.
            El primero ahora domina (7/12), el segundo queda como
            contrapunto más compacto (5/12): distinto peso, no duplicado. */}
        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {cases.map((study, i) => (
            <div key={study.index} className={i === 0 ? "lg:col-span-7" : "lg:col-span-5"}>
              <CaseCard study={study} delay={i * 100} />
            </div>
          ))}
        </div>

        <Reveal delay={220} className="mt-8">
          <Link
            href="/resultados"
            className="group inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.16em] text-white/70 transition-colors hover:text-accent"
          >
            <span className="underline decoration-white/25 underline-offset-4 group-hover:decoration-accent">
              Ver todos los resultados
            </span>
            <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </Reveal>
      </Container>
    </Section>
  )
}
