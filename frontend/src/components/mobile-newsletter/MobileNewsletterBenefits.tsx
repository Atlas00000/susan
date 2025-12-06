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

interface MobileNewsletterBenefitsProps {
  className?: string
}

export function MobileNewsletterBenefits({ className }: MobileNewsletterBenefitsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.2 })

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.4 }}
      className={`mt-8 ${className || ''}`}
    >
      <motion.h3
        className="text-xl md:text-2xl font-heading font-bold text-luxury-cream mb-6 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.6 }}
      >
        What You'll Get:
      </motion.h3>

      <div className="space-y-4">
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
              delay: 0.8 + index * 0.15,
              duration: 0.5,
              type: 'spring',
              stiffness: 200,
            }}
            whileHover={{ scale: 1.02, y: -3 }}
            className="group relative"
          >
            <div className="relative p-5 bg-luxury-charcoal/40 backdrop-blur-xl border border-luxury-gold/20 rounded-[1.5rem] overflow-hidden cursor-pointer">
              {/* Animated gradient background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-luxury-gold/10 via-luxury-amber/5 to-luxury-gold/10 opacity-0"
                whileHover={{
                  opacity: 0.15,
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
                <div className="absolute inset-0 bg-gradient-to-br from-luxury-gold/5 to-luxury-amber/5 rounded-[1.5rem]" />
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
              <div className="relative z-10 flex items-start gap-4">
                {/* Icon Circle */}
                <motion.div
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-luxury-gold to-luxury-amber flex items-center justify-center flex-shrink-0"
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
                    className="w-5 h-5 rounded-full bg-luxury-charcoal"
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
                    className="text-base md:text-lg font-heading font-bold text-luxury-cream mb-1"
                    whileHover={{
                      color: '#D4AF37',
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {benefit.title}
                  </motion.h4>
                  <p className="text-luxury-cream/70 text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>

              {/* Glowing border effect */}
              <motion.div
                className="absolute inset-0 rounded-[1.5rem] border-2 border-luxury-gold/20 pointer-events-none"
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
      </div>
    </motion.div>
  )
}

