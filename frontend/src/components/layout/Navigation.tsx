'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'

interface NavigationProps {
  className?: string
}

export function Navigation({ className }: NavigationProps) {
  const [activeItem, setActiveItem] = useState<string | null>(null)
  const router = useRouter()

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

  return (
    <nav className={cn('w-full', className)}>
      {/* Mobile dropdown */}
      <div className="md:hidden">
        <nav className="flex items-center justify-between gap-2">
          <Link
            href="/collections"
            className="flex-1 text-center px-3 py-2 rounded-lg border border-luxury-gold/40 text-luxury-cream hover:text-luxury-gold hover:border-luxury-gold transition-colors text-sm"
          >
            Collections
          </Link>
          <Link
            href="/quiz"
            className="flex-1 text-center px-3 py-2 rounded-lg border border-luxury-gold/40 text-luxury-cream hover:text-luxury-gold hover:border-luxury-gold transition-colors text-sm"
          >
            Discovery
          </Link>
          <Link
            href="/about"
            className="flex-1 text-center px-3 py-2 rounded-lg border border-luxury-gold/40 text-luxury-cream hover:text-luxury-gold hover:border-luxury-gold transition-colors text-sm"
          >
            About
          </Link>
        </nav>
      </div>

      {/* Desktop / tablet inline nav */}
      <div className="hidden md:flex items-center gap-8">
      {navigationItems.map((item) => (
        <div
          key={item.name}
          className="relative group"
          onMouseEnter={() => setActiveItem(item.name)}
          onMouseLeave={() => setActiveItem(null)}
        >
          <Link
            href={item.href}
            className="text-base text-luxury-cream/80 hover:text-luxury-gold transition-colors duration-200 font-medium"
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
      </div>
    </nav>
  )
}
