'use client'

import { motion } from 'framer-motion'

export function ClientParticles404() {
  return (
    <>
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-luxury-gold/15"
          style={{ width: 12 + i * 4, height: 12 + i * 4, top: `${10 + i * 6}%`, left: `${5 + i * 7}%` }}
          animate={{ y: [-20, 20, -20], opacity: [0.2, 0.6, 0.2], scale: [1, 1.2, 1] }}
          transition={{ duration: 6 + i, repeat: Infinity, ease: 'easeInOut' }}
        />)
      )}
    </>
  )
}


