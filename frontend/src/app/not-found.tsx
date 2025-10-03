'use client'

import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { motion } from 'framer-motion'

export const metadata = {
  title: 'Page Not Found',
  description: "We couldn't find the page you're looking for.",
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-luxury-charcoal relative overflow-hidden">
      {/* Floating particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-luxury-gold/15"
          style={{ width: 12 + i * 4, height: 12 + i * 4, top: `${10 + i * 6}%`, left: `${5 + i * 7}%` }}
          animate={{ y: [-20, 20, -20], opacity: [0.2, 0.6, 0.2], scale: [1, 1.2, 1] }}
          transition={{ duration: 6 + i, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      <Container className="py-24 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <motion.h1
            className="text-8xl md:text-9xl font-heading font-bold text-luxury-cream mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="bg-gradient-to-r from-luxury-gold via-luxury-amber to-luxury-gold bg-clip-text text-transparent">
              404
            </span>
          </motion.h1>
          <motion.p
            className="text-xl text-luxury-cream/70 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            The page you’re looking for has drifted into the ether. Let’s guide you back to something delightful.
          </motion.p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/">
              <Button size="lg" className="px-10">Go Home</Button>
            </Link>
            <Link href="/collections">
              <Button variant="outline" size="lg" className="px-10">Explore Collections</Button>
            </Link>
            <Link href="/quiz">
              <Button variant="ghost" size="lg" className="px-10">Find Your Scent</Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  )
}


