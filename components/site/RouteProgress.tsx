'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'

export function RouteProgress() {
  const pathname = usePathname()
  const [width, setWidth] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    setIsVisible(true)
    setWidth(30)

    const growTimer = setTimeout(() => setWidth(85), 100)
    const finishTimer = setTimeout(() => setWidth(100), 300)
    const hideTimer = setTimeout(() => {
      setIsVisible(false)
      setWidth(0)
    }, 550)

    return () => {
      clearTimeout(growTimer)
      clearTimeout(finishTimer)
      clearTimeout(hideTimer)
    }
  }, [pathname])

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '2px',
        width: `${width}%`,
        background: 'linear-gradient(90deg, #7C3AED 0%, #00E5FF 100%)',
        boxShadow: '0 0 8px rgba(124,58,237,0.8)',
        opacity: isVisible ? 1 : 0,
        transition: 'width 0.25s ease, opacity 0.2s ease',
        zIndex: 100,
      }}
    />
  )
}
