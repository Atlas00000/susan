'use client'

import { motion } from 'framer-motion'

const stats = [
  {
    id: 'customers',
    number: '50,000+',
    label: 'Happy Customers',
    icon: '👥',
    color: 'from-blue-500 to-indigo-600'
  },
  {
    id: 'products',
    number: '100+',
    label: 'Luxury Fragrances',
    icon: '🌸',
    color: 'from-pink-500 to-rose-600'
  },
  {
    id: 'countries',
    number: '25+',
    label: 'Countries Served',
    icon: '🌍',
    color: 'from-green-500 to-emerald-600'
  },
  {
    id: 'rating',
    number: '4.9★',
    label: 'Average Rating',
    icon: '⭐',
    color: 'from-yellow-500 to-orange-600'
  }
]

const achievements = [
  {
    title: 'Luxury Brand of the Year',
    year: '2024',
    icon: '🏆'
  },
  {
    title: 'Customer Satisfaction Award',
    year: '2024',
    icon: '💎'
  },
  {
    title: 'Innovation Excellence',
    year: '2024',
    icon: '🚀'
  }
]

export function InteractiveStats() {
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
              📊 Our Impact 📊
            </span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-heading font-bold text-luxury-cream mb-6">
            <span className="block">
              Numbers That
            </span>
            <span className="block bg-gradient-to-r from-luxury-gold via-luxury-amber to-luxury-gold bg-clip-text text-transparent">
              Matter
            </span>
          </h2>
          
          <p className="text-xl text-luxury-cream/70 max-w-3xl mx-auto">
            Real-time statistics that showcase our commitment to excellence and customer satisfaction
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              className="group relative"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="relative p-8 bg-luxury-charcoal/60 backdrop-blur-md border border-luxury-gold/20 rounded-3xl shadow-xl group-hover:shadow-2xl group-hover:shadow-luxury-gold/20 transition-all duration-500 overflow-hidden">
                {/* Animated Background */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Stat Icon */}
                <div className="text-6xl mb-6 text-center">
                  {stat.icon}
                </div>
                
                {/* Stat Number */}
                <motion.div
                  className="text-4xl font-bold text-luxury-gold mb-2 text-center"
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
                
                {/* Stat Label */}
                <p className="text-luxury-cream/70 text-center font-semibold">
                  {stat.label}
                </p>
                
                {/* Hover Border */}
                <div className="absolute inset-0 rounded-3xl border-2 border-luxury-gold/20 group-hover:border-luxury-gold/40 transition-colors duration-500" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Achievements Section */}
        <div className="bg-luxury-charcoal/40 backdrop-blur-md border border-luxury-gold/20 rounded-3xl p-8">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-heading font-bold text-luxury-cream mb-4">
              Recent Achievements
            </h3>
            <p className="text-luxury-cream/70">
              Recognition from industry leaders and satisfied customers
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.title}
                className="text-center p-6 bg-luxury-charcoal/60 rounded-2xl border border-luxury-gold/20"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-4xl mb-4">
                  {achievement.icon}
                </div>
                <h4 className="text-xl font-heading font-bold text-luxury-cream mb-2">
                  {achievement.title}
                </h4>
                <p className="text-luxury-gold font-semibold">
                  {achievement.year}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}