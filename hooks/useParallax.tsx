"use client"
import { useEffect, useState } from 'react'

export function useParallax(max = 30) {
  const [offset, set] = useState(0)
  useEffect(()=>{
    const onScroll = () => {
      const y = window.scrollY
      set(Math.min(max, y * 0.15))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return ()=> window.removeEventListener('scroll', onScroll)
  }, [max])
  return offset
}
