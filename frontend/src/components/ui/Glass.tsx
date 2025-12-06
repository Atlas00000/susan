'use client'

import { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { getGlassClasses, getGlassStyle } from '@/lib/glassmorphism'

export interface GlassProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'light' | 'medium' | 'heavy' | 'premium'
  useStyleObject?: boolean
}

/**
 * Glass Component
 * 
 * A reusable glassmorphism component following the UI overhaul philosophy
 * Provides consistent glass effects across the application
 */
const Glass = forwardRef<HTMLDivElement, GlassProps>(
  ({ variant = 'medium', useStyleObject = false, className, children, ...props }, ref) => {
    const glassClasses = getGlassClasses(variant)
    const glassStyle = useStyleObject ? getGlassStyle(variant) : undefined

    return (
      <div
        ref={ref}
        className={cn(glassClasses, className)}
        style={glassStyle}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Glass.displayName = 'Glass'

export { Glass }

