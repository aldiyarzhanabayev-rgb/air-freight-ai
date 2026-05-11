import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Air Freight Platform',
  description: 'AI freight calculator for air cargo companies with client and logist roles.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  )
}
