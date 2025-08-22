"use client"
import { Button } from '@/components/ui/button'
import type { OrderDraft } from '../types'

const intents = [
  { id: 'naimi', label: 'نعيمي' },
  { id: 'harri', label: 'حري' },
  { id: 'goat', label: 'تيس' },
]
const sizes = [
  { id: 'small', label: 'صغير' },
  { id: 'medium', label: 'متوسط' },
  { id: 'large', label: 'كبير' }
]

export default function StepIntent({ value, onChange }: { value: OrderDraft; onChange: (p: Partial<OrderDraft>)=>void }) {
  return (
    <div className="space-y-6">
      <header>
        <h2 className="heading-3 mb-1">اختيار النوع والحجم</h2>
        <p className="text-textMuted text-sm">اختر نوع الذبيحة والحجم المناسب.</p>
      </header>
      <div className="grid grid-cols-3 gap-2">
        {intents.map(i => (
          <Button key={i.id} variant={value.intent===i.id ? 'brand':'outline'} onClick={()=> onChange({ intent: i.id })}>{i.label}</Button>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-2">
        {sizes.map(s => (
          <Button key={s.id} variant={value.size===s.id ? 'brand':'outline'} onClick={()=> onChange({ size: s.id })}>{s.label}</Button>
        ))}
      </div>
    </div>
  )
}
