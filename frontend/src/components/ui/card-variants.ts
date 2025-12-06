/**
 * Card Variants
 * 
 * Defines all card variant styles following the UI overhaul philosophy
 */

import { cn } from '@/lib/utils'
import { getGlassClasses } from '@/lib/glassmorphism'
import { getElevationClass } from '@/lib/elevation'

export type CardVariant = 'default' | 'glass' | 'glass-light' | 'glass-heavy' | 'glass-premium' | 'premium'
export type CardPadding = 'sm' | 'md' | 'lg' | 'xl'
export type CardHover = 'none' | 'lift' | 'glow' | 'tilt' | 'premium'

export const cardBaseStyles = 'rounded-xl transition-all duration-300'

export const cardVariants: Record<CardVariant, string> = {
  default: cn(
    'bg-luxury-charcoal/50 backdrop-blur-sm',
    'border border-luxury-gold/20'
  ),
  glass: getGlassClasses('medium'),
  'glass-light': getGlassClasses('light'),
  'glass-heavy': getGlassClasses('heavy'),
  'glass-premium': getGlassClasses('premium'),
  premium: cn(
    getGlassClasses('premium'),
    'bg-gradient-to-br from-luxury-charcoal/90 via-luxury-charcoal/80 to-luxury-charcoal/90',
    'border-luxury-gold/30'
  ),
}

export const cardPadding: Record<CardPadding, string> = {
  sm: 'p-3',
  md: 'p-6',
  lg: 'p-8',
  xl: 'p-10',
}

export const cardHoverStyles: Record<CardHover, string> = {
  none: '',
  lift: cn(
    'hover:-translate-y-2',
    'hover:shadow-elevation-3',
    'hover:border-luxury-gold/40'
  ),
  glow: cn(
    'hover:shadow-premium-glow',
    'hover:border-luxury-gold/50'
  ),
  tilt: cn(
    'card-3d-premium',
    'hover:shadow-elevation-4'
  ),
  premium: cn(
    'card-3d-premium',
    'hover:-translate-y-2',
    'hover:shadow-premium-glow-lg',
    'hover:border-luxury-gold/50'
  ),
}

/**
 * Get card variant classes
 */
export function getCardVariantClasses(variant: CardVariant): string {
  return cardVariants[variant]
}

/**
 * Get card padding classes
 */
export function getCardPaddingClasses(padding: CardPadding): string {
  return cardPadding[padding]
}

/**
 * Get card hover classes
 */
export function getCardHoverClasses(hover: CardHover): string {
  return cardHoverStyles[hover]
}

