'use client'

import { useState, useRef } from 'react'
import { useInView } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { MobileScentHeader } from '@/components/mobile-scent/MobileScentHeader'
import { MobileScentBackground } from '@/components/mobile-scent/MobileScentBackground'
import { MobileScentCategoryCard } from '@/components/mobile-scent/MobileScentCategoryCard'
import { MobileScentDetails } from '@/components/mobile-scent/MobileScentDetails'
import { MobileScentCTA } from '@/components/mobile-scent/MobileScentCTA'

const scentCategories = [
  {
    id: 'fresh',
    name: 'Fresh & Clean',
    description: 'Light, airy fragrances perfect for everyday wear',
    color: 'from-luxury-gold/20 to-luxury-amber/20',
  },
  {
    id: 'floral',
    name: 'Floral Elegance',
    description: 'Romantic and feminine with blooming flower notes',
    color: 'from-luxury-royal/20 to-luxury-gold/20',
  },
  {
    id: 'woody',
    name: 'Woody & Warm',
    description: 'Rich, earthy scents with sandalwood and cedar',
    color: 'from-luxury-amber/20 to-luxury-royal/20',
  },
  {
    id: 'oriental',
    name: 'Oriental Spice',
    description: 'Exotic and sensual with warm, spicy undertones',
    color: 'from-luxury-gold/20 to-luxury-royal/20',
  },
]

export function MobileScentDiscovery() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.1 })

  const handleCategorySelect = (id: string) => {
    setSelectedCategory(selectedCategory === id ? null : id)
  }

  const selectedCategoryData = selectedCategory
    ? scentCategories.find((c) => c.id === selectedCategory) || null
    : null

  return (
    <section
      ref={containerRef}
      className="relative py-16 overflow-hidden bg-gradient-to-b from-luxury-charcoal to-luxury-royal/10"
    >
      {/* Animated Background */}
      <MobileScentBackground />

      {/* Content Container */}
      <Container className="relative z-10">
        {/* Header */}
        <MobileScentHeader />

        {/* Scent Categories Grid */}
        <div className="grid grid-cols-1 gap-4 mb-8">
          {scentCategories.map((category, index) => (
            <MobileScentCategoryCard
              key={category.id}
              category={category}
              index={index}
              isSelected={selectedCategory === category.id}
              onSelect={handleCategorySelect}
              isInView={isInView}
            />
          ))}
        </div>

        {/* Selected Category Details */}
        <MobileScentDetails category={selectedCategoryData} />

        {/* CTA Button */}
        <MobileScentCTA />
      </Container>
    </section>
  )
}
