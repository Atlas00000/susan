'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface LifestyleHeaderProps {
  currentTime: Date | null
  suggestedMoment: string | null
  className?: string
}

export function LifestyleHeader({ currentTime, suggestedMoment, className }: LifestyleHeaderProps) {
  const headerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(headerRef, { once: true, amount: 0.3 })

  const getSuggestedMomentTitle = () => {
    if (!suggestedMoment) return 'your moment'
    const momentTitles: Record<string, string> = {
      morning: 'Start Your Day',
      work: 'Professional Confidence',
      evening: 'Elegant Evenings',
      romance: 'Intimate Moments',
    }
    return momentTitles[suggestedMoment] || 'your moment'
  }

  return (
    <motion.div
      ref={headerRef}
      className={`text-center mb-20 ${className || ''}`}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
    >
      {/* Animated Badge - Organic Shape */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="inline-block mb-8"
      >
        <motion.div
          className="relative inline-block"
          animate={{
            boxShadow: [
              '0 0 20px rgba(212, 175, 55, 0.2)',
              '0 0 40px rgba(212, 175, 55, 0.4)',
              '0 0 20px rgba(212, 175, 55, 0.2)',
            ],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="relative bg-gradient-to-r from-luxury-gold/20 via-luxury-amber/20 to-luxury-gold/20 backdrop-blur-xl border border-luxury-gold/40 rounded-full px-8 py-4 overflow-hidden">
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-luxury-gold/30 to-transparent"
              animate={{
                x: ['-100%', '200%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
            <span className="relative text-luxury-gold font-semibold text-lg tracking-wide">
              Every Moment Deserves Luxury
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* Main Title */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-luxury-cream mb-6 leading-tight"
      >
        <motion.span
          className="block"
          animate={{
            backgroundPosition: ['0%', '100%', '0%'],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            background: 'linear-gradient(45deg, #D4AF37, #FFD700, #B8860B, #D4AF37)',
            backgroundSize: '300% 300%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Lifestyle
        </motion.span>
        <motion.span
          className="block bg-gradient-to-r from-luxury-gold via-luxury-amber to-luxury-gold bg-clip-text text-transparent"
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Moments
        </motion.span>
      </motion.h2>

      {/* Description */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="text-xl md:text-2xl text-luxury-cream/70 max-w-4xl mx-auto leading-relaxed space-y-4 mb-8"
      >
        <p>
          Discover the perfect fragrance for every moment of your day. Just as you choose your 
          attire to match the occasion, your scent should complement the rhythm of your life—from 
          the energizing freshness of morning routines to the sophisticated elegance of evening 
          affairs.
        </p>
        <p className="text-lg md:text-xl text-luxury-cream/60">
          Each moment deserves a fragrance that enhances your presence, supports your confidence, 
          and leaves a lasting impression. Whether you're starting your day with purpose, commanding 
          attention in professional settings, or creating intimate memories, the right scent becomes 
          your silent companion, amplifying your natural charisma and personal style.
        </p>
      </motion.div>

      {/* Current Time Display */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.6, delay: 1 }}
        className="inline-block"
      >
        <motion.div
          className="relative inline-flex items-center space-x-4 bg-luxury-gold/10 backdrop-blur-xl border border-luxury-gold/30 rounded-[2rem] px-6 md:px-8 py-4 md:py-5 overflow-hidden"
          animate={{
            boxShadow: [
              '0 0 20px rgba(212, 175, 55, 0.2)',
              '0 0 30px rgba(212, 175, 55, 0.3)',
              '0 0 20px rgba(212, 175, 55, 0.2)',
            ],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* Animated background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-luxury-gold/5 via-luxury-amber/10 to-luxury-gold/5"
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'linear',
            }}
          />

          <div className="relative z-10 flex items-center space-x-4">
            {/* Time Icon - SVG instead of emoji */}
            <motion.div
              className="w-8 h-8 rounded-full bg-luxury-gold/20 flex items-center justify-center"
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              <svg
                className="w-5 h-5 text-luxury-gold"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </motion.div>

            <div>
              <motion.div
                className="text-luxury-gold font-semibold text-base md:text-lg"
                key={currentTime?.getTime()}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                Current Time:{' '}
                {currentTime
                  ? currentTime.toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true,
                    })
                  : '—'}
              </motion.div>
              <motion.div
                className="text-luxury-cream/70 text-sm md:text-base"
                key={suggestedMoment}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                Perfect for {getSuggestedMomentTitle()}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

