"use client"
import type { OrderDraft } from '../types'

export default function StepReview({ value }: { value: OrderDraft }) {
  return (
    <div className="space-y-4">
      <h2 className="heading-3">مراجعة</h2>
      <p className="text-sm text-textMuted">تحقق من تفاصيل الطلب قبل الإرسال.</p>
      <pre className="text-xs bg-backgroundAlt rounded-lg border p-3 overflow-auto direction-ltr text-left">
        {JSON.stringify(value, null, 2)}
      </pre>
    </div>
  )
}
