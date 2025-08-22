"use client"
import Image from 'next/image'
import { useParallax } from '@/hooks/useParallax'

export default function HeroParallax() {
  const offset = useParallax(40)
  return (
    <div className="relative panel overflow-hidden aspect-[16/9] bg-black">
      <Image
        src="/images/brand-hero.svg"
        alt="مخطط بصري للعلامة يبرز جودة الخدمة"
        fill
        priority
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 50vw"
        className="object-contain p-4 will-change-transform"
        style={{ transform: `translateY(${offset * 0.4}px)` }}
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
    </div>
  )
}
