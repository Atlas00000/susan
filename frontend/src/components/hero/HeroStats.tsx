'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { cn } from '@/lib/utils'

export interface HeroStatsProps {
  isInView?: boolean
  className?: string
}

interface Stat {
  value: string
  label: string
  suffix?: string
}

const stats: Stat[] = [
  { value: '50', suffix: '+', label: 'Premium Scents' },
  { value: '10', suffix: 'K+', label: 'Happy Customers' },
  { value: '24', suffix: '/7', label: 'Expert Support' },
]

/**
 * HeroStats Component
 * 
 * Elegant, premium statistics display with:
 * - Floating, minimal design
 * - Organic shapes
 * - Subtle animations
 * - Premium typography
 * - No boxy cards
 */
export function HeroStats({ isInView = true, className }: HeroStatsProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <motion.div
      ref={ref}
      className={cn('flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20 mt-20', className)}
      initial={{ opacity: 0, y: 20 }}
      animate={inView && isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 1.3, duration: 0.6 }}
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          className="relative flex flex-col items-center group"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={inView && isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ delay: 1.4 + index * 0.15, duration: 0.6, type: 'spring' }}
          whileHover={{ y: -8, scale: 1.05 }}
        >
          {/* Number with gradient */}
          <motion.div
            className="text-6xl md:text-7xl font-heading font-bold luxury-text-gradient mb-2 relative"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={inView && isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 1.5 + index * 0.15, duration: 0.8, type: 'spring' }}
          >
            {stat.value}
            {stat.suffix && (
              <span className="text-luxury-gold text-5xl md:text-6xl">{stat.suffix}</span>
            )}
            
            {/* Glow effect on hover */}
            <motion.div
              className="absolute inset-0 premium-text-glow opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ filter: 'blur(20px)' }}
            />
          </motion.div>

          {/* Label - minimal and elegant */}
          <div className="text-base md:text-lg text-luxury-cream/60 font-medium tracking-wide uppercase text-center">
            {stat.label}
          </div>

          {/* Decorative line */}
          <motion.div
            className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-transparent via-luxury-gold to-transparent group-hover:w-16 transition-all duration-500"
            initial={{ width: 0 }}
            animate={inView && isInView ? { width: 0 } : {}}
          />
        </motion.div>
      ))}
    </motion.div>
  )
}
