import Image from 'next/image'

export default function Home() {
  return (
    <main className="px-6 py-10 max-w-5xl mx-auto">
      <section className="grid gap-10">
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            منصة <span className="text-primary">البيّه</span> (مرحلة التحويل 0)
          </h1>
          <p className="text-textMuted max-w-2xl mx-auto leading-relaxed">
            هذا الإصدار التمهيدي على Next.js 14 (App Router) يثبت القيود: العلامة الجديدة، RTL، وتهيئة Supabase. لا تزال الوظائف المتقدمة ستأتي في المراحل التالية.
          </p>
        </div>
        <div className="rounded-xl overflow-hidden ring-1 ring-border bg-backgroundAlt">
          <Image
            src="/images/brand-hero.svg"
            alt="Hero"
            width={1600}
            height={900}
            className="w-full h-auto"
            priority
          />
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {features.map(f => (
            <div key={f.title} className="p-5 rounded-lg ring-1 ring-border bg-white flex flex-col gap-3">
              <Image src={f.icon} alt="" width={64} height={64} />
              <h3 className="font-semibold text-lg">{f.title}</h3>
              <p className="text-sm text-textMuted leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

const features = [
  {
    title: 'علامة موحدة',
    desc: 'لوحة ذهب/أسود حديثة مع خلفيات فاتحة وحدود دقيقة.',
    icon: '/images/brand-pattern.svg'
  },
  {
    title: 'RTL افتراضي',
    desc: 'تم البناء مع اتجاه يمين-إلى-يسار أصيل ولغة عربية افتراضية.',
    icon: '/images/brand-pattern.svg'
  },
  {
    title: 'تهيئة Supabase',
    desc: 'عميل متصفح فقط • العمليات ذات الامتياز عبر مسارات خادم لاحقاً.',
    icon: '/images/brand-pattern.svg'
  }
]
