import './styles/globals.css'
import type { Metadata } from 'next'
import { ReactNode } from 'react'
import { Noto_Naskh_Arabic, Inter } from 'next/font/google'

// Fonts (moved here so only root layout defines <html>)
const arabic = Noto_Naskh_Arabic({ subsets: ['arabic'], weight: ['400','500','600','700'], variable: '--font-arabic', display: 'swap' })
const inter = Inter({ subsets: ['latin'], variable: '--font-latin', display: 'swap' })

export const metadata: Metadata = {
  title: 'البيّه',
  description: 'منصة الذبح والطلبات – الإصدار Next.js (Phase 0)',
  icons: { icon: '/favicon.ico' }
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={`${arabic.variable} ${inter.variable} bg-background text-text font-sans`}>
      <head>
        {process.env.NEXT_PUBLIC_SUPABASE_URL && (
          <link rel="preconnect" href={process.env.NEXT_PUBLIC_SUPABASE_URL} crossOrigin="anonymous" />
        )}
        <link rel="preload" as="image" href="/images/brand-hero.svg" fetchPriority="high" />
      </head>
      <body className="min-h-screen antialiased selection:bg-primary/30">{children}</body>
    </html>
  )
}
