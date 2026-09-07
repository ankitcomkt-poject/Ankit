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
import { getAllArticles, getArticleBySlug, getRelatedArticles } from "@/lib/blog/content"

const SITE_URL = "https://www.ankitco.com"

interface Props {
  params: Promise<{ categoria: string; articulo: string }>
}

export async function generateStaticParams() {
  return getAllArticles().map((article) => ({ categoria: article.categorySlug, articulo: article.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categoria, articulo } = await params
  const article = getArticleBySlug(categoria, articulo)
  if (!article) return {}

  const url = `${SITE_URL}/blog/${categoria}/${articulo}`
  const image = article.meta.coverImage ?? "/og-image.png"
  return {
    title: `${article.meta.title} — Blog Ankit`,
    description: article.meta.description,
    alternates: { canonical: url },
    openGraph: {
      title: article.meta.title,
      description: article.meta.description,
      url,
      type: "article",
      publishedTime: article.meta.publishedAt,
      modifiedTime: article.meta.updatedAt,
      images: [{ url: image }],
    },
  }
}

export default async function ArticlePage({ params }: Props) {
  const { categoria, articulo } = await params
  const article = getArticleBySlug(categoria, articulo)
  if (!article) notFound()

  // Enlace hacia la Pillar Page (punto 5 del plan: "Satélite → Pillar"
  // es uno de los cuatro tipos de enlace interno obligatorios). Se
  // resuelve acá, garantizado en cada artículo, en vez de depender de
  // que quien escriba se acuerde de ponerlo a mano dentro del MDX.
  const related = getRelatedArticles(categoria, articulo)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.meta.title,
    description: article.meta.description,
    datePublished: article.meta.publishedAt,
    dateModified: article.meta.updatedAt,
    author: { "@type": "Organization", name: "Ankit", url: SITE_URL },
    publisher: { "@type": "Organization", name: "Ankit", url: SITE_URL },
    mainEntityOfPage: `${SITE_URL}/blog/${categoria}/${articulo}`,
    ...(article.meta.coverImage ? { image: `${SITE_URL}${article.meta.coverImage}` } : {}),
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
              { label: article.meta.categoryTitle, href: `/blog/${categoria}` },
              { label: article.meta.title, href: `/blog/${categoria}/${articulo}` },
            ]}
          />

          <h1 className="mt-6 max-w-[26ch] text-[clamp(2.25rem,4.6vw,3.75rem)] font-bold leading-[1.05] tracking-[-0.02em] text-white">
            {article.meta.title}
          </h1>
          <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.2em] text-white/45">
            {article.meta.readingTimeMinutes} min de lectura
          </p>

          <div className="mt-10 max-w-[68ch]">
            <MDXRemote source={article.content} components={mdxComponents} />
          </div>

          <ArticleCta />

          {related.length > 0 && (
            <div className="mt-16 border-t border-white/10 pt-12">
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-white/45">Sigue leyendo</p>
              <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
                {related.map((related, i) => (
                  <ArticleCard key={related.slug} article={related} basePath="/blog" delay={i * 100} />
                ))}
              </div>
            </div>
          )}
        </Container>
      </Section>
    </PageWrapper>
  )
}
