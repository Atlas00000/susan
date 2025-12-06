'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface Benefit {
  title: string
  description: string
}

const benefits: Benefit[] = [
  {
    title: 'Exclusive Offers',
    description: 'Special discounts and early access to new collections',
  },
  {
    title: 'Scent Stories',
    description: 'Behind-the-scenes content and fragrance education',
  },
  {
    title: 'Personalized Recommendations',
    description: 'Curated suggestions based on your preferences',
  },
]

interface NewsletterBenefitsProps {
  className?: string
}

export function NewsletterBenefits({ className }: NewsletterBenefitsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.2 })

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, x: 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.4 }}
      className={`space-y-6 ${className || ''}`}
    >
      <motion.h3
        className="text-2xl md:text-3xl font-heading font-bold text-luxury-cream mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.6 }}
      >
        What You'll Get:
      </motion.h3>

      {benefits.map((benefit, index) => (
        <motion.div
          key={benefit.title}
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={
            isInView
              ? {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }
              : {}
          }
          transition={{
            delay: 0.8 + index * 0.2,
            duration: 0.5,
            type: 'spring',
            stiffness: 200,
          }}
          whileHover={{ scale: 1.02, y: -5 }}
          className="group relative"
        >
          <div className="relative p-6 md:p-8 bg-luxury-charcoal/40 backdrop-blur-xl border border-luxury-gold/20 rounded-[2rem] overflow-hidden cursor-pointer">
            {/* Animated gradient background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-luxury-gold/10 via-luxury-amber/5 to-luxury-gold/10 opacity-0"
              animate={{
                opacity: ['group-hover', 'hover'].some((state) => state) ? 0.15 : 0,
              }}
              transition={{ duration: 0.4 }}
            />

            {/* Morphing shape background */}
            <motion.div
              className="absolute inset-0"
              whileHover={{
                scale: [1, 1.05, 1],
                rotate: [0, 1, -1, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-luxury-gold/5 to-luxury-amber/5 rounded-[2rem]" />
            </motion.div>

            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-luxury-gold/20 to-transparent"
              whileHover={{
                x: ['-100%', '200%'],
              }}
              transition={{
                duration: 1.5,
                ease: 'linear',
              }}
            />

            {/* Content */}
            <div className="relative z-10 flex items-start gap-4 md:gap-6">
              {/* Icon Circle */}
              <motion.div
                className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-luxury-gold to-luxury-amber flex items-center justify-center flex-shrink-0"
                whileHover={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <motion.div
                  className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-luxury-charcoal"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.8, 1, 0.8],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              </motion.div>

              <div className="flex-1">
                <motion.h4
                  className="text-lg md:text-xl font-heading font-bold text-luxury-cream mb-2"
                  whileHover={{
                    color: '#D4AF37',
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {benefit.title}
                </motion.h4>
                <p className="text-luxury-cream/70 text-sm md:text-base leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </div>

            {/* Glowing border effect */}
            <motion.div
              className="absolute inset-0 rounded-[2rem] border-2 border-luxury-gold/20 pointer-events-none"
              whileHover={{
                opacity: [0.3, 0.9, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}

