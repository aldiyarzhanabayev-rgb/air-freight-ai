export type QuoteInput = {
  origin: string
  destination: string
  weight: number
  cargoType: string
  urgency: 'fastest' | 'cheapest' | 'balanced'
}

export type FlightOption = {
  id: string
  airline: string
  route: string
  transit: string
  etaHours: number
  priceUsd: number
  score: number
  label: 'Fastest' | 'Cheapest' | 'Recommended'
  note: string
}

const baseRateByCargo: Record<string, number> = {
  general: 4.2,
  fragile: 5.1,
  pharma: 6.4,
  dangerous: 7.2,
  valuable: 8.5
}

export function generateQuote(input: QuoteInput): FlightOption[] {
  const cleanWeight = Math.max(Number(input.weight || 0), 1)
  const rate = baseRateByCargo[input.cargoType] || baseRateByCargo.general
  const routeFactor = input.destination.toLowerCase().includes('dubai') ? 1.1 : input.destination.toLowerCase().includes('frankfurt') ? 1.25 : 1.35
  const base = cleanWeight * rate * routeFactor

  const options: FlightOption[] = [
    {
      id: 'fast-001',
      airline: 'Air Astana Cargo / Partner Airline',
      route: `${input.origin} → direct/priority → ${input.destination}`,
      transit: '0–1 transit',
      etaHours: 18,
      priceUsd: Math.round(base * 1.32 + 180),
      score: 92,
      label: 'Fastest',
      note: 'Лучший вариант для срочного груза: выше стоимость, меньше время доставки.'
    },
    {
      id: 'cheap-002',
      airline: 'Consolidated Cargo Route',
      route: `${input.origin} → hub consolidation → ${input.destination}`,
      transit: '1–2 transit',
      etaHours: 48,
      priceUsd: Math.round(base * 0.92 + 90),
      score: 81,
      label: 'Cheapest',
      note: 'Самый экономичный вариант, подходит для несрочных отправок.'
    },
    {
      id: 'rec-003',
      airline: 'Optimal Mixed Route',
      route: `${input.origin} → regional hub → ${input.destination}`,
      transit: '1 transit',
      etaHours: 30,
      priceUsd: Math.round(base * 1.08 + 130),
      score: 89,
      label: 'Recommended',
      note: 'Баланс стоимости, скорости и операционного риска. Рекомендуется логисту к проверке.'
    }
  ]

  if (input.urgency === 'fastest') return options.sort((a, b) => a.etaHours - b.etaHours)
  if (input.urgency === 'cheapest') return options.sort((a, b) => a.priceUsd - b.priceUsd)
  return options.sort((a, b) => b.score - a.score)
}
