'use client'

import { useRef } from 'react'
import { useInView } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { BrandStoryHeader } from '@/components/brand-story/BrandStoryHeader'
import { BrandStoryBackground } from '@/components/brand-story/BrandStoryBackground'
import { BrandStoryTimeline } from '@/components/brand-story/BrandStoryTimeline'
import { BrandStoryMission } from '@/components/brand-story/BrandStoryMission'
import { BrandStoryCTA } from '@/components/brand-story/BrandStoryCTA'

const timelineEvents = [
  {
    title: 'The Beginning',
    description: 'Founded in Lagos with a vision to create exceptional fragrances for Nigeria',
    color: 'from-green-500 to-emerald-600',
  },
  {
    title: 'First Collection',
    description: 'Launched our debut collection featuring carefully crafted fragrances',
    color: 'from-pink-500 to-rose-600',
  },
  {
    title: 'Local Growth',
    description: 'Expanded across major Nigerian cities, bringing luxury fragrances to our people',
    color: 'from-blue-500 to-indigo-600',
  },
  {
    title: 'Community Recognition',
    description: 'Received recognition as a leading Nigerian fragrance brand for quality and innovation',
    color: 'from-yellow-500 to-orange-600',
  },
  {
    title: 'Sustainable Future',
    description: 'Committed to sustainable packaging and supporting local communities',
    color: 'from-green-500 to-teal-600',
  },
]

export function LuxuryBrandStory() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.1 })

  return (
    <section
      ref={containerRef}
      className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-br from-luxury-charcoal via-luxury-royal/5 to-luxury-charcoal"
    >
      {/* Animated Background */}
      <BrandStoryBackground />

      {/* Content Container */}
      <Container className="relative z-10">
        {/* Header */}
        <BrandStoryHeader />

        {/* Timeline */}
        <BrandStoryTimeline events={timelineEvents} />

        {/* Mission Statement */}
        <BrandStoryMission className="mt-20" />

        {/* CTA Section */}
        <BrandStoryCTA />
      </Container>
    </section>
  )
}
