import { ReactNode } from "react"

import { Header } from "./header/header"
import { Footer } from "./footer"

interface PageWrapperProps {
  children: ReactNode
}

export function PageWrapper({
  children,
}: PageWrapperProps) {
  return (
    <>
      <Header />

      <main id="top" className="relative z-10">
        {children}
      </main>

      <Footer />
    </>
  )
}