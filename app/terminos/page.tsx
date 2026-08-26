import type { Metadata } from "next"
import { PageWrapper } from "@/components/layout/page-wrapper"
import { Container } from "@/components/design-system/layout/container"
import { Section } from "@/components/design-system/layout/section"

export const metadata: Metadata = {
  title: "Términos y condiciones — Ankit",
  description: "Términos y condiciones de uso del sitio y los servicios de Ankit.",
}

/**
 * Placeholder deliberado, no un texto legal inventado. Términos y
 * condiciones reales (manejo de datos por WhatsApp, alcance del
 * servicio, jurisdicción, etc.) son contenido con implicaciones
 * legales reales para el negocio — no algo que deba redactar sin que
 * el cliente confirme qué aplica, idealmente con revisión de un
 * abogado. El link del footer ya no lleva a un 404, pero tampoco
 * publica cláusulas que nadie validó.
 */
export default function TerminosPage() {
  return (
    <PageWrapper>
      <Section className="pt-36 md:pt-44">
        <Container>
          <h1 className="max-w-[24ch] text-[clamp(2.25rem,4.2vw,3.25rem)] font-bold leading-[1.05] tracking-[-0.025em] text-white">
            Términos y condiciones
          </h1>
          <p className="mt-6 max-w-[58ch] text-base leading-7 text-white/65 md:text-lg">
            Estamos terminando de redactar este documento. Si tienes alguna pregunta sobre el manejo de tus
            datos o los términos de nuestros servicios mientras tanto, escríbenos directamente por WhatsApp o
            correo — están en el pie de página.
          </p>
        </Container>
      </Section>
    </PageWrapper>
  )
}
