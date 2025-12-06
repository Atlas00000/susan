'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { getImageSizes, generateBlurDataURL } from '@/lib/image-optimization'

export interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  fill?: boolean
  sizes?: string
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
  quality?: number
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
  onLoad?: () => void
  onError?: () => void
  loading?: 'lazy' | 'eager'
}

/**
 * OptimizedImage Component
 * 
 * Enhanced features:
 * - Lazy loading with Intersection Observer
 * - Blur placeholder support
 * - Loading skeleton
 * - Error fallback
 * - Smooth fade-in animation
 * - Automatic size calculation
 * - Performance optimized with WebP/AVIF
 */
export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  fill = false,
  sizes,
  objectFit = 'cover',
  quality = 85,
  placeholder = 'blur',
  blurDataURL,
  onLoad,
  onError,
  loading,
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [blurPlaceholder, setBlurPlaceholder] = useState<string | undefined>(blurDataURL)
  
  const [ref, isInView] = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.1,
    triggerOnce: true,
  })

  // Generate blur placeholder if not provided
  useEffect(() => {
    if (!blurPlaceholder && placeholder === 'blur' && typeof window !== 'undefined') {
      setBlurPlaceholder(generateBlurDataURL())
    }
  }, [blurPlaceholder, placeholder])

  const shouldLoad = priority || isInView
  const defaultSizes = fill
    ? getImageSizes({
        mobile: '100vw',
        tablet: '50vw',
        desktop: '33vw',
        large: '25vw',
      })
    : undefined

  const handleLoad = () => {
    setIsLoaded(true)
    onLoad?.()
  }

  const handleError = () => {
    setHasError(true)
    onError?.()
  }

  if (hasError) {
    return (
      <div
        className={cn(
          'flex items-center justify-center',
          'bg-luxury-charcoal/50',
          'text-luxury-cream/50',
          width && height ? '' : 'w-full h-full',
          className
        )}
        style={width && height ? { width, height } : undefined}
      >
        <span className="text-sm">Image unavailable</span>
      </div>
    )
  }

  return (
    <div
      ref={ref}
      className={cn('relative overflow-hidden', className)}
      style={fill ? { width: '100%', height: '100%' } : width && height ? { width, height } : undefined}
    >
      {/* Loading skeleton */}
      <AnimatePresence>
        {!isLoaded && shouldLoad && (
          <motion.div
            className="absolute inset-0 bg-luxury-charcoal/50 animate-pulse"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>

      {/* Image */}
      {shouldLoad && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          className="relative w-full h-full"
        >
          {fill ? (
            <Image
              src={src}
              alt={alt}
              fill
              sizes={sizes || defaultSizes}
              className={cn('object-cover', `object-${objectFit}`)}
              onLoad={handleLoad}
              onError={handleError}
              priority={priority}
              quality={quality}
              placeholder={placeholder}
              blurDataURL={blurPlaceholder}
              loading={loading || (priority ? 'eager' : 'lazy')}
            />
          ) : (
            <Image
              src={src}
              alt={alt}
              width={width}
              height={height}
              className={cn('object-cover', `object-${objectFit}`)}
              onLoad={handleLoad}
              onError={handleError}
              priority={priority}
              quality={quality}
              placeholder={placeholder}
              blurDataURL={blurPlaceholder}
              loading={loading || (priority ? 'eager' : 'lazy')}
            />
          )}
        </motion.div>
      )}
    </div>
  )
}

