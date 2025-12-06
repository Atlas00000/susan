'use client'

import { motion } from 'framer-motion'

interface LifestyleBackgroundProps {
  className?: string
}

export function LifestyleBackground({ className }: LifestyleBackgroundProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className || ''}`}>
      {/* Organic floating shapes */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-luxury-gold/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
          x: [-50, 50, -50],
          y: [-30, 30, -30],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-luxury-royal/10 rounded-full blur-2xl"
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.4, 0.7, 0.4],
          x: [60, -60, 60],
          y: [40, -40, 40],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute top-1/2 left-1/2 w-64 h-64 bg-luxury-amber/10 rounded-full blur-xl -translate-x-1/2 -translate-y-1/2"
        animate={{
          x: [-150, 150, -150],
          y: [-80, 80, -80],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Flowing particle system */}
      {[...Array(18)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 bg-luxury-gold/35 rounded-full"
          style={{
            left: `${8 + (i * 5)}%`,
            top: `${10 + (i * 4.5)}%`,
          }}
          animate={{
            y: [-50, 50, -50],
            x: [-25, 25, -25],
            opacity: [0.2, 1, 0.2],
            scale: [0.5, 1.8, 0.5],
          }}
          transition={{
            duration: 6 + i * 0.4,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.25,
          }}
        />
      ))}
    </div>
  )
}

