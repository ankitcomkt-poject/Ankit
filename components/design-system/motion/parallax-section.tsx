"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion"

interface ParallaxSectionProps {
  children: React.ReactNode
  className?: string
  id?: string
}

/**
 * Segundo de los 3 efectos de transición entre secciones (junto con
 * `Section stack` — apilado con esquinas redondeadas — y las
 * secciones sin ningún efecto nuevo). El contenido de la sección se
 * mueve un poco más lento que el scroll mientras la sección atraviesa
 * la pantalla — no es la sección la que se ancla, es su CONTENIDO el
 * que "flota" — por eso se siente distinto al stack en vez de una
 * variación del mismo truco.
 *
 * Función en vez de un array de keyframes en useTransform, con
 * Math.min/Math.max explícitos: ver components/home/intro-reveal.tsx
 * — un array de 3+ puntos en esta versión de framer-motion (13.0.0)
 * no se queda clampeado pasado el último punto, vuelve a moverse. Acá
 * el rango es más chico (±24px) así que probablemente nunca se
 * hubiera notado, pero mismo patrón siempre, no vale la pena
 * confirmarlo dos veces.
 *
 * Recorrido chico (±24px) a propósito: el padding vertical de
 * `Section` (py-20 a py-32) ya lo absorbe sin que haga falta
 * `overflow-hidden` acá — a diferencia de `stack`, esta no recorta,
 * porque no se auditó cada sección candidata por contenido
 * decorativo que dependa de sangrar fuera de la caja.
 *
 * bg-background explícito: mismo motivo que en `Section` (ver ese
 * componente) — una sección "stack" anterior nunca se despega de
 * verdad de su sticky, se queda pintada detrás de lo que sigue. Sin
 * un fondo opaco acá, esa sección se alcanzaría a ver por
 * transparencia. Mismo negro que ya se veía por heredarlo de body —
 * cero cambio visual, solo pasa de transparente a opaco.
 *
 * prefers-reduced-motion: el WCAG 2.3.3 (Animation from Interactions)
 * nombra el parallax por scroll específicamente como algo a desactivar
 * bajo esta preferencia — es de los disparadores más comunes de
 * mareo/vestibular, incluso en un recorrido tan chico como ±24px. El
 * proyecto ya tiene `usePrefersReducedMotion` (ver el hook, con su
 * propia nota de por qué no se usa el de framer-motion directamente)
 * para exactamente este caso — sin este guard, `stack` (CSS puro, sin
 * movimiento que reducir) hubiera quedado respetando la preferencia
 * pero `parallax` no, silenciosamente. Con la preferencia activa, `y`
 * queda fijo en 0 — mismo layout, sin desplazamiento.
 */
export function ParallaxSection({ children, className, id }: ParallaxSectionProps) {
  const ref = useRef<HTMLElement>(null)
  const prefersReducedMotion = usePrefersReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, (v) => {
    if (prefersReducedMotion) return 0
    const t = Math.min(Math.max(v, 0), 1)
    return (0.5 - t) * 48
  })

  return (
    <section ref={ref} id={id} className={cn("relative bg-background py-20 md:py-28 xl:py-32", className)}>
      <motion.div style={{ y }}>{children}</motion.div>
    </section>
  )
}
