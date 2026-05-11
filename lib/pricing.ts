export function generateQuote(data: {
  origin: string
  destination: string
  weight: number
  cargoType: string
  urgency: string
}) {
  const base = data.weight * 4.2

  return {
    fastest: {
      airline: 'Turkish Cargo',
      eta: '2 days',
      price: Math.round(base * 1.4)
    },
    cheapest: {
      airline: 'Qatar Cargo',
      eta: '5 days',
      price: Math.round(base * 0.9)
    },
    recommended: {
      airline: 'Lufthansa Cargo',
      eta: '3 days',
      price: Math.round(base)
    }
  }
}