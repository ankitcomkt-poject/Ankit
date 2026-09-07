import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"
import readingTime from "reading-time"

/**
 * Motor de contenido MDX genérico, parametrizado por "namespace" —
 * extraído de lib/blog/content.ts al agregar una segunda sección de
 * contenido (Impulso Digital) que necesita el mismo mecanismo
 * (Pillar Page + artículos satélite en MDX, todo en git) pero con su
 * propio directorio, sin compartir nada con el blog de clínicas.
 *
 * Cada namespace vive en content/<namespace>/ y es una isla completa:
 * getRelatedArticles nunca cruza namespaces ni categorías fuera del
 * propio namespace — el aislamiento entre secciones (para no diluir
 * señal temática de ninguna de las dos) se garantiza acá, a nivel de
 * datos, no solo por convención en las páginas que consumen esto.
 *
 * Server-only (usa `fs`) — solo importar desde Server Components.
 */

const PILLAR_FILENAME = "_pillar.mdx"

export interface CategoryMeta {
  slug: string
  title: string
  description: string
  publishedAt: string
  updatedAt: string
}

export interface ArticleMeta {
  slug: string
  categorySlug: string
  categoryTitle: string
  title: string
  description: string
  publishedAt: string
  updatedAt: string
  coverImage?: string
  related?: string[]
  readingTimeMinutes: number
}

export interface ContentSource {
  getAllCategories(): CategoryMeta[]
  getCategoryBySlug(slug: string): { meta: CategoryMeta; content: string } | null
  getArticlesByCategory(categorySlug: string): ArticleMeta[]
  getArticleBySlug(categorySlug: string, articleSlug: string): { meta: ArticleMeta; content: string } | null
  getAllArticles(): ArticleMeta[]
  getRelatedArticles(categorySlug: string, currentSlug: string, limit?: number): ArticleMeta[]
}

export function createContentSource(namespace: string): ContentSource {
  const CONTENT_DIR = path.join(process.cwd(), "content", namespace)

  function categoryDirs(): string[] {
    // Guard explícito: un namespace nuevo (ej. impulso-digital en su
    // etapa de solo-estructura) puede no tener ninguna subcarpeta
    // todavía, o el directorio puede ni existir — eso es el estado
    // correcto de "sin categorías todavía", no un error de build.
    if (!fs.existsSync(CONTENT_DIR)) return []
    return fs
      .readdirSync(CONTENT_DIR, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
      .filter((slug) => fs.existsSync(path.join(CONTENT_DIR, slug, PILLAR_FILENAME)))
  }

  function readPillarRaw(categorySlug: string) {
    const filePath = path.join(CONTENT_DIR, categorySlug, PILLAR_FILENAME)
    const raw = fs.readFileSync(filePath, "utf8")
    return matter(raw)
  }

  function getAllCategories(): CategoryMeta[] {
    return categoryDirs()
      .map((slug) => {
        const { data } = readPillarRaw(slug)
        return {
          slug,
          title: data.title as string,
          description: data.description as string,
          publishedAt: data.publishedAt as string,
          updatedAt: (data.updatedAt as string) ?? (data.publishedAt as string),
        }
      })
      .sort((a, b) => a.title.localeCompare(b.title, "es"))
  }

  function getCategoryBySlug(slug: string): { meta: CategoryMeta; content: string } | null {
    if (!categoryDirs().includes(slug)) return null
    const { data, content } = readPillarRaw(slug)
    return {
      meta: {
        slug,
        title: data.title as string,
        description: data.description as string,
        publishedAt: data.publishedAt as string,
        updatedAt: (data.updatedAt as string) ?? (data.publishedAt as string),
      },
      content,
    }
  }

  function articleFilenames(categorySlug: string): string[] {
    const dir = path.join(CONTENT_DIR, categorySlug)
    if (!fs.existsSync(dir)) return []
    return fs.readdirSync(dir).filter((name) => name.endsWith(".mdx") && name !== PILLAR_FILENAME)
  }

  function readArticleRaw(categorySlug: string, articleSlug: string) {
    const filePath = path.join(CONTENT_DIR, categorySlug, `${articleSlug}.mdx`)
    const raw = fs.readFileSync(filePath, "utf8")
    return matter(raw)
  }

  function toArticleMeta(
    categorySlug: string,
    categoryTitle: string,
    slug: string,
    data: Record<string, unknown>,
    content: string,
  ): ArticleMeta {
    return {
      slug,
      categorySlug,
      categoryTitle,
      title: data.title as string,
      description: data.description as string,
      publishedAt: data.publishedAt as string,
      updatedAt: (data.updatedAt as string) ?? (data.publishedAt as string),
      coverImage: data.coverImage as string | undefined,
      related: data.related as string[] | undefined,
      readingTimeMinutes: Math.max(1, Math.round(readingTime(content).minutes)),
    }
  }

  function getArticlesByCategory(categorySlug: string): ArticleMeta[] {
    const category = getCategoryBySlug(categorySlug)
    if (!category) return []
    return articleFilenames(categorySlug)
      .map((filename) => {
        const slug = filename.replace(/\.mdx$/, "")
        const { data, content } = readArticleRaw(categorySlug, slug)
        return toArticleMeta(categorySlug, category.meta.title, slug, data, content)
      })
      .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
  }

  function getArticleBySlug(categorySlug: string, articleSlug: string): { meta: ArticleMeta; content: string } | null {
    const category = getCategoryBySlug(categorySlug)
    if (!category) return null
    if (!articleFilenames(categorySlug).includes(`${articleSlug}.mdx`)) return null
    const { data, content } = readArticleRaw(categorySlug, articleSlug)
    return { meta: toArticleMeta(categorySlug, category.meta.title, articleSlug, data, content), content }
  }

  function getAllArticles(): ArticleMeta[] {
    return categoryDirs().flatMap((categorySlug) => getArticlesByCategory(categorySlug))
  }

  function getRelatedArticles(categorySlug: string, currentSlug: string, limit = 3): ArticleMeta[] {
    const current = getArticleBySlug(categorySlug, currentSlug)
    const siblings = getArticlesByCategory(categorySlug).filter((a) => a.slug !== currentSlug)

    const explicit = (current?.meta.related ?? [])
      .map((slug) => siblings.find((a) => a.slug === slug))
      .filter((a): a is ArticleMeta => Boolean(a))

    const rest = siblings.filter((a) => !explicit.includes(a))
    return [...explicit, ...rest].slice(0, limit)
  }

  return {
    getAllCategories,
    getCategoryBySlug,
    getArticlesByCategory,
    getArticleBySlug,
    getAllArticles,
    getRelatedArticles,
  }
}
