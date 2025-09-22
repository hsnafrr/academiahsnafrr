import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Open_Sans } from "next/font/google"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Suspense } from "react"

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
  display: "swap",
})

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Academia Antiqua - Ancient Wisdom, Modern Learning",
  description:
    "Menemukan rahasia pengetahuan kuno dalam era digital. Platform pembelajaran interaktif dengan gamifikasi untuk mempelajari kearifan para filsuf dan ilmuwan zaman dahulu.",
  keywords: ["pembelajaran online", "filsafat kuno", "matematika kuno", "ilmu pengetahuan", "gamifikasi", "pendidikan"],
  authors: [{ name: "Academia Antiqua Team" }],
  creator: "Academia Antiqua",
  publisher: "Academia Antiqua",
  openGraph: {
    title: "Academia Antiqua - Ancient Wisdom, Modern Learning",
    description: "Menemukan rahasia pengetahuan kuno dalam era digital",
    url: "https://academia-antiqua.com",
    siteName: "Academia Antiqua",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Academia Antiqua - Ancient Wisdom, Modern Learning",
    description: "Menemukan rahasia pengetahuan kuno dalam era digital",
  },
  robots: {
    index: true,
    follow: true,
  },
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id">
      <body className={`font-sans ${playfairDisplay.variable} ${openSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>
          {children}
          <Analytics />
        </Suspense>
      </body>
    </html>
  )
}
