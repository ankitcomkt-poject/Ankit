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
import { getAllCategories, getArticlesByCategory, getCategoryBySlug } from "@/lib/impulso-digital/content"

const SITE_URL = "https://www.ankitco.com"

/**
 * El CTA por defecto ("¿quieres ver cómo funciona un sistema como este en
 * tu negocio?") asume un lector dueño de un negocio de servicios — encaja
 * en los hubs de sistemas/paid media, pero no en uno sobre dirigir una
 * agencia, donde el lector probable es otro marketer, no un comprador. Un
 * mapa simple por slug en vez de forzar el mismo texto en los tres hubs.
 */
const CTA_HEADLINES: Record<string, string> = {
  "construir-una-agencia-en-solitario":
    "¿Diriges un negocio de servicios y quieres ver cómo funciona un sistema real de captación? Agenda un diagnóstico gratuito.",
}
const DEFAULT_CTA_HEADLINE =
  "¿Quieres ver cómo funciona un sistema como este en tu negocio? Agenda un diagnóstico gratuito."

interface Props {
  params: Promise<{ categoria: string }>
}

export async function generateStaticParams() {
  return getAllCategories().map((category) => ({ categoria: category.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categoria } = await params
  const category = getCategoryBySlug(categoria)
  if (!category) return {}

  const url = `${SITE_URL}/impulso-digital/${categoria}`
  return {
    title: `${category.meta.title} — Impulso Digital`,
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

export default async function ImpulsoDigitalCategoryPage({ params }: Props) {
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
    author: { "@type": "Person", name: "José Manuel", url: SITE_URL },
    publisher: { "@type": "Organization", name: "Ankit", url: SITE_URL },
    mainEntityOfPage: `${SITE_URL}/impulso-digital/${categoria}`,
  }

  return (
    <PageWrapper>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Section className="pt-36 md:pt-44">
        <Container>
          <Breadcrumbs
            items={[
              { label: "Inicio", href: "/" },
              { label: "Impulso Digital", href: "/impulso-digital" },
              { label: category.meta.title, href: `/impulso-digital/${categoria}` },
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
                  <ArticleCard key={article.slug} article={article} basePath="/impulso-digital" delay={i * 100} />
                ))}
              </div>
            </div>
          )}

          <ArticleCta headline={CTA_HEADLINES[categoria] ?? DEFAULT_CTA_HEADLINE} />
        </Container>
      </Section>
    </PageWrapper>
  )
}
