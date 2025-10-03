'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

// Floating Elements Component
const FloatingElements = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-luxury-gold/20 rounded-full"
          style={{
            left: `${5 + i * 6}%`,
            top: `${15 + i * 5}%`,
          }}
          animate={{
            y: [-40, 40, -40],
            x: [-20, 20, -20],
            opacity: [0.2, 1, 0.2],
            scale: [0.5, 1.5, 0.5],
          }}
          transition={{
            duration: 8 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.6,
          }}
        />
      ))}
    </div>
  )
}

// Interactive Stats Component
const InteractiveStats = () => {
  const [stats, setStats] = useState([
    { label: 'Years of Excellence', value: 0, target: 10, suffix: '+' },
    { label: 'Happy Customers', value: 0, target: 1000, suffix: '+' },
    { label: 'Fragrances Curated', value: 0, target: 25, suffix: '+' },
    { label: 'Countries Served', value: 0, target: 15, suffix: '+' }
  ])

  useEffect(() => {
    const animateStats = () => {
      setStats(prev => prev.map(stat => ({
        ...stat,
        value: stat.target
      })))
    }

    const timer = setTimeout(animateStats, 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          className="text-center"
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
        >
          <motion.div
            className="text-4xl md:text-5xl font-bold text-luxury-gold mb-2"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
          >
            {stat.value}{stat.suffix}
          </motion.div>
          <div className="text-luxury-cream/70 text-sm font-medium">
            {stat.label}
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}

// Animated Timeline Component
const AnimatedTimeline = () => {
  const timeline = [
    {
      title: 'The Beginning',
      description: 'Founded with a vision to democratize luxury fragrances and help everyone discover their perfect scent',
      icon: '🌱'
    },
    {
      title: 'Global Expansion',
      description: 'Expanded to serve customers worldwide, bringing luxury fragrances to every corner of the globe',
      icon: '🌍'
    },
    {
      title: 'Digital Innovation',
      description: 'Launched our AI-powered scent discovery platform to personalize the fragrance journey',
      icon: '🤖'
    },
    {
      title: 'Future Vision',
      description: 'Continuing to innovate in personalized fragrance experiences and luxury scent discovery',
      icon: '✨'
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative"
    >
      {/* Timeline Line */}
      <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-luxury-gold via-luxury-amber to-luxury-gold rounded-full" />
      
      <div className="space-y-12">
        {timeline.map((item, index) => (
          <motion.div
            key={item.title}
            className="relative flex items-start space-x-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            {/* Timeline Dot */}
            <motion.div
              className="relative z-10 w-16 h-16 bg-luxury-charcoal border-4 border-luxury-gold rounded-full flex items-center justify-center"
              animate={{ 
                scale: [1, 1.2, 1],
                boxShadow: [
                  '0 0 20px rgba(212, 175, 55, 0.3)',
                  '0 0 40px rgba(212, 175, 55, 0.6)',
                  '0 0 20px rgba(212, 175, 55, 0.3)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
            >
              <span className="text-2xl">{item.icon}</span>
            </motion.div>
            
            {/* Content */}
            <motion.div
              className="flex-1 bg-luxury-charcoal/80 backdrop-blur-lg border border-luxury-gold/30 rounded-2xl p-6"
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center space-x-4 mb-4">
                <Badge variant="luxury" className="text-xs">
                  Journey
                </Badge>
              </div>
              <h3 className="text-xl font-bold text-luxury-cream mb-2">{item.title}</h3>
              <p className="text-luxury-cream/70">{item.description}</p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

// Interactive Values Grid
const InteractiveValuesGrid = () => {
  const [hoveredValue, setHoveredValue] = useState<number | null>(null)
  
  const values = [
    {
      title: 'Authenticity',
      description: 'We source only the finest, most authentic fragrances from trusted artisans and renowned houses worldwide.',
      icon: '✨',
      color: 'from-luxury-gold to-luxury-amber'
    },
    {
      title: 'Personal Connection',
      description: 'Every recommendation is tailored to your unique personality, preferences, and lifestyle.',
      icon: '💫',
      color: 'from-luxury-amber to-luxury-gold'
    },
    {
      title: 'Luxury Experience',
      description: 'From discovery to delivery, we provide an unparalleled luxury experience that exceeds expectations.',
      icon: '👑',
      color: 'from-luxury-gold to-luxury-amber'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {values.map((value, index) => (
        <motion.div
          key={value.title}
          className="group relative"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          onHoverStart={() => setHoveredValue(index)}
          onHoverEnd={() => setHoveredValue(null)}
        >
          <motion.div
            className="relative bg-luxury-charcoal/80 backdrop-blur-lg border border-luxury-gold/30 rounded-3xl p-8 h-full overflow-hidden"
            whileHover={{ 
              scale: 1.05, 
              y: -10,
              transition: { duration: 0.3 }
            }}
          >
            {/* Animated Background */}
            <motion.div
              className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
              animate={{
                scale: hoveredValue === index ? [1, 1.1, 1] : 1,
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            
            {/* Floating Particles */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-luxury-gold/30 rounded-full"
                  style={{
                    left: `${20 + i * 15}%`,
                    top: `${30 + i * 10}%`,
                  }}
                  animate={{
                    y: hoveredValue === index ? [-20, 20, -20] : [0, 0, 0],
                    opacity: hoveredValue === index ? [0.3, 1, 0.3] : 0,
                    scale: hoveredValue === index ? [0.5, 1.5, 0.5] : 0,
                  }}
                  transition={{
                    duration: 2,
                    repeat: hoveredValue === index ? Infinity : 0,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>

            <div className="relative z-10 text-center">
              <motion.div
                className="text-5xl mb-6"
                animate={{ 
                  rotate: hoveredValue === index ? [0, 10, -10, 0] : 0,
                  scale: hoveredValue === index ? 1.2 : 1
                }}
                transition={{ duration: 0.5 }}
              >
                {value.icon}
              </motion.div>
              
              <motion.h3
                className="text-2xl font-bold text-luxury-cream mb-4 group-hover:text-luxury-gold transition-colors duration-300"
                animate={{ y: hoveredValue === index ? -5 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {value.title}
              </motion.h3>
              
              <motion.p
                className="text-luxury-cream/70 leading-relaxed"
                animate={{ y: hoveredValue === index ? -5 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {value.description}
              </motion.p>
            </div>

            {/* Glowing Border */}
            <motion.div
              className="absolute inset-0 rounded-3xl border-2 border-luxury-gold/20 group-hover:border-luxury-gold/60 transition-colors duration-500"
              animate={{
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </motion.div>
      ))}
    </div>
  )
}

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.1 })
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [50, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  return (
    <div className="min-h-screen bg-gradient-to-b from-luxury-charcoal via-luxury-royal/5 to-luxury-charcoal relative overflow-hidden">
      {/* Animated Background Elements */}
      <FloatingElements />
      
      <motion.div
        ref={containerRef}
        className="relative py-16"
        style={{ y, opacity }}
      >
        <Container className="relative z-10">
        {/* Hero Section */}
        <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-block bg-luxury-gold/20 rounded-full px-8 py-4 mb-8 border border-luxury-gold/30 backdrop-blur-sm"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <span className="text-luxury-gold font-semibold text-lg">
                ✨ Our Story & Mission ✨
              </span>
            </motion.div>
            
            <motion.h1
              className="text-6xl md:text-8xl font-heading font-bold text-luxury-cream mb-8"
          initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <motion.span
                className="block"
                animate={{ 
                  backgroundPosition: ['0%', '100%', '0%'],
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  background: 'linear-gradient(45deg, #D4AF37, #FFD700, #B8860B, #D4AF37)',
                  backgroundSize: '300% 300%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Our
              </motion.span>
              <motion.span
                className="block bg-gradient-to-r from-luxury-gold via-luxury-amber to-luxury-gold bg-clip-text text-transparent"
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                Story
              </motion.span>
            </motion.h1>
            
            <motion.p
              className="text-xl md:text-2xl text-luxury-cream/80 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
            Discover the passion, craftsmanship, and vision behind Sanaya's Scents. 
            Every fragrance tells a story, and we're here to help you find yours.
            </motion.p>
        </motion.div>

          {/* Interactive Stats */}
          <InteractiveStats />

        {/* Brand Story */}
        <motion.div
          className="mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="relative bg-luxury-charcoal/80 backdrop-blur-lg border border-luxury-gold/30 rounded-3xl p-12 shadow-2xl shadow-luxury-gold/10 overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* Animated Background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-luxury-gold/5 via-luxury-amber/5 to-luxury-gold/5"
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              <div className="relative z-10 text-center">
                <motion.h2
                  className="text-4xl md:text-5xl font-heading font-bold text-luxury-cream mb-8"
                  animate={{ 
                    textShadow: [
                      '0 0 20px rgba(212, 175, 55, 0.3)',
                      '0 0 40px rgba(212, 175, 55, 0.6)',
                      '0 0 20px rgba(212, 175, 55, 0.3)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                The Art of Scent
                </motion.h2>
                
                <div className="space-y-6 text-lg text-luxury-cream/80 leading-relaxed max-w-4xl mx-auto">
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                At Sanaya's Scents, we believe that perfume isn't just a fragrance—it's a mood, a memory, a story, a signature. 
                Our journey began with a simple yet profound understanding: the crave of perfumes is not just because of its availability, 
                but rather, often times it affects how we feel about ourselves, drives confidence and in situations gives a boost of support.
                  </motion.p>
                  
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                Founded on the principle that every individual deserves to discover their perfect scent match, we curate the world's 
                finest fragrances with an unwavering commitment to quality, authenticity, and personal connection. Our collection spans 
                from ancient oud traditions to modern gourmand innovations, each bottle carefully selected to tell a unique story.
                  </motion.p>
                  
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                We understand that choosing a fragrance is deeply personal. That's why we've created our signature scent discovery quiz—a 
                journey of self-exploration that guides you to your perfect match. Allow us to walk with you on your scent discovery journey, 
                where every question leads to a deeper understanding of your unique fragrance personality.
                  </motion.p>
                </div>
              </div>
            </motion.div>
        </motion.div>

        {/* Values Section */}
        <motion.div
          className="mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center mb-16">
              <motion.h2
                className="text-4xl md:text-5xl font-heading font-bold text-luxury-cream mb-6"
                animate={{ 
                  textShadow: [
                    '0 0 20px rgba(212, 175, 55, 0.3)',
                    '0 0 40px rgba(212, 175, 55, 0.6)',
                    '0 0 20px rgba(212, 175, 55, 0.3)'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
              Our Values
              </motion.h2>
              <p className="text-xl text-luxury-cream/70 max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

            <InteractiveValuesGrid />
        </motion.div>

          {/* Timeline Section */}
        <motion.div
          className="mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center mb-16">
              <motion.h2
                className="text-4xl md:text-5xl font-heading font-bold text-luxury-cream mb-6"
                animate={{ 
                  textShadow: [
                    '0 0 20px rgba(212, 175, 55, 0.3)',
                    '0 0 40px rgba(212, 175, 55, 0.6)',
                    '0 0 20px rgba(212, 175, 55, 0.3)'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Our Journey
              </motion.h2>
              <p className="text-xl text-luxury-cream/70 max-w-3xl mx-auto">
                The path that led us to become your trusted fragrance companion
            </p>
          </div>

            <AnimatedTimeline />
          </motion.div>

          {/* Enhanced CTA Section */}
              <motion.div
                className="text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="relative bg-gradient-to-br from-luxury-charcoal/90 via-luxury-royal/20 to-luxury-charcoal/90 backdrop-blur-xl border border-luxury-gold/30 rounded-3xl p-16 shadow-2xl shadow-luxury-gold/20 overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* Animated Background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-luxury-gold/10 via-luxury-amber/10 to-luxury-gold/10"
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
        <motion.div
                className="relative z-10"
          initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <motion.h2
                  className="text-4xl md:text-6xl font-heading font-bold text-luxury-cream mb-6"
                  animate={{ 
                    textShadow: [
                      '0 0 20px rgba(212, 175, 55, 0.3)',
                      '0 0 40px rgba(212, 175, 55, 0.6)',
                      '0 0 20px rgba(212, 175, 55, 0.3)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                Ready to Discover Your Signature Scent?
                </motion.h2>
                
                <motion.p
                  className="text-xl text-luxury-cream/80 mb-12 max-w-3xl mx-auto leading-relaxed"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                Join thousands of satisfied customers who have found their perfect fragrance match through our personalized discovery process.
                </motion.p>
                
        <motion.div
                  className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                <Link href="/quiz">
                    <motion.div
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button 
                        size="lg" 
                        className="px-12 py-6 text-lg bg-gradient-to-r from-luxury-gold to-luxury-amber hover:from-luxury-amber hover:to-luxury-gold transition-all duration-500 shadow-2xl shadow-luxury-gold/30"
                      >
                        <span className="flex items-center space-x-3">
                          <span>Start Your Journey</span>
                          <motion.span
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            ✨
                          </motion.span>
                        </span>
                  </Button>
                    </motion.div>
                </Link>
                  
                <Link href="/collections">
                    <motion.div
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button 
                        variant="outline" 
                        size="lg"
                        className="px-12 py-6 text-lg border-luxury-gold/50 hover:border-luxury-gold hover:bg-luxury-gold/10 transition-all duration-500"
                      >
                    Explore Collections
                  </Button>
                    </motion.div>
                </Link>
                </motion.div>
              </motion.div>
            </motion.div>
        </motion.div>
      </Container>
      </motion.div>
    </div>
  )
}
