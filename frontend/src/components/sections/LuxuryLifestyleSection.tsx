'use client'

import { useState, useEffect, useRef } from 'react'
import { useInView } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { LifestyleHeader } from '@/components/lifestyle/LifestyleHeader'
import { LifestyleBackground } from '@/components/lifestyle/LifestyleBackground'
import { LifestyleMomentCard } from '@/components/lifestyle/LifestyleMomentCard'
import { LifestyleCTA } from '@/components/lifestyle/LifestyleCTA'

const lifestyleMoments = [
  {
    id: 'morning',
    time: 'Morning',
    title: 'Start Your Day',
    description: 'Fresh and energizing scents to awaken your senses',
    scents: ['Citrus', 'Green Tea', 'Mint'],
    color: 'from-luxury-gold to-luxury-amber',
    bgColor: 'from-luxury-gold/20 to-luxury-amber/20',
  },
  {
    id: 'work',
    time: 'Work',
    title: 'Professional Confidence',
    description: 'Sophisticated fragrances that command respect',
    scents: ['Woody', 'Amber', 'Spice'],
    color: 'from-luxury-royal to-luxury-gold',
    bgColor: 'from-luxury-royal/20 to-luxury-gold/20',
  },
  {
    id: 'evening',
    time: 'Evening',
    title: 'Elegant Evenings',
    description: 'Luxurious scents for special occasions',
    scents: ['Oriental', 'Floral', 'Musk'],
    color: 'from-luxury-amber to-luxury-royal',
    bgColor: 'from-luxury-amber/20 to-luxury-royal/20',
  },
  {
    id: 'romance',
    time: 'Romance',
    title: 'Intimate Moments',
    description: 'Sensual fragrances that create lasting memories',
    scents: ['Rose', 'Vanilla', 'Sandalwood'],
    color: 'from-luxury-gold to-luxury-royal',
    bgColor: 'from-luxury-gold/20 to-luxury-royal/20',
  },
]

export function LuxuryLifestyleSection() {
  const [selectedMoment, setSelectedMoment] = useState<string | null>(null)
  const [hoveredMoment, setHoveredMoment] = useState<string | null>(null)
  const [currentTime, setCurrentTime] = useState<Date | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.1 })

  // Set time on mount and update every minute (client-only)
  useEffect(() => {
    setCurrentTime(new Date())
    const interval = setInterval(() => setCurrentTime(new Date()), 60000)
    return () => clearInterval(interval)
  }, [])

  // Auto-suggest current time moment
  useEffect(() => {
    const dateRef = currentTime ?? new Date()
    const hour = dateRef.getHours()
    if (hour >= 6 && hour < 12) {
      setSelectedMoment('morning')
    } else if (hour >= 12 && hour < 18) {
      setSelectedMoment('work')
    } else if (hour >= 18 && hour < 22) {
      setSelectedMoment('evening')
    } else {
      setSelectedMoment('romance')
    }
  }, [currentTime])

  const handleSelect = (id: string) => {
    setSelectedMoment(selectedMoment === id ? null : id)
  }

  return (
    <section
      ref={containerRef}
      className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-br from-luxury-charcoal via-luxury-royal/5 to-luxury-amber/10"
    >
      {/* Animated Background */}
      <LifestyleBackground />

      {/* Content Container */}
      <Container className="relative z-10">
        {/* Header */}
        <LifestyleHeader currentTime={currentTime} suggestedMoment={selectedMoment} />

        {/* Lifestyle Moments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-16">
          {lifestyleMoments.map((moment, index) => (
            <LifestyleMomentCard
              key={moment.id}
              moment={moment}
              index={index}
              isSelected={selectedMoment === moment.id}
              isHovered={hoveredMoment === moment.id}
              onSelect={handleSelect}
              onHoverStart={(id) => setHoveredMoment(id)}
              onHoverEnd={() => setHoveredMoment(null)}
              isInView={isInView}
            />
          ))}
        </div>

        {/* CTA Section */}
        <LifestyleCTA />
      </Container>
    </section>
  )
}
