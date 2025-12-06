'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Badge } from '@/components/ui/Badge'

interface TimelineItem {
  title: string
  description: string
}

const timeline: TimelineItem[] = [
  {
    title: 'The Beginning',
    description: 'Founded with a vision to democratize luxury fragrances and help everyone discover their perfect scent',
  },
  {
    title: 'Global Expansion',
    description: 'Expanded to serve customers worldwide, bringing luxury fragrances to every corner of the globe',
  },
  {
    title: 'Digital Innovation',
    description: 'Launched our AI-powered scent discovery platform to personalize the fragrance journey',
  },
  {
    title: 'Future Vision',
    description: 'Continuing to innovate in personalized fragrance experiences and luxury scent discovery',
  },
]

export function AboutTimeline() {
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
          Our Journey
        </motion.h2>
        <p className="text-xl text-luxury-cream/70 max-w-3xl mx-auto">
          The path that led us to become your trusted fragrance companion
        </p>
      </div>

      <div className="relative">
        {/* Timeline Line */}
        <motion.div
          className="absolute left-8 md:left-12 top-0 bottom-0 w-1"
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: 'linear-gradient(to bottom, #D4AF37, #FFD700, #D4AF37)',
            borderRadius: '999px',
          }}
        />

        <div className="space-y-12">
          {timeline.map((item, index) => (
            <motion.div
              key={item.title}
              className="relative flex items-start space-x-6 md:space-x-8"
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: index * 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {/* Timeline Dot */}
              <motion.div
                className="relative z-10 w-16 h-16 flex-shrink-0 rounded-full flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, rgba(30, 30, 30, 0.9), rgba(20, 20, 20, 0.95))',
                  border: '3px solid rgba(212, 175, 55, 0.5)',
                  backdropFilter: 'blur(10px)',
                }}
                animate={{
                  scale: [1, 1.15, 1],
                  boxShadow: [
                    '0 0 20px rgba(212, 175, 55, 0.3)',
                    '0 0 40px rgba(212, 175, 55, 0.6)',
                    '0 0 20px rgba(212, 175, 55, 0.3)',
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.3,
                }}
                whileHover={{
                  scale: 1.2,
                  borderColor: 'rgba(212, 175, 55, 0.8)',
                }}
              >
                <motion.div
                  className="w-3 h-3 rounded-full bg-luxury-gold"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.8, 1, 0.8],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: index * 0.2,
                  }}
                />
              </motion.div>

              {/* Content Card */}
              <motion.div
                className="flex-1 rounded-3xl p-6 md:p-8 overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(30, 30, 30, 0.7), rgba(20, 20, 20, 0.9))',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                }}
                whileHover={{
                  scale: 1.02,
                  y: -5,
                  borderColor: 'rgba(212, 175, 55, 0.5)',
                }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Morphing background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-luxury-gold/10 via-transparent to-luxury-royal/10"
                  animate={{
                    borderRadius: [
                      '30% 70% 70% 30% / 30% 30% 70% 70%',
                      '70% 30% 30% 70% / 70% 70% 30% 30%',
                      '30% 70% 70% 30% / 30% 30% 70% 70%',
                    ],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />

                <div className="relative z-10">
                  <div className="flex items-center space-x-4 mb-4">
                    <Badge variant="luxury" className="text-xs">
                      Journey
                    </Badge>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-luxury-cream mb-2">
                    {item.title}
                  </h3>
                  <p className="text-luxury-cream/70 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

