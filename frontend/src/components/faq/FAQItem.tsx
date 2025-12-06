'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'

interface FAQItemProps {
  id: number
  question: string
  answer: string
  index: number
  isOpen: boolean
  onToggle: (id: number) => void
  isInView: boolean
}

export function FAQItem({
  id,
  question,
  answer,
  index,
  isOpen,
  onToggle,
  isInView,
}: FAQItemProps) {
  const [isHovered, setIsHovered] = useState(false)
  const itemRef = useRef<HTMLDivElement>(null)

  // 3D tilt effect
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [3, -3]), {
    stiffness: 300,
    damping: 30,
  })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-3, 3]), {
    stiffness: 300,
    damping: 30,
  })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!itemRef.current) return

    const rect = itemRef.current.getBoundingClientRect()
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
      ref={itemRef}
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
        delay: index * 0.1,
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
      className="mb-4"
      whileHover={{ y: -5 }}
    >
      <motion.div
        className="relative bg-luxury-charcoal/70 backdrop-blur-xl border border-luxury-gold/20 rounded-[2rem] overflow-hidden shadow-xl"
        animate={{
          borderColor: isOpen || isHovered
            ? 'rgba(212, 175, 55, 0.5)'
            : 'rgba(212, 175, 55, 0.2)',
          boxShadow: isOpen || isHovered
            ? '0 20px 60px rgba(212, 175, 55, 0.3), 0 0 40px rgba(212, 175, 55, 0.2)'
            : '0 10px 30px rgba(0, 0, 0, 0.3)',
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Animated gradient background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-luxury-gold/10 via-luxury-amber/5 to-luxury-gold/10 opacity-0"
          animate={{
            opacity: isOpen || isHovered ? 0.15 : 0,
          }}
          transition={{ duration: 0.4 }}
        />

        {/* Morphing shape background */}
        <motion.div
          className="absolute inset-0"
          animate={{
            scale: isHovered ? [1, 1.05, 1] : 1,
            rotate: isHovered ? [0, 1, -1, 0] : 0,
          }}
          transition={{
            duration: 4,
            repeat: isHovered ? Infinity : 0,
            ease: 'easeInOut',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-luxury-gold/5 to-luxury-amber/5 rounded-[2rem]" />
        </motion.div>

        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-luxury-gold/20 to-transparent"
          animate={{
            x: isOpen || isHovered ? ['-100%', '200%'] : '-100%',
          }}
          transition={{
            duration: 1.5,
            repeat: isOpen || isHovered ? Infinity : 0,
            ease: 'linear',
          }}
        />

        {/* Question Button */}
        <motion.button
          onClick={() => onToggle(id)}
          className="relative w-full p-6 md:p-8 text-left flex items-center justify-between z-10 group"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <motion.h3
            className="text-lg md:text-xl lg:text-2xl font-heading font-bold text-luxury-cream pr-6 flex-1"
            animate={{
              color: isOpen || isHovered ? '#D4AF37' : '#F5F5DC',
            }}
            transition={{ duration: 0.3 }}
          >
            {question}
          </motion.h3>

          {/* Animated Icon */}
          <motion.div
            className="relative w-8 h-8 md:w-10 md:h-10 rounded-full bg-luxury-gold/20 flex items-center justify-center flex-shrink-0"
            animate={{
              rotate: isOpen ? 180 : 0,
              backgroundColor: isOpen
                ? 'rgba(212, 175, 55, 0.3)'
                : 'rgba(212, 175, 55, 0.2)',
              scale: isHovered ? [1, 1.1, 1] : 1,
            }}
            transition={{
              duration: 0.3,
              type: 'spring',
              stiffness: 200,
            }}
          >
            <motion.svg
              className="w-5 h-5 md:w-6 md:h-6 text-luxury-gold"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={{
                rotate: isOpen ? 180 : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M19 9l-7 7-7-7"
              />
            </motion.svg>

            {/* Glow effect when open */}
            {isOpen && (
              <motion.div
                className="absolute inset-0 rounded-full bg-luxury-gold"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.4, 0, 0.4],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            )}
          </motion.div>
        </motion.button>

        {/* Answer Content */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                duration: 0.4,
                ease: 'easeInOut',
              }}
              className="overflow-hidden"
            >
              <motion.div
                className="px-6 md:px-8 pb-6 md:pb-8 relative z-10"
                initial={{ y: -10 }}
                animate={{ y: 0 }}
                exit={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {/* Decorative line */}
                <motion.div
                  className="h-px bg-gradient-to-r from-transparent via-luxury-gold/30 to-transparent mb-6"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                />

                <motion.p
                  className="text-luxury-cream/70 leading-relaxed text-base md:text-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {answer}
                </motion.p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Glowing border effect */}
        <motion.div
          className="absolute inset-0 rounded-[2rem] border-2 border-luxury-gold/20 pointer-events-none"
          animate={{
            opacity: isOpen || isHovered ? [0.3, 0.9, 0.3] : 0.3,
          }}
          transition={{
            duration: 2,
            repeat: isOpen || isHovered ? Infinity : 0,
            ease: 'easeInOut',
          }}
        />
      </motion.div>
    </motion.div>
  )
}

