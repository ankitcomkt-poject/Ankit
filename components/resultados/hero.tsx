import { Container } from "@/components/design-system/layout/container"
import { Eyebrow } from "@/components/design-system/typography/eyebrow"
import { OriginButton } from "@/components/design-system/buttons/origin-button"

/**
 * A propósito NO repite el patrón de franja de cifras que usa el Hero
 * de /sistema (5 Pilares / 4 Etapas / 4 Checkpoints). Esas eran cifras
 * estructurales del método, ciertas sin importar cuántos clientes haya.
 * Acá cualquier franja de números sugeriría volumen de casos que
 * todavía no existe — sería la misma trampa de "llenar el espacio"
 * que se corrigió en /sistema, solo que con datos en vez de con
 * tipografía. El espacio se resuelve con el tamaño del titular, no
 * con más elementos.
 */
export function ResultadosHero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-20">
      <Container>
        <Eyebrow accent>Qué entendemos por resultados</Eyebrow>

        <h1 className="mt-7 text-[clamp(3rem,7.4vw,7rem)] font-bold leading-[1.02] tracking-[-0.03em] text-white">
          Un resultado no es una campaña que corrió.
          <br />
          Es un <span className="text-brand-red">negocio que cambió</span>.
        </h1>

        <p className="mt-8 max-w-[62ch] text-lg leading-8 text-white/65 md:text-xl">
          No medimos exposición. Medimos si el negocio factura distinto, si el sistema sigue funcionando
          después de que Ankit deja de estar encima, y si los datos permiten seguir decidiendo bien. Esto es lo
          que hemos visto cuando el sistema funciona.
        </p>

        <div className="mt-9">
          <OriginButton href="/diagnostico" size="lg" variant="primary">
            Agendar diagnóstico
          </OriginButton>
        </div>
      </Container>
    </section>
  )
}
