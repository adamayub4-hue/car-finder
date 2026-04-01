import './globals.css'
import { Analytics } from '@vercel/analytics/react'

export const metadata = {
  title: 'CarScout',
  description: 'Find the best car deals across the UK',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}