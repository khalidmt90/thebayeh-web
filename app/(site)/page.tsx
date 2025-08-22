import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

// Simplified subset port: hero, quick presets, occasion strip, trust row.

const quickPresets = [
  { key: 'preset1', titleAr: 'نعيمي صغير', titleEn: 'Small Naeimi', subAr: 'مناسب لعائلة', subEn: 'Family size', href: '/order?intent=naimi&size=small', img: '/images/brand-pattern.svg' },
  { key: 'preset2', titleAr: 'تيس للمطعم', titleEn: 'Goat for Restaurant', subAr: 'للطبخ في مطعم', subEn: 'Restaurant cooking', href: '/order?intent=goat&fulfillment=restaurant', img: '/images/brand-pattern.svg' },
  { key: 'preset3', titleAr: 'حري للمناسبات', titleEn: 'Harri Occasion', subAr: 'لضيوف أكثر', subEn: 'For guests', href: '/order?intent=harri&size=large', img: '/images/brand-pattern.svg' },
  { key: 'preset4', titleAr: 'باقة مشاوي', titleEn: 'Grill Pack', subAr: 'جاهز للشوي', subEn: 'Ready to grill', href: '/order?intent=grill', img: '/images/brand-pattern.svg' },
  { key: 'preset5', titleAr: 'نص ذبيحة مندي', titleEn: 'Half for Mandi', subAr: 'تحضير سريع', subEn: 'Quick cook', href: '/order?intent=mandi&cut=half', img: '/images/brand-pattern.svg' },
  { key: 'preset6', titleAr: 'ذبيحة هدية', titleEn: 'Gift Lamb', subAr: 'إهداء خاص', subEn: 'Special gift', href: '/order?intent=gift', img: '/images/brand-pattern.svg' }
]

const occasions = [
  { key: 'home', icon: '🏠', ar: 'للبيت', en: 'Home Feast', descAr: 'طلبات منزلية مرتبة.', descEn: 'Organized home orders.' },
  { key: 'restaurant', icon: '🍽️', ar: 'للمطاعم', en: 'For Restaurants', descAr: 'تنسيق مع المطاعم.', descEn: 'Restaurant coordination.' },
  { key: 'events', icon: '🎉', ar: 'للمناسبات', en: 'Events', descAr: 'للضيوف والولائم.', descEn: 'Guests & banquets.' },
  { key: 'gifts', icon: '🎁', ar: 'للهدايا', en: 'For Gifting', descAr: 'إهداء مميز.', descEn: 'Special gifting.' }
]

const trustMetrics = [
  { key: 'orders_plus', ar: 'أكثر من ٥٠٠ طلب', en: '500+ Orders' },
  { key: 'quality', ar: 'فحص جودة', en: 'Quality Checked' },
  { key: 'fast_delivery', ar: 'تسليم سريع', en: 'Fast Delivery' },
  { key: 'secure', ar: 'موثوق وآمن', en: 'Secure & Trusted' }
]

export default function SiteHome() {
  const lang = 'ar'
  const ar = lang === 'ar'
  return (
    <main className="space-y-14 pb-16">
      {/* Hero */}
      <section className="px-6 pt-10">
        <div className="grid md:grid-cols-2 gap-8 items-center max-w-7xl mx-auto">
          <div className="space-y-5">
            <h1 className="heading-1 leading-tight">
              {ar ? 'جودة راقية. تجربة سهلة. طلبك بأفضل صورة.' : 'Premium Quality. Effortless Experience.'}
            </h1>
            <p className="text-textMuted text-sm md:text-base max-w-prose leading-relaxed">
              {ar ? 'من اختيار الذبيحة حتى التسليم—كل شيء منظم وواضح.' : 'From selection to delivery—transparent & smooth.'}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/order"><Button variant="brand" className="px-6">{ar ? 'ابدأ طلب مخصص' : 'Start Custom Order'}</Button></Link>
              <a href="#quick-presets" className="inline-flex items-center text-sm font-medium text-primary underline-offset-4 hover:underline">
                {ar ? 'تصفح الطلبات الجاهزة' : 'Browse Presets'}
              </a>
            </div>
            <div className="flex flex-wrap gap-4 text-xs text-textMuted">
              <span>{ar ? 'جودة موثوقة' : 'Trusted Quality'}</span>
              <span>{ar ? 'تجهيز احترافي' : 'Pro Preparation'}</span>
              <span>{ar ? 'تسليم سريع' : 'Fast Delivery'}</span>
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden ring-1 ring-border bg-backgroundAlt aspect-[16/9]">
            <Image src="/images/brand-hero.svg" alt={ar ? 'صورة بطل' : 'Hero'} fill priority sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 50vw" className="object-cover" fetchPriority="high" />
          </div>
        </div>
      </section>

      {/* Quick Presets */}
      <section id="quick-presets" className="px-6" aria-label={ar ? 'الطلبات الجاهزة' : 'Quick Presets'}>
        <div className="max-w-7xl mx-auto">
          <h2 className="heading-3 mb-5">{ar ? 'طلبات جاهزة' : 'Ready Presets'}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {quickPresets.map(p => (
              <Link key={p.key} href={p.href} className="group relative rounded-2xl overflow-hidden border bg-backgroundAlt focus:outline-none focus-visible:shadow-focus-brand">
                <div className="aspect-[4/5] relative">
                  <Image src={p.img} alt="" fill sizes="(max-width:640px) 50vw, (max-width:1024px) 25vw, 160px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                  <div className="absolute bottom-0 w-full p-2 text-[11px] sm:text-xs text-white font-medium leading-tight">
                    <div>{ar ? p.titleAr : p.titleEn}</div>
                    <div className="text-white/70 font-normal">{ar ? p.subAr : p.subEn}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Occasion Strip */}
      <section className="px-6" aria-label={ar ? 'المناسبات' : 'Occasions'}>
        <div className="max-w-7xl mx-auto">
          <h2 className="heading-3 mb-4">{ar ? 'مناسبات واحتياجات' : 'Occasions & Needs'}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {occasions.map((c,i) => (
              <Link key={c.key} href={`/order?occasion=${c.key}`} className="group relative rounded-2xl border bg-backgroundAlt p-4 flex flex-col justify-between overflow-hidden focus:outline-none focus-visible:shadow-focus-brand">
                <div className="flex items-start justify-between mb-2">
                  <div className="text-2xl leading-none">{c.icon}</div>
                  <span className="inline-block rounded-full bg-primary/15 text-black text-[11px] px-2 py-1 font-medium">{ar ? 'جديد' : 'New'}</span>
                </div>
                <div>
                  <h3 className="text-sm font-semibold mb-1">{ar ? c.ar : c.en}</h3>
                  <p className="text-[11px] text-textMuted leading-snug">{ar ? c.descAr : c.descEn}</p>
                </div>
                <div className="mt-3 text-[11px] font-medium text-primary flex items-center gap-1">
                  <span>{ar ? 'ابدأ الآن' : 'Start now'}</span>
                  <span className="transition-transform group-hover:translate-x-0.5">›</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Row */}
      <section className="px-6" aria-label={ar ? 'الثقة والجودة' : 'Trust & Quality'}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center text-sm">
            {trustMetrics.map((m,i) => (
              <div key={m.key} className="rounded-xl border bg-backgroundAlt p-4">
                <div className="text-base font-semibold mb-1">{i===0 ? '★' : '✓'}</div>
                <div className="leading-tight">{ar ? m.ar : m.en}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
