'use client'

import { useState } from 'react'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Container } from '@/components/ui/Container'
import { ScentDiscoveryHeader } from '@/components/discovery/ScentDiscoveryHeader'
import { ScentDiscoveryBackground } from '@/components/discovery/ScentDiscoveryBackground'
import { ScentCategoryCard } from '@/components/discovery/ScentCategoryCard'
import { ScentDiscoveryCTA } from '@/components/discovery/ScentDiscoveryCTA'

const scentCategories = [
  {
    id: 'oud-rich',
    name: 'Oud & Rich',
    description: 'Deep, mysterious, and luxurious',
    color: 'from-amber-600 to-yellow-700',
    bgColor: 'from-amber-500/20 to-yellow-600/20',
    scents: ['Oud', 'Sandalwood', 'Frankincense', 'Saffron'],
  },
  {
    id: 'amber-gold',
    name: 'Amber & Gold',
    description: 'Warm, golden, and elegant',
    color: 'from-yellow-400 to-orange-500',
    bgColor: 'from-yellow-500/20 to-orange-600/20',
    scents: ['Amber', 'Vanilla', 'Gold', 'Honey'],
  },
  {
    id: 'floral-fresh',
    name: 'Floral & Fresh',
    description: 'Delicate and naturally beautiful',
    color: 'from-pink-400 to-rose-500',
    bgColor: 'from-pink-500/20 to-rose-500/20',
    scents: ['Rose', 'Jasmine', 'White Flowers', 'Green Leaves'],
  },
  {
    id: 'gourmand-unique',
    name: 'Gourmand & Unique',
    description: 'Bold, unconventional, and memorable',
    color: 'from-purple-500 to-indigo-600',
    bgColor: 'from-purple-500/20 to-indigo-600/20',
    scents: ['Coffee', 'Chocolate', 'Brown Sugar', 'Spices'],
  },
  {
    id: 'signature',
    name: 'Signature Editions',
    description: 'Exclusive and extraordinary',
    color: 'from-luxury-gold to-luxury-amber',
    bgColor: 'from-luxury-gold/20 to-luxury-amber/20',
    scents: ['Rare Oud', 'Royal Essences', 'Exclusive Notes', 'Limited Edition'],
  },
]

export function InteractiveScentDiscovery() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.2 })

  const handleCategorySelect = (id: string) => {
    setSelectedCategory(selectedCategory === id ? null : id)
  }

  return (
    <section
      ref={containerRef}
      className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-br from-luxury-royal/20 via-luxury-charcoal to-luxury-amber/10"
    >
      {/* Animated Background */}
      <ScentDiscoveryBackground />

      {/* Content Container */}
      <Container className="relative z-10">
        {/* Header */}
        <ScentDiscoveryHeader />

        {/* Interactive Scent Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16">
          {scentCategories.map((category, index) => (
            <ScentCategoryCard
              key={category.id}
              category={category}
              index={index}
              isSelected={selectedCategory === category.id}
              onSelect={handleCategorySelect}
              isInView={isInView}
            />
          ))}
        </div>

        {/* CTA Section */}
        <ScentDiscoveryCTA />
      </Container>
    </section>
  )
}
