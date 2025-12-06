'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Navigation } from './Navigation'
import { AISearchBar } from '@/components/search/AISearchBar'

export function Header() {
  const [showSearch, setShowSearch] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 50)
  })

  return (
    <motion.header
      className="sticky top-0 z-50 glass-medium border-b border-luxury-gold/20"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <Container>
        <div className="flex items-center justify-between h-16 gap-2">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 min-w-0 group">
            <motion.div
              className="w-8 h-8 bg-luxury-gold rounded-full flex items-center justify-center"
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-luxury-charcoal font-heading font-bold text-lg">S</span>
            </motion.div>
            <motion.span
              className="hidden sm:inline text-xl font-heading font-semibold text-luxury-cream truncate"
              whileHover={{ scale: 1.05 }}
            >
              Sanaya's Scents
            </motion.span>
          </Link>

          {/* Unified Navigation (desktop + mobile inline) */}
          <div className="flex-1 px-2 md:px-4 min-w-0">
            <Navigation />
          </div>

          {/* Search Toggle & CTA */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Search Button */}
            <motion.button
              onClick={() => setShowSearch(!showSearch)}
              className="p-2 glass-light rounded-lg transition-all"
              title="AI Search"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5 text-luxury-gold"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </motion.button>

            {/* CTA Button */}
            <div className="hidden md:flex">
              <Link href="/quiz">
                <Button variant="premium" size="sm" className="whitespace-nowrap" magnetic>
                  Start Your Journey
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Search Bar Dropdown */}
        <AnimatePresence>
          {showSearch && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pb-4 pt-2">
                <AISearchBar />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </motion.header>
  )
}