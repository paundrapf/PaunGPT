import { cn } from "@/lib/utils"
import { Inter } from "next/font/google"
import type { ReactNode } from "react"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "PaunGPT",
  description: "Ini Adalah Chatbot Ujicoba dari gua.",
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body
        className={cn(
          "min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-foreground antialiased",
          inter.className,
        )}
      >
        {children}
      </body>
    </html>
  )
}

