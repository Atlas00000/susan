'use client'

import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ParticleBackground } from '@/components/animations/ParticleBackground'

export interface HeroBackgroundProps {
  scrollYProgress?: ReturnType<typeof useScroll>['scrollYProgress']
}

/**
 * HeroBackground Component
 * 
 * Creates stunning animated background with:
 * - Animated gradient overlays
 * - Particle system
 * - Morphing shapes
 * - Scroll-based parallax effects
 */
export function HeroBackground({ scrollYProgress }: HeroBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  // Parallax transforms based on scroll
  const opacity = scrollYProgress
    ? useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0])
    : undefined
  const scale = scrollYProgress
    ? useTransform(scrollYProgress, [0, 1], [1, 1.2])
    : undefined

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-luxury-charcoal via-luxury-charcoal/95 to-luxury-royal/20" />

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-luxury-gold/10 rounded-full blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{ opacity, scale }}
      />

      <motion.div
        className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-luxury-royal/15 rounded-full blur-3xl"
        animate={{
          x: [0, -80, 0],
          y: [0, -40, 0],
          scale: [1, 1.3, 1],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{ opacity, scale }}
      />

      {/* Morphing organic shapes */}
      <motion.div
        className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-gradient-to-br from-luxury-gold/5 to-transparent organic-shape"
        animate={{
          borderRadius: [
            '60% 40% 30% 70% / 60% 30% 70% 40%',
            '30% 60% 70% 40% / 50% 60% 30% 60%',
            '50% 30% 60% 40% / 30% 50% 60% 50%',
            '40% 70% 30% 60% / 70% 30% 50% 40%',
            '60% 40% 30% 70% / 60% 30% 70% 40%',
          ],
          rotate: [0, 90, 180, 270, 360],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute bottom-1/4 right-0 w-[300px] h-[300px] bg-gradient-to-tl from-luxury-royal/8 to-transparent organic-shape"
        animate={{
          borderRadius: [
            '40% 60% 70% 30% / 40% 70% 30% 60%',
            '70% 30% 50% 50% / 60% 40% 60% 40%',
            '30% 70% 60% 40% / 50% 60% 40% 50%',
            '60% 40% 70% 30% / 40% 60% 50% 50%',
            '40% 60% 70% 30% / 40% 70% 30% 60%',
          ],
          rotate: [360, 270, 180, 90, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Particle system */}
      <ParticleBackground
        particleCount={80}
        speed={0.3}
        size={3}
        color="rgba(200, 169, 106, 0.2)"
      />

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(212, 175, 55, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(212, 175, 55, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>
    </div>
  )
}

