'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export interface HeroCTAProps {
  isInView?: boolean
  className?: string
}

/**
 * HeroCTA Component
 * 
 * Fluid, organic call-to-action buttons with:
 * - Organic, flowing shapes (no sharp edges)
 * - Liquid animations
 * - Premium glow effects
 * - Smooth, natural transitions
 */
export function HeroCTA({ isInView = true, className }: HeroCTAProps) {
  return (
    <motion.div
      className={cn('flex flex-col sm:flex-row gap-6', className)}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 1.1, duration: 0.6 }}
    >
      {/* Primary CTA - Fluid organic shape */}
      <Link href="/quiz">
        <motion.div
          className="relative group"
          whileHover={{ scale: 1.05, y: -3 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          {/* Organic blob background */}
          <motion.div
            className="relative px-12 py-6 overflow-hidden"
            style={{
              borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
            }}
            animate={{
              borderRadius: [
                '60% 40% 30% 70% / 60% 30% 70% 40%',
                '30% 60% 70% 40% / 50% 60% 30% 60%',
                '50% 30% 60% 40% / 30% 50% 60% 50%',
                '60% 40% 30% 70% / 60% 30% 70% 40%',
              ],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-r from-luxury-gold via-gold-400 to-luxury-gold bg-[length:200%_100%] animate-shimmer" />
            
            {/* Glow effect */}
            <div className="absolute inset-0 glow-premium-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Content */}
            <span className="relative z-10 flex items-center gap-3 text-luxury-charcoal text-lg font-bold">
              Find My Scent
              <motion.span
                animate={{ x: [0, 6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                className="text-2xl"
              >
                →
              </motion.span>
            </span>

            {/* Liquid ripple on hover */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-30"
              style={{
                background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)',
              }}
              animate={{
                scale: [1, 1.5, 2],
                opacity: [0, 0.3, 0],
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </Link>

      {/* Secondary CTA - Flowing outline */}
      <Link href="/products">
        <motion.div
          className="relative group"
          whileHover={{ scale: 1.05, y: -3 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          {/* Organic outline shape */}
          <motion.div
            className="relative px-12 py-6"
            style={{
              borderRadius: '40% 60% 70% 30% / 40% 70% 30% 60%',
              border: '2px solid rgba(200, 169, 106, 0.5)',
              background: 'rgba(31, 31, 31, 0.3)',
              backdropFilter: 'blur(20px)',
            }}
            animate={{
              borderRadius: [
                '40% 60% 70% 30% / 40% 70% 30% 60%',
                '70% 30% 50% 50% / 60% 40% 60% 40%',
                '30% 70% 60% 40% / 50% 60% 40% 50%',
                '40% 60% 70% 30% / 40% 70% 30% 60%',
              ],
              borderColor: [
                'rgba(200, 169, 106, 0.5)',
                'rgba(200, 169, 106, 0.8)',
                'rgba(200, 169, 106, 0.5)',
              ],
            }}
            transition={{
              borderRadius: { duration: 10, repeat: Infinity, ease: 'easeInOut' },
              borderColor: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
            }}
            whileHover={{
              borderColor: 'rgba(200, 169, 106, 1)',
              background: 'rgba(200, 169, 106, 0.1)',
            }}
          >
            {/* Content */}
            <span className="relative z-10 flex items-center gap-3 text-luxury-cream text-lg font-semibold">
              Explore Collection
            </span>

            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(200, 169, 106, 0.2), transparent)',
                backgroundSize: '200% 100%',
              }}
              animate={{
                backgroundPosition: ['-200% 0', '200% 0'],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            />
          </motion.div>
        </motion.div>
      </Link>
    </motion.div>
  )
}
