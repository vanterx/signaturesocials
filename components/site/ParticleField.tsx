'use client'

import { useEffect, useState } from 'react'

interface Particle {
  left: string
  top: string
  width: string
  height: string
  colorClass: string
  duration: string
  delay: string
  drift: string
}

interface ParticleFieldProps {
  count: number
  topRange?: [number, number]
}

function generateParticles(count: number, topRange: [number, number]): Particle[] {
  const [topMin, topMax] = topRange
  return Array.from({ length: count }).map((_, i) => ({
    left: `${5 + Math.random() * 90}%`,
    top: `${topMin + Math.random() * (topMax - topMin)}%`,
    width: `${2 + Math.random() * 3}px`,
    height: `${2 + Math.random() * 3}px`,
    colorClass: i % 3 === 0 ? 'ss-cyan' : i % 3 === 1 ? 'ss-magenta' : '',
    duration: `${6 + Math.random() * 8}s`,
    delay: `${Math.random() * 10}s`,
    drift: `${-15 + Math.random() * 30}px`,
  }))
}

// Particle positions are randomized, so they're generated client-side after
// mount rather than during render to avoid a server/client hydration mismatch.
export function ParticleField({ count, topRange = [40, 90] }: ParticleFieldProps) {
  const [particles, setParticles] = useState<Particle[] | null>(null)

  useEffect(() => {
    setParticles(generateParticles(count, topRange))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count])

  if (!particles) return null

  return (
    <>
      {particles.map((particle, i) => (
        <div
          key={i}
          className={`ss-particle ${particle.colorClass}`}
          style={
            {
              left: particle.left,
              top: particle.top,
              width: particle.width,
              height: particle.height,
              '--duration': particle.duration,
              '--delay': particle.delay,
              '--drift': particle.drift,
            } as React.CSSProperties
          }
        />
      ))}
    </>
  )
}
