'use client'

import { useState, useEffect, useRef } from 'react'
import { useInView } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { TestimonialsHeader } from '@/components/testimonials/TestimonialsHeader'
import { TestimonialsBackground } from '@/components/testimonials/TestimonialsBackground'
import { TestimonialsSlider } from '@/components/testimonials/TestimonialsSlider'
import { TestimonialsControls } from '@/components/testimonials/TestimonialsControls'

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Fashion Designer',
    location: 'New York',
    rating: 5,
    text: 'The most exquisite fragrances I\'ve ever experienced. Each scent tells a story and creates unforgettable moments.',
    highlight: 'exquisite',
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Luxury Consultant',
    location: 'London',
    rating: 5,
    text: 'Outstanding quality and exceptional customer service. These fragrances have become my signature scents.',
    highlight: 'outstanding',
  },
  {
    id: 3,
    name: 'Emma Williams',
    role: 'Art Director',
    location: 'Paris',
    rating: 5,
    text: 'Pure luxury in every bottle. The attention to detail and craftsmanship is simply remarkable.',
    highlight: 'luxury',
  },
  {
    id: 4,
    name: 'David Rodriguez',
    role: 'CEO',
    location: 'Barcelona',
    rating: 5,
    text: 'These fragrances have transformed my daily routine into a sensory journey of pure elegance.',
    highlight: 'elegance',
  },
  {
    id: 5,
    name: 'Isabella Martinez',
    role: 'Interior Designer',
    location: 'Milan',
    rating: 5,
    text: 'Absolutely divine scents that elevate every moment. The perfect blend of sophistication and sensuality.',
    highlight: 'divine',
  },
]

export function InteractiveTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.1 })

  // Auto-rotate testimonials
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const handleDotClick = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
  }

  const handleMouseEnter = () => {
    setIsAutoPlaying(false)
  }

  const handleMouseLeave = () => {
    setIsAutoPlaying(true)
  }

  return (
    <section
      ref={containerRef}
      className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-br from-luxury-royal/10 via-luxury-charcoal to-luxury-amber/10"
    >
      {/* Animated Background */}
      <TestimonialsBackground />

      {/* Content Container */}
      <Container className="relative z-10">
        {/* Header */}
        <TestimonialsHeader />

        {/* Testimonial Slider */}
        <TestimonialsSlider
          testimonials={testimonials}
          currentIndex={currentIndex}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />

        {/* Controls */}
        <TestimonialsControls
          total={testimonials.length}
          currentIndex={currentIndex}
          onDotClick={handleDotClick}
          onPrev={handlePrev}
          onNext={handleNext}
          isAutoPlaying={isAutoPlaying}
          onToggleAutoPlay={() => setIsAutoPlaying(!isAutoPlaying)}
        />
      </Container>
    </section>
  )
}
