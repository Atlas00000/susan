'use client'

import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface GradientTextProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'luxury' | 'static' | 'premium'
  as?: 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p'
}

/**
 * GradientText Component
 * 
 * A reusable gradient text component following the UI overhaul philosophy
 * Provides consistent gradient text effects across the application
 */
const GradientText = forwardRef<HTMLElement, GradientTextProps>(
  ({ variant = 'luxury', as: Component = 'span', className, children, ...props }, ref) => {
    const variantClasses = {
      luxury: 'luxury-text-gradient',
      static: 'luxury-text-gradient-static',
      premium: 'luxury-text-gradient premium-text-glow',
    }

    return (
      <Component
        ref={ref as any}
        className={cn(variantClasses[variant], className)}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

GradientText.displayName = 'GradientText'

export { GradientText }

