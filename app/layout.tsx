import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'NYU Chinese Mei Society',
  description: 'A vibrant community celebrating Chinese culture and traditions at NYU',
  icons: [
    {
      rel: 'icon',
      url: '/cmslogo.png',
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/cmslogo.png" />
      </head>
      <body>{children}</body>
    </html>
  )
}
