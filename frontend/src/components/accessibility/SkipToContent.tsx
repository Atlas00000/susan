'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'

export interface SkipToContentProps {
  href?: string
  className?: string
}

/**
 * SkipToContent Component
 * 
 * Provides keyboard navigation skip link for accessibility
 * Allows users to skip navigation and go directly to main content
 */
export function SkipToContent({ href = '#main-content', className }: SkipToContentProps) {
  return (
    <Link
      href={href}
      className={cn(
        'skip-link',
        'sr-only focus:not-sr-only',
        'fixed top-0 left-4 z-[100]',
        'bg-luxury-gold text-luxury-charcoal',
        'px-6 py-3 rounded-b-lg',
        'font-semibold text-sm',
        'transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-luxury-gold focus:ring-offset-2',
        'hover:bg-luxury-gold/90',
        className
      )}
    >
      Skip to main content
    </Link>
  )
}

