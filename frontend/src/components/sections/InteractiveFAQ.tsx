'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const faqs = [
  {
    id: 1,
    question: 'How do I choose the right fragrance for me?',
    answer: 'We recommend taking our personalized scent quiz, which analyzes your preferences, lifestyle, and personality to suggest the perfect fragrance. You can also explore our fragrance categories or contact our scent consultants for personalized advice.'
  },
  {
    id: 2,
    question: 'What is the difference between eau de parfum and eau de toilette?',
    answer: 'Eau de parfum (EDP) has a higher concentration of fragrance oils (15-20%) and lasts 6-8 hours, while eau de toilette (EDT) has a lower concentration (5-15%) and lasts 3-4 hours. EDP is more intense and long-lasting, perfect for special occasions.'
  },
  {
    id: 3,
    question: 'How should I store my fragrances?',
    answer: 'Store your fragrances in a cool, dry place away from direct sunlight and heat. Keep them in their original boxes when not in use. Avoid storing in bathrooms due to humidity and temperature changes that can affect the fragrance quality.'
  },
  {
    id: 4,
    question: 'Do you offer international shipping?',
    answer: 'Yes, we ship to over 25 countries worldwide. Shipping costs and delivery times vary by location. We use premium packaging to ensure your fragrances arrive in perfect condition.'
  },
  {
    id: 5,
    question: 'What is your return policy?',
    answer: 'We offer a 30-day return policy for unopened products. If you\'re not satisfied with your purchase, you can return it for a full refund or exchange. Opened products can be returned within 14 days for store credit.'
  },
  {
    id: 6,
    question: 'Are your fragrances cruelty-free and vegan?',
    answer: 'Yes, all our fragrances are cruelty-free and many are vegan. We clearly label vegan products and never test on animals. We\'re committed to ethical and sustainable practices in all our products.'
  }
]

export function InteractiveFAQ() {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

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
              ❓ Frequently Asked Questions ❓
            </span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-heading font-bold text-luxury-cream mb-6">
            <span className="block">
              Got
            </span>
            <span className="block bg-gradient-to-r from-luxury-gold via-luxury-amber to-luxury-gold bg-clip-text text-transparent">
              Questions?
            </span>
          </h2>
          
          <p className="text-xl text-luxury-cream/70 max-w-3xl mx-auto">
            Find answers to common questions about our fragrances, shipping, and services
          </p>
        </div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              className="mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="bg-luxury-charcoal/60 backdrop-blur-md border border-luxury-gold/20 rounded-2xl overflow-hidden shadow-lg">
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-luxury-gold/5 transition-colors duration-300"
                >
                  <h3 className="text-xl font-heading font-bold text-luxury-cream pr-4">
                    {faq.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: openItems.includes(faq.id) ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-luxury-gold text-2xl"
                  >
                    ▼
                  </motion.div>
                </button>
                
                <AnimatePresence>
                  {openItems.includes(faq.id) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6">
                        <p className="text-luxury-cream/70 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-4 bg-gradient-to-r from-luxury-gold/10 to-luxury-amber/10 border border-luxury-gold/30 rounded-2xl px-8 py-6">
            <span className="text-3xl">💬</span>
            <div>
              <h3 className="text-2xl font-heading font-bold text-luxury-cream mb-2">
                Still Have Questions?
              </h3>
              <p className="text-luxury-cream/70 mb-4">
                Our fragrance experts are here to help you find the perfect scent
              </p>
              <a 
                href="/contact"
                className="inline-block bg-gradient-to-r from-luxury-gold to-luxury-amber text-luxury-charcoal font-bold px-6 py-3 rounded-lg shadow-lg shadow-luxury-gold/30 hover:shadow-luxury-gold/50 transition-all duration-300"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}