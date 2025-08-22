"use client"
import { Button } from '@/components/ui/button'
import type { OrderDraft } from '../types'

const cuts = [
  { id: 'full', label: 'كامل' },
  { id: 'half', label: 'نصف' },
  { id: 'mixed', label: 'تجزئة' }
]

export default function StepCut({ value, onChange }: { value: OrderDraft; onChange: (p: Partial<OrderDraft>)=>void }) {
  return (
    <div className="space-y-4">
      <h2 className="heading-3">التقسيم</h2>
      <div className="grid grid-cols-3 gap-2">
        {cuts.map(c => (
          <Button key={c.id} variant={value.cut===c.id ? 'brand':'outline'} onClick={()=> onChange({ cut: c.id })}>{c.label}</Button>
        ))}
      </div>
    </div>
  )
}
