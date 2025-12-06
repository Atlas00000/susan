'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { OptimizedImage } from '@/components/ui/OptimizedImage'
import { cn } from '@/lib/utils'

export interface HeroMediaProps {
  videoSrc?: string
  imageSrc?: string
  alt?: string
  className?: string
  enableParallax?: boolean
}

/**
 * HeroMedia Component
 * 
 * Enhanced media display with:
 * - Video with controls
 * - Image fallback
 * - Mouse parallax effects
 * - Glassmorphism overlay
 * - Premium styling
 */
export function HeroMedia({
  videoSrc,
  imageSrc,
  alt = 'Hero media',
  className,
  enableParallax = true,
}: HeroMediaProps) {
  const [isVideoMuted, setIsVideoMuted] = useState(true)
  const [videoError, setVideoError] = useState(false)
  const [showFallback, setShowFallback] = useState(false)
  const [hasUserInteracted, setHasUserInteracted] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Mouse parallax
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const mouseXTransform = useTransform(mouseX, [0, 1], enableParallax ? [-15, 15] : [0, 0])
  const mouseYTransform = useTransform(mouseY, [0, 1], enableParallax ? [-10, 10] : [0, 0])

  useEffect(() => {
    if (!enableParallax) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height

      mouseX.set(x)
      mouseY.set(y)
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('mousemove', handleMouseMove)
      return () => container.removeEventListener('mousemove', handleMouseMove)
    }
  }, [enableParallax, mouseX, mouseY])

  useEffect(() => {
    const handleUserInteraction = async () => {
      if (videoRef.current && !hasUserInteracted) {
        try {
          videoRef.current.muted = false
          setIsVideoMuted(false)
          if (videoRef.current.paused) {
            await videoRef.current.play()
          }
          setHasUserInteracted(true)
          window.removeEventListener('click', handleUserInteraction)
          window.removeEventListener('keydown', handleUserInteraction)
          window.removeEventListener('touchstart', handleUserInteraction)
        } catch (error) {
          console.log('Video play failed:', error)
        }
      }
    }

    window.addEventListener('click', handleUserInteraction)
    window.addEventListener('keydown', handleUserInteraction)
    window.addEventListener('touchstart', handleUserInteraction)

    return () => {
      window.removeEventListener('click', handleUserInteraction)
      window.removeEventListener('keydown', handleUserInteraction)
      window.removeEventListener('touchstart', handleUserInteraction)
    }
  }, [hasUserInteracted])

  const handleVideoError = () => {
    setVideoError(true)
    setShowFallback(true)
  }

  const toggleVideoMute = async () => {
    if (videoRef.current) {
      try {
        const newMutedState = !isVideoMuted
        videoRef.current.muted = newMutedState
        setIsVideoMuted(newMutedState)
        if (!newMutedState && videoRef.current.paused) {
          await videoRef.current.play()
        }
      } catch (error) {
        console.log('Video mute/unmute failed:', error)
      }
    }
  }

  return (
    <motion.div
      ref={containerRef}
      className={cn('relative h-[500px] md:h-[70vh] min-h-[500px] rounded-3xl overflow-hidden', className)}
      initial={{ opacity: 0, x: 50, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Media content */}
      {!showFallback && videoSrc && !videoError ? (
        <motion.video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ x: mouseXTransform, y: mouseYTransform }}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={imageSrc}
          onError={handleVideoError}
        >
          <source src={videoSrc} type="video/mp4" />
        </motion.video>
      ) : (
        <OptimizedImage
          src={imageSrc || '/images/products/contact_card.jpeg'}
          alt={alt}
          fill
          className="object-cover"
          priority
        />
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-luxury-charcoal/40 via-transparent to-luxury-royal/30" />

      {/* Glassmorphism border glow */}
      <div className="absolute inset-0 border-2 border-luxury-gold/20 rounded-3xl pointer-events-none glow-premium" />

      {/* Video controls overlay */}
      {videoSrc && !showFallback && (
        <motion.div
          className="absolute bottom-6 left-6 right-6 glass-premium rounded-2xl p-4 border border-luxury-gold/30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.button
                onClick={toggleVideoMute}
                className="px-4 py-2 bg-luxury-gold/20 hover:bg-luxury-gold/30 rounded-full text-xs text-luxury-gold font-medium transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={isVideoMuted ? 'Unmute video' : 'Mute video'}
              >
                {isVideoMuted ? 'Unmute' : 'Mute'}
              </motion.button>
              <div className="text-luxury-cream">
                <div className="text-sm font-medium">Sanaya's Scents</div>
                <div className="text-xs text-luxury-cream/70">Luxury Fragrances</div>
              </div>
            </div>
            <div className="text-xs text-luxury-cream/70 font-medium">
              Watch Story
            </div>
          </div>
        </motion.div>
      )}

    </motion.div>
  )
}

