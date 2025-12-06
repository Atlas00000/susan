'use client'

import { motion } from 'framer-motion'
import { GradientText } from '@/components/ui/GradientText'
import { cn } from '@/lib/utils'

export interface HeroContentProps {
  isInView?: boolean
  className?: string
}

/**
 * HeroContent Component
 * 
 * Premium hero content with:
 * - Dynamic, fluid text animations
 * - Organic badge design
 * - Premium typography with flow
 * - Natural, elegant styling
 */
export function HeroContent({ isInView = true, className }: HeroContentProps) {
  return (
    <motion.div
      className={cn('relative z-10', className)}
      initial={{ opacity: 0, x: -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {/* Badge - Organic shape */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ delay: 0.2, duration: 0.6, type: 'spring' }}
        className="mb-10"
      >
        <motion.div
          className="inline-flex items-center gap-3 px-6 py-3 relative overflow-hidden"
          style={{
            borderRadius: '50% 30% 60% 40% / 30% 50% 60% 50%',
            background: 'rgba(200, 169, 106, 0.1)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(200, 169, 106, 0.2)',
          }}
          animate={{
            borderRadius: [
              '50% 30% 60% 40% / 30% 50% 60% 50%',
              '30% 60% 40% 50% / 50% 40% 50% 60%',
              '60% 40% 50% 30% / 40% 60% 30% 50%',
              '50% 30% 60% 40% / 30% 50% 60% 50%',
            ],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          whileHover={{
            scale: 1.05,
            background: 'rgba(200, 169, 106, 0.15)',
          }}
        >
          <span className="text-sm font-semibold luxury-text-gradient relative z-10">
            Luxury Fragrances
          </span>
          
          {/* Shimmer overlay */}
          <motion.div
            className="absolute inset-0 opacity-30"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(200, 169, 106, 0.3), transparent)',
              backgroundSize: '200% 100%',
            }}
            animate={{
              backgroundPosition: ['-200% 0', '200% 0'],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />
        </motion.div>
      </motion.div>

      {/* Main Heading - More dynamic */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
        className="mb-10"
      >
        <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-heading font-bold text-luxury-cream mb-6 leading-[1.05] tracking-tight">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="block"
          >
            Discover Your
          </motion.span>
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.7, duration: 0.6, type: 'spring' }}
            className="block relative"
          >
            <GradientText variant="luxury" as="span" className="premium-text-glow relative z-10">
              Perfect Scent
            </GradientText>
          </motion.span>
        </h1>
      </motion.div>

      {/* Description - More flowing */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="text-xl md:text-2xl text-luxury-cream/75 mb-12 leading-relaxed max-w-2xl font-light space-y-4"
      >
        <p>
          Immerse yourself in a world of{' '}
          <motion.span
            className="text-luxury-gold font-medium relative"
            whileHover={{ scale: 1.05 }}
          >
            luxury fragrances
            <motion.span
              className="absolute -bottom-1 left-0 right-0 h-0.5 bg-luxury-gold/50"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.span>
          {' '}crafted with passion, precision, and the{' '}
          <motion.span
            className="text-luxury-gold font-medium relative"
            whileHover={{ scale: 1.05 }}
          >
            finest ingredients
            <motion.span
              className="absolute -bottom-1 left-0 right-0 h-0.5 bg-luxury-gold/50"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.span>
          {' '}from around the globe.
        </p>
        <p className="text-lg md:text-xl text-luxury-cream/65 font-light">
          Perfume isn't just a fragrance—it's a mood, a memory, a story, a signature. The right 
          scent affects how we feel about ourselves, drives confidence, and provides support in 
          moments that matter. Allow us to walk with you on your scent discovery journey, where 
          every question leads to a deeper understanding of your unique fragrance personality.
        </p>
      </motion.div>
    </motion.div>
  )
}
