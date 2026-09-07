import type { Metadata } from "next"
import Link from "next/link"
import { PageWrapper } from "@/components/layout/page-wrapper"
import { Container } from "@/components/design-system/layout/container"
import { Section } from "@/components/design-system/layout/section"
import { OriginButton } from "@/components/design-system/buttons/origin-button"
import { CategoryCard } from "@/components/blog/category-card"
import { getAllCategories, getArticlesByCategory } from "@/lib/impulso-digital/content"

export const metadata: Metadata = {
  title: "Impulso Digital — Ankit",
  description:
    "Sistemas de captación con IA, paid media y cómo dirigir una agencia en solitario — de José Manuel, fundador de Ankit.",
}

/**
 * Misma estructura que app/blog/page.tsx (índice dinámico desde el
 * content layer + fallback honesto de "en construcción" mientras no
 * haya categorías) pero apuntando al namespace "impulso-digital" —
 * sección separada, sin cruzarse con /blog. Deliberadamente NO enlazada
 * todavía desde el header/footer (ver components/layout/header/*.tsx y
 * footer.tsx): esos enlaces son la navegación principal que ve un
 * dueño de clínica, y un ítem de nav apuntando a una sección todavía
 * vacía de contenido de posicionamiento no le sirve a esa audiencia —
 * se agrega cuando haya al menos un artículo real.
 */
export default function ImpulsoDigitalIndexPage() {
  const categories = getAllCategories()

  if (categories.length === 0) {
    return (
      <PageWrapper>
        <Section className="flex min-h-[70vh] items-center pt-36 md:pt-44">
          <Container>
            <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-accent">Impulso Digital</p>
            <h1 className="mt-6 max-w-[22ch] text-[clamp(2.5rem,5.4vw,4.25rem)] font-bold leading-[1.05] tracking-[-0.025em] text-white">
              Estamos construyendo esta página.
            </h1>
            <p className="mt-6 max-w-[52ch] text-lg leading-8 text-white/60">
              Todavía no hay artículos publicados aquí. Si buscas contenido sobre captación de pacientes para tu
              clínica, esa parte del blog ya está disponible.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <OriginButton href="/blog" size="lg" variant="primary">
                Ir al blog de clínicas
              </OriginButton>
              <Link
                href="/"
                className="font-mono text-[12px] uppercase tracking-[0.16em] text-white/60 underline decoration-white/25 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
              >
                Volver al inicio
              </Link>
            </div>
          </Container>
        </Section>
      </PageWrapper>
    )
  }

  return (
    <PageWrapper>
      <Section className="pt-36 md:pt-44">
        <Container>
          <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-accent">Impulso Digital</p>
          <h1 className="mt-6 max-w-[26ch] text-[clamp(2.5rem,5.4vw,4.25rem)] font-bold leading-[1.05] tracking-[-0.025em] text-white">
            Sistemas, paid media y cómo dirigir una agencia en solitario.
          </h1>
          <p className="mt-6 max-w-[58ch] text-lg leading-8 text-white/60">
            Lo que aprendo construyendo Ankit — de primera mano, no teoría genérica de marketing.
          </p>

          <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {categories.map((category, i) => (
              <CategoryCard
                key={category.slug}
                category={category}
                basePath="/impulso-digital"
                articleCount={getArticlesByCategory(category.slug).length}
                delay={i * 100}
              />
            ))}
          </div>
        </Container>
      </Section>
    </PageWrapper>
  )
}
