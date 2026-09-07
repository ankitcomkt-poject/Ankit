import Link from "next/link"
import { Reveal } from "@/components/design-system/motion/reveal"
import type { ArticleMeta } from "@/lib/content/engine"

/**
 * `showCategory`: en la página de una categoría no hace falta repetir
 * su propio nombre en cada tarjeta (ya está en el H1 de arriba); en el
 * índice general de /blog, donde en el futuro habrá artículos de varias
 * categorías mezclados, sí aporta contexto.
 *
 * `basePath`: igual que en CategoryCard — explícito, no asumido, para
 * que este componente sirva tanto para /blog como para /impulso-digital
 * sin arriesgarse a enlazar un artículo bajo la ruta equivocada.
 */
export function ArticleCard({
  article,
  showCategory = false,
  basePath,
  delay = 0,
}: {
  article: ArticleMeta
  showCategory?: boolean
  basePath: string
  delay?: number
}) {
  return (
    <Reveal
      delay={delay}
      as="article"
      className="border border-white/12 bg-white/[0.015] transition-colors duration-300 hover:border-white/25"
    >
      <Link href={`${basePath}/${article.categorySlug}/${article.slug}`} className="group block px-7 py-7">
        <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em] text-white/45">
          {showCategory && (
            <>
              <span className="text-accent">{article.categoryTitle}</span>
              <span aria-hidden="true">·</span>
            </>
          )}
          <span>{article.readingTimeMinutes} min de lectura</span>
        </p>
        <p className="mt-4 text-lg font-medium leading-snug text-white md:text-xl">{article.title}</p>
        <p className="mt-3 max-w-[54ch] text-base leading-7 text-white/60">{article.description}</p>
        <span className="mt-6 inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.16em] text-white/70 transition-colors group-hover:text-accent">
          <span className="underline decoration-white/25 underline-offset-4 group-hover:decoration-accent">
            Leer artículo
          </span>
          <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </span>
      </Link>
    </Reveal>
  )
}
