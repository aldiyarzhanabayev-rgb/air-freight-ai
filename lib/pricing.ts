export type QuoteInput = {
  from: string;
  to: string;
  weight: number;
  cargoType: string;
};

export function calculateQuote(input: QuoteInput) {
  const weight = Number(input.weight) || 0;

  const basePrice = weight * 4.5;
  const urgentPrice = weight * 6.2;
  const economyPrice = weight * 3.8;

  return [
    {
      type: "fastest",
      title: "Fastest option",
      airline: "Turkish Cargo",
      route: `${input.from} → Istanbul → ${input.to}`,
      eta: "2-3 days",
      price: Math.round(urgentPrice),
    },
    {
      type: "cheapest",
      title: "Cheapest option",
      airline: "Qatar Cargo",
      route: `${input.from} → Doha → ${input.to}`,
      eta: "4-6 days",
      price: Math.round(economyPrice),
    },
    {
      type: "recommended",
      title: "Recommended option",
      airline: "Lufthansa Cargo",
      route: `${input.from} → Frankfurt → ${input.to}`,
      eta: "3-4 days",
      price: Math.round(basePrice),
    },
  ];
}