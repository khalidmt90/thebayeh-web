export type OrderDraft = {
  intent?: string
  size?: string
  cut?: string
  fulfillment?: string
  cooking?: string
  extras: string[]
  date?: string
  time?: string
}

export type WizardPrefill = OrderDraft
