'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import Link from 'next/link'

export function StunningHero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [isVideoMuted, setIsVideoMuted] = useState(true)
  const [videoError, setVideoError] = useState(false)
  const [showFallback, setShowFallback] = useState(false)
  
  const heroRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })

  // Parallax effects
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1])

  // Mouse parallax
  const mouseX = useSpring(useTransform(() => mousePosition.x / 50), { stiffness: 150, damping: 15 })
  const mouseY = useSpring(useTransform(() => mousePosition.y / 50), { stiffness: 150, damping: 15 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Auto-show fallback after video error
  useEffect(() => {
    if (videoError) {
      setShowFallback(true)
    }
  }, [videoError])

  const handleVideoLoad = () => {
    console.log('✅ Video loaded successfully')
    setVideoError(false)
    setShowFallback(false)
  }

  const handleVideoPlay = () => {
    console.log('▶️ Video started playing')
    setIsVideoPlaying(true)
  }

  const handleVideoPause = () => {
    console.log('⏸️ Video paused')
    setIsVideoPlaying(false)
  }

  const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    console.error('❌ Video error:', e)
    console.error('Video src:', e.currentTarget.src)
    console.error('Video error details:', e.currentTarget.error)
    setVideoError(true)
    setShowFallback(true)
  }

  const toggleVideoPlay = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
    }
  }

  const toggleVideoMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isVideoMuted
      setIsVideoMuted(!isVideoMuted)
      console.log(isVideoMuted ? '🔊 Video unmuted' : '🔇 Video muted')
    }
  }

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-luxury-charcoal"
      style={{ y, opacity, scale }}
    >
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content - Text */}
          <motion.div
            className="relative z-10"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ x: mouseX, y: mouseY }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Badge variant="luxury" className="mb-6">
                ✨ Luxury Fragrances
              </Badge>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              className="text-5xl md:text-7xl font-heading font-bold text-luxury-cream mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Discover Your{' '}
              <span className="luxury-text-gradient">
                Perfect Scent
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-xl text-luxury-cream/80 mb-8 leading-relaxed max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Immerse yourself in a world of luxury fragrances crafted with passion, 
              precision, and the finest ingredients from around the globe.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <Link href="/quiz">
                <Button 
                  variant="luxury" 
                  size="lg"
                  className="group"
                >
                  Find My Scent
                  <motion.span
                    className="ml-2"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </Button>
              </Link>
              
              <Link href="/products">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-luxury-gold/50 text-luxury-cream hover:bg-luxury-gold/10"
                >
                  Explore Collection
                </Button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="mt-12 grid grid-cols-3 gap-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.8 }}
            >
              {[
                { number: "50+", label: "Premium Scents" },
                { number: "10K+", label: "Happy Customers" },
                { number: "24/7", label: "Expert Support" }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-luxury-gold mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm text-luxury-cream/70">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Video Hero */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Video Container */}
            <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl">
              
              {/* Video Element */}
              {!showFallback && (
                <video
                  ref={videoRef}
                  className="absolute inset-0 w-full h-full object-cover"
                  autoPlay
                  muted={isVideoMuted}
                  loop
                  playsInline
                  preload="auto"
                  onLoadedData={handleVideoLoad}
                  onPlay={handleVideoPlay}
                  onPause={handleVideoPause}
                  onError={handleVideoError}
                  poster="/images/products/contact_card.jpeg"
                >
                  <source src="/images/products/ad_video.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}

              {/* Animated Fallback Background */}
              {showFallback && (
                <motion.div
                  className="absolute inset-0 w-full h-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                >
                  {/* Gradient Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-luxury-charcoal via-luxury-royal/30 to-luxury-gold/20" />
                  
                  {/* Animated Elements */}
                  <motion.div
                    className="absolute inset-0 opacity-40"
                    animate={{
                      background: [
                        'radial-gradient(circle at 20% 80%, rgba(212, 175, 55, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(139, 69, 19, 0.3) 0%, transparent 50%)',
                        'radial-gradient(circle at 80% 80%, rgba(212, 175, 55, 0.3) 0%, transparent 50%), radial-gradient(circle at 20% 20%, rgba(139, 69, 19, 0.3) 0%, transparent 50%)',
                        'radial-gradient(circle at 20% 80%, rgba(212, 175, 55, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(139, 69, 19, 0.3) 0%, transparent 50%)'
                      ]
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  />
                  
                  {/* Floating Particles */}
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-luxury-gold/30 rounded-full"
                      style={{
                        left: `${20 + i * 15}%`,
                        top: `${30 + (i % 2) * 40}%`,
                      }}
                      animate={{
                        y: [0, -20, 0],
                        opacity: [0.3, 0.8, 0.3],
                        scale: [1, 1.2, 1]
                      }}
                      transition={{
                        duration: 3 + i * 0.5,
                        repeat: Infinity,
                        delay: i * 0.3
                      }}
                    />
                  ))}
                </motion.div>
              )}


              {/* Video Overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-luxury-charcoal/40 via-transparent to-luxury-royal/30"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              />

              {/* Video Controls Overlay */}
              <motion.div
                className="absolute bottom-6 left-6 right-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6, duration: 0.8 }}
              >
                <div className="flex items-center justify-between bg-luxury-charcoal/80 backdrop-blur-md rounded-2xl p-4 border border-luxury-gold/20">
                  <div className="flex items-center gap-3">
                    <motion.button
                      className="w-12 h-12 bg-luxury-gold/20 rounded-full flex items-center justify-center hover:bg-luxury-gold/30 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={toggleVideoPlay}
                    >
                      <motion.span 
                        className="text-luxury-gold text-lg"
                        animate={{ scale: isVideoPlaying ? [1, 1.1, 1] : 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        {isVideoPlaying ? '⏸' : '▶'}
                      </motion.span>
                    </motion.button>
                    
                    <motion.button
                      className="w-10 h-10 bg-luxury-gold/20 rounded-full flex items-center justify-center hover:bg-luxury-gold/30 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={toggleVideoMute}
                    >
                      <motion.span 
                        className="text-luxury-gold text-sm"
                        animate={{ scale: isVideoMuted ? [1, 1.1, 1] : 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        {isVideoMuted ? '🔇' : '🔊'}
                      </motion.span>
                    </motion.button>
                    
                    <div className="text-luxury-cream">
                      <div className="text-sm font-medium">Sanaya's Scents</div>
                      <div className="text-xs text-luxury-cream/70">
                        {showFallback ? 'Visual Experience' : 'Luxury Fragrances'}
                      </div>
                    </div>
                  </div>
                  
                  <motion.div
                    className="flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                  >
                    <span className="text-xs text-luxury-cream/70">
                      {showFallback ? 'Explore Collection' : 'Watch Story'}
                    </span>
                    <motion.div
                      className="w-2 h-2 bg-luxury-gold rounded-full"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.div>
                </div>
              </motion.div>

              {/* Decorative Elements */}
              <motion.div
                className="absolute -top-10 -right-10 w-40 h-40 border border-luxury-gold/30 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute -bottom-10 -left-10 w-24 h-24 bg-luxury-gold/10 rounded-full"
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-luxury-gold/50 rounded-full flex justify-center cursor-pointer"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <motion.div
            className="w-1 h-3 bg-luxury-gold rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}