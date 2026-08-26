import type { Metadata } from "next"
import { PageWrapper } from "@/components/layout/page-wrapper"
import { SistemaHero } from "@/components/sistema/hero"
import { FrameworkSection } from "@/components/sistema/framework-section"
import { PillarsSection } from "@/components/sistema/pillars-section"
import { SistemaProcessSection } from "@/components/sistema/process-section"
import { CTASection } from "@/components/home/cta-section"

export const metadata: Metadata = {
  title: "El sistema — Ankit",
  description:
    "Cinco pilares y cuatro etapas: así es como Ankit diseña, construye y optimiza sistemas de crecimiento para clínicas de implantología y estética oral.",
}

export default function SistemaPage() {
  return (
    <PageWrapper>
      <SistemaHero />
      <FrameworkSection />
      <PillarsSection />
      <SistemaProcessSection />
      <CTASection index="05" />
    </PageWrapper>
  )
}
