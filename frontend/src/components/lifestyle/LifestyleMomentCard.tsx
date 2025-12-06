'use client'

import { useState, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion'

interface LifestyleMoment {
  id: string
  time: string
  title: string
  description: string
  scents: string[]
  color: string
  bgColor: string
}

interface LifestyleMomentCardProps {
  moment: LifestyleMoment
  index: number
  isSelected: boolean
  isHovered: boolean
  onSelect: (id: string) => void
  onHoverStart: (id: string) => void
  onHoverEnd: () => void
  isInView: boolean
}

export function LifestyleMomentCard({
  moment,
  index,
  isSelected,
  isHovered,
  onSelect,
  onHoverStart,
  onHoverEnd,
  isInView,
}: LifestyleMomentCardProps) {
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
    x.set(0)
    y.set(0)
    onHoverEnd()
  }

  const getTiming = () => {
    if (moment.id === 'morning') return '6 AM - 12 PM'
    if (moment.id === 'work') return '12 PM - 6 PM'
    if (moment.id === 'evening') return '6 PM - 10 PM'
    return '10 PM - 6 AM'
  }

  const getOccasion = () => {
    if (moment.id === 'morning') return 'Daily routine'
    if (moment.id === 'work') return 'Professional settings'
    if (moment.id === 'evening') return 'Social events'
    return 'Intimate moments'
  }

  const getMood = () => {
    if (moment.id === 'morning') return 'Fresh & Energizing'
    if (moment.id === 'work') return 'Confident & Professional'
    if (moment.id === 'evening') return 'Elegant & Sophisticated'
    return 'Sensual & Romantic'
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={
        isInView
          ? {
              opacity: 1,
              y: 0,
              scale: isSelected ? 1.02 : 1,
            }
          : {}
      }
      transition={{
        duration: 0.5,
        delay: index * 0.2,
        type: 'spring',
        stiffness: 200,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => onHoverStart(moment.id)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className="group relative h-full"
      whileHover={{ y: -10 }}
    >
      <motion.div
        className={`relative h-full p-6 md:p-8 rounded-[2.5rem] transition-all duration-500 overflow-hidden cursor-pointer bg-luxury-charcoal/70 backdrop-blur-xl border ${
          isSelected
            ? 'border-luxury-gold/60 shadow-lg shadow-luxury-gold/20'
            : 'border-luxury-gold/20 hover:border-luxury-gold/40'
        }`}
        animate={{
          borderColor: isSelected || isHovered
            ? 'rgba(212, 175, 55, 0.6)'
            : 'rgba(212, 175, 55, 0.2)',
          boxShadow: isSelected || isHovered
            ? '0 20px 60px rgba(212, 175, 55, 0.3), 0 0 40px rgba(212, 175, 55, 0.2)'
            : '0 10px 30px rgba(0, 0, 0, 0.3)',
        }}
        transition={{ duration: 0.3 }}
        onClick={() => onSelect(moment.id)}
      >
        {/* Animated gradient background */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${moment.bgColor} opacity-0`}
          animate={{
            opacity: isHovered || isSelected ? 0.2 : 0,
          }}
          transition={{ duration: 0.4 }}
        />

        {/* Morphing shape background */}
        <motion.div
          className="absolute inset-0"
          animate={{
            scale: isHovered ? [1, 1.1, 1] : 1,
            rotate: isHovered ? [0, 3, -3, 0] : 0,
          }}
          transition={{
            duration: 4,
            repeat: isHovered ? Infinity : 0,
            ease: 'easeInOut',
          }}
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${moment.bgColor} rounded-[2.5rem] opacity-5`} />
        </motion.div>

        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-luxury-gold/20 to-transparent"
          animate={{
            x: isHovered || isSelected ? ['-100%', '200%'] : '-100%',
          }}
          transition={{
            duration: 1.5,
            repeat: isHovered || isSelected ? Infinity : 0,
            ease: 'linear',
          }}
        />

        {/* Content */}
        <div className="relative z-10">
          {/* Time Badge */}
          <div className="text-center mb-6">
            <motion.div
              className={`inline-flex items-center px-4 md:px-6 py-2 md:py-3 rounded-full bg-gradient-to-r ${moment.color} text-white font-semibold text-sm md:text-base mb-4`}
              animate={{
                scale: isSelected ? [1, 1.05, 1] : 1,
                boxShadow: isSelected
                  ? '0 0 20px rgba(255, 255, 255, 0.3)'
                  : '0 0 0px rgba(255, 255, 255, 0)',
              }}
              transition={{ duration: 2, repeat: isSelected ? Infinity : 0 }}
            >
              {moment.time}
            </motion.div>
          </div>

          {/* Moment Title */}
          <motion.h3
            className="text-xl md:text-2xl font-heading font-bold text-luxury-cream mb-3 text-center"
            animate={{
              color: isHovered || isSelected ? '#D4AF37' : '#F5F5DC',
            }}
            transition={{ duration: 0.3 }}
          >
            {moment.title}
          </motion.h3>

          {/* Description */}
          <p className="text-luxury-cream/70 text-center mb-6 text-sm md:text-base leading-relaxed">
            {moment.description}
          </p>

          {/* Scent Notes */}
          <div className="space-y-3 mb-6">
            <h4 className="text-luxury-gold font-semibold text-center mb-3 text-sm md:text-base">
              Perfect Scents:
            </h4>
            <div className="flex flex-wrap gap-2 justify-center">
              {moment.scents.map((scent, scentIndex) => (
                <motion.span
                  key={scent}
                  className="px-3 py-1.5 bg-luxury-gold/10 text-luxury-gold text-xs md:text-sm rounded-full border border-luxury-gold/20 cursor-pointer hover:bg-luxury-gold/20 transition-colors"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={
                    isInView
                      ? {
                          opacity: 1,
                          scale: 1,
                        }
                      : {}
                  }
                  transition={{
                    delay: index * 0.2 + scentIndex * 0.1 + 0.5,
                    duration: 0.3,
                  }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {scent}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Interactive Moment Details */}
          <AnimatePresence>
            {isSelected && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -10 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="mt-4 p-4 bg-luxury-gold/10 rounded-xl border border-luxury-gold/30 backdrop-blur-sm"
              >
                <h5 className="text-luxury-gold font-semibold mb-3 text-sm md:text-base">
                  Perfect Timing:
                </h5>
                <ul className="text-xs md:text-sm text-luxury-cream/80 space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold" />
                    Best time: {getTiming()}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold" />
                    Occasion: {getOccasion()}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold" />
                    Mood: {getMood()}
                  </li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Glowing border effect */}
        <motion.div
          className="absolute inset-0 rounded-[2.5rem] border-2 border-luxury-gold/20 pointer-events-none"
          animate={{
            opacity: isHovered || isSelected ? [0.3, 0.9, 0.3] : 0.3,
          }}
          transition={{
            duration: 2,
            repeat: isHovered || isSelected ? Infinity : 0,
            ease: 'easeInOut',
          }}
        />

        {/* Selection indicator */}
        {isSelected && (
          <motion.div
            className="absolute top-4 right-4 w-5 h-5 rounded-full bg-luxury-gold border-2 border-luxury-charcoal"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <motion.div
              className="absolute inset-0 rounded-full bg-luxury-gold"
              animate={{
                scale: [1, 1.8, 1],
                opacity: [0.6, 0, 0.6],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )
}

