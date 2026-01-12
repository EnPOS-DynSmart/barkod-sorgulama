import './globals.css'

export const metadata = {
  title: 'Barkod Sorgulama',
  description: 'Barkod ile brüt gramaj sorgulama sistemi',
}

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  )
}
