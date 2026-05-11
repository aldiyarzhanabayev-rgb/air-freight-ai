import Link from 'next/link'

export default function Header() {
  return (
    <header className="w-full border-b bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="text-xl font-bold text-slate-900">Air Freight AI</div>
        <nav className="flex gap-4 text-sm text-slate-600">
          <a href="/">Home</a>
          <a href="#calculator">Calculator</a>
          <a href="#logist">Logist</a>
        </nav>
      </div>
    </header>
  );
}