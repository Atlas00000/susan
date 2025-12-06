'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface NewsletterTrustProps {
  className?: string
}

export function NewsletterTrust({ className }: NewsletterTrustProps) {
  const trustRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(trustRef, { once: true, amount: 0.3 })

  return (
    <motion.div
      ref={trustRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.4 }}
      className={`text-center mt-16 ${className || ''}`}
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
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
            {/* Security Icon */}
            <motion.div
              className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-luxury-gold/20 flex items-center justify-center"
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              <svg
                className="w-8 h-8 md:w-10 md:h-10 text-luxury-gold"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </motion.div>

            <div className="text-center md:text-left">
              <motion.h3
                className="text-2xl md:text-3xl font-heading font-bold text-luxury-cream mb-2"
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
                Secure & Private
              </motion.h3>
              <motion.p
                className="text-luxury-cream/70 text-base md:text-lg max-w-2xl"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.8 }}
              >
                Your information is safe with us. We never share your data with third parties.
              </motion.p>
            </div>
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

