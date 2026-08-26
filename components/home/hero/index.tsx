"use client"

import { motion } from "framer-motion"
import { AnimatedNoise } from "@/components/animated-noise"
import { Eyebrow } from "@/components/design-system/typography/eyebrow"
import { OriginButton } from "@/components/design-system/buttons/origin-button"
import { RotatingWord } from "@/components/design-system/motion/rotating-word"
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion"
import { HeroVisual } from "./hero-visual"

// "Sistemas" se queda fija — es la palabra central del posicionamiento
// de Ankit ("Diseñamos el sistema, no hacemos marketing"), rotarla la
// diluiría. Lo que rota es el resultado concreto que ese sistema
// genera — mismo espíritu de "libertad total" que pidió el cliente,
// aplicado sin tocar la palabra que sostiene la marca.
//
// El punto final va DENTRO de cada palabra, no suelto después del
// componente: con reserveWidth el ancho reservado es el de la palabra
// más larga, y un punto fuera del texto animado se queda fijo en esa
// posición — con una palabra corta ("citas") el punto queda flotando
// solo, lejos de la palabra, como un error visual.
const heroOutcomes = ["crecimiento.", "pacientes.", "citas.", "ingresos."]

const proofPoints = [
  { label: "Enfoque", value: "Implantología y estética oral" },
  { label: "Modelo", value: "Sistema, no campañas sueltas" },
  { label: "Mercado", value: "Latinoamérica" },
]

export function Hero() {
  // framer-motion (13.0.0) trae su propio useReducedMotion, pero no
  // reacciona a prefers-reduced-motion en este proyecto — el mismo
  // problema que se encontró y documentó en IntroReveal, mismo fix
  // (ver hooks/use-reduced-motion.ts).
  const shouldReduceMotion = usePrefersReducedMotion()

  return (
    <motion.section
      // Entrada al terminar el scroll fijo de IntroReveal (ver
      // components/home/intro-reveal.tsx): este Hero es un hermano
      // normal en el flujo, así que "aparece" solo, con scroll normal
      // — este fade+subida es lo que hace que se sienta como parte
      // del mismo gesto en vez de un corte seco entre los dos bloques.
      // `once: true` porque es la entrada de la página, no algo para
      // repetir si el usuario vuelve a scrollear hacia arriba y abajo.
      initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative min-h-screen overflow-hidden pt-24 pb-16 md:pt-32"
    >
      <AnimatedNoise opacity={0.025} />

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 md:px-8 lg:px-10">
        <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-12 lg:items-center lg:gap-8">
          {/* =========================================
              IZQUIERDA — COPY PRINCIPAL
          ========================================== */}
          <div className="flex flex-col justify-center lg:col-span-7">
            <Eyebrow accent>Sistemas de crecimiento digital</Eyebrow>

            {/* Salto de línea forzado antes de "que genera...": la
                palabra rotativa cambia de ancho, y si comparte línea
                con contenido fijo, ese cambio corre el punto de
                quiebre de la línea de arriba o de abajo — todo el
                título "salta" cada vez que rota. Con el salto fijo
                acá, lo único que cambia línea a línea es la propia
                palabra (con su ancho reservado por RotatingWord), así
                que el resto del título nunca se mueve. */}
            <h1 className="mt-7 max-w-[820px] text-[clamp(2.75rem,6.6vw,6rem)] font-bold leading-[1.02] tracking-[-0.03em] text-white">
              Construimos <span className="text-brand-red">sistemas</span>
              <br />
              que generan <RotatingWord words={heroOutcomes} reserveWidth />
            </h1>

            <p className="mt-8 max-w-[560px] text-lg font-medium leading-8 text-white/75 md:text-xl">
              Estrategia, automatización e inteligencia artificial para negocios que quieren dejar de
              depender de acciones aisladas de marketing.
            </p>

            {/* =========================================
                ACCIONES
            ========================================== */}
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <OriginButton href="/diagnostico" size="lg" variant="primary">
                Agendar diagnóstico
              </OriginButton>
              <OriginButton href="#resultados" size="lg" variant="secondary">
                Ver resultados
              </OriginButton>
            </div>

            {/* =========================================
                PRUEBA MÍNIMA — números grandes, labels
                pequeños, líneas verticales entre bloques.
                Sin cifras infladas: solo posicionamiento
                verificable (mismo principio de antes, con
                el tratamiento visual del prompt del hero).
            ========================================== */}
            <div className="mt-12 grid grid-cols-3 divide-x divide-white/10 border-t border-white/10 pt-7 md:mt-16">
              {proofPoints.map((point) => (
                <div key={point.label} className="pl-0 first:pl-0 [&:not(:first-child)]:pl-4 sm:[&:not(:first-child)]:pl-8">
                  <p className="text-sm font-semibold leading-5 text-white md:text-base">{point.value}</p>
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
                    {point.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* =========================================
              DERECHA — VISUAL DEL SISTEMA
          ========================================== */}
          <div className="lg:col-span-5 lg:flex lg:items-center">
            <div className="w-full lg:max-h-[640px]">
              <HeroVisual />
            </div>
          </div>
        </div>
      </div>

      {/* Indicador de scroll */}
      <a
        href="#problema"
        aria-label="Ir a la siguiente sección"
        className="group absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex"
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-white/30 transition-colors group-hover:text-white/60">
          Scroll
        </span>
        <span className="h-8 w-px bg-white/20 transition-colors group-hover:bg-white/50" />
      </a>
    </motion.section>
  )
}
