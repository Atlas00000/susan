'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface MobileBrandHeaderProps {
  className?: string
}

export function MobileBrandHeader({ className }: MobileBrandHeaderProps) {
  const headerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(headerRef, { once: true, amount: 0.3 })

  return (
    <motion.div
      ref={headerRef}
      className={`text-center mb-12 ${className || ''}`}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
    >
      {/* Animated Badge - Organic Shape */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="inline-block mb-6"
      >
        <motion.div
          className="relative inline-block"
          animate={{
            boxShadow: [
              '0 0 15px rgba(212, 175, 55, 0.2)',
              '0 0 30px rgba(212, 175, 55, 0.4)',
              '0 0 15px rgba(212, 175, 55, 0.2)',
            ],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="relative bg-gradient-to-r from-luxury-gold/20 via-luxury-amber/20 to-luxury-gold/20 backdrop-blur-xl border border-luxury-gold/40 rounded-full px-6 py-3 overflow-hidden">
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-luxury-gold/30 to-transparent"
              animate={{
                x: ['-100%', '200%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
            <span className="relative text-luxury-gold font-semibold text-sm tracking-wide">
              Our Story
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* Main Title */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-3xl md:text-4xl font-heading font-bold text-luxury-cream mb-4 leading-tight"
      >
        <motion.span
          className="block"
          animate={{
            backgroundPosition: ['0%', '100%', '0%'],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            background: 'linear-gradient(45deg, #D4AF37, #FFD700, #B8860B, #D4AF37)',
            backgroundSize: '300% 300%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Crafting Luxury
        </motion.span>
        <motion.span
          className="block bg-gradient-to-r from-luxury-gold via-luxury-amber to-luxury-gold bg-clip-text text-transparent"
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Since Day One
        </motion.span>
      </motion.h2>

      {/* Description */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="text-base md:text-lg text-luxury-cream/70 max-w-md mx-auto leading-relaxed space-y-3"
      >
        <p>
          From a passionate vision to a global luxury brand, our journey is built on the belief that 
          every individual deserves their perfect scent match.
        </p>
        <p className="text-sm md:text-base text-luxury-cream/60">
          We curate the world's finest fragrances with unwavering commitment to quality, authenticity, 
          and the personal connection that makes each fragrance experience truly special.
        </p>
      </motion.div>
    </motion.div>
  )
}

