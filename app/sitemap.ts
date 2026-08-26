import type { MetadataRoute } from "next"

const BASE_URL = "https://www.ankitco.com"

// "/blog" faltaba acá aunque ya es una página real, indexable, enlazada
// desde header y footer (ver app/blog/page.tsx) — no un placeholder
// oculto tipo not-found. Un sitemap que omite una página pública real
// es un hueco de SEO silencioso: Google la encuentra igual siguiendo el
// link del nav, pero tarda más y no queda garantizado.
const routes = ["", "/sistema", "/soluciones", "/resultados", "/nosotros", "/diagnostico", "/blog", "/terminos"]

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
  }))
}
