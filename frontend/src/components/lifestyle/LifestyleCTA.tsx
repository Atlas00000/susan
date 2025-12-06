'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface LifestyleCTAProps {
  className?: string
}

export function LifestyleCTA({ className }: LifestyleCTAProps) {
  const ctaRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(ctaRef, { once: true, amount: 0.3 })

  return (
    <motion.div
      ref={ctaRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.4 }}
      className={`text-center ${className || ''}`}
    >
      <motion.div
        className="relative inline-block"
        initial={{ scale: 0.9 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <div className="relative bg-gradient-to-r from-luxury-gold/10 via-luxury-amber/10 to-luxury-gold/10 backdrop-blur-xl border border-luxury-gold/30 rounded-[2.5rem] px-8 md:px-12 py-8 md:py-10 overflow-hidden">
          {/* Animated background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-luxury-gold/5 via-luxury-amber/5 to-luxury-gold/5"
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'linear',
            }}
          />

          {/* Content */}
          <div className="relative z-10">
            <motion.h3
              className="text-2xl md:text-3xl font-heading font-bold text-luxury-cream mb-3"
              animate={{
                textShadow: [
                  '0 0 20px rgba(212, 175, 55, 0.3)',
                  '0 0 40px rgba(212, 175, 55, 0.5)',
                  '0 0 20px rgba(212, 175, 55, 0.3)',
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              Find Your Signature Moment
            </motion.h3>

            <motion.p
              className="text-luxury-cream/70 mb-6 text-lg max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 }}
            >
              Discover which lifestyle moment resonates with your personality
            </motion.p>
          </div>

          {/* Decorative glow */}
          <motion.div
            className="absolute -inset-4 bg-luxury-gold/10 rounded-[2.5rem] blur-2xl"
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  )
}

