"use client"
import { OptionCard } from '../OptionCard'
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
      <div className="grid grid-cols-3 gap-3">
        {cookingOptions.map(c => (
          <OptionCard key={c.id} value={c.id} title={c.label} selected={value.cooking===c.id || (c.id==='none' && !value.cooking)} onSelect={v=> onChange({ cooking: v==='none'? undefined : v })} size="sm" />
        ))}
      </div>
    </div>
  )
}
