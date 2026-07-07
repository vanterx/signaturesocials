import { Oswald, Inter } from 'next/font/google'

// Oswald Light matches the official logo wordmark (tall thin condensed gothic);
// Bebas Neue was replaced because its heavier, rounder letterforms clashed with it.
export const oswald = Oswald({
  subsets: ['latin'],
  weight: ['300', '400'],
  variable: '--font-display',
  display: 'swap',
})

export const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})
