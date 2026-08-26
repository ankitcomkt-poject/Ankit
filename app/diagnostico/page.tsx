import type { Metadata } from "next"
import { PageWrapper } from "@/components/layout/page-wrapper"
import { DiagnosticoHero } from "@/components/diagnostico/hero"
import { FitSection } from "@/components/diagnostico/fit-section"
import { StartSection } from "@/components/diagnostico/start-section"

export const metadata: Metadata = {
  title: "Diagnóstico — Ankit",
  description:
    "Sin costo, sin compromiso y sin discurso de ventas: una conversación real para entender si tu negocio tiene lo que necesita para que un sistema como el de Ankit funcione.",
}

// A propósito NO reutiliza <CTASection /> al final — esta página ES el
// destino al que apunta ese CTA en el resto del sitio. Cerrarla con el
// mismo "Agenda un diagnóstico" que ya te trajo hasta acá sería un
// enlace circular, no un cierre.
export default function DiagnosticoPage() {
  return (
    <PageWrapper>
      <DiagnosticoHero />
      <FitSection />
      <StartSection />
    </PageWrapper>
  )
}
