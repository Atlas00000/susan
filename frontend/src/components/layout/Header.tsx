'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Navigation } from './Navigation'
import { MobileNavigation } from './MobileNavigation'

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-luxury-charcoal/95 backdrop-blur-md border-b border-luxury-gold/20">
      <Container>
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-luxury-gold rounded-full flex items-center justify-center">
              <span className="text-luxury-charcoal font-heading font-bold text-lg">S</span>
            </div>
            <span className="text-xl font-heading font-semibold text-luxury-cream">
              Sanaya's Scents
            </span>
          </Link>

          {/* Desktop Navigation */}
          <Navigation />

          {/* CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link href="/quiz">
              <Button variant="outline" size="sm">
                Start Your Journey
              </Button>
            </Link>
          </div>

          {/* Mobile Navigation */}
          <MobileNavigation />
        </div>
      </Container>
    </header>
  )
}