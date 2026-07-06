import { redirect } from 'next/navigation'

// About content now lives on the home page; keep old links working.
export default function About() {
  redirect('/#about')
}
