import WizardRoot from '@/components/wizard/WizardRoot'

// Server component: extracts search params & passes primitive prefill to client wizard.
export default function OrderPage({ searchParams }: { searchParams: Record<string,string|string[]|undefined> }) {
  function pick(key: string) {
    const v = searchParams[key]
    return Array.isArray(v) ? v[0] : v || undefined
  }
  const prefill = {
    intent: pick('intent'),
    size: pick('size'),
    cut: pick('cut'),
    fulfillment: pick('fulfillment'),
    cooking: pick('cooking'),
    extras: (pick('extras') || '')?.split(',').filter(Boolean) ?? [],
    date: pick('date'),
    time: pick('time')
  }
  return <WizardRoot prefill={prefill} />
}
