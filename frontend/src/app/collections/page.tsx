'use client'

export const dynamic = 'force-dynamic'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { collections } from '@/data/collections'
import { CollectionsHeader } from '@/components/collections/CollectionsHeader'
import { CollectionsBackground } from '@/components/collections/CollectionsBackground'
import { CollectionsStats } from '@/components/collections/CollectionsStats'
import { CollectionsGrid } from '@/components/collections/CollectionsGrid'
import { CollectionsCTA } from '@/components/collections/CollectionsCTA'

export default function CollectionsPage() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [50, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  return (
    <div className="min-h-screen bg-luxury-charcoal relative overflow-hidden">
      {/* Animated Background */}
      <CollectionsBackground scrollYProgress={scrollYProgress} />

      {/* Hero Section */}
      <motion.section
        className="relative py-32"
        style={{ y, opacity }}
      >
        <Container className="relative z-10">
          <CollectionsHeader />
          <CollectionsStats />
        </Container>
      </motion.section>

      {/* Collections Grid */}
      <motion.section
        ref={containerRef}
        className="relative py-20"
      >
        <Container className="relative z-10">
          <CollectionsGrid collections={collections} />
        </Container>
      </motion.section>

      {/* CTA Section */}
      <Container className="relative z-10">
        <CollectionsCTA />
      </Container>
    </div>
  )
}
