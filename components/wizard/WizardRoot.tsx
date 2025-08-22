"use client"
import { useState, useRef, useCallback, useMemo, useEffect } from 'react'
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

  // hygiene: map intent to meatType only once (extend model in future)
  useEffect(()=>{
    if (initialized.current) return
    initialized.current = true
    setDraft(d => ({ ...d, ...prefill }))
  }, [prefill])

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
    <div className="relative">
      <div className="mx-auto max-w-6xl grid lg:grid-cols-[1fr_360px] gap-10 px-4 lg:px-6 pt-6 pb-40 min-h-[calc(100vh-80px)]">
        <div className="flex flex-col">
          <ProgressHeader current={stepIndex} total={STEPS.length} onBack={back} disableBack={stepIndex===0} />
          <div className="relative mt-6 flex-1 overflow-hidden">
            <div className="h-full w-full relative">
              <Slide active={step==='intent'}><StepIntent value={draft} onChange={update} /></Slide>
              <Slide active={step==='cut'}><StepCut value={draft} onChange={update} /></Slide>
              <Slide active={step==='fulfillment'}><StepFulfillment value={draft} onChange={update} /></Slide>
              <Slide active={step==='cooking'}><StepCooking value={draft} onChange={update} /></Slide>
              <Slide active={step==='extras'}><StepExtras value={draft} onChange={update} /></Slide>
              <Slide active={step==='schedule'}><StepSchedule value={draft} onChange={update} /></Slide>
              <Slide active={step==='review'}><StepReview value={draft} /></Slide>
            </div>
          </div>
        </div>
        <aside className="hidden lg:block pt-16">
          <div className="sticky top-24">
            <SummaryCard draft={draft} step={step} />
          </div>
        </aside>
      </div>
  <div className="fixed inset-x-0 bottom-0 z-50 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 border-t shadow-sm">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center gap-4">
          <Button variant="outline" disabled={stepIndex===0} onClick={back} className="min-w-[120px] h-12">{'‹'} {"رجوع"}</Button>
          {step !== 'review' ? (
            <Button variant="brand" disabled={!canNext} onClick={next} className="flex-1 h-12 text-base font-semibold">{"التالي"} ›</Button>
          ) : (
            <Button variant="brand" disabled={!canNext} className="flex-1 h-12 text-base font-semibold">{"إرسال الطلب"}</Button>
          )}
          <MobileMiniSummary draft={draft} />
        </div>
      </div>
    </div>
  )
}

function ProgressHeader({ current, total, onBack, disableBack }: { current: number; total: number; onBack: ()=>void; disableBack?: boolean }) {
  const pct = ((current+1)/total)*100
  return (
    <div>
      <div className="flex items-center justify-between">
        <button type="button" onClick={onBack} disabled={disableBack} className="text-sm text-textMuted disabled:opacity-40">رجوع</button>
        <div className="text-xs font-medium text-textMuted">الخطوة {current+1} من {total}</div>
      </div>
      <div className="mt-3 h-2 rounded-full bg-border overflow-hidden">
        <div className="h-full bg-primary transition-all" style={{ width: pct+'%' }} />
      </div>
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
    <div className="lg:hidden">
      <button type="button" onClick={()=> setOpen(o=>!o)} className="h-12 px-4 rounded-lg border bg-backgroundAlt text-xs font-medium">
        {open ? 'إخفاء الملخص' : 'عرض الملخص'}
      </button>
      {open && (
        <div className="absolute bottom-16 inset-x-0 mx-4 mb-4 rounded-2xl border bg-white shadow-lg p-4 space-y-3">
          <div className="flex flex-wrap gap-2 text-[11px]">
            {draft.intent && <span className="px-2 py-1 rounded-full bg-backgroundAlt border">{draft.intent}</span>}
            {draft.size && <span className="px-2 py-1 rounded-full bg-backgroundAlt border">{draft.size}</span>}
            {draft.cut && <span className="px-2 py-1 rounded-full bg-backgroundAlt border">{draft.cut}</span>}
            {draft.fulfillment && <span className="px-2 py-1 rounded-full bg-backgroundAlt border">{draft.fulfillment}</span>}
          </div>
          <div className="text-sm font-semibold">{est.toLocaleString('ar-SA')} ر.س</div>
        </div>
      )}
    </div>
  )
}

function Slide({ active, children }: { active: boolean; children: React.ReactNode }) {
  return (
    <div className={clsx('absolute inset-0 transition-all duration-200 ease-out motion-reduce:transition-none', active ? 'opacity-100 translate-x-0 pointer-events-auto':'opacity-0 translate-x-8 pointer-events-none')}>
      <div className="h-full rounded-3xl border bg-backgroundAlt p-6 overflow-y-auto will-change-transform">
        {children}
      </div>
    </div>
  )
}
