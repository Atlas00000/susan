/**
 * Spacing & Layout Utilities
 * 
 * Provides utilities for consistent spacing and layout
 * following the UI overhaul philosophy
 */

// Spacing scale (in rem)
export const spacing = {
  0: '0',
  0.5: '0.125rem', // 2px
  1: '0.25rem',    // 4px
  1.5: '0.375rem', // 6px
  2: '0.5rem',     // 8px
  2.5: '0.625rem', // 10px
  3: '0.75rem',    // 12px
  3.5: '0.875rem', // 14px
  4: '1rem',       // 16px
  4.5: '1.125rem', // 18px
  5: '1.25rem',    // 20px
  5.5: '1.375rem', // 22px
  6: '1.5rem',     // 24px
  6.5: '1.625rem', // 26px
  7: '1.75rem',    // 28px
  7.5: '1.875rem', // 30px
  8: '2rem',       // 32px
  9: '2.25rem',    // 36px
  10: '2.5rem',    // 40px
  11: '2.75rem',   // 44px
  12: '3rem',      // 48px
  13: '3.25rem',   // 52px
  14: '3.5rem',    // 56px
  15: '3.75rem',   // 60px
  16: '4rem',      // 64px
  17: '4.25rem',   // 68px
  18: '4.5rem',    // 72px
  19: '4.75rem',   // 76px
  20: '5rem',      // 80px
  21: '5.25rem',   // 84px
  22: '5.5rem',    // 88px
  23: '5.75rem',   // 92px
  24: '6rem',      // 96px
  25: '6.25rem',   // 100px
  26: '6.5rem',    // 104px
  28: '7rem',      // 112px
  30: '7.5rem',    // 120px
  32: '8rem',      // 128px
  36: '9rem',      // 144px
  40: '10rem',     // 160px
  44: '11rem',     // 176px
  48: '12rem',     // 192px
  52: '13rem',     // 208px
  60: '15rem',     // 240px
  72: '18rem',     // 288px
  80: '20rem',     // 320px
  96: '24rem',     // 384px
} as const

// Section spacing guidelines
export const sectionSpacing = {
  between: {
    mobile: '3rem',   // 48px
    desktop: '4rem',  // 64px
    large: '6rem',    // 96px
  },
  within: {
    mobile: '2rem',   // 32px
    desktop: '3rem',  // 48px
  },
} as const

// Component spacing guidelines
export const componentSpacing = {
  padding: {
    sm: '0.75rem',   // 12px
    md: '1rem',      // 16px
    lg: '1.5rem',    // 24px
    xl: '2rem',      // 32px
  },
  gap: {
    xs: '0.5rem',    // 8px
    sm: '0.75rem',   // 12px
    md: '1rem',      // 16px
    lg: '1.5rem',    // 24px
    xl: '2rem',      // 32px
  },
} as const

// Container max widths
export const containerWidths = {
  narrow: '640px',   // max-w-2xl
  medium: '768px',   // max-w-3xl
  wide: '1024px',    // max-w-4xl
  extraWide: '1280px', // max-w-7xl
  full: '100%',
} as const

/**
 * Get responsive spacing class
 */
export function getResponsiveSpacing(
  mobile: keyof typeof spacing,
  desktop: keyof typeof spacing
): string {
  return `p-${mobile} md:p-${desktop}`
}

/**
 * Get section padding classes
 */
export function getSectionPadding(size: 'sm' | 'md' | 'lg' = 'md'): string {
  const paddingMap = {
    sm: 'py-12 md:py-16',
    md: 'py-16 md:py-24',
    lg: 'py-20 md:py-32',
  }
  return paddingMap[size]
}

/**
 * Get container class
 */
export function getContainerClass(width: keyof typeof containerWidths = 'extraWide'): string {
  const classMap: Record<keyof typeof containerWidths, string> = {
    narrow: 'max-w-2xl',
    medium: 'max-w-3xl',
    wide: 'max-w-4xl',
    extraWide: 'max-w-7xl',
    full: 'w-full',
  }
  return classMap[width]
}

