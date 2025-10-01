'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface NavigationProps {
  className?: string
}

export function Navigation({ className }: NavigationProps) {
  const [activeItem, setActiveItem] = useState<string | null>(null)

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
    <nav className={cn('hidden lg:flex items-center space-x-8', className)}>
      {navigationItems.map((item) => (
        <div
          key={item.name}
          className="relative group"
          onMouseEnter={() => setActiveItem(item.name)}
          onMouseLeave={() => setActiveItem(null)}
        >
          <Link
            href={item.href}
            className="text-luxury-cream/80 hover:text-luxury-gold transition-colors duration-200 font-medium"
          >
            {item.name}
          </Link>
          
          {/* Dropdown Menu */}
          {activeItem === item.name && (
            <div className="absolute top-full left-0 mt-2 w-48 bg-luxury-charcoal/95 backdrop-blur-md border border-luxury-gold/20 rounded-lg shadow-xl z-50">
              <div className="py-2">
                {item.submenu.map((subItem) => (
                  <Link
                    key={subItem.name}
                    href={subItem.href}
                    className="block px-4 py-2 text-sm text-luxury-cream/80 hover:text-luxury-gold hover:bg-luxury-gold/10 transition-colors"
                  >
                    {subItem.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </nav>
  )
}
