"use client"
import { OptionCard } from '../OptionCard'
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
      <div className="grid grid-cols-3 gap-3">
        {cuts.map(c => (
          <OptionCard key={c.id} value={c.id} title={c.label} selected={value.cut===c.id} onSelect={v=> onChange({ cut: v })} size="sm" />
        ))}
      </div>
    </div>
  )
}
