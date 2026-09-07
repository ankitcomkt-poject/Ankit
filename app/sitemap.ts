import type { MetadataRoute } from "next"
import { getAllArticles as getAllBlogArticles, getAllCategories as getAllBlogCategories } from "@/lib/blog/content"
import {
  getAllArticles as getAllImpulsoArticles,
  getAllCategories as getAllImpulsoCategories,
} from "@/lib/impulso-digital/content"

const BASE_URL = "https://www.ankitco.com"

// "/blog" faltaba acá aunque ya es una página real, indexable, enlazada
// desde header y footer (ver app/blog/page.tsx) — no un placeholder
// oculto tipo not-found. Un sitemap que omite una página pública real
// es un hueco de SEO silencioso: Google la encuentra igual siguiendo el
// link del nav, pero tarda más y no queda garantizado.
//
// "/impulso-digital" SÍ se incluye acá aunque todavía no esté enlazada
// desde el nav (ver app/impulso-digital/page.tsx) — es una página real
// y pública, solo que se llega a ella por URL directa por ahora.
const routes = [
  "",
  "/sistema",
  "/soluciones",
  "/resultados",
  "/nosotros",
  "/diagnostico",
  "/blog",
  "/impulso-digital",
  "/terminos",
]

// Categorías y artículos de cada sección se agregan dinámicamente desde
// su propio namespace de contenido (ver lib/blog/content.ts y
// lib/impulso-digital/content.ts) — cada .mdx nuevo entra solo al
// sitemap en el próximo build. Con content/impulso-digital/ todavía
// vacío (solo estructura, sin artículos), esto simplemente no agrega
// nada de esa sección — no es un caso especial que haya que manejar aparte.
export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
  }))

  const blogCategoryEntries = getAllBlogCategories().map((category) => ({
    url: `${BASE_URL}/blog/${category.slug}`,
    lastModified: new Date(category.updatedAt),
  }))

  const blogArticleEntries = getAllBlogArticles().map((article) => ({
    url: `${BASE_URL}/blog/${article.categorySlug}/${article.slug}`,
    lastModified: new Date(article.updatedAt),
  }))

  const impulsoCategoryEntries = getAllImpulsoCategories().map((category) => ({
    url: `${BASE_URL}/impulso-digital/${category.slug}`,
    lastModified: new Date(category.updatedAt),
  }))

  const impulsoArticleEntries = getAllImpulsoArticles().map((article) => ({
    url: `${BASE_URL}/impulso-digital/${article.categorySlug}/${article.slug}`,
    lastModified: new Date(article.updatedAt),
  }))

  return [
    ...staticEntries,
    ...blogCategoryEntries,
    ...blogArticleEntries,
    ...impulsoCategoryEntries,
    ...impulsoArticleEntries,
  ]
}
