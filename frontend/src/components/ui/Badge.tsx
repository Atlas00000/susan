import { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { BadgeProps } from '@/types'

const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ children, variant = 'default', size = 'md', className, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center rounded-full font-medium transition-colors'
    
    const variants = {
      default: 'bg-luxury-charcoal/80 text-luxury-cream border border-luxury-gold/30',
      luxury: 'bg-luxury-gold text-luxury-charcoal shadow-lg',
      outline: 'border border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-luxury-charcoal',
      secondary: 'bg-luxury-royal/80 text-luxury-cream border border-luxury-royal/50'
    }
    
    const sizes = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-3 py-1 text-sm',
      lg: 'px-4 py-1.5 text-base'
    }

    return (
      <div
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Badge.displayName = 'Badge'

export { Badge }
