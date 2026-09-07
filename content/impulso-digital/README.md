# Contenido de Impulso Digital

Misma mecánica que `content/blog/README.md` — mismo motor de contenido
(`lib/content/engine.ts`), namespace distinto (`impulso-digital`), cero
relación de datos con `content/blog/`: ningún artículo de acá se va a
sugerir como "relacionado" de un artículo de clínicas, ni viceversa.

```
content/impulso-digital/
  sistemas-de-captacion-con-ia/
    _pillar.mdx                              → /impulso-digital/sistemas-de-captacion-con-ia
    que-es-un-agente-de-ia-en-whatsapp.mdx   → /impulso-digital/sistemas-de-captacion-con-ia/que-es-un-agente-de-ia-en-whatsapp
  paid-media-que-convierte/
    _pillar.mdx                              → /impulso-digital/paid-media-que-convierte
  construir-una-agencia-en-solitario/
    _pillar.mdx                              → /impulso-digital/construir-una-agencia-en-solitario
```

(Los tres slugs de arriba son la propuesta acordada — ver
`estructura-impulso-digital.md` para el detalle completo de temas por
hub. Una carpeta sin `_pillar.mdx` no genera ninguna ruta, así que se
puede ir creando de a una sin romper nada.)

## Frontmatter — igual que en `/blog`, mismo schema exacto

`_pillar.mdx`:

```mdx
---
title: "Título completo del hub"
description: "Meta description real, 150-160 caracteres."
publishedAt: "2026-09-07"
updatedAt: "2026-09-07"
---
```

`<slug>.mdx` (artículo satélite):

```mdx
---
title: "Título del artículo"
description: "Meta description real, 150-160 caracteres."
publishedAt: "2026-09-07"
updatedAt: "2026-09-07"
coverImage: "/impulso-digital/nombre-imagen.png"   # opcional
related: ["otro-slug-en-el-mismo-hub"]              # opcional
---
```

## Diferencias reales con `/blog` — no es un copy-paste ciego

- El `author` del JSON-LD acá es `Person` ("José Manuel"), no
  `Organization` ("Ankit") — esto es contenido de posicionamiento
  personal, no institucional. Ver `app/impulso-digital/[categoria]/page.tsx`.
- El CTA final usa un texto genérico ("tu negocio"), no "tu clínica" —
  la audiencia de esta sección no son dueños de clínicas.
- Esta sección NO está enlazada todavía desde el header/footer del
  sitio (ver `components/layout/header/*.tsx`). Se agrega cuando haya
  al menos un artículo real — un ítem de nav apuntando a una sección
  vacía no le sirve a nadie, y menos a un visitante que llegó buscando
  el blog de clínicas.

## Antes de escribir el primer artículo acá

Esto quedó como estructura técnica lista, sin contenido — decisión
explícita de esperar señal real de que "Pacientes y crecimiento"
(`/blog`) funciona antes de invertir tiempo en un segundo eje de
contenido no probado. Si estás retomando esto, vale la pena confirmar
que esa señal ya existe antes de ponerte a escribir.
