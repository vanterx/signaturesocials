import type { Metadata } from 'next'
import { ExperiencesPage } from '@/components/site/ExperiencesPage'

export const metadata: Metadata = {
  title: 'Experiences | Signature Socials',
}

export default function Experiences() {
  return <ExperiencesPage />
}
