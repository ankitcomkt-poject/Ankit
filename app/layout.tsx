import type React from "react"
import type { Metadata } from "next"
import { Archivo, DM_Sans, IBM_Plex_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SmoothScroll } from "@/components/smooth-scroll"
import "./globals.css"
import { PageGrid } from "@/components/layout/page-grid"

const archivo = Archivo({
  weight: ["700"],
  subsets: ["latin"],
  variable: "--font-display",
})

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
})
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
})

const SITE_URL = "https://www.ankitco.com"

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Ankit — Diseñamos el sistema, no hacemos marketing",
  description:
    "Ankit construye sistemas de crecimiento para clínicas de implantología y estética oral en Latinoamérica: posicionamiento, captación, conversión, seguimiento y automatización.",
  generator: "v0.app",
  openGraph: {
    title: "Ankit — Diseñamos el sistema, no hacemos marketing",
    description:
      "Ankit construye sistemas de crecimiento para clínicas de implantología y estética oral en Latinoamérica.",
    url: SITE_URL,
    siteName: "Ankit",
    locale: "es_CO",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Ankit — Sistemas de crecimiento" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ankit — Diseñamos el sistema, no hacemos marketing",
    description:
      "Ankit construye sistemas de crecimiento para clínicas de implantología y estética oral en Latinoamérica.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="dark bg-background">
      {/* Sin overflow-x-hidden acá: ya lo tiene html vía globals.css
          (con la explicación completa de por qué body NO puede
          tenerlo también — rompe position:sticky en toda la página,
          ver el comentario en el bloque "body" de globals.css) —
          agregarlo acá como clase de Tailwind en el body sería
          exactamente el mismo bug por la puerta de al lado. */}
      <body
       className={`${archivo.variable} ${dmSans.variable} ${ibmPlexMono.variable} antialiased`}
      >
        <noscript>
          <style>{`[data-reveal]{opacity:1 !important;transform:none !important;}`}</style>
        </noscript>
        <div className="noise-overlay" aria-hidden="true" />
        <PageGrid />
        <SmoothScroll>{children}</SmoothScroll>
        <Analytics />
      </body>
    </html>
  )
}
