import { Container } from "@/components/design-system/layout/container"
import { Eyebrow } from "@/components/design-system/typography/eyebrow"

/**
 * Único hero del sitio que no tiene que convencer a nadie de nada —
 * quien llega acá ya vio Sistema, Soluciones, Resultados o Nosotros.
 * Su trabajo es aclarar qué es esta conversación específica, no
 * repetir el posicionamiento. Sin diagrama ni cifras: esas ya
 * cumplieron su función en otras páginas, acá solo estorbarían.
 */
export function DiagnosticoHero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-20">
      <Container>
        <Eyebrow accent>Antes de empezar</Eyebrow>

        <h1 className="mt-7 max-w-[20ch] text-[clamp(2.75rem,6vw,5.5rem)] font-bold leading-[1.05] tracking-[-0.03em] text-white">
          Esto no es una llamada de ventas. Es una <span className="text-brand-red">evaluación real</span>.
        </h1>

        <p className="mt-8 max-w-[60ch] text-lg leading-8 text-white/65 md:text-xl">
          Sin costo, sin compromiso y sin discurso de ventas. Es una conversación para entender si tu negocio
          tiene lo que necesita para que un sistema como el de Ankit funcione — y para decírtelo con honestidad,
          incluso si la respuesta es que no.
        </p>
      </Container>
    </section>
  )
}
