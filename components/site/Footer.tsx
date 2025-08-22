import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="mt-32 border-t bg-backgroundAlt">
      <div className="container py-10 grid gap-8 md:grid-cols-3 text-sm">
        <div className="space-y-2">
          <div className="font-semibold">البيّه</div>
          <p className="text-textMuted text-xs leading-relaxed max-w-xs">جودة وتجربة سهلة لطلب وتجهيز وتسليم الذبائح.</p>
        </div>
        <nav className="space-y-2">
          <div className="font-medium mb-1">روابط</div>
          <ul className="space-y-1">
            <li><Link href="/order" className="hover:opacity-80">ابدأ الطلب</Link></li>
            <li><a href="#quick-presets" className="hover:opacity-80">الطلبات الجاهزة</a></li>
            <li><Link href="/about" className="hover:opacity-80">حول</Link></li>
          </ul>
        </nav>
        <div className="space-y-2">
          <div className="font-medium mb-1">تواصل</div>
          <a href="https://wa.me/966500000000" target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs hover:bg-white">
            <span>دعم واتساب</span>
          </a>
          <div className="text-[11px] text-textMuted">© {new Date().getFullYear()} جميع الحقوق محفوظة</div>
        </div>
      </div>
    </footer>
  )
}
