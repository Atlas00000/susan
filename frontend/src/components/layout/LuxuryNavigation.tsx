'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface LuxuryNavigationProps {
  className?: string
}

export function LuxuryNavigation({ className }: LuxuryNavigationProps) {
  const [activeItem, setActiveItem] = useState<string | null>(null)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  const navigationItems = [
    {
      name: 'Collections',
      href: '/collections',
      icon: '🌸',
      description: 'Explore our curated fragrance collections',
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
      description: 'Find your perfect scent match',
      submenu: [
        { name: 'Scent Discovery Quiz', href: '/quiz', icon: '🎯' },
        { name: 'Fragrance Guide', href: '/guide', icon: '📖' },
        { name: 'Featured Products', href: '/#featured', icon: '⭐' },
      ]
    },
    {
      name: 'About',
      href: '/about',
      icon: '💎',
      description: 'Learn about our luxury brand',
      submenu: [
        { name: 'Our Story', href: '/about', icon: '📜' },
        { name: 'Contact Us', href: '/contact', icon: '📞' },
        { name: 'Careers', href: '/careers', icon: '💼' },
      ]
    },
  ]

  return (
    <nav className={cn('hidden lg:flex items-center space-x-2', className)}>
      {navigationItems.map((item, index) => (
        <motion.div
          key={item.name}
          className="relative group"
          onMouseEnter={() => {
            setActiveItem(item.name)
            setHoveredItem(item.name)
          }}
          onMouseLeave={() => {
            setActiveItem(null)
            setHoveredItem(null)
          }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          {/* Main Navigation Link */}
          <Link
            href={item.href}
            className="relative flex items-center space-x-2 px-4 py-3 rounded-xl transition-all duration-300 group-hover:bg-luxury-gold/10 group-hover:scale-105"
          >
            {/* Icon */}
            <motion.span 
              className="text-lg"
              animate={hoveredItem === item.name ? { 
                rotate: [0, -10, 10, 0],
                scale: [1, 1.2, 1]
              } : {}}
              transition={{ duration: 0.6 }}
            >
              {item.icon}
            </motion.span>
            
            {/* Text */}
            <motion.span 
              className="font-semibold text-luxury-cream/90 group-hover:text-luxury-gold transition-colors duration-300"
              whileHover={{ x: 2 }}
            >
              {item.name}
            </motion.span>
            
            {/* Hover indicator */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-luxury-gold to-luxury-amber rounded-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: hoveredItem === item.name ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />
          </Link>
          
          {/* Mega Dropdown Menu */}
          <AnimatePresence>
            {activeItem === item.name && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute top-full left-0 mt-2 w-80 bg-luxury-charcoal/98 backdrop-blur-xl border border-luxury-gold/30 rounded-2xl shadow-2xl shadow-luxury-gold/20 z-50 overflow-hidden"
              >
                {/* Header */}
                <div className="p-6 bg-gradient-to-r from-luxury-gold/10 to-luxury-amber/10 border-b border-luxury-gold/20">
                  <div className="flex items-center space-x-3">
                    <motion.span 
                      className="text-2xl"
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      {item.icon}
                    </motion.span>
                    <div>
                      <h3 className="text-lg font-heading font-bold text-luxury-cream">
                        {item.name}
                      </h3>
                      <p className="text-sm text-luxury-cream/70">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Menu Items */}
                <div className="p-4">
                  {item.submenu.map((subItem, subIndex) => (
                    <motion.div
                      key={subItem.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: subIndex * 0.1 }}
                    >
                      <Link
                        href={subItem.href}
                        className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-luxury-gold/10 transition-all duration-300 group"
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
                        <motion.div
                          className="ml-auto opacity-0 group-hover:opacity-100"
                          whileHover={{ x: 5 }}
                        >
                          →
                        </motion.div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
                
                {/* Footer */}
                <div className="p-4 bg-gradient-to-r from-luxury-charcoal/50 to-luxury-royal/10 border-t border-luxury-gold/20">
                  <motion.div
                    className="text-center"
                    animate={{ 
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <span className="text-xs text-luxury-gold/60 font-medium">
                      ✨ Luxury Fragrances ✨
                    </span>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </nav>
  )
}
