# Contenido del blog

Cada macrocluster (categoría) es una carpeta acá dentro. El nombre de la
carpeta es el slug que sale en la URL: `content/blog/pacientes-y-crecimiento/`
se sirve en `/blog/pacientes-y-crecimiento`.

```
content/blog/
  pacientes-y-crecimiento/
    _pillar.mdx                        → /blog/pacientes-y-crecimiento
    por-que-se-pierden-pacientes.mdx   → /blog/pacientes-y-crecimiento/por-que-se-pierden-pacientes
    cuanto-cuesta-seguimiento.mdx      → /blog/pacientes-y-crecimiento/cuanto-cuesta-seguimiento
```

Una carpeta sin `_pillar.mdx` no genera ninguna ruta — ni la categoría
ni sus artículos aparecen en `/blog`, en el sitemap, ni en build
(`lib/blog/content.ts` la ignora en silencio, a propósito: así se puede
dejar una carpeta a medio escribir sin que rompa nada).

## `_pillar.mdx` (la Pillar Page del macrocluster)

```mdx
---
title: "Título completo de la guía"
description: "Meta description real, 150-160 caracteres — esto es lo que se ve en Google."
publishedAt: "2026-09-04"
updatedAt: "2026-09-04"
---

Contenido de la guía completa. Puede (y debería) enlazar a sus
artículos satélite con links normales de Markdown:
[cómo hacer seguimiento de pacientes](/blog/pacientes-y-crecimiento/como-hacer-seguimiento).
```

## `<slug>.mdx` (un artículo satélite)

```mdx
---
title: "Título del artículo"
description: "Meta description real, 150-160 caracteres."
publishedAt: "2026-09-04"
updatedAt: "2026-09-04"
coverImage: "/blog/nombre-imagen.png"   # opcional — si no se pone, usa /og-image.png
related: ["otro-slug-en-la-misma-categoria"]  # opcional — si no se pone, se completa solo con los demás artículos de la categoría
---

Contenido del artículo.
```

`updatedAt` es opcional en los dos casos — si no se pone, se asume
igual a `publishedAt`. Cámbialo solo cuando de verdad se reescriba el
contenido, no en cada typo corregido — es lo que Google y los lectores
usan para saber si vale la pena releerlo.

## Reglas que ya vienen resueltas por el sistema, no hay que repetirlas a mano

- El enlace hacia la Pillar Page y el bloque de CTA hacia `/diagnostico`
  se agregan solos al final de cada artículo (ver `ArticleCta` en
  `components/blog/article-cta.tsx`) — no hace falta escribirlos en el
  MDX.
- `/blog`, el sitemap y el `BreadcrumbList` estructurado se actualizan
  solos con cada `.mdx` nuevo — no hay que tocar código para publicar.
- Enlaces internos DENTRO del cuerpo (hacia otro artículo, hacia una
  landing comercial específica) sí hay que ponerlos a mano donde tengan
  sentido — eso es criterio editorial, no algo que el sistema pueda
  inventar por ti. Regla práctica del plan original: 1 link a la Pillar,
  2-4 a artículos relacionados, 1 a una página comercial cuando aplique.

## Lo que NO se automatiza — sigue siendo trabajo real

Nada de esto reemplaza escribir contenido verificado y con criterio real
— ver el punto 5 del plan original ("contenido generado por IA sin
revisión" es el error #1 de la lista). El sistema solo se encarga de que,
una vez el artículo esté escrito y revisado, publicarlo sea agregar un
archivo — no de que el artículo en sí sea bueno.
