"use client"

import { Reveal } from "@/components/design-system/motion/reveal"

export interface CaseStudy {
  index: string
  title: string
  description: string
  stats: string[]
  ctaLabel: string
  href?: string
}

export function CaseCard({ study, delay = 0 }: { study: CaseStudy; delay?: number }) {
  return (
    <Reveal
      delay={delay}
      className="border border-white/12 bg-white/[0.015] transition-colors duration-300 hover:border-white/25"
    >
      <div className="flex items-start justify-between gap-4 border-b border-dashed border-white/15 px-7 py-6">
        <p className="text-lg font-medium leading-snug text-white md:text-xl">
          <span className="mr-2 font-mono text-[13px] font-normal text-accent">{study.index}</span>
          {study.title}
        </p>
      </div>

      <div className="px-7 py-7">
        <p className="max-w-[54ch] text-base leading-7 text-white/60">{study.description}</p>

        <div className="mt-7 border border-white/10 bg-black/25 p-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-white/45">Resultados</p>
          <ul className="mt-4 space-y-2.5">
            {study.stats.map((stat) => (
              <li key={stat} className="flex gap-2 text-[15px] leading-6 text-white/80">
                <span className="text-accent">•</span>
                <span>{stat}</span>
              </li>
            ))}
          </ul>
        </div>

        <a
          href={study.href ?? "#resultados"}
          className="group mt-6 inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.16em] text-white/70 transition-colors hover:text-accent"
        >
          <span className="underline decoration-white/25 underline-offset-4 group-hover:decoration-accent">
            {study.ctaLabel}
          </span>
          <span
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </a>
      </div>
    </Reveal>
  )
}
