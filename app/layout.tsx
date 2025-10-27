import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'NYU Chinese Mei Society',
  description: 'A vibrant community celebrating Chinese culture and traditions at NYU',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body>{children}</body>
    </html>
  )
}
