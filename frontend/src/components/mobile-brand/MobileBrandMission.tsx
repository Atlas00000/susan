'use client'

import { useRef } from 'react'
import { motion, useInView, useSpring, useTransform } from 'framer-motion'

interface MobileBrandMissionProps {
  className?: string
}

const stats = [
  { value: 50, label: 'Countries', suffix: '+' },
  { value: 100, label: 'Fragrances', suffix: 'K+' },
  { value: 95, label: 'Satisfaction', suffix: '%' },
]

export function MobileBrandMission({ className }: MobileBrandMissionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.3 })

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.4 }}
      className={`mt-12 ${className || ''}`}
    >
      <motion.div
        className="relative bg-luxury-charcoal/70 backdrop-blur-xl border border-luxury-gold/20 rounded-[2rem] p-6 md:p-8 overflow-hidden"
        initial={{ scale: 0.95 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        {/* Animated gradient background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-luxury-gold/10 via-luxury-amber/5 to-luxury-gold/10 opacity-0"
          animate={{
            opacity: isInView ? 0.15 : 0,
          }}
          transition={{ duration: 0.6, delay: 0.8 }}
        />

        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-luxury-gold/20 to-transparent"
          animate={{
            x: isInView ? ['-100%', '200%'] : '-100%',
          }}
          transition={{
            duration: 2,
            repeat: isInView ? Infinity : 0,
            ease: 'linear',
            delay: 1,
          }}
        />

        {/* Content */}
        <div className="relative z-10">
          <motion.h3
            className="text-2xl font-heading font-bold text-luxury-cream mb-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8 }}
          >
            Our Mission
          </motion.h3>

          <motion.p
            className="text-luxury-cream/70 text-sm md:text-base leading-relaxed mb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1 }}
          >
            To create exceptional fragrances that capture moments, memories, and emotions, while
            maintaining our commitment to luxury, quality, and the art of perfumery.
          </motion.p>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4">
            {stats.map((stat, index) => (
              <AnimatedStat
                key={stat.label}
                value={stat.value}
                label={stat.label}
                suffix={stat.suffix}
                index={index}
                isInView={isInView}
              />
            ))}
          </div>
        </div>

        {/* Glowing border effect */}
        <motion.div
          className="absolute inset-0 rounded-[2rem] border-2 border-luxury-gold/20 pointer-events-none"
          animate={{
            opacity: isInView ? [0.3, 0.9, 0.3] : 0.3,
          }}
          transition={{
            duration: 2,
            repeat: isInView ? Infinity : 0,
            ease: 'easeInOut',
            delay: 1.2,
          }}
        />
      </motion.div>
    </motion.div>
  )
}

interface AnimatedStatProps {
  value: number
  label: string
  suffix: string
  index: number
  isInView: boolean
}

function AnimatedStat({ value, label, suffix, index, isInView }: AnimatedStatProps) {
  const spring = useSpring(0, { stiffness: 50, damping: 30 })
  const display = useTransform(spring, (current) => Math.round(current))

  if (isInView) {
    spring.set(value)
  }

  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay: 1.2 + index * 0.1 }}
    >
      <motion.div
        className="text-2xl md:text-3xl font-heading font-bold text-luxury-gold mb-2"
        animate={{
          textShadow: [
            '0 0 10px rgba(212, 175, 55, 0.3)',
            '0 0 20px rgba(212, 175, 55, 0.5)',
            '0 0 10px rgba(212, 175, 55, 0.3)',
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <motion.span>{display}</motion.span>
        <span className="text-lg">{suffix}</span>
      </motion.div>
      <p className="text-luxury-cream/70 text-xs md:text-sm">{label}</p>
    </motion.div>
  )
}

