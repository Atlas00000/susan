'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { TestimonialCard } from './TestimonialCard'

interface Testimonial {
  id: number
  name: string
  role: string
  location: string
  rating: number
  text: string
  highlight: string
}

interface TestimonialsSliderProps {
  testimonials: Testimonial[]
  currentIndex: number
  onMouseEnter?: () => void
  onMouseLeave?: () => void
  className?: string
}

export function TestimonialsSlider({
  testimonials,
  currentIndex,
  onMouseEnter,
  onMouseLeave,
  className,
}: TestimonialsSliderProps) {
  return (
    <div className={`relative max-w-5xl mx-auto ${className || ''}`}>
      <AnimatePresence mode="wait">
        {testimonials.map((testimonial, index) => {
          if (index !== currentIndex) return null

          return (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              isActive={index === currentIndex}
              index={index}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
            />
          )
        })}
      </AnimatePresence>
    </div>
  )
}

