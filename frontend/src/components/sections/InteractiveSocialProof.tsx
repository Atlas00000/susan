'use client'

import { motion } from 'framer-motion'

const recognitions = [
  {
    id: 'award-1',
    title: 'Luxury Fragrance Award 2024',
    organization: 'International Perfume Society',
    icon: '🏆',
    description: 'Best New Luxury Brand',
    year: '2024'
  },
  {
    id: 'award-2',
    title: 'Excellence in Innovation',
    organization: 'Fragrance Foundation',
    icon: '⭐',
    description: 'Outstanding Scent Development',
    year: '2024'
  },
  {
    id: 'award-3',
    title: 'Customer Choice Award',
    organization: 'Luxury Retail Association',
    icon: '💎',
    description: 'Highest Customer Satisfaction',
    year: '2024'
  },
  {
    id: 'award-4',
    title: 'Sustainable Luxury',
    organization: 'Green Beauty Council',
    icon: '🌱',
    description: 'Eco-Friendly Practices',
    year: '2024'
  },
  {
    id: 'award-5',
    title: 'Artisan Craftsmanship',
    organization: 'Master Perfumers Guild',
    icon: '🎨',
    description: 'Exceptional Quality',
    year: '2024'
  },
  {
    id: 'award-6',
    title: 'Global Recognition',
    organization: 'World Luxury Awards',
    icon: '🌍',
    description: 'International Excellence',
    year: '2024'
  }
]

const stats = [
  { number: '50K+', label: 'Happy Customers' },
  { number: '98%', label: 'Satisfaction Rate' },
  { number: '25+', label: 'Countries Served' },
  { number: '5★', label: 'Average Rating' }
]

export function InteractiveSocialProof() {
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
              🏆 Recognition & Trust 🏆
            </span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-heading font-bold text-luxury-cream mb-6">
            <span className="block">
              Trusted by
            </span>
            <span className="block bg-gradient-to-r from-luxury-gold via-luxury-amber to-luxury-gold bg-clip-text text-transparent">
              Industry Leaders
            </span>
          </h2>
          
          <p className="text-xl text-luxury-cream/70 max-w-3xl mx-auto">
            Recognized by experts, loved by customers, and trusted by industry leaders worldwide
          </p>
        </div>

        {/* Recognition Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {recognitions.map((recognition, index) => (
            <motion.div
              key={recognition.id}
              className="group relative"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="relative p-8 bg-luxury-charcoal/60 backdrop-blur-md border border-luxury-gold/20 rounded-3xl shadow-xl group-hover:shadow-2xl group-hover:shadow-luxury-gold/20 transition-all duration-500 overflow-hidden">
                {/* Animated Background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-luxury-gold to-luxury-amber opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Award Icon */}
                <div className="text-6xl mb-6 text-center">
                  {recognition.icon}
                </div>
                
                {/* Award Title */}
                <h3 className="text-xl font-heading font-bold text-luxury-cream mb-3 text-center group-hover:text-luxury-gold transition-colors">
                  {recognition.title}
                </h3>
                
                {/* Organization */}
                <p className="text-luxury-gold/80 text-center mb-2 font-semibold">
                  {recognition.organization}
                </p>
                
                {/* Description */}
                <p className="text-luxury-cream/70 text-center mb-4">
                  {recognition.description}
                </p>
                
                {/* Year */}
                <div className="text-center">
                  <span className="text-luxury-gold font-bold text-lg">
                    {recognition.year}
                  </span>
                </div>
                
                {/* Hover Border */}
                <div className="absolute inset-0 rounded-3xl border-2 border-luxury-gold/20 group-hover:border-luxury-gold/40 transition-colors duration-500" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Live Stats */}
        <div className="bg-luxury-charcoal/40 backdrop-blur-md border border-luxury-gold/20 rounded-3xl p-8 mb-16">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-heading font-bold text-luxury-cream mb-4">
              Our Impact in Numbers
            </h3>
            <p className="text-luxury-cream/70">
              Real-time statistics that showcase our commitment to excellence
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2 }}
              >
                <motion.div
                  className="text-4xl font-bold text-luxury-gold mb-2"
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.5
                  }}
                >
                  {stat.number}
                </motion.div>
                <p className="text-luxury-cream/70 font-semibold">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="text-center">
          <div className="inline-flex items-center space-x-4 bg-gradient-to-r from-luxury-gold/10 to-luxury-amber/10 border border-luxury-gold/30 rounded-2xl px-8 py-6">
            <span className="text-3xl">🛡️</span>
            <div>
              <h3 className="text-2xl font-heading font-bold text-luxury-cream mb-2">
                Trusted & Verified
              </h3>
              <p className="text-luxury-cream/70">
                Certified by leading industry organizations and trusted by thousands of customers worldwide
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}