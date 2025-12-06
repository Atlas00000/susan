'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface NavigationProps {
  className?: string
}

export function Navigation({ className }: NavigationProps) {
  const [activeItem, setActiveItem] = useState<string | null>(null)
  const pathname = usePathname()

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
        { name: 'All Products', href: '/products' },
      ]
    },
    {
      name: 'About',
      href: '/about',
      submenu: [
        { name: 'Our Story', href: '/about' },
        { name: 'Contact Us', href: '/contact' },
      ]
    },
  ]

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname?.startsWith(href)
  }

  return (
    <nav className={cn('w-full', className)}>
      {/* Mobile dropdown */}
      <div className="md:hidden">
        <nav className="flex items-center justify-between gap-2">
          {navigationItems.map((item) => {
            const active = isActive(item.href)
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex-1 text-center px-3 py-2 rounded-lg border transition-all duration-300 text-sm font-medium relative',
                  active
                    ? 'border-luxury-gold bg-luxury-gold/10 text-luxury-gold'
                    : 'border-luxury-gold/40 text-luxury-cream hover:text-luxury-gold hover:border-luxury-gold hover:bg-luxury-gold/5'
                )}
              >
                {item.name}
                {active && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-luxury-gold"
                    layoutId="mobile-active-indicator"
                    initial={false}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  />
                )}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Desktop / tablet inline nav */}
      <div className="hidden md:flex items-center gap-8">
        {navigationItems.map((item) => {
          const active = isActive(item.href)
          return (
            <div
              key={item.name}
              className="relative group"
              onMouseEnter={() => setActiveItem(item.name)}
              onMouseLeave={() => setActiveItem(null)}
            >
              <Link
                href={item.href}
                className={cn(
                  'relative text-base font-medium transition-all duration-300',
                  'px-2 py-1',
                  active
                    ? 'text-luxury-gold'
                    : 'text-luxury-cream/80 hover:text-luxury-gold'
                )}
              >
                {item.name}
                
                {/* Active indicator */}
                {active && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-luxury-gold rounded-full"
                    layoutId="desktop-active-indicator"
                    initial={false}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  />
                )}

                {/* Hover indicator */}
                {!active && activeItem === item.name && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-luxury-gold/50 rounded-full"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    exit={{ scaleX: 0 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </Link>
              
              {/* Dropdown Menu */}
              <AnimatePresence>
                {activeItem === item.name && (
                  <motion.div
                    className="absolute top-full left-0 mt-2 w-56 glass-premium border border-luxury-gold/30 rounded-xl shadow-glass z-50"
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                  >
                    <div className="py-2">
                      {item.submenu.map((subItem, index) => {
                        const subActive = isActive(subItem.href)
                        return (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className={cn(
                              'block px-4 py-2.5 text-sm transition-all duration-200 relative',
                              subActive
                                ? 'text-luxury-gold bg-luxury-gold/10 font-medium'
                                : 'text-luxury-cream/80 hover:text-luxury-gold hover:bg-luxury-gold/10'
                            )}
                          >
                            <motion.span
                              initial={{ x: -10, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: index * 0.05 }}
                            >
                              {subItem.name}
                            </motion.span>
                            {subActive && (
                              <motion.div
                                className="absolute left-0 top-0 bottom-0 w-1 bg-luxury-gold rounded-r-full"
                                layoutId="submenu-active-indicator"
                                initial={false}
                                transition={{ duration: 0.2 }}
                              />
                            )}
                          </Link>
                        )
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </nav>
  )
}
