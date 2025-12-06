'use client'

import { useState, useEffect, useRef } from 'react'
import { useInView } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { MobileTestimonialHeader } from '@/components/mobile-testimonial/MobileTestimonialHeader'
import { MobileTestimonialBackground } from '@/components/mobile-testimonial/MobileTestimonialBackground'
import { MobileTestimonialSlider } from '@/components/mobile-testimonial/MobileTestimonialSlider'
import { MobileTestimonialControls } from '@/components/mobile-testimonial/MobileTestimonialControls'

const testimonials = [
  {
    id: 1,
    name: 'Sarah M.',
    location: 'New York',
    rating: 5,
    text: 'Absolutely love my new fragrance! The quality is exceptional and the scent lasts all day.',
  },
  {
    id: 2,
    name: 'Michael R.',
    location: 'London',
    rating: 5,
    text: 'The packaging alone is worth the price. Such attention to detail in every aspect.',
  },
  {
    id: 3,
    name: 'Emma L.',
    location: 'Paris',
    rating: 5,
    text: 'I get compliments everywhere I go. This fragrance is truly special.',
  },
  {
    id: 4,
    name: 'David K.',
    location: 'Tokyo',
    rating: 5,
    text: 'Best fragrance purchase I\'ve ever made. The scent is sophisticated and unique.',
  },
]

export function MobileTestimonials() {
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

  return (
    <section
      ref={containerRef}
      className="relative py-16 overflow-hidden bg-gradient-to-b from-luxury-royal/10 via-luxury-charcoal to-luxury-amber/10"
    >
      {/* Animated Background */}
      <MobileTestimonialBackground />

      {/* Content Container */}
      <Container className="relative z-10">
        {/* Header */}
        <MobileTestimonialHeader />

        {/* Testimonial Slider */}
        <MobileTestimonialSlider
          testimonials={testimonials}
          currentIndex={currentIndex}
          onIndexChange={setCurrentIndex}
          isInView={isInView}
        />

        {/* Controls */}
        <MobileTestimonialControls
          total={testimonials.length}
          currentIndex={currentIndex}
          onDotClick={handleDotClick}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      </Container>
    </section>
  )
}
