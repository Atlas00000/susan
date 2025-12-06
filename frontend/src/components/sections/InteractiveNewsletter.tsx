'use client'

import { useRef } from 'react'
import { useInView } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { NewsletterHeader } from '@/components/newsletter/NewsletterHeader'
import { NewsletterBackground } from '@/components/newsletter/NewsletterBackground'
import { NewsletterForm } from '@/components/newsletter/NewsletterForm'
import { NewsletterBenefits } from '@/components/newsletter/NewsletterBenefits'
import { NewsletterTrust } from '@/components/newsletter/NewsletterTrust'

export function InteractiveNewsletter() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.1 })

  return (
    <section
      ref={containerRef}
      className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-br from-luxury-charcoal via-luxury-gold/5 to-luxury-charcoal"
    >
      {/* Animated Background */}
      <NewsletterBackground />

      {/* Content Container */}
      <Container className="relative z-10">
        {/* Header */}
        <NewsletterHeader />

        {/* Main Content */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
            {/* Newsletter Form */}
            <NewsletterForm />

            {/* Benefits */}
            <NewsletterBenefits />
          </div>
        </div>

        {/* Trust Indicators */}
        <NewsletterTrust />
      </Container>
    </section>
  )
}
