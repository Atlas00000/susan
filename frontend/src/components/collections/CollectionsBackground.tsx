'use client'

import { motion, useTransform } from 'framer-motion'
import { ParticleBackground } from '@/components/animations/ParticleBackground'

export interface CollectionsBackgroundProps {
  scrollYProgress?: ReturnType<typeof import('framer-motion').useScroll>['scrollYProgress']
}

export function CollectionsBackground({ scrollYProgress }: CollectionsBackgroundProps = {}) {
  const opacity = scrollYProgress
    ? useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0])
    : undefined
  const scale = scrollYProgress
    ? useTransform(scrollYProgress, [0, 1], [1, 1.1])
    : undefined

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-luxury-charcoal via-luxury-royal/5 to-luxury-charcoal" />

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-luxury-gold/8 rounded-full blur-3xl"
        animate={{
          x: [0, 80, 0],
          y: [0, 40, 0],
          scale: [1, 1.15, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{ opacity, scale }}
      />

      <motion.div
        className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-luxury-royal/12 rounded-full blur-3xl"
        animate={{
          x: [0, -60, 0],
          y: [0, -30, 0],
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

      {/* Morphing organic shapes */}
      <motion.div
        className="absolute top-1/3 left-0 w-[350px] h-[350px] bg-gradient-to-br from-luxury-gold/4 to-transparent"
        style={{
          clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
        }}
        animate={{
          clipPath: [
            'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
            'polygon(50% 0%, 100% 0%, 100% 50%, 100% 100%, 50% 100%, 0% 100%, 0% 50%, 0% 0%)',
            'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)',
            'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
          ],
          rotate: [0, 45, 90, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute bottom-1/4 right-0 w-[280px] h-[280px] bg-gradient-to-tl from-luxury-royal/6 to-transparent"
        style={{
          borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
        }}
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
          duration: 35,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Particle system */}
      <ParticleBackground
        particleCount={60}
        speed={0.25}
        size={2}
        color="rgba(212, 175, 55, 0.15)"
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

