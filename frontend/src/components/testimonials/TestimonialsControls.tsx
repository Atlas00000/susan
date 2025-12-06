'use client'

import { motion } from 'framer-motion'

interface TestimonialsControlsProps {
  total: number
  currentIndex: number
  onDotClick: (index: number) => void
  onPrev: () => void
  onNext: () => void
  isAutoPlaying: boolean
  onToggleAutoPlay: () => void
  className?: string
}

export function TestimonialsControls({
  total,
  currentIndex,
  onDotClick,
  onPrev,
  onNext,
  isAutoPlaying,
  onToggleAutoPlay,
  className,
}: TestimonialsControlsProps) {
  return (
    <div className={`flex flex-col items-center gap-6 mt-12 ${className || ''}`}>
      {/* Navigation Dots */}
      <div className="flex items-center gap-3">
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
                className={`relative w-3 h-3 rounded-full transition-all duration-300 ${
                  isActive
                    ? 'bg-luxury-gold'
                    : 'bg-luxury-gold/30 hover:bg-luxury-gold/50'
                }`}
                animate={{
                  scale: isActive ? [1, 1.3, 1] : 1,
                  boxShadow: isActive
                    ? '0 0 15px rgba(212, 175, 55, 0.6)'
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
                      scale: [1, 1.8, 1],
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
      <div className="flex items-center gap-4">
        <motion.button
          onClick={onPrev}
          className="relative group"
          whileHover={{ scale: 1.1, x: -3 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            className="w-12 h-12 rounded-full bg-luxury-gold/20 backdrop-blur-xl border border-luxury-gold/40 flex items-center justify-center overflow-hidden"
            animate={{
              boxShadow: [
                '0 0 10px rgba(212, 175, 55, 0.2)',
                '0 0 20px rgba(212, 175, 55, 0.4)',
                '0 0 10px rgba(212, 175, 55, 0.2)',
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
              className="relative z-10 w-6 h-6 text-luxury-gold"
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

        {/* Auto-play Toggle */}
        <motion.button
          onClick={onToggleAutoPlay}
          className="relative group"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            className="w-12 h-12 rounded-full bg-luxury-gold/20 backdrop-blur-xl border border-luxury-gold/40 flex items-center justify-center overflow-hidden"
            animate={{
              boxShadow: isAutoPlaying
                ? [
                    '0 0 10px rgba(212, 175, 55, 0.2)',
                    '0 0 20px rgba(212, 175, 55, 0.4)',
                    '0 0 10px rgba(212, 175, 55, 0.2)',
                  ]
                : '0 0 0px rgba(212, 175, 55, 0)',
            }}
            transition={{
              duration: 2,
              repeat: isAutoPlaying ? Infinity : 0,
              ease: 'easeInOut',
            }}
            whileHover={{
              backgroundColor: 'rgba(212, 175, 55, 0.3)',
              borderColor: 'rgba(212, 175, 55, 0.6)',
            }}
          >
            {isAutoPlaying ? (
              <motion.svg
                className="relative z-10 w-5 h-5 text-luxury-gold"
                fill="currentColor"
                viewBox="0 0 20 20"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </motion.svg>
            ) : (
              <motion.svg
                className="relative z-10 w-5 h-5 text-luxury-gold"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                  clipRule="evenodd"
                />
              </motion.svg>
            )}
          </motion.div>
        </motion.button>

        <motion.button
          onClick={onNext}
          className="relative group"
          whileHover={{ scale: 1.1, x: 3 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            className="w-12 h-12 rounded-full bg-luxury-gold/20 backdrop-blur-xl border border-luxury-gold/40 flex items-center justify-center overflow-hidden"
            animate={{
              boxShadow: [
                '0 0 10px rgba(212, 175, 55, 0.2)',
                '0 0 20px rgba(212, 175, 55, 0.4)',
                '0 0 10px rgba(212, 175, 55, 0.2)',
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
              className="relative z-10 w-6 h-6 text-luxury-gold"
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

