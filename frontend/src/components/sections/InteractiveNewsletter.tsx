'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'

const benefits = [
  {
    icon: '🎁',
    title: 'Exclusive Offers',
    description: 'Special discounts and early access to new collections'
  },
  {
    icon: '📧',
    title: 'Scent Stories',
    description: 'Behind-the-scenes content and fragrance education'
  },
  {
    icon: '✨',
    title: 'Personalized Recommendations',
    description: 'Curated suggestions based on your preferences'
  }
]

export function InteractiveNewsletter() {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail('')
      setTimeout(() => setIsSubscribed(false), 3000)
    }
  }

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
              📧 Stay Connected 📧
            </span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-heading font-bold text-luxury-cream mb-6">
            <span className="block">
              Join Our
            </span>
            <span className="block bg-gradient-to-r from-luxury-gold via-luxury-amber to-luxury-gold bg-clip-text text-transparent">
              Scent Community
            </span>
          </h2>
          
          <p className="text-xl text-luxury-cream/70 max-w-3xl mx-auto">
            Get exclusive access to new collections, scent stories, and personalized recommendations
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Newsletter Form */}
            <motion.div
              className="bg-luxury-charcoal/60 backdrop-blur-md border border-luxury-gold/20 rounded-3xl p-8 shadow-xl"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-3xl font-heading font-bold text-luxury-cream mb-6">
                Stay in the Scent
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-luxury-cream font-semibold mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full px-4 py-3 bg-luxury-charcoal/50 border border-luxury-gold/30 rounded-lg text-luxury-cream placeholder-luxury-cream/50 focus:outline-none focus:border-luxury-gold transition-colors"
                    required
                  />
                </div>
                
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-luxury-gold to-luxury-amber text-luxury-charcoal font-bold py-3 rounded-lg shadow-lg shadow-luxury-gold/30 hover:shadow-luxury-gold/50 transition-all duration-300"
                >
                  {isSubscribed ? '✓ Subscribed!' : 'Subscribe Now'}
                </Button>
                
                {isSubscribed && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-luxury-gold text-center font-semibold"
                  >
                    Welcome to our scent community! 🎉
                  </motion.p>
                )}
              </form>
              
              <p className="text-luxury-cream/60 text-sm mt-4 text-center">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </motion.div>

            {/* Benefits */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-2xl font-heading font-bold text-luxury-cream mb-8">
                What You'll Get:
              </h3>
              
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  className="flex items-start space-x-4 p-6 bg-luxury-charcoal/40 rounded-2xl border border-luxury-gold/20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + (index * 0.2) }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="text-3xl">
                    {benefit.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-heading font-bold text-luxury-cream mb-2">
                      {benefit.title}
                    </h4>
                    <p className="text-luxury-cream/70">
                      {benefit.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-4 bg-gradient-to-r from-luxury-gold/10 to-luxury-amber/10 border border-luxury-gold/30 rounded-2xl px-8 py-6">
            <span className="text-3xl">🔒</span>
            <div>
              <h3 className="text-2xl font-heading font-bold text-luxury-cream mb-2">
                Secure & Private
              </h3>
              <p className="text-luxury-cream/70">
                Your information is safe with us. We never share your data with third parties.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}