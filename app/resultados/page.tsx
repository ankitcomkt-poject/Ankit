import type { Metadata } from "next"
import { PageWrapper } from "@/components/layout/page-wrapper"
import { ResultadosHero } from "@/components/resultados/hero"
import { ResultadosFrameworkSection } from "@/components/resultados/framework-section"
import { CasesSection } from "@/components/resultados/cases-section"
import { LearningsSection } from "@/components/resultados/learnings-section"
import { CTASection } from "@/components/home/cta-section"

export const metadata: Metadata = {
  title: "Resultados — Ankit",
  description:
    "Un resultado no es una campaña que corrió, es un negocio que cambió. Así es como entendemos y medimos los resultados en Ankit.",
}

export default function ResultadosPage() {
  return (
    <PageWrapper>
      <ResultadosHero />
      <ResultadosFrameworkSection />
      <CasesSection />
      <LearningsSection />
      <CTASection index="05" />
    </PageWrapper>
  )
}
