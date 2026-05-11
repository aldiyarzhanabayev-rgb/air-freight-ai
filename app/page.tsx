import Link from 'next/link'
import { Header } from '@/components/Header'

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_right,#184f89,transparent_35%),#07152f]">
      <Header />
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-16 md:grid-cols-2 md:py-24">
        <div>
          <p className="mb-4 inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/80">AI Freight Calculator для авиаперевозок</p>
          <h1 className="text-4xl font-black leading-tight md:text-6xl">Клиент вводит груз — логист получает лучшие рейсы и цену</h1>
          <p className="mt-6 max-w-xl text-lg text-white/72">MVP-платформа для существующей логистической компании: клиентская заявка, AI-рекомендации, варианты fastest / cheapest / recommended и кабинет логиста для финального подтверждения.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/client" className="btn btn-primary">Войти как клиент</Link>
            <Link href="/logist" className="btn btn-ghost">Войти как логист</Link>
          </div>
        </div>
        <div className="card p-6">
          <div className="rounded-2xl bg-white/10 p-5">
            <div className="mb-4 flex items-center justify-between">
              <span className="font-bold">Recommended route</span>
              <span className="rounded-full bg-amberline px-3 py-1 text-xs font-bold text-navy">AI score 89%</span>
            </div>
            <div className="space-y-4 text-sm text-white/78">
              <div className="rounded-xl bg-navy/60 p-4">Almaty → Regional Hub → Frankfurt</div>
              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-xl bg-white/10 p-3"><b className="block text-white">30h</b>ETA</div>
                <div className="rounded-xl bg-white/10 p-3"><b className="block text-white">$1,420</b>Price</div>
                <div className="rounded-xl bg-white/10 p-3"><b className="block text-white">1</b>Transit</div>
              </div>
              <p>Логист может подтвердить предложение или изменить цену перед отправкой клиенту.</p>
            </div>
          </div>
        </div>
      </section>
      <section id="how" className="mx-auto max-w-7xl px-6 pb-20">
        <div className="grid gap-4 md:grid-cols-3">
          {['Клиент отправляет параметры груза', 'ИИ считает 3 варианта маршрута', 'Логист утверждает или меняет цену'].map((x, i) => (
            <div key={x} className="card p-6"><span className="text-3xl font-black text-skyblue">0{i+1}</span><h3 className="mt-4 text-xl font-bold">{x}</h3></div>
          ))}
        </div>
      </section>
    </main>
  )
}
