import './globals.css'
import { Analytics } from '@vercel/analytics/react'
import type { ReactNode } from 'react'

export const metadata = {
  title: 'CarScout',
  description: 'Find the best car deals across the UK',
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}