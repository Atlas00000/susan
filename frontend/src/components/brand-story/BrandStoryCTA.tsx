'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

interface BrandStoryCTAProps {
  className?: string
}

export function BrandStoryCTA({ className }: BrandStoryCTAProps) {
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
              Be Part of Our Story
            </motion.h3>

            <motion.p
              className="text-luxury-cream/70 mb-6 text-lg max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 }}
            >
              Join thousands of customers who have discovered their perfect scent with us
            </motion.p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/quiz">
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block"
                >
                  <Button
                    size="lg"
                    variant="premium"
                    className="relative px-10 py-5 text-lg overflow-hidden group"
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
                      <span>Discover Your Scent</span>
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

              <Link href="/about">
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block"
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="px-10 py-5 text-lg border-luxury-gold/50 hover:border-luxury-gold hover:bg-luxury-gold/10 transition-all duration-300"
                  >
                    Learn More
                  </Button>
                </motion.div>
              </Link>
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

