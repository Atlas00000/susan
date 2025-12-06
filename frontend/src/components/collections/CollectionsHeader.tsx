'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export function CollectionsHeader() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <motion.div
      ref={ref}
      className="relative z-10 text-center mb-20"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
    >
      {/* Organic Badge */}
      <motion.div
        className="inline-block mb-8"
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={isInView ? { scale: 1, opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          className="relative px-8 py-4 rounded-full overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.15), rgba(212, 175, 55, 0.05))',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            backdropFilter: 'blur(10px)',
          }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-luxury-gold/20 to-transparent"
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
          <span className="relative text-luxury-gold font-semibold text-lg">
            Discover Our Collections
          </span>
        </motion.div>
      </motion.div>

      {/* Animated Title */}
      <motion.h1
        className="text-6xl md:text-8xl font-heading font-bold mb-8"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.span
          className="block luxury-text-gradient"
          animate={{
            backgroundPosition: ['0%', '100%', '0%'],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          Luxury
        </motion.span>
        <motion.span
          className="block text-luxury-cream"
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          Collections
        </motion.span>
      </motion.h1>

      {/* Description */}
      <motion.p
        className="text-xl md:text-2xl text-luxury-cream/80 max-w-4xl mx-auto leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        Immerse yourself in our world of exceptional fragrances, where each collection
        tells a unique story of luxury, sophistication, and personal expression.
      </motion.p>
    </motion.div>
  )
}

