'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Navigation } from './Navigation'

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-luxury-charcoal/95 backdrop-blur-md border-b border-luxury-gold/20">
      <Container>
        <div className="flex items-center justify-between h-16 gap-2">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 min-w-0">
            <div className="w-8 h-8 bg-luxury-gold rounded-full flex items-center justify-center">
              <span className="text-luxury-charcoal font-heading font-bold text-lg">S</span>
            </div>
            <span className="hidden sm:inline text-xl font-heading font-semibold text-luxury-cream truncate">
              Sanaya's Scents
            </span>
          </Link>

          {/* Unified Navigation (desktop + mobile inline) */}
          <div className="flex-1 px-2 md:px-4 min-w-0">
            <Navigation />
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-2 md:space-x-4">
            <Link href="/quiz">
              <Button variant="outline" size="sm" className="whitespace-nowrap">
                Start Your Journey
              </Button>
            </Link>
          </div>

          {/* Hide hamburger: unified nav covers mobile */}
        </div>
      </Container>
    </header>
  )
}