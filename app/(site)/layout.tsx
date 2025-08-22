import '../styles/globals.css'
import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { Noto_Naskh_Arabic, Inter } from 'next/font/google'

// Arabic primary, Latin fallback
const arabic = Noto_Naskh_Arabic({ subsets: ['arabic'], weight: ['400','500','600','700'], variable: '--font-arabic', display: 'swap' })
const inter = Inter({ subsets: ['latin'], variable: '--font-latin', display: 'swap' })

export const metadata: Metadata = {
  title: 'البيّه – ذبائح مهيأة بجودة راقية',
  description: 'منصة طلب الذبائح واللحوم بخيارات مخصصة وتوصيل سريع. جودة موثوقة وتجربة سهلة.',
  metadataBase: new URL('https://thebayeh.example'),
  alternates: { canonical: '/' },
  openGraph: {
    title: 'البيّه – جودة وتجربة سهلة',
    description: 'اختر واطلب الذبيحة مع تجهيز وتسليم موثوق.',
    url: 'https://thebayeh.example/',
    siteName: 'البيّه',
    images: [
      { url: '/images/brand-hero.svg', width: 1600, height: 900, alt: 'Hero' }
    ],
    locale: 'ar_SA',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'البيّه – ذبائح مهيأة بجودة راقية',
    description: 'اختر واطلب الذبيحة مع تجهيز وتسليم موثوق.',
    images: ['/images/brand-hero.svg']
  }
}

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={`${arabic.variable} ${inter.variable} font-sans`}>
      <head>
        {process.env.NEXT_PUBLIC_SUPABASE_URL && (
          <link rel="preconnect" href={process.env.NEXT_PUBLIC_SUPABASE_URL} crossOrigin="anonymous" />
        )}
        <link rel="preload" as="image" href="/images/brand-hero.svg" fetchPriority="high" />
      </head>
      <body>{children}</body>
    </html>
  )
}
