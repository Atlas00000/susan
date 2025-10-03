'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { LuxuryNavigation } from './LuxuryNavigation'
import { LuxuryMobileNavigation } from './LuxuryMobileNavigation'

export function LuxuryHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { scrollY } = useScroll()
  
  const headerOpacity = useTransform(scrollY, [0, 100], [0.95, 0.98])
  const headerBlur = useTransform(scrollY, [0, 100], [8, 16])

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
        style={{ 
          backdropFilter: `blur(${headerBlur}px)`,
          opacity: headerOpacity
        }}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-20 -right-20 w-40 h-40 bg-luxury-gold/5 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute -bottom-10 -left-10 w-32 h-32 bg-luxury-royal/10 rounded-full blur-2xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
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
                <motion.div 
                  className="relative w-12 h-12 bg-gradient-to-br from-luxury-gold via-luxury-amber to-luxury-gold rounded-2xl flex items-center justify-center shadow-lg shadow-luxury-gold/30"
                  whileHover={{ 
                    rotate: [0, -5, 5, 0],
                    scale: 1.1
                  }}
                  transition={{ duration: 0.6 }}
                >
                  <motion.span 
                    className="text-luxury-charcoal font-heading font-black text-xl"
                    animate={{ 
                      textShadow: [
                        "0 0 0px rgba(212, 175, 55, 0)",
                        "0 0 10px rgba(212, 175, 55, 0.5)",
                        "0 0 0px rgba(212, 175, 55, 0)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    S
                  </motion.span>
                  
                  {/* Glowing ring */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl border-2 border-luxury-gold/50"
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>
                
                {/* Brand Name with Gradient Text */}
                <div className="flex flex-col">
                  <motion.span 
                    className="text-2xl font-heading font-black bg-gradient-to-r from-luxury-gold via-luxury-amber to-luxury-gold bg-clip-text text-transparent"
                    whileHover={{ scale: 1.05 }}
                  >
                    Sanaya's
                  </motion.span>
                  <motion.span 
                    className="text-sm font-medium text-luxury-cream/80 -mt-1"
                    whileHover={{ x: 5 }}
                  >
                    Scents
                  </motion.span>
                </div>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <LuxuryNavigation />

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
                    <motion.span 
                      className="relative z-10 font-semibold"
                      whileHover={{ x: 2 }}
                    >
                      Start Your Journey
                    </motion.span>
                    
                    {/* Animated background */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-luxury-gold/20 to-luxury-amber/20"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '0%' }}
                      transition={{ duration: 0.3 }}
                    />
                  </Button>
                </Link>
              </motion.div>
            </div>

            {/* Mobile Navigation */}
            <LuxuryMobileNavigation />
          </div>
        </Container>

        {/* Animated Border */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-luxury-gold/50 to-transparent"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.header>

      {/* Spacer for fixed header */}
      <div className="h-20" />
    </>
  )
}
