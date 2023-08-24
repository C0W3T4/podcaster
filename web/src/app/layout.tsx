import { Header } from '@/components/Header'
import { Player } from '@/components/Player'
import { PlayerContextProvider } from '@/contexts/PlayerContext'
import { inter } from '@/fonts/inter'
import { lexend } from '@/fonts/lexend'
import type { Metadata } from 'next'
import { ReactNode } from 'react'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Podcaster',
    template: '%s | Podcaster',
  },
  description:
    'Application that allows users to play episodes of their favorite podcasts',
  robots: {
    index: true,
    follow: true,
  },
}

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${lexend.variable}`}>
        <PlayerContextProvider>
          <div className="wrapper">
            <main>
              <Header />
              {children}
            </main>
            <Player />
          </div>
        </PlayerContextProvider>
      </body>
    </html>
  )
}
