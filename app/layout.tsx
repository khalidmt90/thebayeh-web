import './styles/globals.css'
import type { Metadata } from 'next'
import { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'البيّه',
  description: 'منصة الذبح والطلبات – الإصدار Next.js (Phase 0)',
  icons: { icon: '/favicon.ico' }
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className="bg-background text-text">
      <body className="min-h-screen font-sans antialiased selection:bg-primary/30">
        {children}
      </body>
    </html>
  )
}
