'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

const scentCategories = [
  {
    id: 'oud-rich',
    name: 'Oud & Rich',
    icon: '🕌',
    description: 'Deep, mysterious, and luxurious',
    color: 'from-amber-600 to-yellow-700',
    bgColor: 'from-amber-500/20 to-yellow-600/20',
    scents: ['Oud', 'Sandalwood', 'Frankincense', 'Saffron']
  },
  {
    id: 'amber-gold',
    name: 'Amber & Gold',
    icon: '✨',
    description: 'Warm, golden, and elegant',
    color: 'from-yellow-400 to-orange-500',
    bgColor: 'from-yellow-500/20 to-orange-600/20',
    scents: ['Amber', 'Vanilla', 'Gold', 'Honey']
  },
  {
    id: 'floral-fresh',
    name: 'Floral & Fresh',
    icon: '🌸',
    description: 'Delicate and naturally beautiful',
    color: 'from-pink-400 to-rose-500',
    bgColor: 'from-pink-500/20 to-rose-500/20',
    scents: ['Rose', 'Jasmine', 'White Flowers', 'Green Leaves']
  },
  {
    id: 'gourmand-unique',
    name: 'Gourmand & Unique',
    icon: '☕',
    description: 'Bold, unconventional, and memorable',
    color: 'from-purple-500 to-indigo-600',
    bgColor: 'from-purple-500/20 to-indigo-600/20',
    scents: ['Coffee', 'Chocolate', 'Brown Sugar', 'Spices']
  },
  {
    id: 'signature',
    name: 'Signature Editions',
    icon: '👑',
    description: 'Exclusive and extraordinary',
    color: 'from-luxury-gold to-luxury-amber',
    bgColor: 'from-luxury-gold/20 to-luxury-amber/20',
    scents: ['Rare Oud', 'Royal Essences', 'Exclusive Notes', 'Limited Edition']
  }
]

export function InteractiveScentDiscovery() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  return (
    <section className="relative pt-4 pb-8 bg-gradient-to-br from-luxury-royal/20 via-luxury-charcoal to-luxury-amber/10 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-luxury-gold/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [-100, 100, -100],
            y: [-50, 50, -50],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-luxury-royal/10 rounded-full blur-2xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.8, 0.4],
            x: [100, -100, 100],
            y: [50, -50, 50],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-luxury-amber/10 rounded-full blur-xl"
          animate={{
            x: [-200, 200, -200],
            y: [-100, 100, -100],
            rotate: [0, 360, 0],
          }}
          transition={{
            duration: 20,
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
              🔮 Discover Your Scent 🔮
            </span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-heading font-bold text-luxury-cream mb-6">
            <span className="block">
              Explore
            </span>
            <span className="block bg-gradient-to-r from-luxury-gold via-luxury-amber to-luxury-gold bg-clip-text text-transparent">
              Fragrance Categories
            </span>
          </h2>
          
          <p className="text-xl text-luxury-cream/70 max-w-3xl mx-auto">
            Discover the perfect scent for every moment and mood. Each category tells a unique story.
          </p>
        </div>

        {/* Interactive Scent Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {scentCategories.map((category) => (
            <motion.div
              key={category.id}
              className="group relative"
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <motion.button
                onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
                className={`w-full p-8 rounded-3xl transition-all duration-500 text-left relative overflow-hidden ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-br from-luxury-gold/20 to-luxury-amber/20 border-2 border-luxury-gold/50'
                    : 'bg-luxury-charcoal/60 border border-luxury-gold/20 hover:border-luxury-gold/40'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Animated Background */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${category.bgColor} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Floating Icon */}
                <motion.div
                  className="text-6xl mb-6 text-center"
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {category.icon}
                </motion.div>
                
                {/* Category Name */}
                <h3 className="text-2xl font-heading font-bold text-luxury-cream mb-3 text-center group-hover:text-luxury-gold transition-colors">
                  {category.name}
                </h3>
                
                {/* Description */}
                <p className="text-luxury-cream/70 text-center mb-6">
                  {category.description}
                </p>
                
                {/* Scent Notes */}
                <div className="flex flex-wrap gap-2 justify-center">
                  {category.scents.map((scent, index) => (
                    <motion.span
                      key={scent}
                      className="px-3 py-1 bg-luxury-gold/10 text-luxury-gold text-sm rounded-full border border-luxury-gold/20"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {scent}
                    </motion.span>
                  ))}
                </div>
                
                {/* Hover Effect Border */}
                <div className="absolute inset-0 rounded-3xl border-2 border-luxury-gold/20 group-hover:border-luxury-gold/40 transition-colors duration-500" />
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="inline-flex items-center space-x-4 bg-gradient-to-r from-luxury-gold/10 to-luxury-amber/10 border border-luxury-gold/30 rounded-2xl px-8 py-6">
            <span className="text-3xl">🧪</span>
            <div>
              <h3 className="text-2xl font-heading font-bold text-luxury-cream mb-2">
                Find Your Perfect Match
              </h3>
              <p className="text-luxury-cream/70 mb-4">
                Take our personalized scent quiz to discover your ideal fragrance
              </p>
              <Link href="/quiz">
                <Button className="bg-gradient-to-r from-luxury-gold to-luxury-amber text-luxury-charcoal font-bold px-8 py-4 rounded-2xl shadow-lg shadow-luxury-gold/30 hover:shadow-luxury-gold/50 transition-all duration-300">
                  Start Your Journey →
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}