'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/Button'

const scentCategories = [
  {
    id: 'fresh',
    name: 'Fresh & Clean',
    description: 'Light, airy fragrances perfect for everyday wear',
    icon: '🌿',
    color: 'from-green-400 to-emerald-500'
  },
  {
    id: 'floral',
    name: 'Floral Elegance',
    description: 'Romantic and feminine with blooming flower notes',
    icon: '🌸',
    color: 'from-pink-400 to-rose-500'
  },
  {
    id: 'woody',
    name: 'Woody & Warm',
    description: 'Rich, earthy scents with sandalwood and cedar',
    icon: '🌳',
    color: 'from-amber-400 to-orange-500'
  },
  {
    id: 'oriental',
    name: 'Oriental Spice',
    description: 'Exotic and mysterious with warm spices',
    icon: '🌶️',
    color: 'from-red-400 to-amber-500'
  }
]

export function MobileScentDiscovery() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

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
              ✨ Discover Your Scent ✨
            </span>
          </div>
          
          <h2 className="text-3xl font-bold text-luxury-cream mb-4">
            Find Your Perfect
            <span className="block bg-gradient-to-r from-luxury-gold via-luxury-amber to-luxury-gold bg-clip-text text-transparent">
              Fragrance
            </span>
          </h2>
          
          <p className="text-luxury-cream/70 text-base max-w-md mx-auto">
            Explore our curated collection and discover the scent that speaks to you
          </p>
        </motion.div>

        {/* Scent Categories Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 gap-4 mb-8"
        >
          {scentCategories.map((category, index) => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
              className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'border-luxury-gold bg-luxury-gold/10'
                  : 'border-luxury-gold/30 bg-luxury-charcoal/50 hover:border-luxury-gold/50'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="text-center">
                <div className="text-3xl mb-2">{category.icon}</div>
                <h3 className="text-luxury-cream font-semibold text-sm mb-1">
                  {category.name}
                </h3>
                <p className="text-luxury-cream/60 text-xs">
                  {category.description}
                </p>
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* Selected Category Details */}
        <AnimatePresence>
          {selectedCategory && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-8"
            >
              <div className="bg-luxury-charcoal/80 rounded-2xl p-6 border border-luxury-gold/30">
                <h3 className="text-luxury-cream font-bold text-lg mb-2">
                  {scentCategories.find(c => c.id === selectedCategory)?.name}
                </h3>
                <p className="text-luxury-cream/70 text-sm mb-4">
                  {scentCategories.find(c => c.id === selectedCategory)?.description}
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full"
                >
                  Explore This Category
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <Button
            size="lg"
            variant="outline"
            className="px-8 py-4 bg-gradient-to-r from-luxury-gold/10 to-luxury-amber/10 border-luxury-gold/50 hover:border-luxury-gold hover:bg-gradient-to-r hover:from-luxury-gold/20 hover:to-luxury-amber/20 transition-all duration-300"
          >
            <span className="flex items-center space-x-2">
              <span>Take Our Scent Quiz</span>
              <span>→</span>
            </span>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
