import { cn } from "@/lib/utils"

interface PanelProps {
  children: React.ReactNode
  className?: string
}

export function Panel({
  children,
  className,
}: PanelProps) {
  return (
    <div
      className={cn(
        `
        relative
        border
        border-white/8
        bg-white/[0.015]
        p-10
        lg:p-12
        transition-colors
        duration-300
        `,
        className
      )}
    >
      {children}
    </div>
  )
}