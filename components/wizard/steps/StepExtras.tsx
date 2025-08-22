"use client"
import { OptionCard } from '../OptionCard'
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
      <div className="grid grid-cols-4 gap-3">
        {extrasList.map(e => (
          <div key={e.id}>
            <OptionCard value={e.id} title={e.label} selected={value.extras.includes(e.id)} onSelect={()=> toggle(e.id)} size="sm" />
          </div>
        ))}
      </div>
    </div>
  )
}
