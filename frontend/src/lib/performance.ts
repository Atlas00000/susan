/**
 * Performance Utilities
 * 
 * Helper functions for performance optimization
 */

/**
 * Debounce function for performance
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null
      func(...args)
    }

    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(later, wait)
  }
}

/**
 * Throttle function for performance
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => {
        inThrottle = false
      }, limit)
    }
  }
}

/**
 * Check if code is running on client
 */
export function isClient(): boolean {
  return typeof window !== 'undefined'
}

/**
 * Check if code is running on server
 */
export function isServer(): boolean {
  return typeof window === 'undefined'
}

/**
 * Lazy load images with Intersection Observer
 */
export function lazyLoadImage(img: HTMLImageElement): void {
  if (!isClient() || !('IntersectionObserver' in window)) {
    // Fallback: load immediately
    if (img.dataset.src) {
      img.src = img.dataset.src
    }
    return
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const image = entry.target as HTMLImageElement
          if (image.dataset.src) {
            image.src = image.dataset.src
            image.removeAttribute('data-src')
          }
          observer.unobserve(image)
        }
      })
    },
    {
      rootMargin: '50px',
    }
  )

  observer.observe(img)
}

/**
 * Preload critical resources
 */
export function preloadResource(href: string, as: string): void {
  if (!isClient()) return

  const link = document.createElement('link')
  link.rel = 'preload'
  link.href = href
  link.as = as
  document.head.appendChild(link)
}

/**
 * Measure performance
 */
export function measurePerformance(name: string, fn: () => void): void {
  if (!isClient() || !('performance' in window)) return

  const start = performance.now()
  fn()
  const end = performance.now()
  console.log(`[Performance] ${name}: ${(end - start).toFixed(2)}ms`)
}

/**
 * Request animation frame wrapper
 */
export function requestAnimationFrame(callback: FrameRequestCallback): number | null {
  if (!isClient() || !('requestAnimationFrame' in window)) {
    return setTimeout(callback, 16) as unknown as number
  }
  return window.requestAnimationFrame(callback)
}

/**
 * Cancel animation frame wrapper
 */
export function cancelAnimationFrame(id: number): void {
  if (!isClient() || !('cancelAnimationFrame' in window)) {
    clearTimeout(id)
    return
  }
  window.cancelAnimationFrame(id)
}

