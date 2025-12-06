'use client'

import { motion } from 'framer-motion'

export interface HeroFloatingElementsProps {
  className?: string
}

/**
 * HeroFloatingElements Component
 * 
 * Adds organic, floating abstract shapes
 * Features:
 * - Organic abstract shapes only
 * - Floating animations
 * - Premium styling
 * - No icons, clipart, or decorative elements
 */
export function HeroFloatingElements({ className }: HeroFloatingElementsProps) {
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {/* Floating organic abstract shapes */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`shape-${i}`}
          className="absolute"
          style={{
            width: `${60 + i * 20}px`,
            height: `${60 + i * 20}px`,
            left: `${10 + i * 15}%`,
            top: `${20 + i * 10}%`,
            borderRadius: `${30 + i * 10}% ${70 - i * 10}% ${50 + i * 5}% ${50 - i * 5}% / ${60 + i * 5}% ${40 - i * 5}% ${50 + i * 10}% ${50 - i * 10}%`,
            background: `radial-gradient(circle, rgba(200, 169, 106, ${0.05 + i * 0.02}) 0%, transparent 70%)`,
            filter: 'blur(20px)',
          }}
          animate={{
            y: [0, -30 - i * 10, 0],
            x: [0, 20 + i * 5, 0],
            rotate: [0, 180, 360],
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.5,
          }}
        />
      ))}

      {/* Floating abstract particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 bg-luxury-gold/40 rounded-full"
          style={{
            left: `${15 + i * 10}%`,
            top: `${30 + i * 8}%`,
          }}
          animate={{
            y: [0, -100, -200],
            x: [0, Math.sin(i) * 50, Math.sin(i) * 100],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            ease: 'easeOut',
            delay: i * 0.3,
          }}
        />
      ))}
    </div>
  )
}
