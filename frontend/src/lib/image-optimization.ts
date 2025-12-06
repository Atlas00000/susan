/**
 * Image Optimization Utilities
 * 
 * Provides utilities for generating blur placeholders,
 * calculating optimal image sizes, and managing image formats
 */

/**
 * Generate a blur data URL for placeholder
 * Creates a tiny 1x1 pixel base64 encoded image
 */
export function generateBlurDataURL(width = 10, height = 10): string {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  
  if (!ctx) {
    // Fallback: return a simple gray pixel
    return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjMWUxZTFmIi8+PC9zdmc+'
  }
  
  // Create a simple gradient placeholder
  const gradient = ctx.createLinearGradient(0, 0, width, height)
  gradient.addColorStop(0, 'rgba(30, 30, 31, 0.8)')
  gradient.addColorStop(1, 'rgba(20, 20, 20, 0.9)')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, width, height)
  
  return canvas.toDataURL()
}

/**
 * Calculate optimal image sizes based on viewport
 * Returns responsive sizes string for Next.js Image component
 */
export function getImageSizes(
  breakpoints: {
    mobile?: string
    tablet?: string
    desktop?: string
    large?: string
  } = {}
): string {
  const {
    mobile = '100vw',
    tablet = '50vw',
    desktop = '33vw',
    large = '25vw',
  } = breakpoints

  return `(max-width: 640px) ${mobile}, (max-width: 1024px) ${tablet}, (max-width: 1536px) ${desktop}, ${large}`
}

/**
 * Get priority status for images
 * Above-the-fold images should have priority={true}
 */
export function shouldPrioritizeImage(
  isAboveFold: boolean,
  isHero: boolean = false
): boolean {
  return isAboveFold || isHero
}

/**
 * Get optimal image quality based on context
 */
export function getImageQuality(context: 'hero' | 'product' | 'thumbnail' | 'gallery'): number {
  const qualityMap = {
    hero: 90,
    product: 85,
    gallery: 80,
    thumbnail: 75,
  }
  
  return qualityMap[context]
}

/**
 * Generate responsive image srcset
 */
export function generateSrcSet(baseUrl: string, widths: number[]): string {
  return widths
    .map((width) => `${baseUrl}?w=${width} ${width}w`)
    .join(', ')
}

