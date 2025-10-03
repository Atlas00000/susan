'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const testimonials = [
  {
    id: 1,
    name: 'Sarah M.',
    location: 'New York',
    rating: 5,
    text: 'Absolutely love my new fragrance! The quality is exceptional and the scent lasts all day.',
    avatar: '👩‍💼'
  },
  {
    id: 2,
    name: 'Michael R.',
    location: 'London',
    rating: 5,
    text: 'The packaging alone is worth the price. Such attention to detail in every aspect.',
    avatar: '👨‍💼'
  },
  {
    id: 3,
    name: 'Emma L.',
    location: 'Paris',
    rating: 5,
    text: 'I get compliments everywhere I go. This fragrance is truly special.',
    avatar: '👩‍🎨'
  },
  {
    id: 4,
    name: 'David K.',
    location: 'Tokyo',
    rating: 5,
    text: 'The customer service is outstanding. They really care about their customers.',
    avatar: '👨‍🎓'
  }
]

export function MobileTestimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-16 bg-gradient-to-b from-luxury-charcoal to-luxury-royal/10">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-block bg-luxury-gold/20 rounded-full px-4 py-2 mb-6 border border-luxury-gold/30">
            <span className="text-luxury-gold font-semibold text-sm">
              ⭐ Customer Love ⭐
            </span>
          </div>
          
          <h2 className="text-3xl font-bold text-luxury-cream mb-4">
            What Our
            <span className="block bg-gradient-to-r from-luxury-gold via-luxury-amber to-luxury-gold bg-clip-text text-transparent">
              Customers Say
            </span>
          </h2>
        </motion.div>

        {/* Testimonial Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="bg-luxury-charcoal/80 rounded-3xl p-6 border border-luxury-gold/30 shadow-2xl">
            {/* Stars */}
            <div className="flex justify-center mb-4">
              {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                <span key={i} className="text-luxury-gold text-lg">⭐</span>
              ))}
            </div>

            {/* Testimonial Text */}
            <blockquote className="text-luxury-cream/90 text-center text-base leading-relaxed mb-6">
              "{testimonials[currentTestimonial].text}"
            </blockquote>

            {/* Customer Info */}
            <div className="text-center">
              <div className="text-3xl mb-2">
                {testimonials[currentTestimonial].avatar}
              </div>
              <h3 className="text-luxury-cream font-semibold text-sm mb-1">
                {testimonials[currentTestimonial].name}
              </h3>
              <p className="text-luxury-cream/60 text-xs">
                {testimonials[currentTestimonial].location}
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center space-x-4 mt-6">
            <button
              onClick={prevTestimonial}
              className="p-2 rounded-full bg-luxury-charcoal/80 border border-luxury-gold/30 hover:border-luxury-gold/60 transition-all duration-300"
              aria-label="Previous testimonial"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-luxury-gold">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* Dots */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentTestimonial === index
                      ? 'bg-luxury-gold scale-125'
                      : 'bg-luxury-gold/30 hover:bg-luxury-gold/50'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="p-2 rounded-full bg-luxury-charcoal/80 border border-luxury-gold/30 hover:border-luxury-gold/60 transition-all duration-300"
              aria-label="Next testimonial"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-luxury-gold">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
