'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const fragranceNotes = {
  top: {
    title: 'Top Notes',
    description: 'The first impression that greets you',
    icon: '🌅',
    notes: [
      { name: 'Bergamot', intensity: 90, icon: '🍊', description: 'Fresh and citrusy' },
      { name: 'Lemon', intensity: 85, icon: '🍋', description: 'Bright and energizing' },
      { name: 'Pink Pepper', intensity: 80, icon: '🌶️', description: 'Spicy and warm' },
      { name: 'Green Apple', intensity: 75, icon: '🍏', description: 'Crisp and refreshing' }
    ]
  },
  heart: {
    title: 'Heart Notes',
    description: 'The soul of the fragrance that develops over time',
    icon: '💖',
    notes: [
      { name: 'Rose', intensity: 95, icon: '🌹', description: 'Romantic and elegant' },
      { name: 'Jasmine', intensity: 90, icon: '🌸', description: 'Intoxicating and floral' },
      { name: 'Lily of the Valley', intensity: 85, icon: '🌿', description: 'Delicate and fresh' },
      { name: 'Peony', intensity: 80, icon: '🌺', description: 'Soft and feminine' }
    ]
  },
  base: {
    title: 'Base Notes',
    description: 'The foundation that lingers and creates lasting memories',
    icon: '🏛️',
    notes: [
      { name: 'Sandalwood', intensity: 100, icon: '🌲', description: 'Warm and woody' },
      { name: 'Vanilla', intensity: 95, icon: '🍯', description: 'Sweet and comforting' },
      { name: 'Amber', intensity: 90, icon: '🟤', description: 'Rich and resinous' },
      { name: 'Musk', intensity: 85, icon: '🦌', description: 'Animalic and sensual' }
    ]
  }
}

export function InteractiveFragranceNotes() {
  const [activeNote, setActiveNote] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [hoveredNote, setHoveredNote] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  // Auto-rotate through categories
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPlaying) {
        const categories = Object.keys(fragranceNotes)
        const currentIndex = categories.indexOf(selectedCategory || 'top')
        const nextIndex = (currentIndex + 1) % categories.length
        setSelectedCategory(categories[nextIndex] ?? 'top')
      }
    }, 4000)

    return () => clearInterval(interval)
  }, [selectedCategory, isPlaying])

  return (
    <section className="relative py-32 bg-gradient-to-br from-luxury-charcoal via-luxury-gold/5 to-luxury-charcoal overflow-hidden">
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
              🌸 The Art of Perfumery 🌸
            </span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-heading font-bold text-luxury-cream mb-6">
            <span className="block">
              Fragrance
            </span>
            <span className="block bg-gradient-to-r from-luxury-gold via-luxury-amber to-luxury-gold bg-clip-text text-transparent">
              Notes
            </span>
          </h2>
          
          <p className="text-xl text-luxury-cream/70 max-w-3xl mx-auto">
            Understanding the three layers that create the perfect fragrance experience
          </p>
        </div>

        {/* Interactive Category Selector */}
        <div className="flex justify-center mb-16">
          <div className="flex space-x-4 bg-luxury-charcoal/60 backdrop-blur-md border border-luxury-gold/20 rounded-2xl p-2">
            {Object.entries(fragranceNotes).map(([key, category]) => (
              <motion.button
                key={key}
                onClick={() => {
                  setSelectedCategory(key)
                  setIsPlaying(true)
                }}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  selectedCategory === key
                    ? 'bg-luxury-gold text-luxury-charcoal'
                    : 'text-luxury-cream hover:bg-luxury-gold/20'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.icon} {category.title}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Notes Categories */}
        <div className="space-y-20">
          {Object.entries(fragranceNotes).map(([key, category], categoryIndex) => (
            <motion.div 
              key={key} 
              className="relative"
              initial={{ opacity: 0, y: 50 }}
              animate={{ 
                opacity: selectedCategory === null || selectedCategory === key ? 1 : 0.3,
                scale: selectedCategory === null || selectedCategory === key ? 1 : 0.95
              }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center mb-12">
                <motion.div
                  className="inline-block p-8 rounded-3xl bg-gradient-to-br from-luxury-royal/20 to-luxury-gold/20 border border-luxury-gold/30 transition-all duration-500"
                  animate={{
                    scale: selectedCategory === key ? [1, 1.02, 1] : 1,
                    boxShadow: selectedCategory === key 
                      ? '0 0 30px rgba(212, 175, 55, 0.3)' 
                      : '0 0 0px rgba(212, 175, 55, 0)'
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <h3 className="text-3xl font-heading font-bold text-luxury-cream mb-4">
                    {category.title}
                  </h3>
                  <p className="text-luxury-cream/70 text-lg">
                    {category.description}
                  </p>
                </motion.div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {category.notes.map((note, noteIndex) => (
                  <motion.div
                    key={note.name}
                    className="group relative"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: (categoryIndex * 0.2) + (noteIndex * 0.1) }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    onHoverStart={() => setHoveredNote(note.name)}
                    onHoverEnd={() => setHoveredNote(null)}
                  >
                    <div className="relative p-6 bg-luxury-charcoal/70 backdrop-blur-md border border-luxury-gold/20 rounded-2xl shadow-xl group-hover:shadow-2xl group-hover:shadow-luxury-gold/20 transition-all duration-500 overflow-hidden cursor-pointer"
                         onClick={() => setActiveNote(activeNote === note.name ? null : note.name)}>
                      {/* Animated Background */}
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-br ${
                          key === 'top' ? 'from-luxury-gold to-luxury-amber' :
                          key === 'heart' ? 'from-luxury-royal to-luxury-gold' :
                          'from-luxury-amber to-luxury-royal'
                        } opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                        animate={{
                          scale: [1, 1.1, 1],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                      
                      {/* Note Icon */}
                      <motion.div 
                        className="text-4xl mb-4 text-center"
                        animate={{
                          rotate: hoveredNote === note.name ? [0, 10, -10, 0] : 0,
                          scale: hoveredNote === note.name ? [1, 1.1, 1] : 1
                        }}
                        transition={{ duration: 0.5 }}
                      >
                        {note.icon}
                      </motion.div>
                      
                      {/* Note Name */}
                      <h4 className="text-xl font-heading font-bold text-luxury-cream mb-2 text-center group-hover:text-luxury-gold transition-colors">
                        {note.name}
                      </h4>
                      
                      {/* Description */}
                      <p className="text-luxury-cream/70 text-center mb-4 text-sm">
                        {note.description}
                      </p>

                      {/* Interactive Note Details */}
                      <AnimatePresence>
                        {activeNote === note.name && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-4 p-4 bg-luxury-gold/10 rounded-xl border border-luxury-gold/20"
                          >
                            <h5 className="text-luxury-gold font-semibold mb-2">Fragrance Profile:</h5>
                            <ul className="text-sm text-luxury-cream/80 space-y-1">
                              <li>• Longevity: {note.intensity > 90 ? 'Very Long' : note.intensity > 70 ? 'Long' : 'Medium'}</li>
                              <li>• Sillage: {note.intensity > 85 ? 'Strong' : note.intensity > 60 ? 'Moderate' : 'Light'}</li>
                              <li>• Best for: {key === 'top' ? 'First impressions' : key === 'heart' ? 'Day wear' : 'Evening wear'}</li>
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      
                      {/* Intensity Bar */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-luxury-cream/60">Intensity</span>
                          <span className="text-xs text-luxury-gold font-semibold">{note.intensity}%</span>
                        </div>
                        <div className="w-full bg-luxury-charcoal/50 rounded-full h-2 overflow-hidden">
                          <motion.div
                            className={`h-full bg-gradient-to-r ${
                              key === 'top' ? 'from-luxury-gold to-luxury-amber' :
                              key === 'heart' ? 'from-luxury-royal to-luxury-gold' :
                              'from-luxury-amber to-luxury-royal'
                            } rounded-full`}
                            initial={{ width: 0 }}
                            animate={{ width: `${note.intensity}%` }}
                            transition={{ delay: (categoryIndex * 0.2) + (noteIndex * 0.1) + 0.5, duration: 1 }}
                          />
                        </div>
                      </div>
                      
                      {/* Hover Border */}
                      <div className="absolute inset-0 rounded-2xl border-2 border-luxury-gold/20 group-hover:border-luxury-gold/40 transition-colors duration-500" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20">
          <div className="inline-flex items-center space-x-4 bg-gradient-to-r from-luxury-gold/10 to-luxury-amber/10 border border-luxury-gold/30 rounded-2xl px-8 py-6">
            <span className="text-3xl">🧪</span>
            <div>
              <h3 className="text-2xl font-heading font-bold text-luxury-cream mb-2">
                Create Your Signature Blend
              </h3>
              <p className="text-luxury-cream/70">
                Discover which notes resonate with your personality
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}