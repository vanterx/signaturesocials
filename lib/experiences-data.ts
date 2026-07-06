export interface Experience {
  id: string
  name: string
  tagline: string
  description: string
  vibe: string
  image?: string
}

export const experiences: Experience[] = [
  {
    id: 'spellbound',
    name: 'Spellbound',
    tagline: 'Where music, art and imagination collide.',
    description:
      'Step into an immersive world where music, visual art and imagination collide. Expect hypnotic production, unforgettable performances and a dancefloor unlike any other.',
    vibe: 'Immersive · Hypnotic · Otherworldly',
    image: '/images/experiences/spellbound.png',
  },
  {
    id: 'anti-social',
    name: 'Anti Social',
    tagline: 'Raw. Underground. Unfiltered.',
    description:
      'A celebration of darker electronic music, intimate venues and late-night energy.',
    vibe: 'Dark · Underground · Raw',
    image: '/images/experiences/anti-social.png',
  },
  {
    id: 'bass-ritual',
    name: 'Bass Ritual',
    tagline: 'Felt, not just heard.',
    description:
      'Rolling basslines. Driving rhythms. Deep underground culture. A gathering for those who believe the best music is felt, not just heard.',
    vibe: 'Deep · Driving · Heavy',
    image: '/images/experiences/bass-ritual.png',
  },
  {
    id: 'back-in-the-day',
    name: 'Back In The Day',
    tagline: 'The soundtrack of generations.',
    description:
      'A celebration of timeless dance music that still fills dancefloors today.',
    vibe: 'Nostalgic · Timeless · Euphoric',
    image: '/images/experiences/back-in-the-day.png',
  },
]
