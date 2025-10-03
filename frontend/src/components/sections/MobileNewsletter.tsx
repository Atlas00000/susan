'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'

export function MobileNewsletter() {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail('')
      // Here you would typically send the email to your backend
      setTimeout(() => setIsSubscribed(false), 3000)
    }
  }

  return (
    <section className="py-16 bg-gradient-to-b from-luxury-royal/10 to-luxury-charcoal">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Header */}
          <div className="inline-block bg-luxury-gold/20 rounded-full px-4 py-2 mb-6 border border-luxury-gold/30">
            <span className="text-luxury-gold font-semibold text-sm">
              ✨ Stay Connected ✨
            </span>
          </div>
          
          <h2 className="text-3xl font-bold text-luxury-cream mb-4">
            Join Our
            <span className="block bg-gradient-to-r from-luxury-gold via-luxury-amber to-luxury-gold bg-clip-text text-transparent">
              Exclusive Community
            </span>
          </h2>
          
          <p className="text-luxury-cream/70 text-base mb-8 max-w-md mx-auto">
            Get early access to new collections, exclusive offers, and insider tips from our perfumers.
          </p>

          {/* Newsletter Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-md mx-auto"
          >
            {!isSubscribed ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full px-4 py-3 rounded-2xl bg-luxury-charcoal/80 border border-luxury-gold/30 text-luxury-cream placeholder-luxury-cream/50 focus:border-luxury-gold focus:outline-none transition-all duration-300"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  variant="outline"
                  className="w-full px-6 py-3 bg-gradient-to-r from-luxury-gold/10 to-luxury-amber/10 border-luxury-gold/50 hover:border-luxury-gold hover:bg-gradient-to-r hover:from-luxury-gold/20 hover:to-luxury-amber/20 transition-all duration-300"
                >
                  Subscribe Now
                </Button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-luxury-gold/10 rounded-2xl p-6 border border-luxury-gold/30"
              >
                <div className="text-4xl mb-3">🎉</div>
                <h3 className="text-luxury-cream font-semibold text-lg mb-2">
                  Welcome to the Family!
                </h3>
                <p className="text-luxury-cream/70 text-sm">
                  Thank you for subscribing. You'll receive our latest updates soon!
                </p>
              </motion.div>
            )}
          </motion.div>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 grid grid-cols-1 gap-4 max-w-sm mx-auto"
          >
            {[
              { icon: '🎁', text: 'Exclusive offers' },
              { icon: '🆕', text: 'Early access to new releases' },
              { icon: '💡', text: 'Perfume tips & tricks' }
            ].map((benefit, index) => (
              <motion.div
                key={benefit.text}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="flex items-center space-x-3 bg-luxury-charcoal/50 rounded-xl p-3 border border-luxury-gold/20"
              >
                <span className="text-lg">{benefit.icon}</span>
                <span className="text-luxury-cream/80 text-sm">{benefit.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
