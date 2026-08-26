"use client"

import { useState } from "react"
import { Container } from "@/components/design-system/layout/container"
import { Section } from "@/components/design-system/layout/section"
import { SectionKicker } from "@/components/design-system/typography/section-kicker"
import { OriginButton } from "@/components/design-system/buttons/origin-button"
import { Reveal } from "@/components/design-system/motion/reveal"
import { TitleReveal } from "@/components/design-system/motion/title-reveal"

const WHATSAPP_NUMBER = "573227201989"

const BASE_MESSAGE = "Hola, vengo del sitio de Ankit y quiero agendar un diagnóstico."

/**
 * El mecanismo elegido es WhatsApp, no un formulario con backend ni un
 * embed de calendario — decisión explícita del cliente por ser lo de
 * menos fricción. El campo de contexto es opcional a propósito: dejarlo
 * vacío igual produce un mensaje de apertura útil, escribir algo solo
 * lo hace más útil todavía. Todo corre en el cliente (el link de
 * WhatsApp se arma con el texto tal cual se escribe) — no hay ningún
 * formulario que "enviar", así que no hace falta backend ni base de
 * datos para que esto funcione de verdad.
 */
export function StartSection() {
  const [context, setContext] = useState("")

  const message = context.trim() ? `${BASE_MESSAGE} ${context.trim()}` : BASE_MESSAGE
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`

  return (
    <Section id="empezar" className="border-t border-white/10 py-20 md:py-28 xl:py-32">
      <Container>
        <SectionKicker index="03" label="Empecemos" />

        <TitleReveal className="mt-7">
          <h2 className="max-w-[24ch] text-[clamp(2.5rem,4.8vw,3.75rem)] font-bold leading-[1.05] tracking-[-0.025em] text-white">
            Escríbenos <span className="text-brand-red">directo</span>, sin formularios.
          </h2>
        </TitleReveal>

        <Reveal delay={80} className="mt-10 max-w-2xl border border-white/10 bg-black/20 p-7 md:p-8">
          <label htmlFor="contexto" className="font-mono text-[11px] uppercase tracking-[0.24em] text-white/45">
            Opcional — cuéntanos brevemente tu negocio
          </label>
          <textarea
            id="contexto"
            value={context}
            onChange={(e) => setContext(e.target.value)}
            placeholder="Ej: Clínica de implantes en Bogotá, ya pautamos pero no sabemos qué pasa con los leads."
            rows={3}
            className="mt-3 w-full border border-white/10 bg-black/30 px-4 py-3 text-[15px] leading-6 text-white placeholder:text-white/30 focus:border-accent/60 focus:outline-none"
          />

          <p className="mt-4 text-[13px] leading-5 text-white/40">
            Si lo dejas en blanco, igual te escribimos con el mensaje de abajo — no es obligatorio para
            empezar.
          </p>

          <div className="mt-6">
            <OriginButton
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
              variant="primary"
              className="w-full sm:w-auto"
            >
              Escribir por WhatsApp
            </OriginButton>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
