'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { StaggerContainer } from '@/components/animations/StaggerContainer'

export function Footer() {
  const footerLinks = {
    shop: [
      { name: 'All Collections', href: '/collections' },
      { name: 'Oud & Rich', href: '/collections/oud-rich' },
      { name: 'Amber & Gold', href: '/collections/amber-gold' },
      { name: 'Floral & Fresh', href: '/collections/floral-fresh' },
    ],
    discover: [
      { name: 'Scent Quiz', href: '/quiz' },
      { name: 'Our Story', href: '/about' },
      { name: 'Fragrance Guide', href: '/guide' },
      { name: 'Gift Guide', href: '/gifts' },
    ],
    support: [
      { name: 'Contact Us', href: '/contact' },
      { name: 'Shipping Info', href: '/shipping' },
      { name: 'Returns', href: '/returns' },
      { name: 'FAQ', href: '/faq' },
    ],
  }

  return (
    <footer className="bg-luxury-charcoal border-t border-luxury-gold/20 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 particles-gold opacity-30" />
      
      <Container>
        <div className="py-16 relative z-10">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Brand */}
            <motion.div className="md:col-span-1">
              <Link href="/" className="flex items-center space-x-2 mb-6 group">
                <motion.div
                  className="w-10 h-10 bg-luxury-gold rounded-full flex items-center justify-center glow-premium"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="text-luxury-charcoal font-heading font-bold text-xl">S</span>
                </motion.div>
                <span className="text-2xl font-heading font-semibold luxury-text-gradient">
                  Sanaya's Scents
                </span>
              </Link>
              <p className="text-luxury-cream/70 text-sm leading-relaxed">
                Discover your signature scent through our curated collection of luxury fragrances. 
                Your scent is your story.
              </p>
            </motion.div>

            {/* Shop */}
            <div>
              <h3 className="text-luxury-cream font-heading font-semibold mb-6 text-lg">
                Shop
              </h3>
              <ul className="space-y-3">
                {footerLinks.shop.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-luxury-cream/70 hover:text-luxury-gold transition-all duration-300 text-sm group flex items-center gap-2"
                    >
                      <span className="w-0 group-hover:w-2 h-0.5 bg-luxury-gold transition-all duration-300" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Discover */}
            <div>
              <h3 className="text-luxury-cream font-heading font-semibold mb-6 text-lg">
                Discover
              </h3>
              <ul className="space-y-3">
                {footerLinks.discover.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-luxury-cream/70 hover:text-luxury-gold transition-all duration-300 text-sm group flex items-center gap-2"
                    >
                      <span className="w-0 group-hover:w-2 h-0.5 bg-luxury-gold transition-all duration-300" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-luxury-cream font-heading font-semibold mb-6 text-lg">
                Support
              </h3>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-luxury-cream/70 hover:text-luxury-gold transition-all duration-300 text-sm group flex items-center gap-2"
                    >
                      <span className="w-0 group-hover:w-2 h-0.5 bg-luxury-gold transition-all duration-300" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </StaggerContainer>

          {/* Newsletter */}
          <motion.div
            className="mt-16 pt-12 border-t border-luxury-gold/20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="max-w-md">
              <h3 className="text-luxury-cream font-heading font-semibold mb-2 text-xl">
                Stay in the Scent
              </h3>
              <p className="text-luxury-cream/70 text-sm mb-6">
                Get exclusive access to new collections and scent stories.
              </p>
              <form className="flex gap-3">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1"
                />
                <Button variant="premium" type="submit" magnetic>
                  Subscribe
                </Button>
              </form>
            </div>
          </motion.div>

          {/* Copyright */}
          <motion.div
            className="mt-12 pt-8 border-t border-luxury-gold/20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-luxury-cream/50 text-sm">
                © 2024 Sanaya's Scents. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <Link
                  href="/privacy"
                  className="text-luxury-cream/50 hover:text-luxury-gold text-sm transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms"
                  className="text-luxury-cream/50 hover:text-luxury-gold text-sm transition-colors"
                >
                  Terms of Service
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </footer>
  )
}
