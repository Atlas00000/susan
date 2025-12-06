'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

interface BrandStoryMissionProps {
  className?: string
}

interface Stat {
  value: string
  label: string
}

const stats: Stat[] = [
  { value: '1K+', label: 'Happy Customers' },
  { value: '5+', label: 'Nigerian Cities' },
  { value: '20+', label: 'Fragrances' },
]

export function BrandStoryMission({ className }: BrandStoryMissionProps) {
  const missionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(missionRef, { once: true, amount: 0.3 })
  const [animatedStats, setAnimatedStats] = useState(stats.map(() => false))

  useEffect(() => {
    if (isInView) {
      const timers = stats.map((_, index) =>
        setTimeout(() => {
          setAnimatedStats((prev) => {
            const newStats = [...prev]
            newStats[index] = true
            return newStats
          })
        }, index * 200)
      )
      return () => timers.forEach(clearTimeout)
    }
  }, [isInView])

  return (
    <motion.div
      ref={missionRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.2 }}
      className={`text-center ${className || ''}`}
    >
      <motion.div
        className="relative bg-luxury-charcoal/60 backdrop-blur-xl border border-luxury-gold/30 rounded-[2.5rem] p-8 md:p-12 max-w-5xl mx-auto overflow-hidden"
        initial={{ scale: 0.95 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        {/* Animated background */}
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

        {/* Content */}
        <div className="relative z-10">
          <motion.h3
            className="text-3xl md:text-4xl font-heading font-bold text-luxury-cream mb-6"
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
            Our Mission
          </motion.h3>

          <motion.p
            className="text-xl md:text-2xl text-luxury-cream/70 leading-relaxed mb-10 md:mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
          >
            "To create exceptional fragrances that capture the essence of luxury, tell unique stories, and create lasting memories for our customers in Nigeria."
          </motion.p>

          {/* Animated Stats */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={
                  animatedStats[index]
                    ? { opacity: 1, scale: 1, y: 0 }
                    : { opacity: 0, scale: 0.8, y: 20 }
                }
                transition={{
                  duration: 0.6,
                  type: 'spring',
                  stiffness: 200,
                }}
              >
                <motion.div
                  className="text-3xl md:text-4xl font-heading font-bold luxury-text-gradient mb-2"
                  animate={{
                    scale: animatedStats[index] ? [1, 1.1, 1] : 1,
                  }}
                  transition={{
                    duration: 2,
                    repeat: animatedStats[index] ? Infinity : 0,
                    ease: 'easeInOut',
                    delay: index * 0.2,
                  }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-luxury-cream/70 text-sm md:text-base font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
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
      </motion.div>
    </motion.div>
  )
}

