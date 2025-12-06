/**
 * Font Optimization Utilities
 * 
 * Provides utilities for optimizing font loading,
 * preloading critical fonts, and managing font display strategies
 */

export interface FontConfig {
  family: string
  weights: string[]
  display?: 'auto' | 'block' | 'swap' | 'fallback' | 'optional'
  preload?: boolean
  subsets?: string[]
}

/**
 * Critical fonts that should be preloaded
 */
export const CRITICAL_FONTS: FontConfig[] = [
  {
    family: 'Playfair Display',
    weights: ['400', '700'],
    display: 'swap',
    preload: true,
    subsets: ['latin'],
  },
  {
    family: 'Inter',
    weights: ['400', '500', '600', '700'],
    display: 'swap',
    preload: true,
    subsets: ['latin'],
  },
]

/**
 * Generate font preload links
 */
export function generateFontPreloadLinks(fonts: FontConfig[]): string {
  return fonts
    .filter((font) => font.preload)
    .map((font) => {
      const weights = font.weights.join(';')
      const subset = font.subsets?.[0] || 'latin'
      return `https://fonts.googleapis.com/css2?family=${font.family.replace(/\s+/g, '+')}:wght@${weights}&display=${font.display || 'swap'}&subset=${subset}`
    })
    .join('\n')
}

/**
 * Generate font-display CSS
 */
export function getFontDisplayCSS(display: FontConfig['display'] = 'swap'): string {
  return `font-display: ${display};`
}

/**
 * Check if font is loaded
 */
export function isFontLoaded(fontFamily: string): boolean {
  if (typeof document === 'undefined') return false
  
  try {
    return document.fonts.check(`1em "${fontFamily}"`)
  } catch {
    return false
  }
}

/**
 * Wait for font to load
 */
export function waitForFont(fontFamily: string, timeout = 3000): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof document === 'undefined') {
      resolve(false)
      return
    }

    if (isFontLoaded(fontFamily)) {
      resolve(true)
      return
    }

    const checkInterval = setInterval(() => {
      if (isFontLoaded(fontFamily)) {
        clearInterval(checkInterval)
        clearTimeout(timeoutId)
        resolve(true)
      }
    }, 100)

    const timeoutId = setTimeout(() => {
      clearInterval(checkInterval)
      resolve(false)
    }, timeout)
  })
}

