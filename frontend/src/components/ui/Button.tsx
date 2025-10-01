import { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { ButtonProps } from '@/types'

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    variant = 'primary', 
    size = 'md', 
    children, 
    className, 
    disabled,
    type = 'button',
    ...props 
  }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-luxury-gold focus:ring-offset-2 focus:ring-offset-luxury-charcoal disabled:opacity-50 disabled:cursor-not-allowed'
    
    const variants = {
      primary: 'bg-luxury-gold text-luxury-charcoal hover:bg-luxury-gold/90 focus:ring-luxury-gold shadow-lg hover:shadow-xl',
      secondary: 'bg-luxury-royal text-luxury-cream hover:bg-luxury-royal/90 focus:ring-luxury-royal shadow-lg hover:shadow-xl',
      outline: 'border-2 border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-luxury-charcoal focus:ring-luxury-gold',
      ghost: 'text-luxury-gold hover:bg-luxury-gold/10 focus:ring-luxury-gold'
    }
    
    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg'
    }

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button }
