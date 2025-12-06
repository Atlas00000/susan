'use client'

import { useState, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Badge } from '@/components/ui/Badge'

interface ScentCategory {
  id: string
  name: string
  description: string
  color: string
  bgColor: string
  scents: string[]
}

interface ScentCategoryCardProps {
  category: ScentCategory
  index: number
  isSelected: boolean
  onSelect: (id: string) => void
  isInView: boolean
}

export function ScentCategoryCard({
  category,
  index,
  isSelected,
  onSelect,
  isInView,
}: ScentCategoryCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  // 3D tilt effect
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), {
    stiffness: 300,
    damping: 30,
  })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), {
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
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
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
      <motion.button
        onClick={() => onSelect(category.id)}
        className={`relative w-full h-full p-8 rounded-[2.5rem] text-left overflow-hidden transition-all duration-500 ${
          isSelected
            ? 'bg-gradient-to-br from-luxury-gold/30 to-luxury-amber/30 border-2 border-luxury-gold/60'
            : 'bg-luxury-charcoal/60 backdrop-blur-xl border border-luxury-gold/20 hover:border-luxury-gold/50'
        }`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        animate={{
          boxShadow: isSelected
            ? '0 20px 60px rgba(212, 175, 55, 0.4), 0 0 40px rgba(212, 175, 55, 0.3)'
            : isHovered
            ? '0 15px 40px rgba(212, 175, 55, 0.2), 0 0 30px rgba(212, 175, 55, 0.1)'
            : '0 10px 30px rgba(0, 0, 0, 0.3)',
        }}
      >
        {/* Animated gradient background */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${category.bgColor} opacity-0`}
          animate={{
            opacity: isHovered || isSelected ? 0.25 : 0,
          }}
          transition={{ duration: 0.4 }}
        />

        {/* Morphing shape background */}
        <motion.div
          className="absolute inset-0"
          animate={{
            scale: isHovered ? [1, 1.1, 1] : 1,
            rotate: isHovered ? [0, 5, -5, 0] : 0,
          }}
          transition={{
            duration: 4,
            repeat: isHovered ? Infinity : 0,
            ease: 'easeInOut',
          }}
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${category.bgColor} opacity-10 rounded-[2.5rem]`} />
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
          {/* Category Name */}
          <motion.h3
            className="text-2xl md:text-3xl font-heading font-bold text-luxury-cream mb-4 text-center"
            animate={{
              color: isSelected || isHovered ? '#D4AF37' : '#F5F5DC',
            }}
            transition={{ duration: 0.3 }}
          >
            {category.name}
          </motion.h3>

          {/* Description */}
          <motion.p
            className="text-luxury-cream/70 text-center mb-6 leading-relaxed"
            animate={{
              opacity: isHovered ? 1 : 0.8,
            }}
            transition={{ duration: 0.3 }}
          >
            {category.description}
          </motion.p>

          {/* Scent Notes - Floating badges */}
          <div className="flex flex-wrap gap-2 justify-center">
            {category.scents.map((scent, scentIndex) => (
              <motion.div
                key={scent}
                initial={{ opacity: 0, scale: 0, y: 10 }}
                animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{
                  delay: index * 0.1 + 0.3 + scentIndex * 0.05,
                  type: 'spring',
                  stiffness: 200,
                }}
                whileHover={{ scale: 1.1, y: -2 }}
              >
                <Badge
                  variant="secondary"
                  className="text-xs glass-light border-luxury-gold/30 hover:border-luxury-gold/50 transition-colors"
                >
                  {scent}
                </Badge>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Glowing border effect */}
        <motion.div
          className="absolute inset-0 rounded-[2.5rem] border-2 border-luxury-gold/20 pointer-events-none"
          animate={{
            opacity: isSelected || isHovered ? [0.3, 0.9, 0.3] : 0.3,
          }}
          transition={{
            duration: 2,
            repeat: isSelected || isHovered ? Infinity : 0,
            ease: 'easeInOut',
          }}
        />

        {/* Selection indicator */}
        {isSelected && (
          <motion.div
            className="absolute top-4 right-4 w-6 h-6 rounded-full bg-luxury-gold border-2 border-luxury-charcoal"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
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
        )}
      </motion.button>
    </motion.div>
  )
}

