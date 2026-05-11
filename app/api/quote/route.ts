import { NextResponse } from 'next/server'
import { generateQuote } from '@/lib/pricing'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const quote = generateQuote({
      origin: body.origin || 'Almaty',
      destination: body.destination || 'Dubai',
      weight: Number(body.weight || 100),
      cargoType: body.cargoType || 'general',
      urgency: body.urgency || 'balanced'
    })

    return NextResponse.json({
      success: true,
      mode: 'demo',
      message: 'Demo AI recommendation generated. Connect real flight API later through environment variables.',
      quote
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 })
  }
}
