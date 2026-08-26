import { PageWrapper } from "@/components/layout/page-wrapper"

import { IntroReveal } from "@/components/home/intro-reveal"
import { Hero } from "@/components/home/hero"
import { ProblemSection } from "@/components/home/problem-section"
import { MindsetSection } from "@/components/home/mindset-section"
import { CasesSection } from "@/components/home/cases-section"
import { SystemSection } from "@/components/home/system-section"
import { LimitsSection } from "@/components/home/limits-section"
import { SpecializationSection } from "@/components/home/specialization-section"
import { ProcessSection } from "@/components/home/process-section"
import { FaqSection } from "@/components/home/faq-section"
import { CTASection } from "@/components/home/cta-section"

export default function Page() {
  return (
    <PageWrapper>
      <IntroReveal />
      <Hero />
      <ProblemSection />
      <MindsetSection />
      <CasesSection />
      <SystemSection />
      <LimitsSection />
      <SpecializationSection />
      <ProcessSection />
      <FaqSection />
      <CTASection />
    </PageWrapper>
  )
}