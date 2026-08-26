import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  onClick?: () => void
}

/**
 * "ANKIT" ahora es un link real a "/" — antes era texto estático sin
 * ninguna forma de volver al home desde una página interna salvo el
 * botón atrás del navegador. `onClick` es opcional: lo usa el menú
 * mobile para cerrarse al navegar (mismo componente reutilizado ahí
 * en vez de duplicar el markup).
 *
 * Antes esto era texto (`<span>ANKIT</span>`) con letter-spacing, no
 * el isotipo real — el sitio entero no mostraba la marca en ningún
 * lado, solo tipografía genérica imitándola. `logo-wordmark.png`
 * (`public/`) sale de `Assets/Docs/Imagenes/Recurso 3.png`, en la
 * carpeta de trabajo del cliente — no de los swatches en
 * `logo-variants/` (esos vienen con el fondo ya incluido en el PNG,
 * como piezas de presentación de marca, no como asset listo para
 * usar sobre la cápsula de navegación; habría quedado un rectángulo
 * negro visible detrás). Este archivo sí tiene canal alfa real
 * (blanco + rojo de marca, fondo transparente), confirmado
 * componiéndolo sobre negro antes de usarlo — por eso esta versión
 * (no la negra/roja de `logo-variants`) es la que sirve para header,
 * menú mobile y footer, los tres sobre fondo oscuro.
 *
 * `priority` porque el logo va en el header, visible sin scroll en
 * cada página — candidato típico a LCP, y Next penaliza no marcarlo
 * cuando sí corresponde. `sizes` fijo porque el ancho renderizado no
 * cambia por breakpoint (a diferencia de una imagen de contenido que
 * ocupa distinto % del viewport en mobile vs. desktop).
 */
export function Logo({ className, onClick }: LogoProps) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className={cn("flex items-center transition-opacity duration-200 hover:opacity-70", className)}
    >
      <Image
        src="/logo-wordmark.png"
        alt="Ankit"
        width={710}
        height={127}
        priority
        sizes="140px"
        className="h-7 w-auto"
      />
    </Link>
  )
}
