import { cn } from "@/lib/utils"

interface SectionProps {
  children: React.ReactNode
  className?: string
  id?: string
  /**
   * Efecto "cards apilándose" (referencia del cliente, video de una
   * demo de scroll con secciones de esquinas redondeadas cubriendo la
   * anterior). Técnica CSS pura, sin JS de scroll: cada sección con
   * `stack` queda `position: sticky; top: 0` — como la sección
   * siguiente en el documento normal sigue avanzando con el scroll,
   * en algún punto su borde superior llega a `top: 0` y de ahí en
   * adelante la cubre visualmente (orden normal de pintado del DOM,
   * sin necesidad de z-index). Por eso NO hace falta que las
   * secciones "stack" estén todas seguidas — cualquier sección que
   * venga después, tenga o no su propio `stack`, la cubre igual al
   * pasar; lo que cambia es si ESA sección, al llegar su turno,
   * también se queda pegada.
   *
   * `bg-brand-carbon` (un tono del manual, no un color nuevo) en vez
   * del negro base: sin contraste de fondo el "cubrir" no se alcanza
   * a ver — sería un negro tapando otro negro. Esquinas redondeadas
   * arriba solamente, porque es el borde que "entra" cubriendo.
   * `overflow-hidden` recorta cualquier contenido decorativo que
   * sangre fuera de la caja para que el borde redondeado se vea
   * limpio (ver el componente antes de activar `stack` en una
   * sección con elementos decorativos que dependan de sangrar más
   * allá del borde — revisar caso por caso).
   *
   * `lg:sticky` — NO `sticky` a secas (bug real, reportado con foto:
   * una tarjeta se veía "cortada" y la siguiente sección empezaba
   * encima de golpe). El efecto asume que el contenido de la sección
   * entra completo en un alto de pantalla: se queda pegada mostrando
   * lo que entra en el viewport mientras el documento sigue
   * avanzando por debajo, y recién se libera cuando la sección
   * siguiente la tapa. Si el contenido es más alto que el viewport,
   * lo que sobra por debajo nunca llega a mostrarse — no hay scroll
   * interno, la caja no se mueve una vez pegada. En desktop el grid/
   * fila de estas tres secciones (`problema`, `sistema`, `proceso`)
   * entra en una sola fila y cabe sin problema. En mobile, el mismo
   * contenido se reacomoda a columna única o grid de 2 (menos ancho
   * por fila → más filas → más alto), y ahí sí se pasa del alto de
   * pantalla en un teléfono normal — confirmado con captura real.
   * Por eso el efecto arranca recién en `lg`, que es donde se
   * verificó que el contenido entra: abajo de eso la sección es un
   * bloque normal (mismo `bg-background` opaco de siempre, sin
   * sticky), se ve completa así se tarde varios swipes en pasarla, y
   * no se pierde nada por debajo del borde inferior de la pantalla.
   */
  stack?: boolean
}

export function Section({
  children,
  className,
  id,
  stack,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        // bg-background acá (no solo en las "stack"): confirmado con
        // scroll real que una sección "stack" NUNCA se despega de
        // verdad de su position:sticky (su containing block es <main>,
        // del alto de toda la página — no hay ningún punto en que
        // vuelva a flujo normal). Eso está BIEN para el efecto — se
        // queda pintada ahí, tapada por lo que viene después — pero
        // significa que CUALQUIER sección después de una "stack" tiene
        // que ser opaca, o el contenido de la que quedó pegada se
        // alcanza a ver por transparencia detrás/entre el contenido de
        // la nueva (se vio literal en las capturas de verificación:
        // texto de dos secciones distintas superpuesto y legible a la
        // vez). bg-background es el mismo negro que ya se veía antes
        // por heredarlo de body — cero cambio visual en las secciones
        // que no son "stack", solo pasa de transparente a opaco.
        "relative bg-background py-20 md:py-28 xl:py-32",
        stack && "lg:sticky lg:top-0 lg:overflow-hidden lg:rounded-t-[2rem] lg:bg-brand-carbon xl:rounded-t-[3rem]",
        className
      )}
    >
      {children}
    </section>
  )
}