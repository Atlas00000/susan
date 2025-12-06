'use client'

import { motion } from 'framer-motion'

interface MobileTestimonialControlsProps {
  total: number
  currentIndex: number
  onDotClick: (index: number) => void
  onPrev: () => void
  onNext: () => void
  className?: string
}

export function MobileTestimonialControls({
  total,
  currentIndex,
  onDotClick,
  onPrev,
  onNext,
  className,
}: MobileTestimonialControlsProps) {
  return (
    <div className={`flex flex-col items-center gap-4 mt-6 ${className || ''}`}>
      {/* Navigation Dots */}
      <div className="flex items-center gap-2">
        {[...Array(total)].map((_, index) => {
          const isActive = index === currentIndex
          return (
            <motion.button
              key={index}
              onClick={() => onDotClick(index)}
              className="relative group"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                className={`relative w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  isActive
                    ? 'bg-luxury-gold'
                    : 'bg-luxury-gold/30 hover:bg-luxury-gold/50'
                }`}
                animate={{
                  scale: isActive ? [1, 1.3, 1] : 1,
                  boxShadow: isActive
                    ? '0 0 12px rgba(212, 175, 55, 0.6)'
                    : '0 0 0px rgba(212, 175, 55, 0)',
                }}
                transition={{
                  duration: 2,
                  repeat: isActive ? Infinity : 0,
                  ease: 'easeInOut',
                }}
              >
                {/* Glow effect for active dot */}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-luxury-gold"
                    animate={{
                      scale: [1, 1.6, 1],
                      opacity: [0.6, 0, 0.6],
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
          )
        })}
      </div>

      {/* Navigation Arrows */}
      <div className="flex items-center gap-3">
        <motion.button
          onClick={onPrev}
          className="relative group"
          whileHover={{ scale: 1.1, x: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            className="w-10 h-10 rounded-full bg-luxury-gold/20 backdrop-blur-xl border border-luxury-gold/40 flex items-center justify-center overflow-hidden"
            animate={{
              boxShadow: [
                '0 0 8px rgba(212, 175, 55, 0.2)',
                '0 0 15px rgba(212, 175, 55, 0.4)',
                '0 0 8px rgba(212, 175, 55, 0.2)',
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            whileHover={{
              backgroundColor: 'rgba(212, 175, 55, 0.3)',
              borderColor: 'rgba(212, 175, 55, 0.6)',
            }}
          >
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-luxury-gold/30 to-transparent"
              animate={{
                x: ['-100%', '200%'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
            <svg
              className="relative z-10 w-5 h-5 text-luxury-gold"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </motion.div>
        </motion.button>

        <motion.button
          onClick={onNext}
          className="relative group"
          whileHover={{ scale: 1.1, x: 2 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            className="w-10 h-10 rounded-full bg-luxury-gold/20 backdrop-blur-xl border border-luxury-gold/40 flex items-center justify-center overflow-hidden"
            animate={{
              boxShadow: [
                '0 0 8px rgba(212, 175, 55, 0.2)',
                '0 0 15px rgba(212, 175, 55, 0.4)',
                '0 0 8px rgba(212, 175, 55, 0.2)',
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            whileHover={{
              backgroundColor: 'rgba(212, 175, 55, 0.3)',
              borderColor: 'rgba(212, 175, 55, 0.6)',
            }}
          >
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-luxury-gold/30 to-transparent"
              animate={{
                x: ['-100%', '200%'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
            <svg
              className="relative z-10 w-5 h-5 text-luxury-gold"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </motion.div>
        </motion.button>
      </div>
    </div>
  )
}

