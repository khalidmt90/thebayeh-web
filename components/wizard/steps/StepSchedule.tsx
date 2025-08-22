"use client"
import type { OrderDraft } from '../types'
import { useId } from 'react'

export default function StepSchedule({ value, onChange }: { value: OrderDraft; onChange: (p: Partial<OrderDraft>)=>void }) {
  const idDate = useId(); const idTime = useId()
  return (
    <div className="space-y-4">
      <h2 className="heading-3">الموعد</h2>
      <div className="grid gap-4 max-w-sm">
        <div className="grid gap-1">
          <label htmlFor={idDate} className="text-sm font-medium">التاريخ</label>
          <input id={idDate} type="date" defaultValue={value.date} onChange={e=> onChange({ date: e.target.value })} className="rounded-md border border-border bg-white px-3 py-2 text-sm" />
        </div>
        <div className="grid gap-1">
          <label htmlFor={idTime} className="text-sm font-medium">الوقت</label>
          <input id={idTime} type="time" defaultValue={value.time} onChange={e=> onChange({ time: e.target.value })} className="rounded-md border border-border bg-white px-3 py-2 text-sm" />
        </div>
      </div>
    </div>
  )
}
