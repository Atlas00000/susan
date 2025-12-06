'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { HeroBackground } from '@/components/hero/HeroBackground'
import { HeroContent } from '@/components/hero/HeroContent'
import { HeroCTA } from '@/components/hero/HeroCTA'
import { HeroStats } from '@/components/hero/HeroStats'
import { HeroMedia } from '@/components/hero/HeroMedia'
import { HeroInteractiveElements } from '@/components/hero/HeroInteractiveElements'
import { HeroFloatingElements } from '@/components/hero/HeroFloatingElements'

// Mobile detection hook
function useIsMobile() {
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
  const heroRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const isInView = useInView(heroRef, { once: true, amount: 0.2 })

  // Parallax transforms
  const y = useTransform(scrollYProgress, [0, 1], [0, isMobile ? 0 : -100])
  const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, isMobile ? 1 : 0.8, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, isMobile ? 1 : 1.1])

  return (
    <HeroInteractiveElements>
      <motion.section
        ref={heroRef}
        className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center overflow-hidden"
        style={{ y, opacity, scale }}
      >
        {/* Background */}
        <HeroBackground scrollYProgress={scrollYProgress} />

        {/* Floating decorative elements */}
        <HeroFloatingElements />

        {/* Content */}
        <div className="relative z-10 py-20 md:py-32 w-[80%] max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Content */}
            <div className="space-y-8">
              <HeroContent isInView={isInView} />
              <HeroCTA isInView={isInView} />
              <HeroStats isInView={isInView} />
            </div>

            {/* Right: Media */}
            <div className="relative">
              <HeroMedia
                videoSrc="/images/products/ad_video.mp4"
                imageSrc="/images/products/contact_card.jpeg"
                alt="Sanaya's Scents Luxury Fragrances"
                enableParallax={!isMobile}
              />
            </div>
          </div>
        </div>
      </motion.section>
    </HeroInteractiveElements>
  )
}
