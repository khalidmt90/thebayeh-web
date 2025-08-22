"use client"
import { OptionCard } from '../OptionCard'
import type { OrderDraft } from '../types'

const fulfillments = [
  { id: 'home', label: 'للبيت' },
  { id: 'restaurant', label: 'للمطعم' },
  { id: 'pickup', label: 'استلام' }
]

export default function StepFulfillment({ value, onChange }: { value: OrderDraft; onChange: (p: Partial<OrderDraft>)=>void }) {
  return (
    <div className="space-y-4">
      <h2 className="heading-3">طريقة التلبية</h2>
      <div className="grid grid-cols-3 gap-3">
        {fulfillments.map(f => (
          <OptionCard key={f.id} value={f.id} title={f.label} selected={value.fulfillment===f.id} onSelect={v=> onChange({ fulfillment: v })} size="sm" />
        ))}
      </div>
    </div>
  )
}
