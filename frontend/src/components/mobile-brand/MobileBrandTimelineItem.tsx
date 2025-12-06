'use client'

import { useState, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

interface TimelineEvent {
  title: string
  description: string
  color: string
}

interface MobileBrandTimelineItemProps {
  event: TimelineEvent
  index: number
  isInView: boolean
}

export function MobileBrandTimelineItem({
  event,
  index,
  isInView,
}: MobileBrandTimelineItemProps) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  // 3D tilt effect - subtle for mobile
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [2, -2]), {
    stiffness: 300,
    damping: 30,
  })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-2, 2]), {
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
    setIsHovered(false)
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={
        isInView
          ? {
              opacity: 1,
              y: 0,
              scale: 1,
            }
          : {}
      }
      transition={{
        duration: 0.5,
        delay: index * 0.15,
        type: 'spring',
        stiffness: 200,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className="group relative"
      whileTap={{ scale: 0.98 }}
    >
      <motion.div
        className="relative bg-luxury-charcoal/70 backdrop-blur-xl border border-luxury-gold/20 rounded-[2rem] p-6 overflow-hidden"
        animate={{
          borderColor: isHovered
            ? 'rgba(212, 175, 55, 0.5)'
            : 'rgba(212, 175, 55, 0.2)',
          boxShadow: isHovered
            ? '0 15px 40px rgba(212, 175, 55, 0.3), 0 0 30px rgba(212, 175, 55, 0.2)'
            : '0 8px 20px rgba(0, 0, 0, 0.3)',
        }}
        transition={{ duration: 0.3 }}
        whileHover={{ y: -5 }}
      >
        {/* Animated gradient background */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${event.color} opacity-0`}
          animate={{
            opacity: isHovered ? 0.15 : 0,
          }}
          transition={{ duration: 0.4 }}
        />

        {/* Morphing shape background */}
        <motion.div
          className="absolute inset-0"
          animate={{
            scale: isHovered ? [1, 1.08, 1] : 1,
            rotate: isHovered ? [0, 2, -2, 0] : 0,
          }}
          transition={{
            duration: 4,
            repeat: isHovered ? Infinity : 0,
            ease: 'easeInOut',
          }}
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${event.color} rounded-[2rem] opacity-5`} />
        </motion.div>

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
          {/* Timeline Dot */}
          <motion.div
            className="absolute -left-3 top-8 w-6 h-6 rounded-full bg-luxury-gold border-4 border-luxury-charcoal z-20"
            initial={{ scale: 0 }}
            animate={
              isInView
                ? {
                    scale: 1,
                  }
                : {}
            }
            transition={{
              delay: index * 0.15 + 0.3,
              type: 'spring',
              stiffness: 200,
            }}
          >
            <motion.div
              className="absolute inset-0 rounded-full bg-luxury-gold"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.6, 0, 0.6],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </motion.div>

          <motion.h3
            className="text-xl font-heading font-bold text-luxury-cream mb-3"
            animate={{
              color: isHovered ? '#D4AF37' : '#F5F5DC',
            }}
            transition={{ duration: 0.3 }}
          >
            {event.title}
          </motion.h3>

          <p className="text-luxury-cream/70 text-sm leading-relaxed">
            {event.description}
          </p>
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
  )
}

