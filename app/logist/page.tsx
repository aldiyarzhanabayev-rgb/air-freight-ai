'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

type Option = {
  id?: string
  airline?: string
  route?: string
  transit?: string
  etaHours?: number
  eta?: string
  priceUsd?: number
  price?: number
  score?: number
  label?: string
  note?: string
}

export default function LogistPage() {
  const [data, setData] = useState<any>(null)
  const [selected, setSelected] = useState<Option | null>(null)
  const [customPrice, setCustomPrice] = useState('')

  useEffect(() => {
    const stored = localStorage.getItem('latestQuote')

    if (stored) {
      try {
        const parsed = JSON.parse(stored)

        const rawOptions = Array.isArray(parsed.options)
          ? parsed.options
          : parsed.quote
            ? Object.entries(parsed.quote).map(([key, value]: any) => ({
                id: key,
                label: key,
                airline: value.airline,
                route: value.route || `${parsed.origin || 'Almaty'} → ${parsed.destination || 'Dubai'}`,
                eta: value.eta,
                etaHours: value.etaHours || 0,
                transit: value.transit || '1 transit',
                priceUsd: value.priceUsd || value.price || 0,
                note: value.note || 'AI-generated recommendation'
              }))
            : []

        const normalized = {
          ...parsed,
          options: rawOptions
        }

        setData(normalized)
        setSelected(rawOptions[0] || null)
        setCustomPrice(String(rawOptions[0]?.priceUsd || rawOptions[0]?.price || ''))
      } catch {
        setData(null)
      }
    }
  }, [])

  const options: Option[] = Array.isArray(data?.options) ? data.options : []

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_right,#1f5d91,transparent_30%),#07152f] px-6 py-8">
      <div className="mx-auto max-w-6xl">
        <Link href="/" className="text-white/70">← Главная</Link>

        <h1 className="mt-8 text-4xl font-black">Кабинет логиста</h1>
        <p className="mt-2 text-white/65">
          Здесь логист проверяет AI-рекомендации, выбирает маршрут и вручную утверждает финальную цену.
        </p>

        {!data || options.length === 0 ? (
          <div className="card mt-8 p-6">
            Пока нет заявки. Сначала создайте расчёт в кабинете клиента.
          </div>
        ) : (
          <div className="mt-8 grid gap-6 md:grid-cols-[1fr_380px]">
            <section className="space-y-4">
              {options.map((o: Option, index: number) => (
                <button
                  key={o.id || index}
                  onClick={() => {
                    setSelected(o)
                    setCustomPrice(String(o.priceUsd || o.price || ''))
                  }}
                  className={`card w-full p-5 text-left ${selected?.id === o.id ? 'ring-2 ring-skyblue' : ''}`}
                >
                  <div className="flex justify-between gap-3">
                    <b>{o.label || 'Option'}: {o.route || o.airline}</b>
                    <span>${o.priceUsd || o.price || 0}</span>
                  </div>
                  <p className="mt-2 text-sm text-white/60">
                    {o.note || `${o.airline || 'Airline'} · ${o.eta || `${o.etaHours || 0} hours`}`}
                  </p>
                </button>
              ))}
            </section>

            <aside className="card h-fit p-6">
              <h2 className="text-2xl font-black">Утверждение</h2>

              <div className="mt-5 space-y-3 text-sm text-white/70">
                <p><b>Маршрут:</b> {selected?.route || selected?.airline}</p>
                <p><b>ETA:</b> {selected?.eta || `${selected?.etaHours || 0} часов`}</p>
                <p><b>Transit:</b> {selected?.transit || '1 transit'}</p>
              </div>

              <label className="mt-5 block text-sm text-white/70">Финальная цена, USD</label>
              <input
                className="input mt-2"
                value={customPrice}
                onChange={e => setCustomPrice(e.target.value)}
              />

              <button
                onClick={() => alert('Demo: предложение утверждено. В production здесь будет отправка клиенту/email/личный кабинет.')}
                className="btn btn-primary mt-4 w-full"
              >
                Утвердить предложение
              </button>

              <button
                onClick={() => alert('Demo: цена изменена логистом.')}
                className="btn btn-ghost mt-3 w-full"
              >
                Сохранить изменение
              </button>
            </aside>
          </div>
        )}
      </div>
    </main>
  )
}