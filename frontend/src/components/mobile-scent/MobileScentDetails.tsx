'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

interface ScentCategory {
  id: string
  name: string
  description: string
  color: string
}

interface MobileScentDetailsProps {
  category: ScentCategory | null
  className?: string
}

export function MobileScentDetails({ category, className }: MobileScentDetailsProps) {
  return (
    <AnimatePresence>
      {category && (
        <motion.div
          initial={{ opacity: 0, height: 0, y: -20 }}
          animate={{ opacity: 1, height: 'auto', y: 0 }}
          exit={{ opacity: 0, height: 0, y: -20 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className={`mb-8 ${className || ''}`}
        >
          <motion.div
            className="relative bg-luxury-charcoal/80 backdrop-blur-xl border border-luxury-gold/30 rounded-[2rem] p-6 overflow-hidden"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* Animated gradient background */}
            <motion.div
              className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-10`}
              animate={{
                opacity: [0.1, 0.15, 0.1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-luxury-gold/20 to-transparent"
              animate={{
                x: ['-100%', '200%'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'linear',
              }}
            />

            {/* Content */}
            <div className="relative z-10">
              <motion.h3
                className="text-xl font-heading font-bold text-luxury-cream mb-2"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                {category.name}
              </motion.h3>

              <motion.p
                className="text-luxury-cream/70 text-sm mb-6 leading-relaxed"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                {category.description}
              </motion.p>

              <Link href={`/products?category=${category.id}`}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-block w-full"
                >
                  <Button
                    size="sm"
                    variant="premium"
                    className="w-full relative overflow-hidden group"
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
                    <span className="relative z-10 font-semibold">Explore This Category</span>
                  </Button>
                </motion.div>
              </Link>
            </div>

            {/* Glowing border effect */}
            <motion.div
              className="absolute inset-0 rounded-[2rem] border-2 border-luxury-gold/30 pointer-events-none"
              animate={{
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

