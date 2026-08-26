import { ReactNode } from "react"

interface SectionProps {
  children: ReactNode
  className?: string
}

export function Section({
  children,
  className = "",
}: SectionProps) {
  return (
    <section
      className={`relative py-24 md:py-32 xl:py-40 ${className}`}
    >
      {children}
    </section>
  )
}