'use client'

export const dynamic = 'force-dynamic'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { AboutHeader } from '@/components/about/AboutHeader'
import { AboutBackground } from '@/components/about/AboutBackground'
import { AboutStats } from '@/components/about/AboutStats'
import { AboutBrandStory } from '@/components/about/AboutBrandStory'
import { AboutTimeline } from '@/components/about/AboutTimeline'
import { AboutValues } from '@/components/about/AboutValues'
import { AboutCTA } from '@/components/about/AboutCTA'

export default function AboutPage() {
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
      <AboutBackground scrollYProgress={scrollYProgress} />

      {/* Hero Section */}
      <motion.div
        ref={containerRef}
        className="relative py-16"
        style={{ y, opacity }}
      >
        <Container className="relative z-10">
          <AboutHeader />
          <AboutStats />
          <AboutBrandStory />
          <AboutValues />
          <AboutTimeline />
          <AboutCTA />
        </Container>
      </motion.div>
    </div>
  )
}
