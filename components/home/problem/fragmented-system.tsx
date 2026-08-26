import { Reveal } from "@/components/design-system/motion/reveal"

interface FlowStep {
  number: string
  label: string
  description: string
  break?: boolean
}

/**
 * Versión final tras comparar dos alternativas con el cliente: un
 * embudo lineal de 5 etapas con una ruptura marcada en la etapa 03
 * (Seguimiento). Se descartó una segunda opción (tarjetas de "ANKIT
 * SISTEMA — ACTIVO" con insignia IA) porque, aunque visualmente sólida,
 * contradecía el mensaje de la sección: presentaba un sistema ya
 * funcionando justo al lado de un texto que argumenta que el marketing
 * está fragmentado. Ese contenido descartado no se perdió — es un buen
 * candidato para `system-section.tsx`, donde "el sistema ya activo" sí
 * es el mensaje correcto.
 *
 * Se conserva el nombre de archivo/export (`fragmented-system.tsx` /
 * `FragmentedSystem`) aunque el concepto ya no es "sistema fragmentado"
 * — cambiarlo hubiera dejado un archivo huérfano sin forma de borrarlo
 * en la carpeta real del cliente (mismo problema que ya vimos con
 * colophon-section.tsx).
 *
 * Ajustes de integración sobre el snippet original del cliente:
 * — Se quitó el encabezado propio del bloque (kicker "El problema" +
 *   título + párrafo): habría duplicado el texto que ya existe en la
 *   columna izquierda de esta misma sección.
 * — rounded-2xl del panel exterior → esquinas rectas, igual que cada
 *   otro panel del sitio (Hero, el Sistema, Diagnóstico...). Los
 *   círculos numerados de cada paso quedaron redondos: es un patrón
 *   visual distinto (marcador de paso en un flujo), funciona como una
 *   segunda excepción puntual a la regla de esquinas rectas, igual que
 *   ya existe una para la cápsula del header.
 * — red-500/red-400/neutral-950 (Tailwind genérico) → los tokens de
 *   marca del sitio (--brand-red vía text-accent/border-accent,
 *   --background vía bg-background).
 * — Se agregó la barra identificadora superior ("Ankit / ...") que ya
 *   usan el diagrama del Hero y el resto de paneles de esta sección,
 *   para mantener esa convención visual entre paneles.
 */
const steps: FlowStep[] = [
  { number: "01", label: "Demanda", description: "Personas interesadas en tu servicio." },
  { number: "02", label: "Contacto", description: "El prospecto inicia una conversación." },
  {
    number: "03",
    label: "Seguimiento",
    description: "Aquí muchas oportunidades se pierden.",
    break: true,
  },
  { number: "04", label: "Conversión", description: "La oportunidad se convierte." },
  { number: "05", label: "Resultado", description: "Una oportunidad que genera negocio." },
]

export function FragmentedSystem() {
  return (
    <div className="overflow-hidden border border-white/10 bg-black/20">
      {/* Identificador superior — misma convención que el diagrama del Hero */}
      <div className="flex h-14 items-center justify-between border-b border-white/10 px-5">
        <div className="flex items-center gap-3">
          <span className="h-1.5 w-1.5 bg-white/25" />
          <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-white/55">
            Ankit / Flujo del problema
          </span>
        </div>
        <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-white/30">5 etapas</span>
      </div>

      <div className="p-6 md:p-10">
        {/* Flujo */}
        <Reveal>
          <div className="relative">
            {/* Línea de conexión */}
            <div className="absolute left-[28px] right-[28px] top-[28px] hidden h-px bg-white/10 md:block" />

            <div className="grid gap-8 md:grid-cols-5 md:gap-0">
              {steps.map((step) => (
                <div key={step.number} className="relative flex flex-col items-start md:items-center">
                  <div
                    className={`relative z-10 flex h-14 w-14 items-center justify-center rounded-full border font-mono text-xs ${
                      step.break
                        ? "border-accent/40 bg-accent/10 text-accent"
                        : "border-white/15 bg-background text-white/70"
                    }`}
                  >
                    {step.number}
                  </div>
                  <div className="mt-5 md:text-center">
                    <p className="text-sm font-medium text-white">{step.label}</p>
                    <p
                      className={`mt-2 text-xs leading-5 ${step.break ? "text-accent/70" : "text-white/40"}`}
                    >
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Conclusión */}
        <Reveal delay={100} className="mt-12 border-t border-white/10 pt-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <p className="max-w-2xl text-sm leading-6 text-white/50">
              Generar demanda es solo el comienzo. Si el sistema no está preparado para gestionar lo que
              ocurre después, parte de esa inversión termina perdiéndose.
            </p>
            <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.18em] text-white/30">
              Demanda → Conversión
            </span>
          </div>
        </Reveal>
      </div>
    </div>
  )
}
