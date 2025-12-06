'use client'

import { motion, useInView } from 'framer-motion'
import { useState, useRef } from 'react'

interface Value {
  title: string
  description: string
  color: string
}

const values: Value[] = [
  {
    title: 'Authenticity',
    description: 'We source only the finest, most authentic fragrances from trusted artisans and renowned houses worldwide.',
    color: 'from-luxury-gold to-luxury-amber',
  },
  {
    title: 'Personal Connection',
    description: 'Every recommendation is tailored to your unique personality, preferences, and lifestyle.',
    color: 'from-luxury-amber to-luxury-gold',
  },
  {
    title: 'Luxury Experience',
    description: 'From discovery to delivery, we provide an unparalleled luxury experience that exceeds expectations.',
    color: 'from-luxury-gold to-luxury-amber',
  },
]

export function AboutValues() {
  const [hoveredValue, setHoveredValue] = useState<number | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <motion.div
      ref={ref}
      className="mb-20"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="text-center mb-16">
        <motion.h2
          className="text-4xl md:text-5xl font-heading font-bold text-luxury-cream mb-6"
          animate={{
            textShadow: [
              '0 0 20px rgba(212, 175, 55, 0.2)',
              '0 0 40px rgba(212, 175, 55, 0.4)',
              '0 0 20px rgba(212, 175, 55, 0.2)',
            ],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          Our Values
        </motion.h2>
        <p className="text-xl text-luxury-cream/70 max-w-3xl mx-auto">
          The principles that guide everything we do
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {values.map((value, index) => (
          <motion.div
            key={value.title}
            className="group relative"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.6,
              delay: index * 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            onHoverStart={() => setHoveredValue(index)}
            onHoverEnd={() => setHoveredValue(null)}
          >
            <motion.div
              className="relative h-full rounded-3xl p-8 overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(30, 30, 30, 0.7), rgba(20, 20, 20, 0.9))',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(212, 175, 55, 0.3)',
              }}
              whileHover={{
                scale: 1.05,
                y: -10,
                borderColor: 'rgba(212, 175, 55, 0.5)',
              }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Morphing background */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                animate={{
                  scale: hoveredValue === index ? [1, 1.1, 1] : 1,
                  borderRadius: hoveredValue === index
                    ? [
                        '30% 70% 70% 30% / 30% 30% 70% 70%',
                        '70% 30% 30% 70% / 70% 70% 30% 30%',
                        '30% 70% 70% 30% / 30% 30% 70% 70%',
                      ]
                    : '30% 70% 70% 30% / 30% 30% 70% 70%',
                }}
                transition={{
                  duration: 3,
                  repeat: hoveredValue === index ? Infinity : 0,
                  ease: 'easeInOut',
                }}
              />

              <div className="relative z-10 text-center">
                <motion.h3
                  className="text-2xl font-bold text-luxury-cream mb-4 group-hover:text-luxury-gold transition-colors duration-300"
                  animate={{
                    y: hoveredValue === index ? -5 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {value.title}
                </motion.h3>

                <motion.p
                  className="text-luxury-cream/70 leading-relaxed"
                  animate={{
                    y: hoveredValue === index ? -5 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {value.description}
                </motion.p>
              </div>

              {/* Glowing border */}
              <motion.div
                className="absolute inset-0 rounded-3xl pointer-events-none"
                style={{
                  border: '1px solid rgba(212, 175, 55, 0.2)',
                }}
                animate={{
                  opacity: hoveredValue === index ? [0.3, 0.8, 0.3] : 0.2,
                  boxShadow: hoveredValue === index
                    ? [
                        '0 0 20px rgba(212, 175, 55, 0.1)',
                        '0 0 40px rgba(212, 175, 55, 0.2)',
                        '0 0 20px rgba(212, 175, 55, 0.1)',
                      ]
                    : '0 0 0px rgba(212, 175, 55, 0)',
                }}
                transition={{
                  duration: 2,
                  repeat: hoveredValue === index ? Infinity : 0,
                  ease: 'easeInOut',
                }}
              />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

