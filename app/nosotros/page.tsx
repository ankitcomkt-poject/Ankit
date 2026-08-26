import type { Metadata } from "next"
import { PageWrapper } from "@/components/layout/page-wrapper"
import { NosotrosHero } from "@/components/nosotros/hero"
import { WhySection } from "@/components/nosotros/why-section"
import { BeliefsSection } from "@/components/nosotros/beliefs-section"
import { TeamSection } from "@/components/nosotros/team-section"
import { HowWeWorkSection } from "@/components/nosotros/how-we-work-section"
import { NotUsSection } from "@/components/nosotros/not-us-section"
import { CTASection } from "@/components/home/cta-section"

export const metadata: Metadata = {
  title: "Nosotros — Ankit",
  description:
    "Ankit nace de una idea sencilla: generar demanda no sirve de mucho si el negocio no está preparado para convertirla, gestionarla y aprender de ella.",
}

export default function NosotrosPage() {
  return (
    <PageWrapper>
      <NosotrosHero />
      <WhySection />
      <BeliefsSection />
      <TeamSection />
      <HowWeWorkSection />
      <NotUsSection />
      <CTASection
        index="07"
        heading="Si quieres construir un sistema, empecemos por entender el problema."
        subheading="Antes de hablar de herramientas, campañas o presupuesto, analizamos si existe una oportunidad real para trabajar juntos."
      />
    </PageWrapper>
  )
}
