"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import { cn } from "@/lib/utils"

interface TitleRevealProps {
  children: ReactNode
  className?: string
  delay?: number
}

/**
 * Segunda versión del reveal de títulos — la primera (bump de `y`/
 * duración dentro del `Reveal` genérico) resultó insuficiente: el
 * cliente mandó un video de referencia mostrando el efecto real que
 * quiere (ver conversación) y es un mecanismo distinto, no una versión
 * más lenta del mismo. Ahí cada título entra con una "máscara": un
 * contenedor `overflow-hidden` recorta el texto mientras sube desde
 * abajo (60% de su propia altura) y se desvanece a la vez — no es un
 * simple fade en el lugar, es un "deslizar hacia arriba saliendo de
 * detrás de un borde". Con `ease` estándar ese recorrido se siente
 * plano; `cubic-bezier(0.16, 1, 0.3, 1)` (curva "ease-out-expo", muy
 * usada para este tipo de reveal) frena fuerte al final, que es lo que
 * en el video se ve como "suave pero notable" — arranca con energía,
 * llega con calma, nunca rebota ni se pasa.
 *
 * Deliberadamente NO replica el otro detalle del video: ahí los
 * títulos de varias líneas usan un tono distinto por línea (la primera
 * blanca, las siguientes en gris apagado, permanentemente — no es
 * parte de la animación, es la jerarquía tipográfica de ESE sitio). En
 * Ankit los títulos son casi siempre una sola oración que se ve
 * completa (no frases cortas apiladas tipo "Define. Deploy. Scale.");
 * apagar parte de una oración real le resta peso al mensaje en vez de
 * jerarquizarlo. Se deja fuera a propósito — si se quiere ese
 * tratamiento en algún título puntual, es una decisión de contenido
 * caso por caso, no algo para aplicar parejo en las 19 secciones.
 *
 * Es un componente aparte de `Reveal` (no una variante más) porque la
 * técnica es estructuralmente distinta: `Reveal` anima el elemento que
 * recibe directamente; acá hace falta SIEMPRE un wrapper adicional
 * (el que recorta) por fuera del que se mueve, así que no puede ser
 * solo "otro set de props" sobre el mismo único nodo.
 *
 * Dos correcciones sobre la primera versión de este archivo (bug real
 * reportado por el cliente: "no veo el efecto al hacer scroll"):
 *
 * 1. Tenía un `setTimeout(2500)` que revelaba el título 2.5s después
 *    del montaje SIN importar el scroll — pensado como red de
 *    seguridad, pero en una página con varias secciones ese tiempo se
 *    cumple mucho antes de que el usuario llegue a verlas, así que el
 *    título quedaba "revelado" antes de entrar a pantalla y el scroll
 *    ya no disparaba nada visible. Se quitó (ver el mismo fix, con más
 *    detalle, en el comentario de `reveal.tsx`).
 * 2. El div animado no tenía `data-reveal`, así que sin JS (el caso
 *    real para el que existía la red de seguridad) el título se
 *    quedaba permanentemente invisible — el `<noscript>` de
 *    `app/layout.tsx` nunca lo alcanzaba. Ahora sí lo tiene.
 *
 * Tercera corrección, encontrada DESPUÉS de sacar el timeout de (1) —
 * ver el mismo bug con más detalle en `reveal.tsx`, es idéntico acá:
 * si el título ya quedó scrolleado por encima del viewport para cuando
 * este efecto monta y suscribe el observer (hidratación lenta + scroll
 * real ya en marcha), ningún evento futuro lo va a revelar. Confirmado
 * con video real en Android/Brave — título permanentemente invisible,
 * mismo mecanismo, mismo fix: si al montar el elemento ya está por
 * encima del viewport, se revela directo.
 */
export function TitleReveal({ children, className, delay = 0 }: TitleRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true)
      return
    }

    // Si el título ya quedó por encima del viewport para cuando este
    // efecto corre, ningún evento de intersección futuro lo va a
    // revelar — mostrarlo directo en vez de dejarlo invisible para
    // siempre (ver el comentario grande arriba y el mismo fix en
    // reveal.tsx).
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
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    )

    observer.observe(node)

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <div
        data-reveal
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0%)" : "translateY(60%)",
          transition: "opacity 900ms cubic-bezier(0.16, 1, 0.3, 1), transform 900ms cubic-bezier(0.16, 1, 0.3, 1)",
          transitionDelay: `${delay}ms`,
        }}
      >
        {children}
      </div>
    </div>
  )
}
