import Link from "next/link"

export interface BreadcrumbItem {
  label: string
  href: string
}

const SITE_URL = "https://www.ankitco.com"

/**
 * Breadcrumb visual + su propio `BreadcrumbList` en JSON-LD — no dos
 * componentes separados, porque si algún día cambia el texto visible
 * (ej. se acorta un título largo) es fácil que alguien actualice uno y
 * se le olvide el otro, y el schema estructurado quedaría mintiendo
 * sobre la navegación real. Un solo componente, una sola fuente.
 *
 * El último item (la página actual) se muestra sin link — coincide con
 * cómo Google espera un breadcrumb real (el usuario ya está ahí).
 */
export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      item: `${SITE_URL}${item.href}`,
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((item, i) => {
          const isLast = i === items.length - 1
          return (
            <span key={item.href} className="flex items-center gap-2">
              {i > 0 && (
                <span aria-hidden="true" className="text-white/25">
                  /
                </span>
              )}
              {isLast ? (
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/45">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/45 transition-colors hover:text-accent"
                >
                  {item.label}
                </Link>
              )}
            </span>
          )
        })}
      </nav>
    </>
  )
}
