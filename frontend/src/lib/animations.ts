/**
 * Animation Utilities
 * 
 * Provides utility functions and constants for animations
 * following the UI overhaul philosophy
 */

// Animation timing functions (cubic-bezier)
export const easing = {
  // Micro-interactions (150-300ms)
  micro: 'cubic-bezier(0.4, 0, 0.2, 1)',
  // Page transitions (400-600ms)
  transition: 'cubic-bezier(0.23, 1, 0.32, 1)',
  // Hero animations (800-1200ms)
  hero: 'cubic-bezier(0.16, 1, 0.3, 1)',
  // Scroll reveals (600-800ms)
  reveal: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  // Bounce effect
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  // Smooth ease
  smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
} as const

// Animation durations
export const duration = {
  micro: '150ms',
  fast: '200ms',
  normal: '300ms',
  slow: '400ms',
  slower: '600ms',
  slowest: '800ms',
  hero: '1200ms',
} as const

// Stagger delays for list animations
export const stagger = {
  fast: '50ms',
  normal: '100ms',
  slow: '150ms',
  slower: '200ms',
} as const

/**
 * Get stagger delay for nth child
 */
export function getStaggerDelay(index: number, baseDelay: string = stagger.normal): string {
  return `${parseInt(baseDelay) * index}ms`
}

/**
 * Animation variants for Framer Motion
 */
export const motionVariants = {
  fadeInUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 },
  },
  fadeInDown: {
    initial: { opacity: 0, y: -30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 30 },
  },
  slideInLeft: {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 50 },
  },
  slideInRight: {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
  },
  staggerContainer: {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
  staggerItem: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  },
} as const

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Get animation config respecting user preferences
 */
export function getAnimationConfig(
  defaultConfig: { duration: string; easing: string }
): { duration: string; easing: string } {
  if (prefersReducedMotion()) {
    return { duration: '0ms', easing: 'linear' }
  }
  return defaultConfig
}

