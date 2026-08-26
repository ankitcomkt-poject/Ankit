import { Container } from "@/components/design-system/layout/container"
import { Eyebrow } from "@/components/design-system/typography/eyebrow"

/**
 * A diferencia de los otros heroes del sitio, este no abre con una
 * afirmación de posicionamiento — abre con la pregunta que organiza
 * toda la página. Soluciones no es un menú de servicios, es un
 * clasificador de problemas: el titular tiene que sonar a eso.
 * Sin CTA propio: la acción de esta página es elegir un bloque más
 * abajo, no agendar todavía — el CTA de cierre llega después de que
 * el visitante ya se ubicó en su problema.
 */
export function SolucionesHero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-20">
      <Container>
        <Eyebrow accent>Antes de elegir, hay que nombrar el problema</Eyebrow>

        <h1 className="mt-7 text-[clamp(3rem,7.4vw,7rem)] font-bold leading-[1.02] tracking-[-0.03em] text-white">
          ¿Qué problema
          <br />
          necesitas <span className="text-brand-red">resolver</span>?
        </h1>

        <p className="mt-8 max-w-[62ch] text-lg leading-8 text-white/65 md:text-xl">
          No vendemos paquetes por industria ni por lista de servicios. El sistema tiene cinco piezas — cuál de
          ellas se activa primero depende de dónde está fallando tu negocio hoy, no de lo que sea más fácil de
          vendernos a nosotros.
        </p>
      </Container>
    </section>
  )
}
