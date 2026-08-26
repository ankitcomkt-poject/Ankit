"use client"

import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { Container } from "@/components/design-system/layout/container"
import { ParallaxSection } from "@/components/design-system/motion/parallax-section"
import { SectionKicker } from "@/components/design-system/typography/section-kicker"
import { Reveal } from "@/components/design-system/motion/reveal"
import { TitleReveal } from "@/components/design-system/motion/title-reveal"

const faqs = [
  {
    question: "¿Trabajan únicamente con odontología?",
    answer:
      "Hoy estamos enfocados en clínicas de implantología y estética oral porque ahí hemos podido llevar el sistema al máximo detalle. Si tu negocio tiene una lógica de venta consultiva similar, hablemos — pero no tomamos clientes fuera de foco solo por facturar.",
  },
  {
    question: "¿Qué necesito antes de empezar?",
    answer:
      "Necesitamos entender tu negocio real: quién es tu paciente ideal, cómo vendes hoy, qué datos tienes de tus últimos meses y cuál es tu capacidad operativa para atender más pacientes. Eso se resuelve en el diagnóstico inicial.",
  },
  {
    question: "¿Cuánto debo invertir en publicidad?",
    answer:
      "Depende del sistema que diseñemos, no al revés. Definimos el presupuesto después del diagnóstico, cuando ya sabemos qué tan eficiente puede ser tu proceso comercial.",
  },
  {
    question: "¿Qué pasa si mi equipo comercial no convierte?",
    answer:
      "Lo evaluamos como parte del sistema. Si el problema está en el proceso comercial, lo rediseñamos y entrenamos al equipo — no solo enviamos más contactos a un embudo que no convierte.",
  },
  {
    question: "¿En cuánto tiempo suelen verse resultados?",
    answer:
      "Los primeros movimientos suelen sentirse entre la semana 4 y 8, pero un sistema de crecimiento predecible toma entre 90 y 120 días en madurar. No prometemos atajos.",
  },
]

export function FaqSection() {
  return (
    <ParallaxSection id="faq" className="border-t border-white/10">
      <Container>
        <SectionKicker index="09" label="Preguntas frecuentes" />

        {/* La regla vertical roja mantiene la sección distinta de
            Especialización/Problema, pero antes la columna era tan
            angosta (3/12) y el texto tan chico que se veía amontonado
            en vez de "nota al margen". Se ensancha a 4/12 y el titular
            sube de tamaño para usar ese espacio de verdad. */}
        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-10">
          <TitleReveal className="border-l-2 border-brand-red/40 pl-6 lg:col-span-4">
            <h2 className="text-[clamp(2.1rem,3.4vw,2.75rem)] font-bold leading-[1.12] tracking-[-0.02em] text-white">
              Antes de agendar, esto suele preguntarse.
            </h2>
          </TitleReveal>

          <Reveal delay={100} className="lg:col-span-8">
            <AccordionPrimitive.Root type="single" collapsible className="border-t border-white/10">
              {faqs.map((faq) => (
                <AccordionPrimitive.Item
                  key={faq.question}
                  value={faq.question}
                  className="border-b border-white/10"
                >
                  <AccordionPrimitive.Header>
                    <AccordionPrimitive.Trigger className="group flex w-full items-center justify-between gap-6 py-6 text-left outline-none focus-visible:text-accent">
                      <span className="text-lg font-medium leading-snug text-white group-hover:text-accent md:text-xl">
                        {faq.question}
                      </span>
                      <span
                        aria-hidden="true"
                        className="shrink-0 font-mono text-xl text-white/40 transition-transform duration-300 group-data-[state=open]:rotate-45 group-hover:text-accent"
                      >
                        +
                      </span>
                    </AccordionPrimitive.Trigger>
                  </AccordionPrimitive.Header>
                  <AccordionPrimitive.Content className="overflow-hidden text-base leading-7 text-white/60 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                    <p className="max-w-[58ch] pb-7 pr-10">{faq.answer}</p>
                  </AccordionPrimitive.Content>
                </AccordionPrimitive.Item>
              ))}
            </AccordionPrimitive.Root>
          </Reveal>
        </div>
      </Container>
    </ParallaxSection>
  )
}
