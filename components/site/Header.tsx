"use client"
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(()=>{
    const onScroll = () => setScrolled(window.scrollY>8)
    onScroll(); window.addEventListener('scroll', onScroll)
    return ()=> window.removeEventListener('scroll', onScroll)
  },[])
  return (
    <header className={`sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/75 bg-white/90 transition-shadow ${scrolled?'shadow-sm':''}`}>
      <div className="container h-16 flex items-center gap-6">
        <Link href="/" className="font-bold text-lg tracking-tight">البيّه</Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a href="#quick-presets" className="hover:opacity-80">الطلبات الجاهزة</a>
        </nav>
        <div className="ms-auto flex items-center gap-3">
          <Link href="/order"><Button variant="brand" size="sm" className="h-11 px-6 font-semibold">ابدأ الطلب</Button></Link>
        </div>
      </div>
    </header>
  )
}
