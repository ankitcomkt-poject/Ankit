import { Container } from "@/components/design-system/layout/container"
import { Eyebrow } from "@/components/design-system/typography/eyebrow"
import { ThesisDiagram } from "./thesis-diagram"

/**
 * Único hero del sitio con apoyo visual en vez de quedarse solo en
 * tipografía — decisión explícita del cliente, no relleno: acá sí hay
 * algo real que mostrar (la tesis fundacional), a diferencia de otras
 * páginas donde agregar un elemento visual hubiera sido inventar
 * contenido para llenar espacio.
 */
export function NosotrosHero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-20">
      <Container>
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:items-center lg:gap-10">
          <div className="lg:col-span-7">
            <Eyebrow accent>Nosotros</Eyebrow>

            <h1 className="mt-7 text-[clamp(2.75rem,5.6vw,5.25rem)] font-bold leading-[1.05] tracking-[-0.03em] text-white">
              No construimos marketing. Construimos sistemas para que el crecimiento deje de depender de la{" "}
              <span className="text-brand-red">improvisación</span>.
            </h1>

            <p className="mt-8 max-w-[56ch] text-lg leading-8 text-white/65 md:text-xl">
              Ankit nace de una idea sencilla: generar demanda no sirve de mucho si el negocio no está
              preparado para convertirla, gestionarla y aprender de ella.
            </p>
          </div>

          <div className="lg:col-span-5">
            <ThesisDiagram />
          </div>
        </div>
      </Container>
    </section>
  )
}
