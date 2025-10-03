'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export function MobileBrandStory() {
  return (
    <section className="py-16 bg-gradient-to-b from-luxury-royal/10 to-luxury-charcoal">
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
              ✨ Our Story ✨
            </span>
          </div>
          
          <h2 className="text-3xl font-bold text-luxury-cream mb-4">
            Crafting Luxury
            <span className="block bg-gradient-to-r from-luxury-gold via-luxury-amber to-luxury-gold bg-clip-text text-transparent">
              Since Day One
            </span>
          </h2>
        </motion.div>

        {/* Story Content */}
        <div className="space-y-8">
          {/* Story Text */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center space-y-4"
          >
            <p className="text-luxury-cream/80 text-base leading-relaxed">
              Born from a passion for exceptional fragrances, our journey began with a simple belief: 
              every scent should tell a story.
            </p>
            
            <p className="text-luxury-cream/80 text-base leading-relaxed">
              We source the finest ingredients from around the world, working with master perfumers 
              to create fragrances that capture moments, memories, and emotions.
            </p>
            
            <p className="text-luxury-cream/80 text-base leading-relaxed">
              Each bottle is a testament to our commitment to luxury, quality, and the art of perfumery.
            </p>
          </motion.div>

          {/* Key Values */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 gap-6"
          >
            {[
              {
                icon: '🌿',
                title: 'Natural Ingredients',
                description: 'Sourced from the finest suppliers worldwide'
              },
              {
                icon: '👑',
                title: 'Luxury Craftsmanship',
                description: 'Handcrafted with attention to every detail'
              },
              {
                icon: '💎',
                title: 'Exclusive Collections',
                description: 'Limited editions for the discerning few'
              }
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="flex items-center space-x-4 bg-luxury-charcoal/50 rounded-2xl p-4 border border-luxury-gold/20"
              >
                <div className="text-2xl">{value.icon}</div>
                <div>
                  <h3 className="text-luxury-cream font-semibold text-sm mb-1">
                    {value.title}
                  </h3>
                  <p className="text-luxury-cream/60 text-xs">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
