import { Inter } from 'next/font/google'

export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  style: ['normal'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
  adjustFontFallback: true,
  preload: true,
})
