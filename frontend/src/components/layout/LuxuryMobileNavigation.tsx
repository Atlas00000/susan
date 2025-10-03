'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface LuxuryMobileNavigationProps {
  className?: string
}

export function LuxuryMobileNavigation({ className }: LuxuryMobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null)

  const navigationItems = [
    {
      name: 'Collections',
      href: '/collections',
      icon: '🌸',
      color: 'from-luxury-gold to-luxury-amber',
      submenu: [
        { name: 'All Collections', href: '/collections', icon: '✨' },
        { name: 'Oud & Rich', href: '/collections/oud-rich', icon: '🌹' },
        { name: 'Amber & Gold', href: '/collections/amber-gold', icon: '🏆' },
        { name: 'Floral & Fresh', href: '/collections/floral-fresh', icon: '🌺' },
        { name: 'Gourmand & Unique', href: '/collections/gourmand-unique', icon: '🍯' },
        { name: 'Signature Editions', href: '/collections/signature', icon: '👑' },
      ]
    },
    {
      name: 'Discover',
      href: '/quiz',
      icon: '🔮',
      color: 'from-luxury-royal to-luxury-gold',
      submenu: [
        { name: 'Scent Discovery Quiz', href: '/quiz', icon: '🎯' },
        { name: 'Fragrance Guide', href: '/guide', icon: '📖' },
        { name: 'All Products', href: '/products', icon: '⭐' },
      ]
    },
    {
      name: 'About',
      href: '/about',
      icon: '💎',
      color: 'from-luxury-amber to-luxury-royal',
      submenu: [
        { name: 'Our Story', href: '/about', icon: '📜' },
        { name: 'Contact Us', href: '/contact', icon: '📞' },
      ]
    },
  ]

  return (
    <div className={cn('lg:hidden', className)}>
      {/* Mobile Menu Button - Dramatically Enhanced */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-3 rounded-xl bg-gradient-to-r from-luxury-gold/10 to-luxury-amber/10 border border-luxury-gold/30 hover:border-luxury-gold/50 transition-all duration-300 group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle mobile menu"
      >
        <motion.div
          className="w-6 h-6 flex flex-col justify-center items-center space-y-1"
          animate={isOpen ? { rotate: 45 } : { rotate: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="w-5 h-0.5 bg-luxury-gold rounded-full"
            animate={isOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -2 }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            className="w-5 h-0.5 bg-luxury-gold rounded-full"
            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            className="w-5 h-0.5 bg-luxury-gold rounded-full"
            animate={isOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 2 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
        
        {/* Glowing effect */}
        <motion.div
          className="absolute inset-0 rounded-xl bg-gradient-to-r from-luxury-gold/20 to-luxury-amber/20 opacity-0 group-hover:opacity-100"
          animate={isOpen ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.button>

      {/* Mobile Menu Overlay - Completely Redesigned */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Animated Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-gradient-to-br from-luxury-charcoal/80 via-luxury-royal/20 to-luxury-charcoal/80 backdrop-blur-xl z-40"
              onClick={() => setIsOpen(false)}
            >
              {/* Animated background elements */}
              <motion.div
                className="absolute top-20 right-10 w-32 h-32 bg-luxury-gold/10 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="absolute bottom-20 left-10 w-24 h-24 bg-luxury-royal/15 rounded-full blur-2xl"
                animate={{
                  scale: [1.2, 1, 1.2],
                  opacity: [0.4, 0.8, 0.4],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
            
            {/* Menu Panel - Dramatically Enhanced */}
            <motion.div
              initial={{ opacity: 0, x: '100%', scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: '100%', scale: 0.9 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="fixed top-0 right-0 h-full w-96 bg-gradient-to-br from-luxury-charcoal/95 via-luxury-royal/10 to-luxury-charcoal/95 backdrop-blur-2xl border-l border-luxury-gold/30 shadow-2xl shadow-luxury-gold/20 z-50 overflow-y-auto"
            >
              {/* Animated Header */}
              <motion.div 
                className="p-8 bg-gradient-to-r from-luxury-gold/10 to-luxury-amber/10 border-b border-luxury-gold/20"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <motion.div
                      className="w-10 h-10 bg-gradient-to-br from-luxury-gold to-luxury-amber rounded-xl flex items-center justify-center shadow-lg"
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    >
                      <span className="text-luxury-charcoal font-black text-lg">S</span>
                    </motion.div>
                    <div>
                      <h2 className="text-xl font-heading font-bold text-luxury-cream">
                        Sanaya's Scents
                      </h2>
                      <p className="text-sm text-luxury-cream/70">
                        Luxury Fragrances
                      </p>
                    </div>
                  </div>
                  <motion.button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-xl bg-luxury-gold/10 hover:bg-luxury-gold/20 transition-colors"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg className="w-6 h-6 text-luxury-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                </div>
              </motion.div>

              {/* Navigation Items - Dramatically Enhanced */}
              <div className="p-6 space-y-2">
                {navigationItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <div className="space-y-2">
                      {/* Main Item */}
                      <motion.div
                        className={`relative overflow-hidden rounded-2xl bg-gradient-to-r ${item.color} p-1`}
                        whileHover={{ scale: 1.02 }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className="flex items-center justify-between p-4 bg-luxury-charcoal/90 backdrop-blur-md rounded-xl group"
                        >
                          <div className="flex items-center space-x-3">
                            <motion.span 
                              className="text-2xl"
                              whileHover={{ 
                                rotate: [0, -10, 10, 0],
                                scale: [1, 1.2, 1]
                              }}
                              transition={{ duration: 0.6 }}
                            >
                              {item.icon}
                            </motion.span>
                            <span className="text-lg font-heading font-bold text-luxury-cream">
                              {item.name}
                            </span>
                          </div>
                          <motion.div
                            className="text-luxury-gold"
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            →
                          </motion.div>
                        </Link>
                      </motion.div>

                      {/* Submenu Items */}
                      <AnimatePresence>
                        {activeSubmenu === item.name && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="ml-6 space-y-1"
                          >
                            {item.submenu.map((subItem, subIndex) => (
                              <motion.div
                                key={subItem.name}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: subIndex * 0.1 }}
                              >
                                <Link
                                  href={subItem.href}
                                  onClick={() => setIsOpen(false)}
                                  className="flex items-center space-x-3 p-3 rounded-xl hover:bg-luxury-gold/10 transition-all duration-300 group"
                                >
                                  <motion.span 
                                    className="text-lg"
                                    whileHover={{ scale: 1.2, rotate: 5 }}
                                  >
                                    {subItem.icon}
                                  </motion.span>
                                  <span className="text-luxury-cream/80 group-hover:text-luxury-gold font-medium transition-colors">
                                    {subItem.name}
                                  </span>
                                </Link>
                              </motion.div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* CTA Section - Dramatically Enhanced */}
              <motion.div 
                className="p-6 bg-gradient-to-r from-luxury-charcoal/50 to-luxury-royal/10 border-t border-luxury-gold/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div className="space-y-4">
                  <Link href="/quiz" onClick={() => setIsOpen(false)}>
                    <motion.button 
                      className="w-full bg-gradient-to-r from-luxury-gold to-luxury-amber text-luxury-charcoal font-bold py-4 px-6 rounded-2xl shadow-lg shadow-luxury-gold/30 hover:shadow-luxury-gold/50 transition-all duration-300 group"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.span 
                        className="flex items-center justify-center space-x-2"
                        whileHover={{ x: 2 }}
                      >
                        <span>🎯</span>
                        <span>Take the Quiz</span>
                        <motion.span
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          →
                        </motion.span>
                      </motion.span>
                    </motion.button>
                  </Link>
                  
                  <Link href="/contact" onClick={() => setIsOpen(false)}>
                    <motion.button 
                      className="w-full border-2 border-luxury-gold/50 text-luxury-gold font-semibold py-4 px-6 rounded-2xl hover:bg-luxury-gold/10 hover:border-luxury-gold transition-all duration-300 group"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.span 
                        className="flex items-center justify-center space-x-2"
                        whileHover={{ x: 2 }}
                      >
                        <span>📞</span>
                        <span>Contact Us</span>
                      </motion.span>
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
