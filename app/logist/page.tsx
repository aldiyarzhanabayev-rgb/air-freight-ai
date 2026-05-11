'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

type Option = { id:string; airline:string; route:string; transit:string; etaHours:number; priceUsd:number; score:number; label:string; note:string }

export default function LogistPage() {
  const [data, setData] = useState<any>(null)
  const [selected, setSelected] = useState<Option | null>(null)
  const [customPrice, setCustomPrice] = useState('')

  useEffect(() => {
    const stored = localStorage.getItem('latestQuote')
    if (stored) {
      const parsed = JSON.parse(stored)
      setData(parsed)
      setSelected(parsed.options?.[0] || null)
      setCustomPrice(String(parsed.options?.[0]?.priceUsd || ''))
    }
  }, [])

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_right,#1f5d91,transparent_30%),#07152f] px-6 py-8">
      <div className="mx-auto max-w-6xl">
        <Link href="/" className="text-white/70">← Главная</Link>
        <h1 className="mt-8 text-4xl font-black">Кабинет логиста</h1>
        <p className="mt-2 text-white/65">Здесь логист проверяет AI-рекомендации, выбирает маршрут и вручную утверждает финальную цену.</p>
        {!data ? <div className="card mt-8 p-6">Пока нет заявки. Сначала создайте расчёт в кабинете клиента.</div> : (
          <div className="mt-8 grid gap-6 md:grid-cols-[1fr_380px]">
            <section className="space-y-4">
              {data.options.map((o: Option) => <button key={o.id} onClick={()=>{setSelected(o); setCustomPrice(String(o.priceUsd))}} className={`card w-full p-5 text-left ${selected?.id===o.id ? 'ring-2 ring-skyblue' : ''}`}><div className="flex justify-between gap-3"><b>{o.label}: {o.route}</b><span>${o.priceUsd}</span></div><p className="mt-2 text-sm text-white/60">{o.note}</p></button>)}
            </section>
            <aside className="card h-fit p-6">
              <h2 className="text-2xl font-black">Утверждение</h2>
              <div className="mt-5 space-y-3 text-sm text-white/70">
                <p><b>Маршрут:</b> {selected?.route}</p>
                <p><b>ETA:</b> {selected?.etaHours} часов</p>
                <p><b>Transit:</b> {selected?.transit}</p>
              </div>
              <label className="mt-5 block text-sm text-white/70">Финальная цена, USD</label>
              <input className="input mt-2" value={customPrice} onChange={e=>setCustomPrice(e.target.value)} />
              <button onClick={()=>alert('Demo: предложение утверждено. В production здесь будет отправка клиенту/email/личный кабинет.')} className="btn btn-primary mt-4 w-full">Утвердить предложение</button>
              <button onClick={()=>alert('Demo: цена изменена логистом.')} className="btn btn-ghost mt-3 w-full">Сохранить изменение</button>
            </aside>
          </div>
        )}
      </div>
    </main>
  )
}
