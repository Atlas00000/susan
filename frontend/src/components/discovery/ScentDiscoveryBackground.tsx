'use client'

import { motion } from 'framer-motion'

interface ScentDiscoveryBackgroundProps {
  className?: string
}

export function ScentDiscoveryBackground({ className }: ScentDiscoveryBackgroundProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className || ''}`}>
      {/* Organic floating shapes */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-luxury-gold/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.3, 0.7, 0.3],
          x: [-100, 100, -100],
          y: [-50, 50, -50],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-luxury-royal/10 rounded-full blur-2xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.4, 0.8, 0.4],
          x: [100, -100, 100],
          y: [50, -50, 50],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute top-1/2 left-1/2 w-64 h-64 bg-luxury-amber/10 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2"
        animate={{
          x: [-200, 200, -200],
          y: [-100, 100, -100],
          rotate: [0, 360, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Flowing particle system */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 bg-luxury-gold/40 rounded-full"
          style={{
            left: `${5 + (i * 4.5)}%`,
            top: `${15 + (i * 4)}%`,
          }}
          animate={{
            y: [-40, 40, -40],
            x: [-20, 20, -20],
            opacity: [0.2, 1, 0.2],
            scale: [0.5, 1.8, 0.5],
          }}
          transition={{
            duration: 5 + i * 0.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.2,
          }}
        />
      ))}

      {/* Flowing lines */}
      {[...Array(3)].map((_, i) => (
        <motion.svg
          key={i}
          className="absolute opacity-10"
          style={{
            top: `${20 + i * 30}%`,
            left: `${10 + i * 25}%`,
            width: '200px',
            height: '200px',
          }}
          viewBox="0 0 200 200"
        >
          <motion.path
            d={`M 0,100 Q 50,${50 + i * 30} 100,100 T 200,100`}
            stroke="rgba(212, 175, 55, 0.3)"
            strokeWidth="2"
            fill="none"
            animate={{
              pathLength: [0, 1, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.5,
            }}
          />
        </motion.svg>
      ))}
    </div>
  )
}

