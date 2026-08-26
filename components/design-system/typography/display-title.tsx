import { cn } from "@/lib/utils"

interface DisplayTitleProps {
  children: React.ReactNode
  className?: string
}

export function DisplayTitle({
  children,
  className,
}: DisplayTitleProps) {
  return (
    <h1
      className={cn(
        `
        max-w-[7ch]
        font-light
        uppercase
        tracking-[-0.05em]
        leading-[0.9]
        text-[clamp(4.5rem,8vw,8rem)]
        text-white
        `,
        className
      )}
    >
      {children}
    </h1>
  )
}