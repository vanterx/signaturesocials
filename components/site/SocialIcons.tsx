import type { SOCIAL_LINKS } from '@/lib/constants'

interface IconProps {
  size?: number
}

export function InstagramIcon({ size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function FacebookIcon({ size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

export function MixcloudIcon({ size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16z" />
      <path d="M8 10v4" />
      <path d="M10 11v2" />
      <path d="M14 11v2" />
      <path d="M16 10v4" />
    </svg>
  )
}

/** Ordered list of social platforms for icon bars; key matches SOCIAL_LINKS. */
export const SOCIAL_ICON_LINKS: ReadonlyArray<{
  key: keyof typeof SOCIAL_LINKS
  label: string
  Icon: (props: IconProps) => JSX.Element
}> = [
  { key: 'instagram', label: 'Instagram', Icon: InstagramIcon },
  { key: 'facebook', label: 'Facebook', Icon: FacebookIcon },
  { key: 'mixcloud', label: 'Mixcloud', Icon: MixcloudIcon },
]
