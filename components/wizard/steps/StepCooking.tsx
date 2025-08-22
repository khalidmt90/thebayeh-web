"use client"
import { Button } from '@/components/ui/button'
import type { OrderDraft } from '../types'

const cookingOptions = [
  { id: 'none', label: 'بدون' },
  { id: 'mandi', label: 'مندي' },
  { id: 'grill', label: 'شوي' }
]

export default function StepCooking({ value, onChange }: { value: OrderDraft; onChange: (p: Partial<OrderDraft>)=>void }) {
  return (
    <div className="space-y-4">
      <h2 className="heading-3">الطبخ</h2>
      <div className="grid grid-cols-3 gap-2">
        {cookingOptions.map(c => (
          <Button key={c.id} variant={value.cooking===c.id ? 'brand':'outline'} onClick={()=> onChange({ cooking: c.id })}>{c.label}</Button>
        ))}
      </div>
    </div>
  )
}
