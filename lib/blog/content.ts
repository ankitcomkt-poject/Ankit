import { createContentSource } from "@/lib/content/engine"

export type { CategoryMeta, ArticleMeta } from "@/lib/content/engine"

/**
 * Capa de datos del blog de clínicas ("Pacientes y crecimiento") —
 * wrapper delgado sobre el motor genérico (lib/content/engine.ts),
 * fijado al namespace "blog" (content/blog/). La API pública se
 * mantiene igual a como estaba antes de que existiera el motor
 * genérico, así que nada en app/blog/* tuvo que cambiar al extraerlo.
 *
 * Estructura esperada (sin cambios):
 *   content/blog/<categoria>/_pillar.mdx       ← Pillar Page del macrocluster
 *   content/blog/<categoria>/<articulo>.mdx    ← artículo satélite
 * Ver content/blog/README.md para el detalle de cómo escribir uno.
 */
const source = createContentSource("blog")

export const getAllCategories = source.getAllCategories
export const getCategoryBySlug = source.getCategoryBySlug
export const getArticlesByCategory = source.getArticlesByCategory
export const getArticleBySlug = source.getArticleBySlug
export const getAllArticles = source.getAllArticles
export const getRelatedArticles = source.getRelatedArticles
