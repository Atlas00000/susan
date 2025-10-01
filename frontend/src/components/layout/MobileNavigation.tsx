'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

interface MobileNavigationProps {
  className?: string
}

export function MobileNavigation({ className }: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false)

  const navigationItems = [
    {
      name: 'Collections',
      href: '/collections',
      submenu: [
        { name: 'All Collections', href: '/collections' },
        { name: 'Oud & Rich', href: '/collections/oud-rich' },
        { name: 'Amber & Gold', href: '/collections/amber-gold' },
        { name: 'Floral & Fresh', href: '/collections/floral-fresh' },
        { name: 'Gourmand & Unique', href: '/collections/gourmand-unique' },
        { name: 'Signature Editions', href: '/collections/signature' },
      ]
    },
    {
      name: 'Discover',
      href: '/quiz',
      submenu: [
        { name: 'Scent Discovery Quiz', href: '/quiz' },
        { name: 'Fragrance Guide', href: '/guide' },
        { name: 'Featured Products', href: '/#featured' },
      ]
    },
    {
      name: 'About',
      href: '/about',
      submenu: [
        { name: 'Our Story', href: '/about' },
        { name: 'Contact Us', href: '/contact' },
        { name: 'Careers', href: '/careers' },
      ]
    },
  ]

  return (
    <div className={cn('lg:hidden', className)}>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-luxury-cream/80 hover:text-luxury-gold transition-colors duration-200"
        aria-label="Toggle mobile menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-luxury-charcoal/50 backdrop-blur-sm z-40"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="fixed top-0 right-0 h-full w-80 bg-luxury-charcoal border-l border-luxury-gold/20 z-50 overflow-y-auto"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-xl font-heading font-bold text-luxury-cream">
                    Menu
                  </h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-luxury-cream/80 hover:text-luxury-gold transition-colors"
                    aria-label="Close menu"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Navigation Items */}
                <nav className="space-y-6">
                  {navigationItems.map((item) => (
                    <div key={item.name} className="space-y-2">
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="block text-lg font-heading font-semibold text-luxury-cream hover:text-luxury-gold transition-colors"
                      >
                        {item.name}
                      </Link>
                      <div className="pl-4 space-y-1">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            onClick={() => setIsOpen(false)}
                            className="block text-sm text-luxury-cream/70 hover:text-luxury-gold transition-colors"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </nav>

                {/* CTA Buttons */}
                <div className="mt-8 pt-6 border-t border-luxury-gold/20">
                  <div className="space-y-3">
                    <Link href="/quiz" onClick={() => setIsOpen(false)}>
                      <button className="w-full bg-luxury-gold text-luxury-charcoal font-medium py-3 px-4 rounded-lg hover:bg-luxury-gold/90 transition-colors">
                        Take the Quiz
                      </button>
                    </Link>
                    <Link href="/contact" onClick={() => setIsOpen(false)}>
                      <button className="w-full border border-luxury-gold text-luxury-gold font-medium py-3 px-4 rounded-lg hover:bg-luxury-gold/10 transition-colors">
                        Contact Us
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
