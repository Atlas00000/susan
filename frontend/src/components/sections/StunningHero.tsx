'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import Link from 'next/link'

// Mobile detection hook
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  return isMobile
}

export function StunningHero() {
  const [isVideoMuted, setIsVideoMuted] = useState(true)
  const [videoError, setVideoError] = useState(false)
  const [showFallback, setShowFallback] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [hasUserInteracted, setHasUserInteracted] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const isMobile = useIsMobile()

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })

  const isInView = useInView(heroRef, { once: true, amount: 0.2 })

  // Mobile-optimized scroll transforms (disabled on mobile for performance)
  const y = useTransform(scrollYProgress, [0, 1], [0, isMobile ? 0 : -50])
  const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, isMobile ? 1 : 0.8, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, isMobile ? 1 : 1.05])

  // Add subtle mouse-based parallax for video element only (disabled on mobile for performance)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const mouseXTransform = useTransform(mouseX, [0, 1], isMobile ? [0, 0] : [-10, 10])
  const mouseYTransform = useTransform(mouseY, [0, 1], isMobile ? [0, 0] : [-5, 5])

  useEffect(() => {
    if (isMobile) return // Skip mouse tracking on mobile
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      
      const x = e.clientX / (window.innerWidth || 1920)
      const y = e.clientY / (window.innerHeight || 1080)
      mouseX.set(x)
      mouseY.set(y)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY, isMobile])

  // Simple user interaction handler - unmute and play video
  useEffect(() => {
    const handleUserInteraction = async () => {
      if (videoRef.current && !hasUserInteracted) {
        try {
          // Unmute the video first
          videoRef.current.muted = false
          setIsVideoMuted(false)
          
          // Ensure video is not paused and try to play
          if (videoRef.current.paused) {
            await videoRef.current.play()
          }
          
          setHasUserInteracted(true)
          
          console.log('🔊 Video unmuted and playing due to user interaction')
          
          // Remove event listeners after first interaction
          window.removeEventListener('click', handleUserInteraction)
          window.removeEventListener('keydown', handleUserInteraction)
          window.removeEventListener('touchstart', handleUserInteraction)
        } catch (error) {
          console.log('Video play failed:', error)
          // Even if play fails, we've unmuted it, so user can manually play
        }
      }
    }

    // Add event listeners for user interactions (excluding scroll to prevent pause)
    window.addEventListener('click', handleUserInteraction)
    window.addEventListener('keydown', handleUserInteraction)
    window.addEventListener('touchstart', handleUserInteraction)

    return () => {
      window.removeEventListener('click', handleUserInteraction)
      window.removeEventListener('keydown', handleUserInteraction)
      window.removeEventListener('touchstart', handleUserInteraction)
    }
  }, [hasUserInteracted])

  // Auto-show fallback after video error
  useEffect(() => {
    if (videoError) {
      setShowFallback(true)
    }
  }, [videoError])

  const handleVideoError = () => {
    setVideoError(true)
    console.log('Video failed to load, showing fallback')
  }

  const handleVideoPlay = async () => {
    if (videoRef.current) {
      try {
        if (videoRef.current.paused) {
          await videoRef.current.play()
        } else {
          videoRef.current.pause()
        }
      } catch (error) {
        console.log('Video play/pause failed:', error)
      }
    }
  }

  const toggleVideoMute = async () => {
    if (videoRef.current) {
      try {
        const newMutedState = !isVideoMuted
        videoRef.current.muted = newMutedState
        setIsVideoMuted(newMutedState)
        
        // If unmuting and video is paused, start playing
        if (!newMutedState && videoRef.current.paused) {
          await videoRef.current.play()
        }
        
        console.log(newMutedState ? '🔇 Video muted' : '🔊 Video unmuted')
      } catch (error) {
        console.log('Video mute/unmute failed:', error)
      }
    }
  }

  return (
    <motion.section 
      ref={heroRef}
      className="relative min-h-[50vh] md:min-h-[60vh] flex items-center justify-center overflow-hidden bg-luxury-charcoal"
      style={{ y, opacity, scale }}
    >
      <Container className="pb-0 h-full">
        {/* Mobile-first responsive layout */}
        <div className={`grid ${isMobile ? 'grid-cols-1 gap-6' : 'lg:grid-cols-2 gap-8'} items-center h-full min-h-[50vh] md:min-h-[60vh]`}>
          {/* Left Content */}
          <motion.div 
            className="relative z-10"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div className="inline-flex items-center rounded-full bg-luxury-gold text-luxury-charcoal shadow-lg px-3 py-1 text-sm mb-6">
                ✨ Luxury Fragrances
              </div>
            </motion.div>

            <motion.h1
              className={`${isMobile ? 'text-5xl' : 'text-6xl md:text-8xl'} font-heading font-bold text-luxury-cream mb-8 leading-tight`}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Discover Your{' '}
              <span className="luxury-text-gradient">Perfect Scent</span>
            </motion.h1>

            <motion.p
              className={`${isMobile ? 'text-xl' : 'text-2xl'} text-luxury-cream/80 mb-10 leading-relaxed ${isMobile ? 'max-w-full' : 'max-w-2xl'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              Immerse yourself in a world of luxury fragrances crafted with passion, precision, and the finest ingredients from around the globe.
            </motion.p>

            <motion.div
              className={`flex ${isMobile ? 'flex-col gap-3' : 'flex-col sm:flex-row gap-4'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <Link href="/quiz">
                <button className={`inline-flex items-center justify-center rounded-xl bg-luxury-gold text-luxury-charcoal hover:bg-luxury-gold/90 transition-colors ${isMobile ? 'px-10 py-5 text-xl w-full' : 'px-8 py-4 text-xl'} group font-semibold`}>
                  Find My Scent
                  <span className="ml-3 group-hover:translate-x-1 transition-transform text-2xl">→</span>
                </button>
              </Link>
              <Link href="/products">
                <button className={`inline-flex items-center justify-center rounded-xl border-2 border-luxury-gold/50 text-luxury-cream hover:bg-luxury-gold/10 transition-colors ${isMobile ? 'px-10 py-5 text-xl w-full' : 'px-8 py-4 text-xl'} font-semibold`}>
                  Explore Collection
                </button>
              </Link>
            </motion.div>

            <motion.div
              className={`mt-16 grid ${isMobile ? 'grid-cols-1 gap-8' : 'grid-cols-3 gap-12'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1, duration: 0.6 }}
            >
              <div className="text-center">
                <div className={`${isMobile ? 'text-5xl' : 'text-4xl'} font-bold text-luxury-gold mb-2`}>50+</div>
                <div className="text-lg text-luxury-cream/70 font-medium">Premium Scents</div>
              </div>
              <div className="text-center">
                <div className={`${isMobile ? 'text-5xl' : 'text-4xl'} font-bold text-luxury-gold mb-2`}>10K+</div>
                <div className="text-lg text-luxury-cream/70 font-medium">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className={`${isMobile ? 'text-5xl' : 'text-4xl'} font-bold text-luxury-gold mb-2`}>24/7</div>
                <div className="text-lg text-luxury-cream/70 font-medium">Expert Support</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Video */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className={`relative ${isMobile ? 'h-[500px] rounded-2xl' : 'h-[70vh] min-h-[500px] rounded-3xl'} overflow-hidden shadow-2xl`}>
              {!showFallback ? (
                <motion.video
                  ref={videoRef}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ x: mouseXTransform, y: mouseYTransform }}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  poster="/images/products/contact_card.jpeg"
                  onError={handleVideoError}
                  onPlay={() => console.log('Video playing')}
                >
                  <source src="/images/products/ad_video.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </motion.video>
              ) : (
                <div className="absolute inset-0 bg-luxury-gold/10 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🌸</div>
                    <span className="text-luxury-gold/50 text-lg font-medium">Sanaya's Scents</span>
                  </div>
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-br from-luxury-charcoal/40 via-transparent to-luxury-royal/30" />

              {/* Interaction prompt for muted video */}
              {isVideoMuted && (
                <motion.div
                  className="absolute top-6 right-6 bg-luxury-charcoal/80 backdrop-blur-md rounded-lg px-4 py-2 border border-luxury-gold/30"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 2, duration: 0.5 }}
                >
                  <div className="flex items-center gap-2 text-sm text-luxury-cream">
                    <span>🔇</span>
                    <span>Click anywhere to unmute</span>
                  </div>
                </motion.div>
              )}

              <motion.div
                className="absolute bottom-6 left-6 right-6"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.2, duration: 0.6 }}
              >
                <div className={`flex items-center justify-between bg-luxury-charcoal/80 backdrop-blur-md ${isMobile ? 'rounded-xl p-3' : 'rounded-2xl p-4'} border border-luxury-gold/20`}>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleVideoPlay}
                      className={`${isMobile ? 'w-14 h-14' : 'w-12 h-12'} bg-luxury-gold/20 rounded-full flex items-center justify-center hover:bg-luxury-gold/30 transition-colors`}
                    >
                      <span className={`text-luxury-gold ${isMobile ? 'text-xl' : 'text-lg'}`}>▶</span>
                    </button>
                    <button
                      onClick={toggleVideoMute}
                      className={`${isMobile ? 'w-12 h-12' : 'w-10 h-10'} bg-luxury-gold/20 rounded-full flex items-center justify-center hover:bg-luxury-gold/30 transition-colors`}
                    >
                      <span className={`text-luxury-gold ${isMobile ? 'text-base' : 'text-sm'}`}>
                        {isVideoMuted ? '🔇' : '🔊'}
                      </span>
                    </button>
                    <div className="text-luxury-cream">
                      <div className="text-sm font-medium">Sanaya's Scents</div>
                      <div className="text-xs text-luxury-cream/70">Luxury Fragrances</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-luxury-cream/70">Watch Story</span>
                    <div className="w-2 h-2 bg-luxury-gold rounded-full" />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 border border-luxury-gold/30 rounded-full" />
            <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-luxury-gold/10 rounded-full" />
          </motion.div>
        </div>
      </Container>

      {/* Removed scroll indicator to tighten spacing below hero */}
    </motion.section>
  )
}