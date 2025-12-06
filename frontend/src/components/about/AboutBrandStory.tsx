'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export function AboutBrandStory() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const paragraphs = [
    "At Sanaya's Scents, we believe that perfume isn't just a fragrance—it's a mood, a memory, a story, a signature. Our journey began with a simple yet profound understanding: the crave of perfumes is not just because of its availability, but rather, often times it affects how we feel about ourselves, drives confidence and in situations gives a boost of support.",
    "Founded on the principle that every individual deserves to discover their perfect scent match, we curate the world's finest fragrances with an unwavering commitment to quality, authenticity, and personal connection. Our collection spans from ancient oud traditions to modern gourmand innovations, each bottle carefully selected to tell a unique story.",
    "We understand that choosing a fragrance is deeply personal. That's why we've created our signature scent discovery quiz—a journey of self-exploration that guides you to your perfect match. Allow us to walk with you on your scent discovery journey, where every question leads to a deeper understanding of your unique fragrance personality.",
  ]

  return (
    <motion.div
      ref={ref}
      className="mb-20"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        className="relative rounded-3xl p-12 md:p-16 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(30, 30, 30, 0.8), rgba(20, 20, 20, 0.9))',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(212, 175, 55, 0.3)',
        }}
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Animated background gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-luxury-gold/5 via-luxury-amber/5 to-luxury-gold/5"
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Morphing shape overlay */}
        <motion.div
          className="absolute top-0 right-0 w-72 h-72 bg-luxury-gold/5"
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
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        <div className="relative z-10 text-center">
          <motion.h2
            className="text-4xl md:text-5xl font-heading font-bold text-luxury-cream mb-8"
            animate={{
              textShadow: [
                '0 0 20px rgba(212, 175, 55, 0.2)',
                '0 0 40px rgba(212, 175, 55, 0.4)',
                '0 0 20px rgba(212, 175, 55, 0.2)',
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            The Art of Scent
          </motion.h2>

          <div className="space-y-6 text-lg text-luxury-cream/80 leading-relaxed max-w-4xl mx-auto">
            {paragraphs.map((paragraph, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.2 + index * 0.2,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

