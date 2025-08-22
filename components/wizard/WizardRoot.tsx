"use client"
import { useState, useRef, useCallback, useMemo } from 'react'
import type { WizardPrefill, OrderDraft } from './types'
import StepIntent from './steps/StepIntent'
import StepCut from './steps/StepCut'
import StepFulfillment from './steps/StepFulfillment'
import StepCooking from './steps/StepCooking'
import StepExtras from './steps/StepExtras'
import StepSchedule from './steps/StepSchedule'
import StepReview from './steps/StepReview'
import { Button } from '@/components/ui/button'
import clsx from 'clsx'

const STEPS = [
  'intent','cut','fulfillment','cooking','extras','schedule','review'
] as const
type StepKey = typeof STEPS[number]

export default function WizardRoot({ prefill }: { prefill: WizardPrefill }) {
  const initialized = useRef(false)
  const [draft, setDraft] = useState<OrderDraft>(() => ({ extras: [] }))
  const [stepIndex, setStepIndex] = useState(0)

  // apply prefill once (post mount to avoid hydration mismatch if any dynamic logic later)
  if (!initialized.current) {
    initialized.current = true
    setDraft(d => ({ ...d, ...prefill }))
  }

  const step = STEPS[stepIndex]

  const update = useCallback((patch: Partial<OrderDraft>) => {
    setDraft(d => ({ ...d, ...patch }))
  }, [])

  const canNext = useMemo(() => {
    switch(step) {
      case 'intent': return !!draft.intent && !!draft.size
      case 'cut': return !!draft.cut
      case 'fulfillment': return !!draft.fulfillment
      case 'cooking': return true
      case 'extras': return true
      case 'schedule': return !!draft.date && !!draft.time
      case 'review': return true
    }
  }, [step, draft])

  function next() { setStepIndex(i => Math.min(i+1, STEPS.length-1)) }
  function back() { setStepIndex(i => Math.max(i-1, 0)) }

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6 lg:py-10 grid lg:grid-cols-[1fr_340px] gap-8">
      <div>
        <ProgressBar current={stepIndex} total={STEPS.length} />
        <div className="mt-6 rounded-2xl border bg-backgroundAlt p-5 min-h-[420px]">
          {step === 'intent' && <StepIntent value={draft} onChange={update} />}
          {step === 'cut' && <StepCut value={draft} onChange={update} />}
          {step === 'fulfillment' && <StepFulfillment value={draft} onChange={update} />}
          {step === 'cooking' && <StepCooking value={draft} onChange={update} />}
          {step === 'extras' && <StepExtras value={draft} onChange={update} />}
          {step === 'schedule' && <StepSchedule value={draft} onChange={update} />}
          {step === 'review' && <StepReview value={draft} />}
        </div>
        <div className="mt-5 flex items-center justify-between gap-4">
          <Button variant="outline" disabled={stepIndex===0} onClick={back}>{'‹'} {"رجوع"}</Button>
          {step !== 'review' ? (
            <Button variant="brand" disabled={!canNext} onClick={next} className="px-8">{"التالي"} ›</Button>
          ) : (
            <Button variant="brand" disabled={!canNext} className="px-8">{"إرسال الطلب"}</Button>
          )}
        </div>
      </div>
      {/* Desktop Sticky Summary */}
      <aside className="hidden lg:block">
        <div className="sticky top-6 space-y-4">
          <SummaryCard draft={draft} step={step} />
        </div>
      </aside>
      {/* Mobile slide-up summary */}
      <MobileMiniSummary draft={draft} />
    </div>
  )
}

function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = ((current+1)/total)*100
  return (
    <div className="h-2 rounded-full bg-border overflow-hidden">
      <div className="h-full bg-primary transition-all" style={{ width: pct+'%' }} />
    </div>
  )
}

function SummaryCard({ draft, step }: { draft: OrderDraft; step: string }) {
  const est = useMemo(() => estimateTotal(draft), [draft])
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <h3 className="text-lg font-semibold mb-3">ملخص الطلب</h3>
      <ul className="space-y-1 text-sm">
        {draft.intent && <li>النوع: <strong>{draft.intent}</strong></li>}
        {draft.size && <li>الحجم: <strong>{draft.size}</strong></li>}
        {draft.cut && <li>التقسيم: <strong>{draft.cut}</strong></li>}
        {draft.fulfillment && <li>التلبية: <strong>{draft.fulfillment}</strong></li>}
        {draft.cooking && <li>الطبخ: <strong>{draft.cooking}</strong></li>}
        {draft.extras.length>0 && <li>الإضافات: <strong>{draft.extras.join(', ')}</strong></li>}
        {draft.date && draft.time && <li>الموعد: <strong>{draft.date} {draft.time}</strong></li>}
      </ul>
      <div className="mt-4 text-sm">التكلفة التقديرية</div>
      <div className="text-2xl font-bold">{est.toLocaleString('ar-SA')} ر.س</div>
      <div className="mt-2 text-[11px] text-textMuted">سيتأكد السعر النهائي عند المراجعة.</div>
      <div className="mt-4 text-[11px] text-textMuted">الخطوة الحالية: {step}</div>
    </div>
  )
}

function estimateTotal(d: OrderDraft): number {
  let base = 0
  if (d.size === 'small') base += 450
  if (d.size === 'medium') base += 650
  if (d.size === 'large') base += 900
  if (d.cooking) base += 80
  base += d.extras.length * 25
  return base || 0
}

function MobileMiniSummary({ draft }: { draft: OrderDraft }) {
  const [open, setOpen] = useState(false)
  const est = useMemo(()=> estimateTotal(draft), [draft])
  return (
    <div className={clsx('lg:hidden fixed inset-x-0 bottom-0 z-40 transition-transform', open ? '' : '')}>
      <div className="mx-4 mb-4 rounded-2xl border bg-white shadow-lg p-4">
        <div className="flex items-center justify-between" onClick={()=> setOpen(o=>!o)}>
          <div className="text-sm font-medium">الملخص</div>
          <button className="text-xs text-primary" type="button">{open ? 'إخفاء' : 'إظهار'}</button>
        </div>
        {open && (
          <div className="mt-3 space-y-2 text-[11px]">
            <div className="flex flex-wrap gap-2">
              {draft.intent && <span className="px-2 py-1 rounded-full bg-backgroundAlt border">{draft.intent}</span>}
              {draft.size && <span className="px-2 py-1 rounded-full bg-backgroundAlt border">{draft.size}</span>}
              {draft.cut && <span className="px-2 py-1 rounded-full bg-backgroundAlt border">{draft.cut}</span>}
              {draft.fulfillment && <span className="px-2 py-1 rounded-full bg-backgroundAlt border">{draft.fulfillment}</span>}
            </div>
            <div className="text-sm font-semibold">{est.toLocaleString('ar-SA')} ر.س</div>
          </div>
        )}
      </div>
    </div>
  )
}
