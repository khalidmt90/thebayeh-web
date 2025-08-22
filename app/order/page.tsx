import WizardRoot from '@/components/wizard/WizardRoot'
import type { Metadata } from 'next'

// Phase 8: Dedicated metadata for /order route (SEO + social share)
export const metadata: Metadata = {
  title: 'ابدأ الطلب – البيّه',
  description: 'كوّن طلب الذبيحة بخيارات الحجم، التقسيم، الطبخ، والإضافات مع تحديد الموعد.',
  openGraph: {
    title: 'ابدأ الطلب – البيّه',
    description: 'تهيئة كاملة للطلب بخطوات بسيطة.',
    url: 'https://thebayeh.example/order',
    images: [ { url: '/images/brand-hero.svg', width: 1200, height: 630, alt: 'Order Configuration' } ]
  },
  alternates: { canonical: '/order' }
}

// Server component: extracts search params & passes primitive prefill to client wizard.
export default function OrderPage({ searchParams }: { searchParams: Record<string,string|string[]|undefined> }) {
  function pick(key: string) {
    const v = searchParams[key]
    return Array.isArray(v) ? v[0] : v || undefined
  }
  const prefill = {
    intent: pick('intent'),
    size: pick('size'),
    cut: pick('cut'),
    fulfillment: pick('fulfillment'),
    cooking: pick('cooking'),
    extras: (pick('extras') || '')?.split(',').filter(Boolean) ?? [],
    date: pick('date'),
    time: pick('time')
  }
  return <WizardRoot prefill={prefill} />
}