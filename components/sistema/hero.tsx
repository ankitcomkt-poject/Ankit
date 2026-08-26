import { Container } from "@/components/design-system/layout/container"
import { Eyebrow } from "@/components/design-system/typography/eyebrow"
import { OriginButton } from "@/components/design-system/buttons/origin-button"

/**
 * Hero de /sistema — deliberadamente más compacto que el del home: esta
 * no es la primera puerta de entrada al sitio, es la página a la que
 * alguien llega ya interesado y quiere ver el mecanismo. El titular
 * reutiliza la frase que ya vive en el <title> del sitio ("Diseñamos
 * el sistema, no hacemos marketing") — ya es la línea de posicionamiento
 * central de Ankit, tenerla aquí en texto grande es coherencia, no
 * repetición.
 *
 * Ajuste: la versión anterior limitaba el titular a max-w-[16ch] — más
 * angosto que el del Hero del home, que sí reparte el ancho con un
 * panel visual. Acá no hay panel, así que ese límite dejaba casi todo
 * el ancho del contenedor vacío a la derecha mientras el texto se veía
 * apretado. En vez de rellenar el espacio con una ilustración que no
 * pidieron, se resuelve con tipografía: el titular crece bastante más
 * (clamp hasta 8rem, sin tope de caracteres) y se agrega una franja de
 * cifras reales de la página — mismo patrón que ya usa el Hero del
 * home con sus proofPoints, no un elemento nuevo inventado para esta
 * página.
 */
const stats = [
  { label: "Pilares", value: "5" },
  { label: "Etapas", value: "4" },
  { label: "Checkpoints", value: "4" },
]

export function SistemaHero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-20">
      <Container>
        <Eyebrow accent>El sistema, pieza por pieza</Eyebrow>

        <h1 className="mt-7 text-[clamp(3.25rem,8vw,8rem)] font-bold leading-[0.98] tracking-[-0.03em] text-white">
          Diseñamos el sistema.
          <br />
          No hacemos <span className="text-brand-red">marketing</span>.
        </h1>

        <p className="mt-8 max-w-[62ch] text-lg leading-8 text-white/65 md:text-xl">
          Cinco piezas que funcionan juntas, cuatro etapas para construirlas, y un ciclo de datos que no se
          detiene. Esto es cómo se ve el sistema por dentro.
        </p>

        <div className="mt-9">
          <OriginButton href="/diagnostico" size="lg" variant="primary">
            Agendar diagnóstico
          </OriginButton>
        </div>

        <div className="mt-14 grid max-w-2xl grid-cols-3 divide-x divide-white/10 border-t border-white/10 pt-7">
          {stats.map((stat) => (
            <div key={stat.label} className="pl-0 first:pl-0 [&:not(:first-child)]:pl-6 sm:[&:not(:first-child)]:pl-10">
              <p className="text-3xl font-bold text-white md:text-4xl">{stat.value}</p>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">{stat.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
