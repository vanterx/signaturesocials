import type { LucideIcon } from 'lucide-react'
import { Music, Zap, Sparkles, Users } from 'lucide-react'

export interface ValueTile {
  icon: LucideIcon
  label: string
  glow: string
  accent: string
  desc: string
  area: string
  feature: boolean
}

export const VALUE_TILES: ValueTile[] = [
  {
    icon: Music,
    label: 'The Music',
    glow: 'ss-glow-purple',
    accent: '#7C3AED',
    desc: 'Curated sets from underground selectors and international headliners.',
    area: 'a',
    feature: true,
  },
  {
    icon: Zap,
    label: 'The Energy',
    glow: 'ss-glow-cyan',
    accent: '#00E5FF',
    desc: 'A dancefloor charged from the first drop to the last encore.',
    area: 'b',
    feature: false,
  },
  {
    icon: Sparkles,
    label: 'The Production',
    glow: 'ss-glow-magenta',
    accent: '#FF2D95',
    desc: 'Immersive lighting, sound and staging built for the moment.',
    area: 'c',
    feature: false,
  },
  {
    icon: Users,
    label: 'The People',
    glow: 'ss-glow-purple',
    accent: '#7C3AED',
    desc: 'A community that shows up for each other, every single time.',
    area: 'd',
    feature: false,
  },
]

export const TICKER_ITEMS = [
  { text: 'House', style: 'ss-ticker-solid-purple' },
  { text: 'Techno', style: 'ss-ticker-outline' },
  { text: 'Trance', style: 'ss-ticker-solid-cyan' },
  { text: 'Progressive', style: 'ss-ticker-outline' },
  { text: 'Psytrance', style: 'ss-ticker-solid-magenta' },
  { text: 'Signature Socials', style: 'ss-ticker-outline' },
] as const

export const REASONS = [
  { label: 'Powerful Sound Systems', desc: 'Rigs tuned for clarity at full volume.' },
  { label: 'Immersive Lighting', desc: 'Lasers, haze and visuals built for the room.' },
  { label: 'Carefully Curated DJs', desc: 'Selectors who understand the crowd.' },
  { label: 'Packed Dancefloors', desc: 'Energy that feeds back into itself all night.' },
]

export const UPCOMING_EVENTS = [
  { name: 'Spellbound Vol. 2', date: 'Coming Soon', venue: 'TBC, Auckland' },
  { name: 'Anti Social — Winter Edition', date: 'Coming Soon', venue: 'TBC, Wellington' },
  { name: 'Bass Ritual: Chapter One', date: 'Coming Soon', venue: 'TBC, Christchurch' },
]
