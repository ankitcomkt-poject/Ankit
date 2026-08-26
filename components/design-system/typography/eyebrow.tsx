import type React from "react"
import { cn } from "@/lib/utils"

interface EyebrowProps {
  children: React.ReactNode
  className?: string
  accent?: boolean
}

export function Eyebrow({
  children,
  className,
  accent = true,
}: EyebrowProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center font-mono text-[12px] uppercase tracking-[0.4em]",
        accent ? "text-accent" : "text-white/45",
        className,
      )}
    >
      {children}
    </span>
  )
}