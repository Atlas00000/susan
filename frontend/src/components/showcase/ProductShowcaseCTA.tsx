'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

interface ProductShowcaseCTAProps {
  className?: string
}

export function ProductShowcaseCTA({ className }: ProductShowcaseCTAProps) {
  const ctaRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(ctaRef, { once: true, amount: 0.3 })

  return (
    <motion.div
      ref={ctaRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.4 }}
      className={`text-center mt-16 ${className || ''}`}
    >
      <Link href="/products">
        <motion.div
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block"
        >
          <Button
            size="lg"
            variant="premium"
            className="relative px-12 py-6 text-lg overflow-hidden group"
          >
            {/* Liquid background animation */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-luxury-gold via-luxury-amber to-luxury-gold"
              animate={{
                backgroundPosition: ['0%', '100%', '0%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
              }}
              style={{
                backgroundSize: '200% 200%',
              }}
            />

            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{
                x: ['-100%', '200%'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'linear',
              }}
            />

            {/* Text content */}
            <span className="relative z-10 flex items-center space-x-3 font-semibold">
              <span>View All Products</span>
              <motion.span
                animate={{
                  x: [0, 5, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                →
              </motion.span>
            </span>

            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 rounded-full blur-xl bg-luxury-gold/50"
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </Button>
        </motion.div>
      </Link>
    </motion.div>
  )
}

