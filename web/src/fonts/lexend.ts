import { Lexend } from 'next/font/google'

export const lexend = Lexend({
  subsets: ['latin'],
  display: 'swap',
  style: ['normal'],
  weight: ['500', '600'],
  variable: '--font-lexend',
  adjustFontFallback: true,
  preload: true,
})
