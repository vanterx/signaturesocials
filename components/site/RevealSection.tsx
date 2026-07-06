'use client'

import { useEffect, useRef, useState } from 'react'

function useReveal<T extends HTMLElement>(threshold: number) {
  const ref = useRef<T>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, isVisible }
}

interface RevealSectionProps {
  children: React.ReactNode
  threshold?: number
  style?: React.CSSProperties
}

export function RevealSection({ children, threshold = 0.15, style }: RevealSectionProps) {
  const { ref, isVisible } = useReveal<HTMLDivElement>(threshold)
  return (
    <div ref={ref} className={`ss-reveal ${isVisible ? 'ss-visible' : ''}`} style={style}>
      {children}
    </div>
  )
}
