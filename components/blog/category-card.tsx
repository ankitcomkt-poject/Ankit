import Link from "next/link"
import { Reveal } from "@/components/design-system/motion/reveal"
import type { CategoryMeta } from "@/lib/content/engine"

/**
 * `basePath`: de qué sección es esta tarjeta ("/blog" o
 * "/impulso-digital") — explícito y obligatorio en vez de asumir
 * "/blog" por defecto, para que nunca quede ambiguo desde qué índice
 * se está llamando este componente compartido entre las dos secciones.
 */
export function CategoryCard({
  category,
  articleCount,
  basePath,
  delay = 0,
}: {
  category: CategoryMeta
  articleCount: number
  basePath: string
  delay?: number
}) {
  return (
    <Reveal delay={delay} className="border border-white/12 bg-white/[0.015] transition-colors duration-300 hover:border-white/25">
      <Link href={`${basePath}/${category.slug}`} className="group block px-7 py-7">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-accent">
          {articleCount} {articleCount === 1 ? "artículo" : "artículos"}
        </p>
        <p className="mt-4 text-xl font-medium leading-snug text-white md:text-2xl">{category.title}</p>
        <p className="mt-3 max-w-[54ch] text-base leading-7 text-white/60">{category.description}</p>
        <span className="mt-6 inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.16em] text-white/70 transition-colors group-hover:text-accent">
          <span className="underline decoration-white/25 underline-offset-4 group-hover:decoration-accent">
            Explorar
          </span>
          <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </span>
      </Link>
    </Reveal>
  )
}
