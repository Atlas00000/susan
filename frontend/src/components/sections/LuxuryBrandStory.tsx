'use client'

import { motion } from 'framer-motion'

const timelineEvents = [
  {
    title: 'The Beginning',
    description: 'Founded in Lagos with a vision to create exceptional fragrances for Nigeria',
    icon: '🌱',
    color: 'from-green-500 to-emerald-600'
  },
  {
    title: 'First Collection',
    description: 'Launched our debut collection featuring carefully crafted fragrances',
    icon: '🌸',
    color: 'from-pink-500 to-rose-600'
  },
  {
    title: 'Local Growth',
    description: 'Expanded across major Nigerian cities, bringing luxury fragrances to our people',
    icon: '🇳🇬',
    color: 'from-blue-500 to-indigo-600'
  },
  {
    title: 'Community Recognition',
    description: 'Received recognition as a leading Nigerian fragrance brand for quality and innovation',
    icon: '🏆',
    color: 'from-yellow-500 to-orange-600'
  },
  {
    title: 'Sustainable Future',
    description: 'Committed to sustainable packaging and supporting local communities',
    icon: '🌱',
    color: 'from-green-500 to-teal-600'
  }
]

export function LuxuryBrandStory() {
  return (
    <section className="relative py-32 bg-gradient-to-br from-luxury-charcoal via-luxury-royal/5 to-luxury-charcoal overflow-hidden">
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
              📖 Our Story 📖
            </span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-heading font-bold text-luxury-cream mb-6">
            <span className="block">
              The Journey of
            </span>
            <span className="block bg-gradient-to-r from-luxury-gold via-luxury-amber to-luxury-gold bg-clip-text text-transparent">
              Excellence
            </span>
          </h2>
          
          <p className="text-xl text-luxury-cream/70 max-w-3xl mx-auto">
            From a passionate vision to a global luxury brand, discover our journey of creating exceptional fragrances
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-luxury-gold via-luxury-amber to-luxury-royal rounded-full" />
            
            {timelineEvents.map((event, index) => (
              <motion.div
                key={event.title}
                className="relative flex items-start mb-16"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                {/* Timeline Dot */}
                <div className="relative z-10 flex-shrink-0 w-16 h-16 bg-luxury-charcoal border-4 border-luxury-gold rounded-full flex items-center justify-center">
                  <motion.div
                    className={`text-2xl`}
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.5
                    }}
                  >
                    {event.icon}
                  </motion.div>
                </div>
                
                {/* Event Content */}
                <div className="ml-8 flex-1">
                  <motion.div
                    className="bg-luxury-charcoal/60 backdrop-blur-md border border-luxury-gold/20 rounded-2xl p-8 shadow-xl"
                    whileHover={{ scale: 1.02, y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="mb-4">
                      <h3 className="text-2xl font-heading font-bold text-luxury-cream">
                        {event.title}
                      </h3>
                    </div>
                    
                    <p className="text-luxury-cream/70 leading-relaxed">
                      {event.description}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mission Statement */}
        <div className="mt-20 text-center">
          <div className="bg-luxury-charcoal/40 backdrop-blur-md border border-luxury-gold/20 rounded-3xl p-12 max-w-4xl mx-auto">
            <h3 className="text-3xl font-heading font-bold text-luxury-cream mb-6">
              Our Mission
            </h3>
            <p className="text-xl text-luxury-cream/70 leading-relaxed mb-8">
              "To create exceptional fragrances that capture the essence of luxury, 
              tell unique stories, and create lasting memories for our customers in Nigeria."
            </p>
            <div className="flex items-center justify-center space-x-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-luxury-gold mb-2">1K+</div>
                <div className="text-luxury-cream/70">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-luxury-gold mb-2">5+</div>
                <div className="text-luxury-cream/70">Nigerian Cities</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-luxury-gold mb-2">20+</div>
                <div className="text-luxury-cream/70">Fragrances</div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-4 bg-gradient-to-r from-luxury-gold/10 to-luxury-amber/10 border border-luxury-gold/30 rounded-2xl px-8 py-6">
            <span className="text-3xl">🌟</span>
            <div>
              <h3 className="text-2xl font-heading font-bold text-luxury-cream mb-2">
                Be Part of Our Story
              </h3>
              <p className="text-luxury-cream/70">
                Join thousands of customers who have discovered their perfect scent with us
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}