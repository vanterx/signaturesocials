import type { Metadata } from 'next'
import { AboutPage } from '@/components/site/AboutPage'

export const metadata: Metadata = {
  title: 'About | Signature Socials',
}

export default function About() {
  return <AboutPage />
}
