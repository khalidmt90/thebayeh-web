"use client"
import { Button } from '@/components/ui/button'
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
      <div className="grid grid-cols-3 gap-2">
        {fulfillments.map(f => (
          <Button key={f.id} variant={value.fulfillment===f.id ? 'brand':'outline'} onClick={()=> onChange({ fulfillment: f.id })}>{f.label}</Button>
        ))}
      </div>
    </div>
  )
}
