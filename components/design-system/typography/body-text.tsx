import { cn } from "@/lib/utils"

interface BodyTextProps {
  children: React.ReactNode
  className?: string
}

export function BodyText({
  children,
  className,
}: BodyTextProps) {
  return (
    <p
      className={cn(
        `
        max-w-xl
        font-mono
        text-sm
        leading-7
        text-white/55
        `,
        className
      )}
    >
      {children}
    </p>
  )
}