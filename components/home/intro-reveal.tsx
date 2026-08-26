"use client"

import { useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion"

/**
 * Isotipo de Ankit grande, fijo en pantalla mientras el usuario hace
 * scroll — se encoge* y se desvanece, y lo que aparece debajo es el
 * Hero real
 * (`components/home/hero/index.tsx`, sin tocar su estructura interna,
 * ver la animación de entrada que sí se le agregó ahí). Inspirado en
 * el recorrido del sitio de "MONO" que mandó el cliente.
 *
 * *No se encoge — CRECE (scale 1 → 1.5) mientras se desvanece: da la
 * sensación de que el texto "viene hacia" quien mira en vez de
 * quedarse quieto encogiéndose, efecto más parecido al video de
 * referencia que un simple fade-out estático.
 *
 * DECISIÓN DE ARQUITECTURA — por qué el Hero NO vive DENTRO de este
 * componente (ni superpuesto con position:absolute):
 * Encerrar el Hero en un contenedor `overflow-hidden` de exactamente
 * 100dvh (necesario para que el "ANKIT" quede fijo) lo recortaría en
 * pantallas donde su contenido real (título + copy + botones + prueba
 * mínima) mide más que un alto de pantalla — que es prácticamente
 * garantizado en celulares angostos con este mismo texto. La solución
 * más simple y sin ese riesgo: este componente SOLO controla el
 * wordmark, y el Hero sigue siendo un hermano normal en el flujo del
 * documento justo después — cuando el usuario termina de pasar este
 * bloque, el Hero simplemente ya está ahí, con su alto natural,
 * scrolleable como siempre.
 *
 * Lenis (`components/smooth-scroll.tsx`) no rompe esto: a diferencia
 * de un smooth-scroll "falso" (mover el contenido con CSS transform),
 * Lenis mueve el scroll real del documento con easing — position:
 * sticky y useScroll (basado en scroll real de window) funcionan
 * igual que sin Lenis, solo que con el mismo "peso"/inercia que ya
 * tiene el resto del sitio. En touch (celular) Lenis no intercepta el
 * scroll (smoothTouch está desactivado), así que ahí corre sobre
 * scroll nativo — el mismo mecanismo, sin diferencias de
 * comportamiento respecto a desktop, que es justo lo que pidió el
 * cliente ("mismo efecto completo" en mobile).
 *
 * dvh en vez de vh: en el navegador de un celular, 100vh no cuenta el
 * espacio real disponible cuando la barra de direcciones está visible
 * — con vh el bloque fijo podía quedar más alto que la pantalla
 * visible y verse cortado o saltar al mostrarse/ocultarse esa barra.
 * dvh sí se ajusta a eso. Es la única página del sitio donde esto
 * importa lo suficiente como para no seguir la convención de h-screen
 * que ya usa el resto (ej. Hero) — ahí el problema no existe porque
 * ese contenido no depende de estar pegado a un alto exacto.
 *
 * Dos bugs reales encontrados y corregidos al verificar esto (no
 * suposiciones — reproducidos con scroll real en el navegador):
 *
 * 1. `body { overflow-x: hidden }` (globals.css, ya existía en el
 *    sitio) rompía TODO `position: sticky` de la página. Por la regla
 *    del spec de CSS, un eje con overflow != visible y el otro en
 *    "visible" hace que el otro eje se calcule como "auto" — así que
 *    body quedaba, silenciosamente, como su propio "contenedor de
 *    scroll" aunque nunca scrollea internamente (siempre es
 *    html/viewport quien scrollea de verdad acá). position: sticky
 *    busca el ancestro de scroll más cercano para calcular cuándo
 *    queda "pegado" — con body en medio (más cerca que html) y sin
 *    moverse nunca, el "ANKIT" nunca se pegaba, scrolleaba normal
 *    junto con la página. Arreglado quitando el overflow-x de body en
 *    globals.css (se queda solo en html, que es el que sí scrollea).
 *    Este bug ya existía antes de este cambio — sencillamente nada en
 *    el sitio había usado sticky todavía para notarlo.
 *
 * 2. `useTransform(progress, [0, 0.6, 0.85], [1, 1, 0])` (3+
 *    keyframes) no se quedaba clampeado en 0 pasado el último punto —
 *    el opacity, en vez de quedarse invisible, volvía a subir hacia 1
 *    al seguir scrolleando (framer-motion 13.0.0, ver package.json;
 *    reproducido con scroll real, no solo saltos programáticos). Un
 *    `useTransform(progress, [0, 0.85], [1, 1.5])` de 2 puntos (el de
 *    `scale`, más abajo) sí clampeaba bien — el problema es específico
 *    de 3+ puntos en esta versión. Arreglado con una función propia
 *    (`Math.min`/`Math.max` explícitos) en vez de un array de
 *    keyframes, para las dos.
 *
 * HEADER SINCRONIZADO CON EL INTRO — pedido explícito del cliente: el
 * header no debe verse mientras está el "ANKIT" grande, solo aparecer
 * gradual al entrar al Hero. `<Header>` (components/layout/header/
 * header.tsx) es hermano de este componente, no un hijo — vive en
 * PageWrapper, fuera del árbol de IntroReveal — así que no hay forma
 * de controlarlo con props/estado de React normal sin meter un
 * Context solo para esto. Se optó por lo más simple: este componente
 * escribe la opacity del header como variable CSS en <html> en cada
 * frame de scroll (`--header-opacity`), y Header simplemente la lee
 * vía `style={{ opacity: "var(--header-opacity, 1)" }}` con fallback
 * a 1. Ese fallback es lo que hace que el header se comporte IGUAL
 * que antes en cualquier página que no sea el home — ninguna otra
 * página renderiza este componente, así que la variable nunca se
 * define ahí y el header queda siempre visible, sin cambios.
 *
 * headerOpacity usa la MISMA ventana (v 0.6→0.85) que el fade-out del
 * logo, invertida — el header se vuelve visible exactamente al ritmo
 * en que el "ANKIT" grande desaparece, terminan sincronizados: cuando
 * el logo ya no se ve, el header ya está 100% presente. No es una
 * ventana nueva inventada — es deliberado que comparta la del logo,
 * para que se sienta como una sola transición y no dos animaciones
 * independientes por casualidad.
 *
 * `visibility` además de `opacity` (ver la clase `header-hidden` que
 * se agrega/quita en <html>, y la regla en globals.css): opacity 0
 * solo no basta, deja los links del header enfocables por teclado
 * (Tab) aunque sean invisibles — alguien navegando sin mouse llegaría
 * a un menú "fantasma" antes de ver nada. La clase se deriva
 * directamente del valor de headerOpacity (<= 0), no de un umbral de
 * scroll aparte, así que no hay riesgo de que se desincronice si se
 * ajustan más adelante los números 0.6/0.85 de arriba.
 *
 * Cleanup al desmontar: si no se resetea `--header-opacity` y la
 * clase `header-hidden` cuando este componente se desmonta, queda un
 * bug real de navegación SPA — el usuario hace scroll en el home
 * (deja la variable en, digamos, 0.3), hace click en un link del nav
 * a otra página (Next navega client-side, sin recargar), y el header
 * de la página nueva nace con esa misma opacity vieja pegada en
 * <html>, aunque esa página no tiene intro y su Header debería verse
 * normal desde el primer frame. El `useEffect` de abajo limpia ambas
 * cosas en su función de retorno para que esto no pase.
 *
 * Nota aparte, no técnica: esto oculta el botón "Diagnóstico" (el CTA
 * principal del sitio) y toda la navegación durante el tramo del
 * intro — hasta 140dvh en celular, 260dvh en desktop antes de que el
 * header sea clickeable. Vale la pena tenerlo en cuenta: es un tramo
 * de scroll obligatorio, sin salida ni forma de convertir, en un
 * sitio cuyo objetivo es justamente conversión. Se implementa porque
 * es lo que se pidió explícitamente, pero es una decisión de negocio,
 * no solo estética — si en algún momento se ve una caída en clicks a
 * Diagnóstico o en uso del nav desde el home, este es el primer lugar
 * donde mirar.
 */
export function IntroReveal() {
  const containerRef = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = usePrefersReducedMotion()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const opacity = useTransform(scrollYProgress, (v) => {
    if (v <= 0.6) return 1
    if (v >= 0.85) return 0
    return 1 - (v - 0.6) / 0.25
  })
  const scale = useTransform(scrollYProgress, (v) => {
    const t = Math.min(Math.max(v / 0.85, 0), 1)
    return shouldReduceMotion ? 1 : 1 + t * 0.5
  })
  const headerOpacity = useTransform(scrollYProgress, (v) => {
    if (v <= 0.6) return 0
    if (v >= 0.85) return 1
    return (v - 0.6) / 0.25
  })

  // Empuja headerOpacity hacia <Header> vía variable CSS — ver el
  // comentario "HEADER SINCRONIZADO CON EL INTRO" arriba para el por
  // qué de este mecanismo en vez de Context/props.
  useEffect(() => {
    const applyHeaderOpacity = (v: number) => {
      document.documentElement.style.setProperty("--header-opacity", String(v))
      document.documentElement.classList.toggle("header-hidden", v <= 0)
    }
    applyHeaderOpacity(headerOpacity.get())
    const unsubscribe = headerOpacity.on("change", applyHeaderOpacity)
    return () => {
      unsubscribe()
      // Reset explícito: sin esto, navegar client-side a otra página
      // deja al header nuevo con la opacity/clase vieja del home
      // pegada en <html> (ver el comentario de arriba).
      document.documentElement.style.removeProperty("--header-opacity")
      document.documentElement.classList.remove("header-hidden")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Reducir movimiento: mismo componente, mismo hand-off al Hero, pero
  // sin el largo tramo de scroll fijo ni el crecimiento — un fade
  // corto y ya. Sigue sin haber ningún salto de layout.
  //
  // 260dvh SOLO desde md hacia arriba: ese tramo se pensó para mouse
  // wheel / trackpad, donde uno o dos gestos ya cubren esa distancia
  // sin que se note como "espacio vacío". En celular el gesto
  // equivalente es un swipe, que cubre bastante menos distancia por
  // gesto — con 260dvh hacían falta 4-5 swipes solo para salir del
  // intro antes de llegar al Hero, y eso se sentía como una pantalla
  // negra sin nada, no como una animación de entrada. 140dvh mantiene
  // el mismo mecanismo (scroll real controla opacity/scale, mismo
  // handoff al Hero) pero en un tramo que un par de swipes ya resuelve.
  const containerHeightClass = shouldReduceMotion ? "h-[110dvh]" : "h-[140dvh] md:h-[260dvh]"

  return (
    <div ref={containerRef} className={`relative ${containerHeightClass}`} aria-hidden="true">
      <div className="sticky top-0 flex h-dvh w-full items-center justify-center overflow-hidden bg-background">
        {/*
          Mismo wordmark real que el header (`public/logo-wordmark.png`,
          ver logo.tsx) en vez del texto "ANKIT" — pedido explícito del
          cliente: que el isotipo real aparezca tanto acá como en el
          header. `motion.img` (no `motion.span`) porque ahora es una
          imagen; se anima con los mismos valores `opacity`/`scale` de
          siempre, sin tocar esa lógica.

          Ancho por clamp, no font-size: el asset es 710×127px (≈5.6:1,
          bastante más "achatado" que las proporciones del texto en
          Archivo), así que reusar el clamp de font-size tal cual habría
          dejado el wordmark con un tamaño que no corresponde a su forma
          real. clamp(12rem, 66vw, 50rem) reproduce el mismo rango visual
          que tenía el texto (56px–240px de alto de letra) pero calculado
          sobre el ANCHO de esta imagen en vez de un tamaño de fuente:
          3.5rem/15rem de alto de texto × ~3.3 (proporción ancho:alto
          típica de "ANKIT" en Archivo Bold con este tracking) ≈
          11.5rem/49.5rem de ancho — redondeado a 12rem/50rem. object-
          contain + h-auto para que la proporción real del PNG (5.6:1)
          mande, no una altura fija que lo distorsione.
        */}
        <motion.img
          src="/logo-wordmark.png"
          alt=""
          style={{ opacity, scale }}
          className="h-auto w-[clamp(12rem,66vw,50rem)] max-w-[90vw] select-none object-contain"
        />
      </div>
    </div>
  )
}
