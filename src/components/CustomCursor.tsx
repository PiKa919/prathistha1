// components/CustomCursor.tsx
"use client"

import { useEffect, useState } from "react"

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      const cursor = document.querySelector('.cursor-ring') as HTMLElement
      if (cursor) {
        cursor.style.transform = `translate3d(${e.clientX - 20}px, ${e.clientY - 20}px, 0) scale(${isHovering ? 1.5 : 1})`
      }
    }

    const handleMouseOver = (e: MouseEvent) => {
      setIsHovering(
        (e.target as HTMLElement).tagName === 'A' || 
        (e.target as HTMLElement).tagName === 'BUTTON'
      )
    }

    window.addEventListener('mousemove', updateMousePosition)
    window.addEventListener('mouseover', handleMouseOver)
    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [isHovering])

  return (
    <div 
      className="cursor-ring"
      style={{
        transform: 'translate3d(0, 0, 0)',
        willChange: 'transform'
      }}
    />
  )
}