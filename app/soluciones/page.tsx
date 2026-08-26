import type { Metadata } from "next"
import { PageWrapper } from "@/components/layout/page-wrapper"
import { SolucionesHero } from "@/components/soluciones/hero"
import { SolucionesFrameworkSection } from "@/components/soluciones/framework-section"
import { ProblemsSection } from "@/components/soluciones/problems-section"
import { CTASection } from "@/components/home/cta-section"

export const metadata: Metadata = {
  title: "Soluciones — Ankit",
  description:
    "No vendemos servicios por industria, resolvemos problemas concretos: generar demanda, convertir y recuperar oportunidades, automatizar operaciones, o construir el sistema completo.",
}

export default function SolucionesPage() {
  return (
    <PageWrapper>
      <SolucionesHero />
      <SolucionesFrameworkSection />
      <ProblemsSection />
      <CTASection index="04" />
    </PageWrapper>
  )
}
