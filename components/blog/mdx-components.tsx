import Link from "next/link"
import type { MDXRemoteProps } from "next-mdx-remote/rsc"

/**
 * Mapea los elementos que MDX genera a la tipografía que ya usa el
 * resto del sitio (mismos tamaños/colores que un párrafo de Hero o de
 * las secciones del home: text-white/65-70 para cuerpo, text-white
 * para encabezados, `accent` para énfasis) — así un artículo no se ve
 * como una página de blog genérica pegada a un sitio distinto.
 *
 * Deliberadamente NO incluye `h1`: el H1 de cada página lo pone la
 * página misma (título del artículo/categoría fuera del MDX, ver
 * app/blog/[categoria]/page.tsx y .../[articulo]/page.tsx) — un MDX
 * nunca debería traer su propio `# Título` duplicando el H1 real, así
 * que si aparece uno es un error de contenido, no algo que este mapeo
 * deba disimular estilizándolo.
 */
export const mdxComponents: MDXRemoteProps["components"] = {
  h2: (props) => (
    <h2
      className="mt-12 text-[clamp(1.5rem,2.6vw,2.1rem)] font-bold leading-[1.15] tracking-[-0.015em] text-white first:mt-0"
      {...props}
    />
  ),
  h3: (props) => (
    <h3 className="mt-9 text-[1.3rem] font-semibold leading-snug text-white" {...props} />
  ),
  h4: (props) => (
    <h4 className="mt-7 text-[1.05rem] font-semibold leading-snug text-white/90" {...props} />
  ),
  p: (props) => <p className="mt-5 text-base leading-7 text-white/70 md:text-lg md:leading-8" {...props} />,
  ul: (props) => <ul className="mt-5 space-y-2.5 pl-1 text-base leading-7 text-white/70 md:text-lg" {...props} />,
  ol: (props) => (
    <ol className="mt-5 list-decimal space-y-2.5 pl-5 text-base leading-7 text-white/70 md:text-lg" {...props} />
  ),
  li: (props) => (
    <li className="flex gap-2.5 [&>ul]:mt-2.5 [&>ol]:mt-2.5" {...props}>
      <span aria-hidden="true" className="mt-[0.65em] h-1 w-1 shrink-0 rounded-full bg-accent" />
      <span className="flex-1">{props.children}</span>
    </li>
  ),
  a: ({ href = "", ...props }) => {
    const isInternal = href.startsWith("/") || href.startsWith("#")
    if (isInternal) {
      return (
        <Link
          href={href}
          className="text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:decoration-accent"
          {...props}
        />
      )
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:decoration-accent"
        {...props}
      />
    )
  },
  strong: (props) => <strong className="font-semibold text-white" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="mt-6 border-l-2 border-accent/50 pl-5 text-base italic leading-7 text-white/60 md:text-lg"
      {...props}
    />
  ),
  hr: () => <hr className="mt-10 border-white/10" />,
  code: (props) => (
    <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[0.85em] text-white/85" {...props} />
  ),
}
