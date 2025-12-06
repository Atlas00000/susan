'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export function QuizMotivational() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <motion.div
      ref={ref}
      className="mt-16 text-center"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 1.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        className="inline-block rounded-2xl p-6 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(30, 30, 30, 0.6), rgba(20, 20, 20, 0.8))',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(212, 175, 55, 0.2)',
        }}
        animate={{
          boxShadow: [
            '0 0 20px rgba(212, 175, 55, 0.1)',
            '0 0 40px rgba(212, 175, 55, 0.2)',
            '0 0 20px rgba(212, 175, 55, 0.1)',
          ],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        whileHover={{ scale: 1.02 }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-luxury-gold/5 via-luxury-amber/5 to-luxury-gold/5"
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        <p className="text-luxury-cream/80 text-lg relative z-10">
          "Every question brings you closer to your perfect scent match"
        </p>
      </motion.div>
    </motion.div>
  )
}

