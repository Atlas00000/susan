'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { SimpleLuxuryNavigation } from './SimpleLuxuryNavigation'
import { SimpleLuxuryMobileNavigation } from './SimpleLuxuryMobileNavigation'

export function SimpleLuxuryHeader() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-luxury-charcoal/98 backdrop-blur-xl border-b border-luxury-gold/30 shadow-2xl shadow-luxury-gold/10' 
            : 'bg-gradient-to-r from-luxury-charcoal/90 via-luxury-royal/20 to-luxury-charcoal/90 backdrop-blur-md'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-luxury-gold/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-luxury-royal/10 rounded-full blur-2xl animate-pulse" />
        </div>

        <Container>
          <div className="flex items-center justify-between h-20">
            {/* Logo Section - Dramatically Enhanced */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/" className="flex items-center space-x-3 group">
                {/* Animated Logo */}
                <div className="relative w-12 h-12 bg-gradient-to-br from-luxury-gold via-luxury-amber to-luxury-gold rounded-2xl flex items-center justify-center shadow-lg shadow-luxury-gold/30 group-hover:shadow-luxury-gold/50 transition-all duration-300">
                  <span className="text-luxury-charcoal font-heading font-black text-xl group-hover:scale-110 transition-transform duration-300">
                    S
                  </span>
                  
                  {/* Glowing ring */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-luxury-gold/50 group-hover:border-luxury-gold transition-colors duration-300" />
                </div>
                
                {/* Brand Name with Gradient Text */}
                <div className="flex flex-col">
                  <span className="text-2xl font-heading font-black bg-gradient-to-r from-luxury-gold via-luxury-amber to-luxury-gold bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
                    Sanaya's
                  </span>
                  <span className="text-sm font-medium text-luxury-cream/80 -mt-1 group-hover:text-luxury-gold transition-colors duration-300">
                    Scents
                  </span>
                </div>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <SimpleLuxuryNavigation />

            {/* CTA Section - Dramatically Enhanced */}
            <div className="hidden lg:flex items-center space-x-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/quiz">
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="relative overflow-hidden group bg-gradient-to-r from-luxury-gold/10 to-luxury-amber/10 border-luxury-gold/50 hover:border-luxury-gold hover:bg-gradient-to-r hover:from-luxury-gold/20 hover:to-luxury-amber/20 transition-all duration-300"
                  >
                    <span className="relative z-10 font-semibold group-hover:translate-x-1 transition-transform duration-300">
                      Start Your Journey
                    </span>
                  </Button>
                </Link>
              </motion.div>
            </div>

            {/* Mobile Navigation */}
            <SimpleLuxuryMobileNavigation />
          </div>
        </Container>

        {/* Animated Border */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-luxury-gold/50 to-transparent animate-pulse" />
      </motion.header>

      {/* Spacer for fixed header */}
      <div className="h-20" />
    </>
  )
}
