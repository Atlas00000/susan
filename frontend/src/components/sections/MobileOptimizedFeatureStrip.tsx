'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

const features = [
  {
    icon: '🎯',
    title: 'Personalized Discovery',
    description: 'Take our intelligent scent quiz to find your perfect fragrance match',
    color: 'from-luxury-gold to-luxury-amber',
    delay: 0.1,
    stats: '95% Match Rate',
    cta: 'Start Quiz',
    href: '/quiz'
  },
  {
    icon: '✨',
    title: 'Premium Quality',
    description: 'Handcrafted with the finest ingredients from prestigious suppliers',
    color: 'from-luxury-royal to-luxury-gold',
    delay: 0.2,
    stats: '100% Authentic',
    cta: 'Explore Quality',
    href: '/products'
  },
  {
    icon: '🌹',
    title: 'Luxury Experience',
    description: 'Immerse yourself in an exclusive world of sophisticated fragrances',
    color: 'from-luxury-amber to-luxury-royal',
    delay: 0.3,
    stats: '24/7 Support',
    cta: 'Discover More',
    href: '/collections'
  }
]

// Mobile detection hook
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
      setIsLoading(false)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  return { isMobile, isLoading }
}

// Optimized feature card component
const FeatureCard = ({ feature, index, isMobile }: { feature: any, index: number, isMobile: boolean }) => {
  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        delay: index * 0.2, 
        duration: 0.6,
        ease: "easeOut"
      }}
    >
      <div className={`
        relative bg-luxury-charcoal/40 backdrop-blur-md border border-luxury-gold/20 
        ${isMobile ? 'rounded-2xl p-6' : 'rounded-3xl p-8'} 
        overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl
      `}>
        {/* Background Gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`} />
        
        {/* Content */}
        <div className="relative z-10">
          {/* Icon */}
          <motion.div
            className={`${isMobile ? 'text-4xl mb-4' : 'text-5xl mb-6'} inline-block`}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.3 }}
          >
            {feature.icon}
          </motion.div>
          
          {/* Title */}
          <h3 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-heading font-bold text-luxury-cream mb-3`}>
            {feature.title}
          </h3>
          
          {/* Description */}
          <p className={`${isMobile ? 'text-sm' : 'text-base'} text-luxury-cream/70 mb-4 leading-relaxed`}>
            {feature.description}
          </p>
          
          {/* Stats */}
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="luxury" className="text-xs">
              {feature.stats}
            </Badge>
          </div>
          
          {/* CTA Button */}
          <Link href={feature.href}>
            <Button 
              size={isMobile ? 'sm' : 'md'} 
              variant="outline"
              className="w-full"
            >
              {feature.cta}
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export function MobileOptimizedFeatureStrip() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { isMobile, isLoading } = useIsMobile()
  const isInView = useInView(containerRef, { once: true, amount: 0.1 })
  
  // Show loading state while detecting mobile
  if (isLoading) {
    return (
      <section className="relative py-20 bg-gradient-to-b from-luxury-royal/10 to-luxury-charcoal">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <div className="w-32 h-8 bg-luxury-gold/20 rounded mx-auto mb-6 animate-pulse" />
            <div className="w-64 h-12 bg-luxury-gold/20 rounded mx-auto mb-4 animate-pulse" />
            <div className="w-96 h-6 bg-luxury-gold/20 rounded mx-auto animate-pulse" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-luxury-charcoal/40 rounded-2xl p-6 animate-pulse">
                <div className="w-12 h-12 bg-luxury-gold/20 rounded mb-4" />
                <div className="h-6 bg-luxury-gold/20 rounded mb-3" />
                <div className="h-4 bg-luxury-gold/20 rounded mb-2" />
                <div className="h-4 bg-luxury-gold/20 rounded w-3/4 mb-4" />
                <div className="h-8 bg-luxury-gold/20 rounded" />
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section 
      ref={containerRef}
      className="relative py-20 bg-gradient-to-b from-luxury-royal/10 to-luxury-charcoal"
    >
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className={`text-center ${isMobile ? 'mb-12' : 'mb-16'}`}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Badge variant="luxury" size="lg" className="mb-6">
              Why Choose Us
            </Badge>
          </motion.div>
          
          <h2 className={`${isMobile ? 'text-3xl' : 'text-4xl md:text-5xl'} font-heading font-bold text-luxury-cream mb-6`}>
            <span className="block">Experience</span>
            <span className="block bg-gradient-to-r from-luxury-gold to-luxury-royal bg-clip-text text-transparent">
              Excellence
            </span>
          </h2>
          
          <p className={`${isMobile ? 'text-base' : 'text-lg'} text-luxury-cream/70 ${isMobile ? 'max-w-full' : 'max-w-2xl mx-auto'}`}>
            Discover what makes our fragrance experience truly exceptional
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className={`grid ${isMobile ? 'grid-cols-1 gap-6' : 'grid-cols-1 md:grid-cols-3 gap-8'}`}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {features.map((feature, index) => (
            <FeatureCard 
              key={feature.title} 
              feature={feature} 
              index={index} 
              isMobile={isMobile}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
