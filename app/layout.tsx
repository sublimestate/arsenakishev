import '@/styles/globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Arsen Akishev',
  description: 'Backend software engineer specializing in AWS, Node.js, and PostgreSQL.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
