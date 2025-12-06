'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

export interface HeroInteractiveElementsProps {
  children: React.ReactNode
}

/**
 * HeroInteractiveElements Component
 * 
 * Adds interactive cursor effects and mouse tracking
 * Features:
 * - Custom cursor trail
 * - Hover effects
 * - Interactive particles
 */
export function HeroInteractiveElements({ children }: HeroInteractiveElementsProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('mousemove', handleMouseMove)
      container.addEventListener('mouseenter', () => setIsHovering(true))
      container.addEventListener('mouseleave', () => setIsHovering(false))
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove)
        container.removeEventListener('mouseenter', () => setIsHovering(true))
        container.removeEventListener('mouseleave', () => setIsHovering(false))
      }
    }
  }, [])

  return (
    <div ref={containerRef} className="relative">
      {children}

      {/* Interactive cursor glow */}
      {isHovering && (
        <motion.div
          className="pointer-events-none fixed w-96 h-96 rounded-full bg-luxury-gold/5 blur-3xl z-0"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      )}

      {/* Floating particles on hover */}
      {isHovering && (
        <motion.div
          className="pointer-events-none absolute w-2 h-2 bg-luxury-gold rounded-full"
          style={{
            left: mousePosition.x,
            top: mousePosition.y,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
          transition={{ duration: 1 }}
        />
      )}
    </div>
  )
}

