"use client"
// Phase 7: Replace legacy button grids with branded OptionCard components
import { OptionCard } from '../OptionCard'
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
      <div className="grid grid-cols-3 gap-3">
        {intents.map(i => (
          <OptionCard key={i.id} value={i.id} title={i.label} selected={value.intent===i.id} onSelect={v=> onChange({ intent: v })} size="sm" />
        ))}
      </div>
      <div className="grid grid-cols-3 gap-3">
        {sizes.map(s => (
          <OptionCard key={s.id} value={s.id} title={s.label} selected={value.size===s.id} onSelect={v=> onChange({ size: v })} size="sm" />
        ))}
      </div>
    </div>
  )
}
