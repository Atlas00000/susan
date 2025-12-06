'use client'

import { useState, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion'
import { Badge } from '@/components/ui/Badge'

interface FragranceNote {
  name: string
  intensity: number
  description: string
}

interface FragranceNoteCardProps {
  note: FragranceNote
  categoryKey: string
  categoryIndex: number
  noteIndex: number
  isSelected: boolean
  onSelect: (name: string) => void
  isInView: boolean
}

export function FragranceNoteCard({
  note,
  categoryKey,
  categoryIndex,
  noteIndex,
  isSelected,
  onSelect,
  isInView,
}: FragranceNoteCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  // 3D tilt effect
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), {
    stiffness: 300,
    damping: 30,
  })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), {
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

  const getGradient = () => {
    if (categoryKey === 'top') return 'from-luxury-gold to-luxury-amber'
    if (categoryKey === 'heart') return 'from-luxury-royal to-luxury-gold'
    return 'from-luxury-amber to-luxury-royal'
  }

  const getLongevity = () => {
    if (note.intensity > 90) return 'Very Long'
    if (note.intensity > 70) return 'Long'
    return 'Medium'
  }

  const getSillage = () => {
    if (note.intensity > 85) return 'Strong'
    if (note.intensity > 60) return 'Moderate'
    return 'Light'
  }

  const getBestFor = () => {
    if (categoryKey === 'top') return 'First impressions'
    if (categoryKey === 'heart') return 'Day wear'
    return 'Evening wear'
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: categoryIndex * 0.2 + noteIndex * 0.1,
        type: 'spring',
        stiffness: 200,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className="group relative h-full"
    >
      <motion.div
        className="relative h-full p-6 bg-luxury-charcoal/70 backdrop-blur-xl border border-luxury-gold/20 rounded-[2rem] shadow-xl overflow-hidden cursor-pointer"
        animate={{
          borderColor: isHovered || isSelected
            ? 'rgba(212, 175, 55, 0.5)'
            : 'rgba(212, 175, 55, 0.2)',
          boxShadow: isHovered || isSelected
            ? '0 20px 60px rgba(212, 175, 55, 0.3), 0 0 40px rgba(212, 175, 55, 0.2)'
            : '0 10px 30px rgba(0, 0, 0, 0.3)',
        }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.02, y: -5 }}
        onClick={() => onSelect(note.name)}
      >
        {/* Animated gradient background */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${getGradient()} opacity-0`}
          animate={{
            opacity: isHovered || isSelected ? 0.15 : 0,
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
          <div className={`absolute inset-0 bg-gradient-to-br ${getGradient()} opacity-5 rounded-[2rem]`} />
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
          {/* Note Name */}
          <motion.h4
            className="text-xl md:text-2xl font-heading font-bold text-luxury-cream mb-3 text-center"
            animate={{
              color: isHovered || isSelected ? '#D4AF37' : '#F5F5DC',
            }}
            transition={{ duration: 0.3 }}
          >
            {note.name}
          </motion.h4>

          {/* Description */}
          <p className="text-luxury-cream/70 text-center mb-6 text-sm md:text-base leading-relaxed">
            {note.description}
          </p>

          {/* Interactive Note Details */}
          <AnimatePresence>
            {isSelected && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -10 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="mb-6 p-4 bg-luxury-gold/10 rounded-xl border border-luxury-gold/30 backdrop-blur-sm"
              >
                <h5 className="text-luxury-gold font-semibold mb-3 text-sm">Fragrance Profile:</h5>
                <ul className="text-xs md:text-sm text-luxury-cream/80 space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold" />
                    Longevity: {getLongevity()}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold" />
                    Sillage: {getSillage()}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold" />
                    Best for: {getBestFor()}
                  </li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Intensity Visualization */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs text-luxury-cream/60 font-medium">Intensity</span>
              <motion.span
                className="text-xs md:text-sm text-luxury-gold font-semibold"
                animate={{
                  scale: isHovered ? [1, 1.1, 1] : 1,
                }}
                transition={{
                  duration: 2,
                  repeat: isHovered ? Infinity : 0,
                  ease: 'easeInOut',
                }}
              >
                {note.intensity}%
              </motion.span>
            </div>
            <div className="relative w-full bg-luxury-charcoal/50 rounded-full h-2.5 overflow-hidden">
              <motion.div
                className={`absolute inset-y-0 left-0 bg-gradient-to-r ${getGradient()} rounded-full`}
                initial={{ width: 0 }}
                animate={
                  isInView
                    ? {
                        width: `${note.intensity}%`,
                      }
                    : { width: 0 }
                }
                transition={{
                  delay: categoryIndex * 0.2 + noteIndex * 0.1 + 0.5,
                  duration: 1,
                  ease: 'easeOut',
                }}
              >
                {/* Animated shine */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{
                    x: ['-100%', '200%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Glowing border effect */}
        <motion.div
          className="absolute inset-0 rounded-[2rem] border-2 border-luxury-gold/20 pointer-events-none"
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

