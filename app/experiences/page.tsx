import { redirect } from 'next/navigation'

// Experiences content now lives on the home page; keep old links working.
export default function Experiences() {
  redirect('/#experiences')
}
