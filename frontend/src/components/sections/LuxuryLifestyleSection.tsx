'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const lifestyleMoments = [
  {
    id: 'morning',
    time: 'Morning',
    title: 'Start Your Day',
    description: 'Fresh and energizing scents to awaken your senses',
    icon: '🌅',
    scents: ['Citrus', 'Green Tea', 'Mint'],
    color: 'from-yellow-400 to-orange-500',
    bgColor: 'from-yellow-500/20 to-orange-500/20'
  },
  {
    id: 'work',
    time: 'Work',
    title: 'Professional Confidence',
    description: 'Sophisticated fragrances that command respect',
    icon: '💼',
    scents: ['Woody', 'Amber', 'Spice'],
    color: 'from-blue-500 to-indigo-600',
    bgColor: 'from-blue-500/20 to-indigo-600/20'
  },
  {
    id: 'evening',
    time: 'Evening',
    title: 'Elegant Evenings',
    description: 'Luxurious scents for special occasions',
    icon: '🌙',
    scents: ['Oriental', 'Floral', 'Musk'],
    color: 'from-purple-500 to-pink-500',
    bgColor: 'from-purple-500/20 to-pink-500/20'
  },
  {
    id: 'romance',
    time: 'Romance',
    title: 'Intimate Moments',
    description: 'Sensual fragrances that create lasting memories',
    icon: '💕',
    scents: ['Rose', 'Vanilla', 'Sandalwood'],
    color: 'from-rose-400 to-red-500',
    bgColor: 'from-rose-500/20 to-red-500/20'
  }
]

export function LuxuryLifestyleSection() {
  const [selectedMoment, setSelectedMoment] = useState<string | null>(null)
  const [hoveredMoment, setHoveredMoment] = useState<string | null>(null)
  const [currentTime, setCurrentTime] = useState<Date | null>(null)

  // Set time on mount and update every minute (client-only)
  useEffect(() => {
    setCurrentTime(new Date())
    const interval = setInterval(() => setCurrentTime(new Date()), 60000)
    return () => clearInterval(interval)
  }, [])

  // Auto-suggest current time moment
  useEffect(() => {
    const dateRef = currentTime ?? new Date()
    const hour = dateRef.getHours()
    if (hour >= 6 && hour < 12) {
      setSelectedMoment('morning')
    } else if (hour >= 12 && hour < 18) {
      setSelectedMoment('work')
    } else if (hour >= 18 && hour < 22) {
      setSelectedMoment('evening')
    } else {
      setSelectedMoment('romance')
    }
  }, [currentTime])

  return (
    <section className="relative py-32 bg-gradient-to-br from-luxury-charcoal via-luxury-royal/5 to-luxury-amber/10 overflow-hidden">
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
              💎 Every Moment Deserves Luxury 💎
            </span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-heading font-bold text-luxury-cream mb-6">
            <span className="block">
              Lifestyle
            </span>
            <span className="block bg-gradient-to-r from-luxury-gold via-luxury-amber to-luxury-gold bg-clip-text text-transparent">
              Moments
            </span>
          </h2>
          
          <p className="text-xl text-luxury-cream/70 max-w-3xl mx-auto mb-8">
            Discover the perfect fragrance for every moment of your day
          </p>
          
          {/* Current Time Display */}
          <motion.div 
            className="inline-flex items-center space-x-4 bg-luxury-gold/10 border border-luxury-gold/30 rounded-2xl px-6 py-4"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-2xl">🕐</span>
            <div>
              <div className="text-luxury-gold font-semibold">
                Current Time: {currentTime ? currentTime.toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: '2-digit',
                  hour12: true
                }) : '—'}
              </div>
              <div className="text-luxury-cream/70 text-sm">
                Perfect for {selectedMoment ? lifestyleMoments.find(m => m.id === selectedMoment)?.title : 'your moment'}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Lifestyle Moments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {lifestyleMoments.map((moment, index) => (
            <motion.div
              key={moment.id}
              className="group relative"
              initial={{ opacity: 0, y: 50 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                scale: selectedMoment === moment.id ? 1.02 : 1
              }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.05, y: -10 }}
              onHoverStart={() => setHoveredMoment(moment.id)}
              onHoverEnd={() => setHoveredMoment(null)}
            >
              <div 
                className={`relative p-8 rounded-3xl transition-all duration-500 overflow-hidden cursor-pointer bg-luxury-charcoal/60 border ${
                  selectedMoment === moment.id 
                    ? 'border-luxury-gold/60 shadow-lg shadow-luxury-gold/20' 
                    : 'border-luxury-gold/20 hover:border-luxury-gold/40'
                } h-full`}
                onClick={() => setSelectedMoment(selectedMoment === moment.id ? null : moment.id)}
              >
                {/* Animated Background */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${moment.bgColor} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Time Badge */}
                <div className="text-center mb-6">
                  <motion.div 
                    className={`inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r ${moment.color} text-white font-semibold text-sm mb-4`}
                    animate={{
                      scale: selectedMoment === moment.id ? [1, 1.05, 1] : 1,
                      boxShadow: selectedMoment === moment.id 
                        ? '0 0 20px rgba(255, 255, 255, 0.3)' 
                        : '0 0 0px rgba(255, 255, 255, 0)'
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {moment.time}
                    {selectedMoment === moment.id && (
                      <motion.span 
                        className="ml-2"
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        ✨
                      </motion.span>
                    )}
                  </motion.div>
                  <motion.div 
                    className="text-6xl mb-4"
                    animate={{
                      rotate: hoveredMoment === moment.id ? [0, 10, -10, 0] : 0,
                      scale: hoveredMoment === moment.id ? [1, 1.1, 1] : 1
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    {moment.icon}
                  </motion.div>
                </div>
                
                {/* Moment Title */}
                <h3 className="text-2xl font-heading font-bold text-luxury-cream mb-3 text-center group-hover:text-luxury-gold transition-colors">
                  {moment.title}
                </h3>
                
                {/* Description */}
                <p className="text-luxury-cream/70 text-center mb-6">
                  {moment.description}
                </p>
                
                {/* Scent Notes */}
                <div className="space-y-2 mb-6">
                  <h4 className="text-luxury-gold font-semibold text-center mb-3">
                    Perfect Scents:
                  </h4>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {moment.scents.map((scent, scentIndex) => (
                      <motion.span
                        key={scent}
                        className="px-3 py-1 bg-luxury-gold/10 text-luxury-gold text-sm rounded-full border border-luxury-gold/20 cursor-pointer hover:bg-luxury-gold/20 transition-colors"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: (index * 0.2) + (scentIndex * 0.1) + 0.5 }}
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {scent}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Interactive Moment Details */}
                <AnimatePresence>
                  {selectedMoment === moment.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 p-4 bg-luxury-gold/10 rounded-xl border border-luxury-gold/20"
                    >
                      <h5 className="text-luxury-gold font-semibold mb-2">Perfect Timing:</h5>
                      <ul className="text-sm text-luxury-cream/80 space-y-1">
                        <li>• Best time: {moment.id === 'morning' ? '6 AM - 12 PM' : moment.id === 'work' ? '12 PM - 6 PM' : moment.id === 'evening' ? '6 PM - 10 PM' : '10 PM - 6 AM'}</li>
                        <li>• Occasion: {moment.id === 'morning' ? 'Daily routine' : moment.id === 'work' ? 'Professional settings' : moment.id === 'evening' ? 'Social events' : 'Intimate moments'}</li>
                        <li>• Mood: {moment.id === 'morning' ? 'Fresh & Energizing' : moment.id === 'work' ? 'Confident & Professional' : moment.id === 'evening' ? 'Elegant & Sophisticated' : 'Sensual & Romantic'}</li>
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Hover Border */}
                <div className="absolute inset-0 rounded-3xl border-2 border-luxury-gold/20 group-hover:border-luxury-gold/40 transition-colors duration-500" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="inline-flex items-center space-x-4 bg-gradient-to-r from-luxury-gold/10 to-luxury-amber/10 border border-luxury-gold/30 rounded-2xl px-8 py-6">
            <span className="text-3xl">✨</span>
            <div>
              <h3 className="text-2xl font-heading font-bold text-luxury-cream mb-2">
                Find Your Signature Moment
              </h3>
              <p className="text-luxury-cream/70">
                Discover which lifestyle moment resonates with your personality
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}