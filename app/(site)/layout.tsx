import '../styles/globals.css'
import type { ReactNode } from 'react'
import type { Metadata } from 'next'

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

// Nested layout: DO NOT re-declare <html>/<body>; handled by root layout.
export default function SiteLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
