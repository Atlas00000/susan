'use client'

import { Container } from '@/components/ui/Container'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-luxury-charcoal">
      <Container className="py-16">
        <h1 className="text-5xl font-heading font-bold text-luxury-cream mb-6">Privacy Policy</h1>
        <div className="prose prose-invert max-w-3xl">
          <p className="text-luxury-cream/80">We respect your privacy and are committed to protecting your personal data.</p>
          <p className="text-luxury-cream/60">This is a placeholder policy. Provide your actual policy content here.</p>
        </div>
      </Container>
    </div>
  )
}


