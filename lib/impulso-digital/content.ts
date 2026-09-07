import { createContentSource } from "@/lib/content/engine"

export type { CategoryMeta, ArticleMeta } from "@/lib/content/engine"

/**
 * Capa de datos de "Impulso Digital" — sección separada del blog de
 * clínicas, para contenido de posicionamiento/autoridad orientado a
 * otros marketers/agencias, no a dueños de clínicas. Mismo motor que
 * el blog (lib/content/engine.ts), namespace "impulso-digital"
 * (content/impulso-digital/) — deliberadamente su propio directorio,
 * sin relación de datos con content/blog/: getRelatedArticles nunca
 * va a sugerir un artículo de clínicas acá ni viceversa.
 *
 * Etapa actual: solo estructura. content/impulso-digital/ existe sin
 * artículos todavía — igual que el blog en su Fase 0 — hasta que haya
 * señal real de que vale la pena escribir contenido acá.
 */
const source = createContentSource("impulso-digital")

export const getAllCategories = source.getAllCategories
export const getCategoryBySlug = source.getCategoryBySlug
export const getArticlesByCategory = source.getArticlesByCategory
export const getArticleBySlug = source.getArticleBySlug
export const getAllArticles = source.getAllArticles
export const getRelatedArticles = source.getRelatedArticles
