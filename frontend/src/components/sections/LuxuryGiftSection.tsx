'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'

const giftSets = [
  {
    id: 'signature',
    name: 'Signature Collection',
    icon: '🎁',
    description: 'Our most popular fragrances in an elegant gift box',
    price: 299,
    originalPrice: 399,
    savings: 100,
    features: [
      '3 Full-Size Bottles',
      'Luxury Gift Box',
      'Personalized Note',
      'Free Shipping'
    ],
    popular: true
  },
  {
    id: 'discovery',
    name: 'Discovery Set',
    icon: '🔮',
    description: 'Perfect for exploring new scents',
    price: 149,
    originalPrice: 199,
    savings: 50,
    features: [
      '6 Travel-Size Bottles',
      'Elegant Pouch',
      'Scent Guide',
      'Free Shipping'
    ]
  },
  {
    id: 'premium',
    name: 'Premium Experience',
    icon: '💎',
    description: 'The ultimate luxury fragrance experience',
    price: 599,
    originalPrice: 799,
    savings: 200,
    features: [
      '5 Full-Size Bottles',
      'Premium Gift Box',
      'Personal Consultation',
      'Expedited Shipping'
    ]
  }
]

export function LuxuryGiftSection() {
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
              🎁 Luxury Gifts 🎁
            </span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-heading font-bold text-luxury-cream mb-6">
            <span className="block">
              Perfect
            </span>
            <span className="block bg-gradient-to-r from-luxury-gold via-luxury-amber to-luxury-gold bg-clip-text text-transparent">
              Gift Sets
            </span>
          </h2>
          
          <p className="text-xl text-luxury-cream/70 max-w-3xl mx-auto">
            Thoughtfully curated collections that make every moment special
          </p>
        </div>

        {/* Gift Sets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {giftSets.map((gift, index) => (
            <motion.div
              key={gift.id}
              className="group relative"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="relative p-8 rounded-3xl transition-all duration-500 overflow-hidden cursor-pointer bg-luxury-charcoal/60 border border-luxury-gold/20 hover:border-luxury-gold/40">
                {/* Popular Badge */}
                {gift.popular && (
                  <div className="absolute -top-3 -right-3 z-20">
                    <div className="bg-gradient-to-r from-luxury-gold to-luxury-amber text-luxury-charcoal font-bold px-4 py-2 rounded-full text-sm shadow-lg">
                      Most Popular
                    </div>
                  </div>
                )}
                
                {/* Animated Background */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${
                    index === 0 ? 'from-luxury-gold/20 to-luxury-amber/20' :
                    index === 1 ? 'from-luxury-royal/20 to-luxury-gold/20' :
                    'from-luxury-amber/20 to-luxury-royal/20'
                  } opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Gift Icon */}
                <div className="text-center mb-6">
                  <div className="text-8xl mb-4">
                    {gift.icon}
                  </div>
                </div>
                
                {/* Gift Name */}
                <h3 className="text-2xl font-heading font-bold text-luxury-cream mb-3 text-center group-hover:text-luxury-gold transition-colors">
                  {gift.name}
                </h3>
                
                {/* Description */}
                <p className="text-luxury-cream/70 text-center mb-6">
                  {gift.description}
                </p>
                
                {/* Pricing */}
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <span className="text-3xl font-bold text-luxury-gold">${gift.price}</span>
                    <span className="text-lg text-luxury-cream/50 line-through">${gift.originalPrice}</span>
                  </div>
                  <div className="text-sm text-luxury-gold/80 font-semibold">
                    Save ${gift.savings}
                  </div>
                </div>
                
                {/* Features List */}
                <div className="space-y-2 mb-6">
                  {gift.features.map((feature, featureIndex) => (
                    <motion.div
                      key={feature}
                      className="flex items-center space-x-2 text-luxury-cream/80"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: (index * 0.2) + (featureIndex * 0.1) + 0.5 }}
                    >
                      <span className="text-luxury-gold">✨</span>
                      <span className="text-sm">{feature}</span>
                    </motion.div>
                  ))}
                </div>
                
                {/* CTA Button */}
                <Button className="w-full bg-gradient-to-r from-luxury-gold to-luxury-amber text-luxury-charcoal font-bold rounded-2xl shadow-lg shadow-luxury-gold/30 hover:shadow-luxury-gold/50 transition-all duration-300">
                  <span className="flex items-center justify-center space-x-2">
                    <span>Add to Cart</span>
                    <span>→</span>
                  </span>
                </Button>
                
                {/* Hover Border */}
                <div className="absolute inset-0 rounded-3xl border-2 border-luxury-gold/20 group-hover:border-luxury-gold/40 transition-colors duration-500" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Custom Gift CTA */}
        <div className="text-center">
          <div className="inline-flex items-center space-x-4 bg-gradient-to-r from-luxury-gold/10 to-luxury-amber/10 border border-luxury-gold/30 rounded-2xl px-8 py-6">
            <span className="text-3xl">🎨</span>
            <div>
              <h3 className="text-2xl font-heading font-bold text-luxury-cream mb-2">
                Need Something Special?
              </h3>
              <p className="text-luxury-cream/70 mb-4">
                Create a custom gift set tailored to your preferences
              </p>
              <Button className="border-2 border-luxury-gold/50 hover:border-luxury-gold hover:bg-luxury-gold/10 transition-all duration-300">
                <span className="flex items-center space-x-2">
                  <span>Customize Gift</span>
                  <span>→</span>
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}