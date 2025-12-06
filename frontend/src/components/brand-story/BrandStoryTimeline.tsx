'use client'

import { useState, useRef } from 'react'
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'

interface TimelineEvent {
  title: string
  description: string
  color: string
}

interface BrandStoryTimelineProps {
  events: TimelineEvent[]
  className?: string
}

export function BrandStoryTimeline({ events, className }: BrandStoryTimelineProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(timelineRef, { once: true, amount: 0.2 })

  return (
    <div ref={timelineRef} className={`max-w-5xl mx-auto ${className || ''}`}>
      <div className="relative">
        {/* Animated Timeline Line */}
        <motion.div
          className="absolute left-8 md:left-12 top-0 bottom-0 w-1"
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-luxury-gold via-luxury-amber to-luxury-royal rounded-full" />
          <motion.div
            className="absolute inset-0 bg-luxury-gold rounded-full"
            animate={{
              boxShadow: [
                '0 0 10px rgba(212, 175, 55, 0.5)',
                '0 0 20px rgba(212, 175, 55, 0.8)',
                '0 0 10px rgba(212, 175, 55, 0.5)',
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.div>

        {/* Timeline Events */}
        <div className="space-y-16 md:space-y-20">
          {events.map((event, index) => (
            <TimelineEventCard
              key={event.title}
              event={event}
              index={index}
              isHovered={hoveredIndex === index}
              onHover={() => setHoveredIndex(index)}
              onLeave={() => setHoveredIndex(null)}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

interface TimelineEventCardProps {
  event: TimelineEvent
  index: number
  isHovered: boolean
  onHover: () => void
  onLeave: () => void
  isInView: boolean
}

function TimelineEventCard({
  event,
  index,
  isHovered,
  onHover,
  onLeave,
  isInView,
}: TimelineEventCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  // 3D tilt effect
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [5, -5]), {
    stiffness: 300,
    damping: 30,
  })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-5, 5]), {
    stiffness: 300,
    damping: 30,
  })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY

    x.set(mouseX / rect.width)
    y.set(mouseY / rect.height)
  }

  const handleMouseLeave = () => {
    onLeave()
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      className="relative flex items-start"
      initial={{ opacity: 0, x: -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={onHover}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Timeline Dot - Organic Shape */}
      <div className="relative z-10 flex-shrink-0 w-16 h-16 md:w-20 md:h-20">
        <motion.div
          className="relative w-full h-full bg-luxury-charcoal border-4 border-luxury-gold rounded-full flex items-center justify-center"
          animate={{
            scale: isHovered ? [1, 1.2, 1] : [1, 1.1, 1],
            boxShadow: isHovered
              ? [
                  '0 0 20px rgba(212, 175, 55, 0.5)',
                  '0 0 40px rgba(212, 175, 55, 0.8)',
                  '0 0 20px rgba(212, 175, 55, 0.5)',
                ]
              : [
                  '0 0 15px rgba(212, 175, 55, 0.3)',
                  '0 0 30px rgba(212, 175, 55, 0.5)',
                  '0 0 15px rgba(212, 175, 55, 0.3)',
                ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: index * 0.3,
          }}
        >
          {/* Inner glow */}
          <motion.div
            className="absolute inset-2 bg-luxury-gold/20 rounded-full"
            animate={{
              opacity: isHovered ? [0.5, 1, 0.5] : [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.div>
      </div>

      {/* Event Content Card */}
      <motion.div
        className="ml-6 md:ml-10 flex-1"
        animate={{
          y: isHovered ? -5 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="relative bg-luxury-charcoal/70 backdrop-blur-xl border border-luxury-gold/30 rounded-[2rem] p-6 md:p-8 shadow-2xl overflow-hidden group"
          animate={{
            borderColor: isHovered
              ? 'rgba(212, 175, 55, 0.5)'
              : 'rgba(212, 175, 55, 0.3)',
            boxShadow: isHovered
              ? '0 20px 60px rgba(212, 175, 55, 0.3), 0 0 40px rgba(212, 175, 55, 0.2)'
              : '0 10px 30px rgba(0, 0, 0, 0.3)',
          }}
          transition={{ duration: 0.3 }}
          whileHover={{ scale: 1.02 }}
        >
          {/* Animated gradient background */}
          <motion.div
            className={`absolute inset-0 bg-gradient-to-br ${event.color} opacity-0`}
            animate={{
              opacity: isHovered ? 0.15 : 0,
            }}
            transition={{ duration: 0.4 }}
          />

          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-luxury-gold/20 to-transparent"
            animate={{
              x: isHovered ? ['-100%', '200%'] : '-100%',
            }}
            transition={{
              duration: 1.5,
              repeat: isHovered ? Infinity : 0,
              ease: 'linear',
            }}
          />

          {/* Content */}
          <div className="relative z-10">
            <motion.h3
              className="text-2xl md:text-3xl font-heading font-bold text-luxury-cream mb-4"
              animate={{
                color: isHovered ? '#D4AF37' : '#F5F5DC',
              }}
              transition={{ duration: 0.3 }}
            >
              {event.title}
            </motion.h3>

            <motion.p
              className="text-luxury-cream/70 leading-relaxed text-base md:text-lg"
              animate={{
                opacity: isHovered ? 1 : 0.8,
              }}
              transition={{ duration: 0.3 }}
            >
              {event.description}
            </motion.p>
          </div>

          {/* Glowing border effect */}
          <motion.div
            className="absolute inset-0 rounded-[2rem] border-2 border-luxury-gold/20 pointer-events-none"
            animate={{
              opacity: isHovered ? [0.3, 0.9, 0.3] : 0.3,
            }}
            transition={{
              duration: 2,
              repeat: isHovered ? Infinity : 0,
              ease: 'easeInOut',
            }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

