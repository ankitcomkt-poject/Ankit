import { OriginButton } from "@/components/design-system/buttons/origin-button"

/**
 * El enlace obligatorio hacia una página comercial que el propio plan
 * del cliente pide para cada artículo (punto 20: "el contenido atrae,
 * la landing convierte") — sin esto, cada artículo nuevo sería tráfico
 * que llega y se va, no un paso dentro del embudo hacia /diagnostico.
 * Vive como bloque fijo al final de cada artículo (no depende de que
 * quien escriba se acuerde de insertarlo a mano) — el enlace contextual
 * DENTRO del cuerpo del artículo (un `[link](/diagnostico)` puntual
 * donde tenga sentido según el tema) sigue siendo cosa de quien escribe
 * cada pieza, esto es el piso mínimo garantizado.
 *
 * `headline` es opcional porque el texto por defecto asume audiencia de
 * clínica ("aplica a tu clínica") — correcto para /blog, pero no para
 * una sección como /impulso-digital dirigida a otro tipo de lector;
 * ahí se pasa un texto distinto en vez de reusar el default a la fuerza.
 */
export function ArticleCta({
  headline = "Si quieres ver cómo esto aplica a tu clínica, agenda un diagnóstico gratuito.",
}: {
  headline?: string
} = {}) {
  return (
    <div className="mt-14 border border-white/12 bg-white/[0.02] px-7 py-8 md:px-9 md:py-10">
      <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-accent">Siguiente paso</p>
      <p className="mt-4 max-w-[52ch] text-lg font-medium leading-snug text-white md:text-xl">{headline}</p>
      <div className="mt-6">
        <OriginButton href="/diagnostico" size="md" variant="primary">
          Agenda un diagnóstico
        </OriginButton>
      </div>
    </div>
  )
}
