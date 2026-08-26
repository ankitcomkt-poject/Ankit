export function PageGrid() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
    >
      <div className="mx-auto h-full max-w-[1440px] px-6 md:px-10 xl:px-16">
        <div className="grid h-full grid-cols-12 gap-6">
          {Array.from({ length: 12 }).map((_, index) => (
            <div
              key={index}
              className="h-full border-l border-white/[0.035]"
            />
          ))}
        </div>
      </div>
    </div>
  )
}