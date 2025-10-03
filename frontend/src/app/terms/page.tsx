'use client'

import { Container } from '@/components/ui/Container'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-luxury-charcoal">
      <Container className="py-16">
        <h1 className="text-5xl font-heading font-bold text-luxury-cream mb-6">Terms of Service</h1>
        <div className="prose prose-invert max-w-3xl">
          <p className="text-luxury-cream/80">Please read these terms carefully before using our services.</p>
          <p className="text-luxury-cream/60">This is a placeholder terms document. Provide your actual terms content here.</p>
        </div>
      </Container>
    </div>
  )
}


