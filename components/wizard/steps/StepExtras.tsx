"use client"
import { Button } from '@/components/ui/button'
import type { OrderDraft } from '../types'

const extrasList = [
  { id: 'liver', label: 'كبده' },
  { id: 'head', label: 'رأس' },
  { id: 'spices', label: 'بهارات' },
  { id: 'rice', label: 'أرز' }
]

export default function StepExtras({ value, onChange }: { value: OrderDraft; onChange: (p: Partial<OrderDraft>)=>void }) {
  function toggle(id: string) {
    const set = new Set(value.extras)
    set.has(id) ? set.delete(id) : set.add(id)
    onChange({ extras: Array.from(set) })
  }
  return (
    <div className="space-y-4">
      <h2 className="heading-3">إضافات</h2>
      <div className="grid grid-cols-4 gap-2">
        {extrasList.map(e => (
            <Button key={e.id} variant={value.extras.includes(e.id) ? 'brand':'outline'} onClick={()=> toggle(e.id)}>{e.label}</Button>
        ))}
      </div>
    </div>
  )
}
