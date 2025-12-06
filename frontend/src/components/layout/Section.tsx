'use client'

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { getSectionPadding, getContainerClass } from '@/lib/spacing'
import { ScrollReveal } from '@/components/animations/ScrollReveal'

export interface SectionProps {
  children: ReactNode
  className?: string
  containerClassName?: string
  padding?: 'sm' | 'md' | 'lg'
  containerWidth?: 'narrow' | 'medium' | 'wide' | 'extraWide' | 'full'
  animated?: boolean
  variant?: 'default' | 'dark' | 'light'
}

/**
 * Section Component
 * 
 * Consistent section wrapper with spacing and animations
 * Features:
 * - Consistent padding
 * - Container width control
 * - Optional scroll animations
 * - Variant backgrounds
 */
export function Section({
  children,
  className,
  containerClassName,
  padding = 'md',
  containerWidth = 'extraWide',
  animated = true,
  variant = 'default',
}: SectionProps) {
  const variantStyles = {
    default: 'bg-luxury-charcoal',
    dark: 'bg-luxury-charcoal/95',
    light: 'bg-luxury-charcoal/80',
  }

  const content = (
    <div className={cn(getContainerClass(containerWidth), containerClassName)}>
      {children}
    </div>
  )

  return (
    <section
      className={cn(
        getSectionPadding(padding),
        variantStyles[variant],
        className
      )}
    >
      {animated ? (
        <ScrollReveal variant="fadeInUp" once>
          {content}
        </ScrollReveal>
      ) : (
        content
      )}
    </section>
  )
}

