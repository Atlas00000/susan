/**
 * Button Variants
 * 
 * Defines all button variant styles following the UI overhaul philosophy
 */

import { cn } from '@/lib/utils'

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'premium'
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl'

export const buttonBaseStyles = 'inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-luxury-gold focus:ring-offset-2 focus:ring-offset-luxury-charcoal disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden liquid-button'

export const buttonVariants: Record<ButtonVariant, string> = {
  primary: cn(
    'bg-luxury-gold text-luxury-charcoal',
    'hover:bg-luxury-gold/90 hover:shadow-lg hover:shadow-luxury-gold/30',
    'active:scale-[0.98] active:shadow-md',
    'focus:ring-luxury-gold',
    'shadow-md'
  ),
  secondary: cn(
    'bg-luxury-royal text-luxury-cream',
    'hover:bg-luxury-royal/90 hover:shadow-lg hover:shadow-luxury-royal/30',
    'active:scale-[0.98] active:shadow-md',
    'focus:ring-luxury-royal',
    'shadow-md'
  ),
  outline: cn(
    'border-2 border-luxury-gold text-luxury-gold bg-transparent',
    'hover:bg-luxury-gold hover:text-luxury-charcoal hover:shadow-lg hover:shadow-luxury-gold/20',
    'active:scale-[0.98]',
    'focus:ring-luxury-gold'
  ),
  ghost: cn(
    'text-luxury-gold bg-transparent',
    'hover:bg-luxury-gold/10 hover:shadow-sm',
    'active:scale-[0.98]',
    'focus:ring-luxury-gold'
  ),
  premium: cn(
    'bg-gradient-to-r from-luxury-gold via-gold-400 to-luxury-gold text-luxury-charcoal',
    'hover:shadow-premium-glow hover:shadow-lg',
    'active:scale-[0.98]',
    'focus:ring-luxury-gold',
    'shadow-lg glow-premium',
    'bg-[length:200%_100%] animate-shimmer'
  ),
}

export const buttonSizes: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
  xl: 'px-10 py-5 text-xl',
}

/**
 * Get button variant classes
 */
export function getButtonVariantClasses(variant: ButtonVariant): string {
  return buttonVariants[variant]
}

/**
 * Get button size classes
 */
export function getButtonSizeClasses(size: ButtonSize): string {
  return buttonSizes[size]
}

