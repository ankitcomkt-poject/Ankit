"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import { cn } from "@/lib/utils"

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  /** Distancia de entrada en px. 0 desactiva el desplazamiento (solo fade). */
  y?: number
  as?: "div" | "article" | "li"
  /** Duración de la transición en ms. Default 700 — el mismo valor de
   * siempre, ahora parametrizable en vez de fijo en la clase Tailwind. */
  durationMs?: number
  /** rootMargin/threshold del IntersectionObserver — mismos defaults de
   * siempre. Ver el prop `durationMs` de acá arriba para el porqué de
   * exponerlos (usado por los títulos de sección, ver más abajo). */
  rootMargin?: string
  threshold?: number
}

/**
 * Entrada controlada al hacer scroll: opacidad + leve elevación.
 * A propósito NO usa scramble/typewriter en contenido de lectura —
 * esos efectos ya se probaron en el prototipo anterior y leen como
 * "plantilla de agencia creativa". Aquí la animación es discreta y
 * se repite igual en todo el sitio, para que la atención quede en
 * la jerarquía de contenido, no en el efecto.
 *
 * `durationMs`/`rootMargin`/`threshold` son overrides opcionales — con
 * sus defaults (700ms, -8%/0.15) el comportamiento es idéntico al que
 * tenía este componente antes de que existieran estos props, así que
 * ninguno de los usos existentes (tarjetas, párrafos, footer) cambia.
 * Se agregaron porque los títulos `<h2>` de cada sección (ver los
 * `<Reveal>` que los envuelven en cada `*-section.tsx`) usaban el mismo
 * fade de 16px/700ms que una tarjeta chica en un grid — correcto para
 * algo que se lee de reojo, pero un título grande, solo, es lo primero
 * que el ojo busca al entrar a una sección: con ese mismo timing sutil
 * terminaba de aparecer antes de que uno llegara a mirarlo, y se sentía
 * como si "ya estuviera ahí" en vez de estar apareciendo. y={28} y
 * durationMs={900} (en vez de 16px/700ms) alargan el recorrido sin
 * volverlo un efecto vistoso — sigue siendo el mismo fade+elevación,
 * solo más perceptible en el tiempo que un título tarda en cruzar la
 * pantalla durante un scroll normal.
 *
 * A propósito NO hay un `setTimeout` de "por si el observer nunca
 * dispara" (SÍ lo hubo, bug real encontrado y sacado): un timer fijo
 * desde el montaje del componente no tiene ninguna relación con cuándo
 * el usuario realmente llega a ver el elemento. En una página con
 * varias secciones — literalmente cualquiera de este sitio — para
 * cuando alguien hace scroll hasta la sección 4 o 5 ya pasaron esos
 * milisegundos hace rato, así que el fallback "revela" el contenido
 * ANTES de que quede a la vista, y lo que el usuario ve al llegar es
 * el estado final, sin animación — el bug se siente como "el efecto no
 * existe", no como un error visible. Para JS desactivado del todo,
 * `app/layout.tsx` ya cubre el caso con `<noscript>`
 * (`[data-reveal]{opacity:1!important;transform:none!important}`).
 *
 * Pero sacar el timer destapó un segundo bug, más serio, que el timer
 * tapaba sin querer: en hidratación lenta (bundle de dev sin minificar,
 * teléfono de gama media, lo que sea) el usuario puede seguir
 * scrolleando de verdad ANTES de que este componente monte y suscriba
 * el observer. Cuando eso pasa, el elemento ya quedó scrolleado por
 * encima del viewport para cuando `observe()` corre — el observer sí
 * reporta su estado inicial (`isIntersecting: false`, correcto, ya no
 * está en pantalla) pero como el usuario no vuelve a subir, ese
 * "entrando" que dispara `setVisible(true)` nunca llega. El elemento
 * queda invisible PARA SIEMPRE, no solo tarde. Confirmado con un video
 * real (Android + Brave, sitio corriendo en `next dev`): cada título y
 * párrafo de cada sección se quedó así — visible solo el kicker, que no
 * pasa por este componente. La corrección de acá abajo (chequear si el
 * elemento YA quedó por encima del viewport al montar, y si es así
 * revelarlo directo en vez de esperar un evento que no va a llegar) es
 * la reparación real de ese caso — no un timer más largo, que hubiera
 * vuelto a pisar el bug que se sacó arriba.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 16,
  as = "div",
  durationMs = 700,
  rootMargin = "0px 0px -8% 0px",
  threshold = 0.15,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true)
      return
    }

    // Si el elemento ya quedó por encima del viewport para cuando este
    // efecto corre (scroll real más rápido que la hidratación), no hay
    // ningún evento de intersección futuro que lo vaya a revelar — el
    // observer ya nació tarde. Mostrarlo directo en vez de dejarlo
    // invisible para siempre.
    if (node.getBoundingClientRect().bottom < 0) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.disconnect()
          }
        })
      },
      { threshold, rootMargin },
    )

    observer.observe(node)

    return () => {
      observer.disconnect()
    }
  }, [rootMargin, threshold])

  const Component = as as "div"

  return (
    <Component
      ref={ref}
      data-reveal
      className={cn("transition-[opacity,transform] ease-out", className)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0px)" : `translateY(${y}px)`,
        transitionDelay: `${delay}ms`,
        transitionDuration: `${durationMs}ms`,
      }}
    >
      {children}
    </Component>
  )
}
