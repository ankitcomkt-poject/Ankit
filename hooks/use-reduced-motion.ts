import * as React from "react"

/**
 * El `useReducedMotion` de framer-motion (13.0.0, ver package.json) no
 * reacciona a `prefers-reduced-motion: reduce` en este proyecto —
 * confirmado: `window.matchMedia("(prefers-reduced-motion: reduce)").matches`
 * sí da `true`, pero el hook de la librería se queda en `false`/`null`
 * de todos modos. En vez de depender de eso (y dejar el fallback de
 * movimiento reducido de IntroReveal y Hero silenciosamente inerte),
 * mismo patrón que ya usa `useIsMobile` acá al lado: matchMedia propio,
 * con listener para el caso (raro pero posible) de que el usuario
 * cambie la preferencia del sistema con la pestaña abierta.
 */
export function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false)

  React.useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)")
    const onChange = () => setPrefersReducedMotion(mql.matches)
    onChange()
    mql.addEventListener("change", onChange)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return prefersReducedMotion
}
