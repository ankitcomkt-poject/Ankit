"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface RotatingWordProps {
  words: string[]
  /** ms entre cambios de palabra. */
  interval?: number
  className?: string
  /**
   * true: reserva el ancho de la palabra más larga (span fantasma) en
   * vez de animar el ancho del contenedor. Úsalo cuando esta palabra
   * es la única variable de su línea — sin esto, cada cambio de
   * palabra puede correr el punto de quiebre de la línea de arriba o
   * de abajo y todo el bloque de texto salta hacia arriba/abajo (el
   * bug que reportó el cliente en el Hero). En una frase centrada de
   * varias líneas donde la palabra ya cae sola en su propia línea
   * final (el cierre), NO lo actives — reservar de más ahí deja un
   * hueco muerto al lado de las palabras más cortas.
   */
  reserveWidth?: boolean
}

/**
 * Tercera versión. Dos ajustes a partir del feedback del cliente:
 *
 * 1. Movimiento más marcado: antes viajaba exactamente su propia
 *    altura (100%) en 0.5s con una curva suave — se sentía a medias.
 *    Ahora viaja más allá de su propia altura (140%, así ya está
 *    fuera de vista antes de terminar el recorrido, no justo llegando
 *    al borde) con una curva más "expo" (arranca rápido, frena en
 *    seco) en vez de la anterior, más blanda.
 *
 * 2. `reserveWidth`: la v2 animaba el ancho del propio contenedor
 *    (`layout`) para no dejar huecos muertos en el cierre — pero eso
 *    significa que el ancho real del bloque de texto cambia con cada
 *    palabra, y si esa palabra vive en medio de una frase que se
 *    envuelve por ancho de línea (como el H1 del Hero), un cambio de
 *    ancho ahí puede mover DÓNDE cae el salto de línea de arriba o
 *    abajo — todo el párrafo "salta". `reserveWidth` vuelve al span
 *    fantasma (ancho fijo = el de la palabra más larga) para esos
 *    casos: ya no hay hueco que evitar (la palabra vive en su propia
 *    línea forzada, ver hero/index.tsx) y sí hay reflow que evitar.
 *
 * "Para abajo": la palabra saliente sigue cayendo y se desvanece, la
 * entrante viene de arriba y cae a su lugar — mismo sentido en las
 * dos, nunca un rebote hacia arriba.
 *
 * Accesibilidad: el contenido animado es aria-hidden (evitar que un
 * lector de pantalla anuncie un cambio cada 2-3 segundos); un span
 * sr-only aparte lee la primera palabra una sola vez, como lo haría
 * con una frase estática.
 */
export function RotatingWord({ words, interval = 2600, className, reserveWidth = false }: RotatingWordProps) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (words.length <= 1) return
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), interval)
    return () => clearInterval(id)
  }, [words.length, interval])

  const wordTransition = { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const }

  const word = (
    <motion.span
      key={words[index]}
      aria-hidden="true"
      initial={{ y: "-140%", opacity: 0 }}
      animate={{ y: "0%", opacity: 1 }}
      exit={{ y: "140%", opacity: 0 }}
      transition={wordTransition}
      className={cn(reserveWidth ? "col-start-1 row-start-1 whitespace-nowrap" : "whitespace-nowrap", className)}
    >
      {words[index]}
    </motion.span>
  )

  if (reserveWidth) {
    const longest = words.reduce((a, b) => (a.length >= b.length ? a : b))
    return (
      <span className="relative inline-block">
        <span className="sr-only">{words[0]}</span>
        {/* pb + -mb: la caja que recorta la animación (overflow-hidden)
            se mide sobre el line-height MUY apretado del título
            (leading-[1.02]/[1.1]), que no deja espacio suficiente para
            que bajen las "g"/"p"/"q" — se veían cortadas por abajo. El
            padding extra le da a esa caja más alto real; el margen
            negativo del mismo tamaño la vuelve a subir para que no
            empuje el resto de la línea hacia abajo. */}
        <span
          aria-hidden="true"
          className="relative isolate -mb-[0.3em] inline-grid overflow-hidden pb-[0.3em] align-bottom"
        >
          <span className={cn("invisible col-start-1 row-start-1 whitespace-nowrap", className)}>{longest}</span>
          <AnimatePresence mode="wait" initial={false}>
            {word}
          </AnimatePresence>
        </span>
      </span>
    )
  }

  return (
    <motion.span
      layout
      transition={{ layout: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } }}
      className="relative -mb-[0.3em] inline-flex overflow-hidden pb-[0.3em] align-bottom"
    >
      <span className="sr-only">{words[0]}</span>
      <AnimatePresence mode="popLayout" initial={false}>
        {word}
      </AnimatePresence>
    </motion.span>
  )
}
