'use client'

import { useRef } from 'react'
import { useInView } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { MobileNewsletterHeader } from '@/components/mobile-newsletter/MobileNewsletterHeader'
import { MobileNewsletterBackground } from '@/components/mobile-newsletter/MobileNewsletterBackground'
import { MobileNewsletterForm } from '@/components/mobile-newsletter/MobileNewsletterForm'
import { MobileNewsletterBenefits } from '@/components/mobile-newsletter/MobileNewsletterBenefits'

export function MobileNewsletter() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.1 })

  return (
    <section
      ref={containerRef}
      className="relative py-16 overflow-hidden bg-gradient-to-b from-luxury-royal/10 to-luxury-charcoal"
    >
      {/* Animated Background */}
      <MobileNewsletterBackground />

      {/* Content Container */}
      <Container className="relative z-10">
        {/* Header */}
        <MobileNewsletterHeader />

        {/* Newsletter Form */}
        <MobileNewsletterForm />

        {/* Benefits */}
        <MobileNewsletterBenefits />
      </Container>
    </section>
  )
}
