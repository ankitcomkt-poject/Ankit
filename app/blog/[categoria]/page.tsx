import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { MDXRemote } from "next-mdx-remote/rsc"
import { PageWrapper } from "@/components/layout/page-wrapper"
import { Container } from "@/components/design-system/layout/container"
import { Section } from "@/components/design-system/layout/section"
import { Breadcrumbs } from "@/components/blog/breadcrumbs"
import { ArticleCard } from "@/components/blog/article-card"
import { ArticleCta } from "@/components/blog/article-cta"
import { mdxComponents } from "@/components/blog/mdx-components"
import { getAllCategories, getArticlesByCategory, getCategoryBySlug } from "@/lib/blog/content"

const SITE_URL = "https://www.ankitco.com"

interface Props {
  params: Promise<{ categoria: string }>
}

// SSG: cada categoría se genera en build time a partir de las carpetas
// reales de content/blog/ — si una carpeta no tiene _pillar.mdx, no
// genera ruta (ver lib/blog/content.ts). Nada de rutas "por si acaso".
export async function generateStaticParams() {
  return getAllCategories().map((category) => ({ categoria: category.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categoria } = await params
  const category = getCategoryBySlug(categoria)
  if (!category) return {}

  const url = `${SITE_URL}/blog/${categoria}`
  return {
    title: `${category.meta.title} — Blog Ankit`,
    description: category.meta.description,
    alternates: { canonical: url },
    openGraph: {
      title: category.meta.title,
      description: category.meta.description,
      url,
      type: "article",
    },
  }
}

export default async function CategoryPage({ params }: Props) {
  const { categoria } = await params
  const category = getCategoryBySlug(categoria)
  if (!category) notFound()

  const articles = getArticlesByCategory(categoria)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: category.meta.title,
    description: category.meta.description,
    datePublished: category.meta.publishedAt,
    dateModified: category.meta.updatedAt,
    author: { "@type": "Organization", name: "Ankit", url: SITE_URL },
    publisher: { "@type": "Organization", name: "Ankit", url: SITE_URL },
    mainEntityOfPage: `${SITE_URL}/blog/${categoria}`,
  }

  return (
    <PageWrapper>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Section className="pt-36 md:pt-44">
        <Container>
          <Breadcrumbs
            items={[
              { label: "Inicio", href: "/" },
              { label: "Blog", href: "/blog" },
              { label: category.meta.title, href: `/blog/${categoria}` },
            ]}
          />

          <h1 className="mt-6 max-w-[26ch] text-[clamp(2.25rem,4.6vw,3.75rem)] font-bold leading-[1.05] tracking-[-0.02em] text-white">
            {category.meta.title}
          </h1>
          <p className="mt-6 max-w-[62ch] text-lg leading-8 text-white/60">{category.meta.description}</p>

          <div className="prose-none mt-10 max-w-[68ch]">
            <MDXRemote source={category.content} components={mdxComponents} />
          </div>

          {articles.length > 0 && (
            <div className="mt-16 border-t border-white/10 pt-12">
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-white/45">
                Artículos de esta guía
              </p>
              <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
                {articles.map((article, i) => (
                  <ArticleCard key={article.slug} article={article} basePath="/blog" delay={i * 100} />
                ))}
              </div>
            </div>
          )}

          <ArticleCta />
        </Container>
      </Section>
    </PageWrapper>
  )
}
