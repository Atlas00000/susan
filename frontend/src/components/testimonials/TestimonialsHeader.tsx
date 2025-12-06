'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface TestimonialsHeaderProps {
  className?: string
}

export function TestimonialsHeader({ className }: TestimonialsHeaderProps) {
  const headerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(headerRef, { once: true, amount: 0.3 })

  return (
    <motion.div
      ref={headerRef}
      className={`text-center mb-20 ${className || ''}`}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
    >
      {/* Animated Badge - Organic Shape */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="inline-block mb-8"
      >
        <motion.div
          className="relative inline-block"
          animate={{
            boxShadow: [
              '0 0 20px rgba(212, 175, 55, 0.2)',
              '0 0 40px rgba(212, 175, 55, 0.4)',
              '0 0 20px rgba(212, 175, 55, 0.2)',
            ],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="relative bg-gradient-to-r from-luxury-gold/20 via-luxury-amber/20 to-luxury-gold/20 backdrop-blur-xl border border-luxury-gold/40 rounded-full px-8 py-4 overflow-hidden">
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
            <span className="relative text-luxury-gold font-semibold text-lg tracking-wide">
              Trusted by Thousands
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* Main Title */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-luxury-cream mb-6 leading-tight"
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
          What Our
        </motion.span>
        <motion.span
          className="block bg-gradient-to-r from-luxury-gold via-luxury-amber to-luxury-gold bg-clip-text text-transparent"
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Clients Say
        </motion.span>
      </motion.h2>

      {/* Description */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="text-xl md:text-2xl text-luxury-cream/70 max-w-4xl mx-auto leading-relaxed space-y-4"
      >
        <p>
          Real experiences from those who have discovered their signature scents. Our community 
          of fragrance lovers shares their journeys, from the moment they found their perfect 
          match to how it transformed their confidence and personal style.
        </p>
        <p className="text-lg md:text-xl text-luxury-cream/60">
          These authentic stories reflect the power of fragrance to enhance our lives, boost our 
          confidence, and create lasting memories. Each testimonial is a testament to the 
          transformative experience of finding a scent that truly resonates with your essence.
        </p>
      </motion.div>
    </motion.div>
  )
}

