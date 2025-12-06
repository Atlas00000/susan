'use client'

import { useState, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

interface Testimonial {
  id: number
  name: string
  location: string
  rating: number
  text: string
}

interface MobileTestimonialCardProps {
  testimonial: Testimonial
  isActive: boolean
  index: number
  isInView: boolean
}

export function MobileTestimonialCard({
  testimonial,
  isActive,
  index,
  isInView,
}: MobileTestimonialCardProps) {
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
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      animate={
        isActive && isInView
          ? {
              opacity: 1,
              scale: 1,
              y: 0,
            }
          : {
              opacity: 0,
              scale: 0.9,
              y: 30,
            }
      }
      transition={{
        duration: 0.6,
        delay: index * 0.1,
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
      className="relative w-full"
      whileTap={{ scale: 0.98 }}
    >
      <motion.div
        className="relative bg-luxury-charcoal/70 backdrop-blur-xl border border-luxury-gold/20 rounded-[2.5rem] p-6 md:p-8 shadow-xl overflow-hidden"
        animate={{
          borderColor: isHovered || isActive
            ? 'rgba(212, 175, 55, 0.5)'
            : 'rgba(212, 175, 55, 0.2)',
          boxShadow: isHovered || isActive
            ? '0 15px 40px rgba(212, 175, 55, 0.3), 0 0 30px rgba(212, 175, 55, 0.2)'
            : '0 8px 20px rgba(0, 0, 0, 0.3)',
        }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.02 }}
      >
        {/* Animated gradient background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-luxury-gold/10 via-luxury-amber/5 to-luxury-gold/10 opacity-0"
          animate={{
            opacity: isHovered || isActive ? 0.15 : 0,
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
          <div className="absolute inset-0 bg-gradient-to-br from-luxury-gold/5 to-luxury-amber/5 rounded-[2.5rem]" />
        </motion.div>

        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-luxury-gold/20 to-transparent"
          animate={{
            x: isHovered || isActive ? ['-100%', '200%'] : '-100%',
          }}
          transition={{
            duration: 1.5,
            repeat: isHovered || isActive ? Infinity : 0,
            ease: 'linear',
          }}
        />

        {/* Content */}
        <div className="relative z-10">
          {/* Quote Icon - Organic Design */}
          <motion.div
            className="text-5xl md:text-6xl text-luxury-gold/20 mb-4 text-center font-serif"
            animate={{
              scale: isHovered ? [1, 1.1, 1] : 1,
              opacity: isHovered ? [0.2, 0.3, 0.2] : 0.2,
            }}
            transition={{
              duration: 2,
              repeat: isHovered ? Infinity : 0,
              ease: 'easeInOut',
            }}
          >
            "
          </motion.div>

          {/* Rating Stars */}
          <motion.div
            className="flex justify-center gap-1 mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={
              isActive
                ? {
                    opacity: 1,
                    scale: 1,
                  }
                : {
                    opacity: 0,
                    scale: 0.8,
                  }
            }
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            {[...Array(5)].map((_, starIndex) => (
              <motion.svg
                key={starIndex}
                className="w-5 h-5 md:w-6 md:h-6 text-luxury-gold"
                fill="currentColor"
                viewBox="0 0 20 20"
                initial={{ opacity: 0, scale: 0 }}
                animate={
                  isActive
                    ? {
                        opacity: 1,
                        scale: 1,
                      }
                    : {
                        opacity: 0,
                        scale: 0,
                      }
                }
                transition={{
                  delay: 0.4 + starIndex * 0.1,
                  type: 'spring',
                  stiffness: 200,
                }}
                whileHover={{ scale: 1.2, rotate: 15 }}
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </motion.svg>
            ))}
          </motion.div>

          {/* Testimonial Text */}
          <blockquote className="text-base md:text-lg text-luxury-cream/90 text-center mb-6 leading-relaxed font-light">
            {testimonial.text.split(' ').map((word, wordIndex) => (
              <motion.span
                key={wordIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={
                  isActive
                    ? {
                        opacity: 1,
                        y: 0,
                      }
                    : {
                        opacity: 0,
                        y: 10,
                      }
                }
                transition={{
                  delay: wordIndex * 0.02,
                  duration: 0.3,
                }}
              >
                {word}{' '}
              </motion.span>
            ))}
          </blockquote>

          {/* Customer Info */}
          <motion.div
            className="flex flex-col items-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={
              isActive
                ? {
                    opacity: 1,
                    y: 0,
                  }
                : {
                    opacity: 0,
                    y: 20,
                  }
            }
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            {/* Avatar Circle */}
            <motion.div
              className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-luxury-gold to-luxury-amber flex items-center justify-center text-xl md:text-2xl font-bold text-luxury-charcoal shadow-lg"
              animate={{
                scale: isHovered ? [1, 1.1, 1] : 1,
                boxShadow: isHovered
                  ? '0 10px 30px rgba(212, 175, 55, 0.5)'
                  : '0 5px 15px rgba(212, 175, 55, 0.3)',
              }}
              transition={{
                duration: 2,
                repeat: isHovered ? Infinity : 0,
                ease: 'easeInOut',
              }}
            >
              {testimonial.name.charAt(0)}
            </motion.div>

            <div className="text-center">
              <motion.h4
                className="text-lg md:text-xl font-heading font-bold text-luxury-cream mb-1"
                animate={{
                  color: isHovered ? '#D4AF37' : '#F5F5DC',
                }}
                transition={{ duration: 0.3 }}
              >
                {testimonial.name}
              </motion.h4>
              <p className="text-luxury-cream/70 text-sm md:text-base">
                {testimonial.location}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Glowing border effect */}
        <motion.div
          className="absolute inset-0 rounded-[2.5rem] border-2 border-luxury-gold/20 pointer-events-none"
          animate={{
            opacity: isHovered || isActive ? [0.3, 0.9, 0.3] : 0.3,
          }}
          transition={{
            duration: 2,
            repeat: isHovered || isActive ? Infinity : 0,
            ease: 'easeInOut',
          }}
        />
      </motion.div>
    </motion.div>
  )
}

