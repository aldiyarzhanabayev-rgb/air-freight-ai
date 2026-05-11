import Link from 'next/link'

export function Header() {
  return (
    <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
      <Link href="/" className="text-xl font-black tracking-tight">AI Air Freight</Link>
      <nav className="hidden gap-5 text-sm text-white/75 md:flex">
        <Link href="/client">Клиент</Link>
        <Link href="/logist">Логист</Link>
        <a href="#how">Как работает</a>
      </nav>
      <Link href="/client" className="btn btn-primary">Рассчитать</Link>
    </header>
  )
}
