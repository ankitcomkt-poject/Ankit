import { Reveal } from "@/components/design-system/motion/reveal"

export interface Pillar {
  index: string
  title: string
  subtitle: string
}

/**
 * Grid modular — a propósito NO usa flechas ni numeración secuencial
 * como el FlowSteps de la sección 03/08: estos son componentes del
 * sistema que operan en paralelo, no pasos en orden. La forma
 * (secuencia vs. grid) es la que comunica la diferencia, no el texto.
 *
 * Hover reforzado a pedido explícito (referencia en video: tarjetas que
 * "se sienten vivas" al pasar el mouse). Se toma la idea — borde, título
 * e índice pasan al color de marca, con un glow y un tinte de fondo muy
 * sutiles — pero no el cursor personalizado del ejemplo, que el cliente
 * pidió excluir explícitamente. El subtítulo se deja igual (blanco/45)
 * para no saturar de color un bloque de texto secundario.
 *
 * El hover vive en un <div> anidado, no en el className de <Reveal>: Reveal
 * ya inyecta su propia transición (opacity/transform, 700ms) vía cn(), y
 * como twMerge fusiona por propiedad CSS, cualquier `transition-*`/`duration-*`
 * que se le pase por fuera se la pisa entera — el fade-in de entrada dejaría
 * de animarse. Aislar el hover en un hijo evita el choque y de paso separa
 * dos animaciones con timing distinto (entrada 700ms, hover 300ms).
 */
export function PillarCard({ pillar, delay = 0 }: { pillar: Pillar; delay?: number }) {
  return (
    <Reveal delay={delay}>
      <div className="group flex h-full flex-col justify-between border border-white/10 bg-white/[0.015] p-6 transition-[border-color,background-color,box-shadow] duration-300 hover:border-accent/60 hover:bg-brand-red/[0.05] hover:shadow-[0_0_56px_-20px_rgba(198,40,40,0.55)] md:p-7">
        <span className="font-mono text-[12px] text-white/35 transition-colors duration-300 group-hover:text-accent">
          {pillar.index}
        </span>
        <div className="mt-10">
          <p className="text-lg font-semibold leading-tight text-white transition-colors duration-300 group-hover:text-accent md:text-xl">
            {pillar.title}
          </p>
          <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.12em] text-white/45">
            {pillar.subtitle}
          </p>
        </div>
      </div>
    </Reveal>
  )
}
