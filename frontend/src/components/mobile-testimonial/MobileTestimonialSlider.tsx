'use client'

import { motion, AnimatePresence, PanInfo } from 'framer-motion'
import { MobileTestimonialCard } from './MobileTestimonialCard'

interface Testimonial {
  id: number
  name: string
  location: string
  rating: number
  text: string
}

interface MobileTestimonialSliderProps {
  testimonials: Testimonial[]
  currentIndex: number
  onIndexChange: (index: number) => void
  isInView: boolean
  className?: string
}

export function MobileTestimonialSlider({
  testimonials,
  currentIndex,
  onIndexChange,
  isInView,
  className,
}: MobileTestimonialSliderProps) {
  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50

    if (Math.abs(info.offset.x) > threshold) {
      if (info.offset.x > 0) {
        // Swipe right - go to previous
        onIndexChange((currentIndex - 1 + testimonials.length) % testimonials.length)
      } else {
        // Swipe left - go to next
        onIndexChange((currentIndex + 1) % testimonials.length)
      }
    }
  }

  return (
    <div className={`relative overflow-hidden ${className || ''}`}>
      <AnimatePresence mode="wait">
        {testimonials.map((testimonial, index) => {
          if (index !== currentIndex) return null

          return (
            <motion.div
              key={testimonial.id}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.4, type: 'spring', stiffness: 300, damping: 30 }}
            >
              <MobileTestimonialCard
                testimonial={testimonial}
                isActive={index === currentIndex}
                index={index}
                isInView={isInView}
              />
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}

