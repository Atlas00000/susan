/**
 * Glassmorphism Utilities
 * 
 * Provides utilities for creating glassmorphism effects
 * following the UI overhaul philosophy
 */

// Glassmorphism presets
export const glassPresets = {
  light: {
    background: 'rgba(31, 31, 31, 0.5)',
    backdropBlur: 'blur(12px)',
    border: '1px solid rgba(200, 169, 106, 0.15)',
    shadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
  },
  medium: {
    background: 'rgba(31, 31, 31, 0.7)',
    backdropBlur: 'blur(20px)',
    border: '1px solid rgba(200, 169, 106, 0.2)',
    shadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
  },
  heavy: {
    background: 'rgba(31, 31, 31, 0.85)',
    backdropBlur: 'blur(32px)',
    border: '1px solid rgba(200, 169, 106, 0.3)',
    shadow: '0 12px 48px rgba(0, 0, 0, 0.4)',
  },
  premium: {
    background: 'rgba(31, 31, 31, 0.8)',
    backdropBlur: 'blur(24px)',
    border: '1px solid rgba(200, 169, 106, 0.25)',
    shadow: '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 40px rgba(200, 169, 106, 0.1)',
  },
} as const

/**
 * Get glassmorphism style object
 */
export function getGlassStyle(preset: keyof typeof glassPresets = 'medium'): {
  background: string
  backdropFilter: string
  WebkitBackdropFilter: string
  border: string
  boxShadow: string
} {
  const config = glassPresets[preset]
  return {
    background: config.background,
    backdropFilter: config.backdropBlur,
    WebkitBackdropFilter: config.backdropBlur,
    border: config.border,
    boxShadow: config.shadow,
  }
}

/**
 * Get glassmorphism Tailwind classes
 */
export function getGlassClasses(preset: keyof typeof glassPresets = 'medium'): string {
  const classMap: Record<keyof typeof glassPresets, string> = {
    light: 'bg-luxury-charcoal/50 backdrop-blur-sm border border-luxury-gold/15 shadow-glass',
    medium: 'bg-luxury-charcoal/70 backdrop-blur-lg border border-luxury-gold/20 shadow-glass',
    heavy: 'bg-luxury-charcoal/85 backdrop-blur-2xl border border-luxury-gold/30 shadow-glass',
    premium: 'bg-luxury-charcoal/80 backdrop-blur-xl border border-luxury-gold/25 shadow-glass shadow-premium-glow',
  }
  return classMap[preset]
}

/**
 * Glassmorphism gradient overlay
 */
export const glassGradient = {
  light: 'linear-gradient(135deg, rgba(246, 241, 231, 0.05) 0%, rgba(200, 169, 106, 0.02) 100%)',
  medium: 'linear-gradient(135deg, rgba(246, 241, 231, 0.1) 0%, rgba(200, 169, 106, 0.05) 100%)',
  heavy: 'linear-gradient(135deg, rgba(246, 241, 231, 0.15) 0%, rgba(200, 169, 106, 0.08) 100%)',
} as const

/**
 * Get glass gradient style
 */
export function getGlassGradientStyle(
  intensity: keyof typeof glassGradient = 'medium'
): {
  background: string
} {
  return {
    background: glassGradient[intensity],
  }
}

