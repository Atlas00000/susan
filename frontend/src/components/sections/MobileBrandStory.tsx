'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { MobileBrandHeader } from '@/components/mobile-brand/MobileBrandHeader'
import { MobileBrandBackground } from '@/components/mobile-brand/MobileBrandBackground'
import { MobileBrandTimelineItem } from '@/components/mobile-brand/MobileBrandTimelineItem'
import { MobileBrandMission } from '@/components/mobile-brand/MobileBrandMission'
import { MobileBrandCTA } from '@/components/mobile-brand/MobileBrandCTA'

const timelineEvents = [
  {
    title: 'The Beginning',
    description: 'Founded in Lagos with a vision to create exceptional fragrances for Nigeria',
    color: 'from-luxury-gold/20 to-luxury-amber/20',
  },
  {
    title: 'First Collection',
    description: 'Launched our debut collection featuring carefully crafted fragrances',
    color: 'from-luxury-royal/20 to-luxury-gold/20',
  },
  {
    title: 'Local Growth',
    description: 'Expanded across major Nigerian cities, bringing luxury fragrances to our people',
    color: 'from-luxury-amber/20 to-luxury-royal/20',
  },
  {
    title: 'Community Recognition',
    description: 'Received recognition as a leading Nigerian fragrance brand for quality and innovation',
    color: 'from-luxury-gold/20 to-luxury-royal/20',
  },
  {
    title: 'Sustainable Future',
    description: 'Committed to ethical sourcing and sustainable practices for generations to come',
    color: 'from-luxury-royal/20 to-luxury-amber/20',
  },
]

export function MobileBrandStory() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.1 })

  return (
    <section
      ref={containerRef}
      className="relative py-16 overflow-hidden bg-gradient-to-b from-luxury-royal/10 to-luxury-charcoal"
    >
      {/* Animated Background */}
      <MobileBrandBackground />

      {/* Content Container */}
      <Container className="relative z-10">
        {/* Header */}
        <MobileBrandHeader />

        {/* Story Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6 mb-12"
        >
          <motion.p
            className="text-luxury-cream/80 text-base leading-relaxed text-center"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
          >
            Born from a passion for exceptional fragrances, our journey began with a simple belief:
            every scent should tell a story.
          </motion.p>

          <motion.p
            className="text-luxury-cream/80 text-base leading-relaxed text-center"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
          >
            We source the finest ingredients from around the world, working with master perfumers to
            create fragrances that capture moments, memories, and emotions.
          </motion.p>

          <motion.p
            className="text-luxury-cream/80 text-base leading-relaxed text-center"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
          >
            Each bottle is a testament to our commitment to luxury, quality, and the art of
            perfumery.
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <div className="relative pl-6 mb-12">
          {/* Timeline Line */}
          <motion.div
            className="absolute left-3 top-0 bottom-0 w-0.5 bg-gradient-to-b from-luxury-gold via-luxury-amber to-luxury-gold"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1, delay: 1 }}
            style={{ originY: 0 }}
          />

          <div className="space-y-6">
            {timelineEvents.map((event, index) => (
              <MobileBrandTimelineItem
                key={index}
                event={event}
                index={index}
                isInView={isInView}
              />
            ))}
          </div>
        </div>

        {/* Mission Statement */}
        <MobileBrandMission />

        {/* CTA Section */}
        <MobileBrandCTA />
      </Container>
    </section>
  )
}
