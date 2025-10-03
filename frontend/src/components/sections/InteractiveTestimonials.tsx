'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Fashion Designer',
    location: 'New York',
    rating: 5,
    text: 'The most exquisite fragrances I\'ve ever experienced. Each scent tells a story and creates unforgettable moments.',
    avatar: '👩‍🎨',
    highlight: 'exquisite'
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Luxury Consultant',
    location: 'London',
    rating: 5,
    text: 'Outstanding quality and exceptional customer service. These fragrances have become my signature scents.',
    avatar: '👨‍💼',
    highlight: 'outstanding'
  },
  {
    id: 3,
    name: 'Emma Williams',
    role: 'Art Director',
    location: 'Paris',
    rating: 5,
    text: 'Pure luxury in every bottle. The attention to detail and craftsmanship is simply remarkable.',
    avatar: '👩‍🎭',
    highlight: 'luxury'
  },
  {
    id: 4,
    name: 'David Rodriguez',
    role: 'CEO',
    location: 'Barcelona',
    rating: 5,
    text: 'These fragrances have transformed my daily routine into a sensory journey of pure elegance.',
    avatar: '👨‍💻',
    highlight: 'elegance'
  },
  {
    id: 5,
    name: 'Isabella Martinez',
    role: 'Interior Designer',
    location: 'Milan',
    rating: 5,
    text: 'Absolutely divine scents that capture the essence of sophistication and timeless beauty.',
    avatar: '👩‍🎨',
    highlight: 'divine'
  }
]

export function InteractiveTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section className="relative py-32 bg-gradient-to-br from-luxury-royal/10 via-luxury-charcoal to-luxury-amber/10 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-luxury-gold/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [-50, 50, -50],
            y: [-30, 30, -30],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-luxury-royal/10 rounded-full blur-2xl"
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.4, 0.7, 0.4],
            x: [60, -60, 60],
            y: [40, -40, 40],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-luxury-amber/10 rounded-full blur-xl"
          animate={{
            x: [-150, 150, -150],
            y: [-80, 80, -80],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center rounded-full bg-gradient-to-r from-luxury-gold/20 to-luxury-amber/20 px-6 py-3 mb-8 border border-luxury-gold/30">
            <span className="text-luxury-gold font-semibold text-lg">
              💬 Customer Stories 💬
            </span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-heading font-bold text-luxury-cream mb-6">
            <span className="block">
              What Our
            </span>
            <span className="block bg-gradient-to-r from-luxury-gold via-luxury-amber to-luxury-gold bg-clip-text text-transparent">
              Customers Say
            </span>
          </h2>
          
          <p className="text-xl text-luxury-cream/70 max-w-3xl mx-auto">
            Real experiences from our valued customers who have discovered their perfect scent
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="bg-luxury-charcoal/60 backdrop-blur-md border border-luxury-gold/20 rounded-3xl p-12 shadow-xl"
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
              >
                {/* Quote Icon */}
                <div className="text-6xl text-luxury-gold/30 mb-6 text-center">
                  "
                </div>
                
                {/* Testimonial Text */}
                <blockquote className="text-2xl text-luxury-cream text-center mb-8 leading-relaxed">
                  {currentTestimonial && currentTestimonial.text.split(' ').map((word, index) => (
                    <span
                      key={index}
                      className={
                        currentTestimonial && word.toLowerCase().includes(currentTestimonial.highlight.toLowerCase())
                          ? 'text-luxury-gold font-bold'
                          : ''
                      }
                    >
                      {word}{' '}
                    </span>
                  ))}
                </blockquote>
                
                {/* Customer Info */}
                <div className="flex items-center justify-center space-x-6">
                  <div className="text-6xl">
                    {currentTestimonial ? currentTestimonial.avatar : '⭐'}
                  </div>
                  <div className="text-center">
                    <h4 className="text-xl font-heading font-bold text-luxury-cream mb-1">
                      {currentTestimonial ? currentTestimonial.name : ''}
                    </h4>
                    <p className="text-luxury-gold/80 font-semibold">
                      {currentTestimonial ? currentTestimonial.role : ''}
                    </p>
                    <p className="text-luxury-cream/60 text-sm">
                      {currentTestimonial ? currentTestimonial.location : ''}
                    </p>
                  </div>
                </div>
                
                {/* Rating */}
                <div className="flex justify-center mt-6">
                  {[...Array(currentTestimonial ? currentTestimonial.rating : 0)].map((_, i) => (
                    <motion.span
                      key={i}
                      className="text-2xl text-luxury-gold"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      ⭐
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
            
            {/* Navigation Dots */}
            <div className="flex justify-center space-x-3 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index)
                    setIsAutoPlaying(false)
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-luxury-gold scale-125'
                      : 'bg-luxury-gold/30 hover:bg-luxury-gold/50'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                  title={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-4 bg-gradient-to-r from-luxury-gold/10 to-luxury-amber/10 border border-luxury-gold/30 rounded-2xl px-8 py-6">
            <span className="text-3xl">🌟</span>
            <div>
              <h3 className="text-2xl font-heading font-bold text-luxury-cream mb-2">
                Join Our Community
              </h3>
              <p className="text-luxury-cream/70">
                Over 50,000 satisfied customers worldwide trust us with their signature scents
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}