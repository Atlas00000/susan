'use client'

import { motion, useInView } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'

interface Stat {
  label: string
  value: number
  target: number
}

export function CollectionsStats() {
  const [stats, setStats] = useState<Stat[]>([
    { label: 'Collections', value: 0, target: 5 },
    { label: 'Fragrances', value: 0, target: 25 },
    { label: 'Happy Customers', value: 0, target: 1000 },
    { label: 'Years of Excellence', value: 0, target: 10 },
  ])

  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  useEffect(() => {
    if (!isInView) return

    const animateStats = () => {
      setStats((prev) =>
        prev.map((stat) => ({
          ...stat,
          value: stat.target,
        }))
      )
    }

    const timer = setTimeout(animateStats, 500)
    return () => clearTimeout(timer)
  }, [isInView])

  return (
    <motion.div
      ref={ref}
      className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          className="text-center"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{
            duration: 0.6,
            delay: index * 0.1,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <motion.div
            className="relative inline-block"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: index * 0.2,
            }}
          >
            <motion.div
              className="text-4xl md:text-5xl font-bold luxury-text-gradient"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: index * 0.1 + 0.3 }}
            >
              {stat.value.toLocaleString()}+
            </motion.div>
            <motion.div
              className="absolute inset-0 luxury-text-gradient blur-xl opacity-50"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.2,
              }}
            >
              {stat.value.toLocaleString()}+
            </motion.div>
          </motion.div>
          <div className="text-luxury-cream/70 text-sm font-medium mt-2">
            {stat.label}
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}

