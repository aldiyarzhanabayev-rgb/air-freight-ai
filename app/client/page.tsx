'use client'

import { useState } from 'react'
import Link from 'next/link'

type Option = { id:string; airline:string; route:string; transit:string; etaHours:number; priceUsd:number; score:number; label:string; note:string }

export default function ClientPage() {
  const [form, setForm] = useState({ origin: 'Almaty', destination: 'Dubai', weight: '250', cargoType: 'general', urgency: 'balanced' })
  const [options, setOptions] = useState<Option[]>([])
  const [loading, setLoading] = useState(false)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const res = await fetch('/api/quote', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    const data = await res.json()
    setOptions(data.quote || [])
    localStorage.setItem('latestQuote', JSON.stringify({ form, options: data.quote || [], createdAt: new Date().toISOString() }))
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,#1f5d91,transparent_30%),#07152f] px-6 py-8">
      <div className="mx-auto max-w-6xl">
        <Link href="/" className="text-white/70">← Главная</Link>
        <div className="mt-8 grid gap-6 md:grid-cols-[420px_1fr]">
          <form onSubmit={submit} className="card p-6">
            <h1 className="text-3xl font-black">Кабинет клиента</h1>
            <p className="mt-2 text-white/65">Введите данные груза. Система сформирует предварительные варианты для логиста.</p>
            <div className="mt-6 space-y-4">
              <input className="input" placeholder="Откуда" value={form.origin} onChange={e=>setForm({...form, origin:e.target.value})}/>
              <input className="input" placeholder="Куда" value={form.destination} onChange={e=>setForm({...form, destination:e.target.value})}/>
              <input className="input" type="number" placeholder="Вес, кг" value={form.weight} onChange={e=>setForm({...form, weight:e.target.value})}/>
              <select className="input" value={form.cargoType} onChange={e=>setForm({...form, cargoType:e.target.value})}>
                <option value="general">General cargo</option>
                <option value="fragile">Fragile</option>
                <option value="pharma">Pharma</option>
                <option value="dangerous">Dangerous goods</option>
                <option value="valuable">Valuable cargo</option>
              </select>
              <select className="input" value={form.urgency} onChange={e=>setForm({...form, urgency:e.target.value})}>
                <option value="balanced">Balanced</option>
                <option value="fastest">Fastest</option>
                <option value="cheapest">Cheapest</option>
              </select>
              <button className="btn btn-primary w-full" disabled={loading}>{loading ? 'Расчёт...' : 'Получить варианты'}</button>
            </div>
          </form>
          <section className="space-y-4">
            <div className="card p-6"><h2 className="text-2xl font-black">AI варианты</h2><p className="mt-2 text-white/65">Это demo-расчёт. Реальный API рейсов можно подключить позже.</p></div>
            {options.map(o => <div key={o.id} className="card p-5"><div className="flex flex-wrap justify-between gap-3"><h3 className="text-xl font-bold">{o.label}: {o.airline}</h3><span className="rounded-full bg-skyblue px-3 py-1 text-sm font-bold text-navy">${o.priceUsd}</span></div><p className="mt-3 text-white/70">{o.route}</p><div className="mt-4 grid grid-cols-3 gap-3 text-sm"><div className="rounded-xl bg-white/10 p-3">ETA: <b>{o.etaHours}h</b></div><div className="rounded-xl bg-white/10 p-3">Transit: <b>{o.transit}</b></div><div className="rounded-xl bg-white/10 p-3">Score: <b>{o.score}%</b></div></div><p className="mt-3 text-white/60">{o.note}</p></div>)}
          </section>
        </div>
      </div>
    </main>
  )
}
