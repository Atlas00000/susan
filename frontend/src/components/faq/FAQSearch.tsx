'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Input } from '@/components/ui/Input'

interface FAQSearchProps {
  onSearch: (query: string) => void
  className?: string
}

export function FAQSearch({ onSearch, className }: FAQSearchProps) {
  const [query, setQuery] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(searchRef, { once: true, amount: 0.3 })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    onSearch(value)
  }

  return (
    <motion.div
      ref={searchRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={`mb-12 ${className || ''}`}
    >
      <motion.div
        className="relative max-w-2xl mx-auto"
        animate={{
          scale: isFocused ? 1.02 : 1,
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative bg-luxury-charcoal/70 backdrop-blur-xl border border-luxury-gold/20 rounded-[2rem] p-4 md:p-6 overflow-hidden">
          {/* Animated gradient background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-luxury-gold/10 via-luxury-amber/5 to-luxury-gold/10 opacity-0"
            animate={{
              opacity: isFocused ? 0.15 : 0,
            }}
            transition={{ duration: 0.4 }}
          />

          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-luxury-gold/20 to-transparent"
            animate={{
              x: isFocused ? ['-100%', '200%'] : '-100%',
            }}
            transition={{
              duration: 1.5,
              repeat: isFocused ? Infinity : 0,
              ease: 'linear',
            }}
          />

          {/* Search Input */}
          <div className="relative z-10 flex items-center gap-4">
            <motion.div
              className="w-6 h-6 md:w-7 md:h-7 text-luxury-gold flex-shrink-0"
              animate={{
                scale: isFocused ? [1, 1.1, 1] : 1,
                rotate: isFocused ? [0, 5, -5, 0] : 0,
              }}
              transition={{
                duration: 2,
                repeat: isFocused ? Infinity : 0,
                ease: 'easeInOut',
              }}
            >
              <svg
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                className="w-full h-full"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </motion.div>

            <Input
              type="text"
              value={query}
              onChange={handleChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Search for answers..."
              className="flex-1 bg-transparent border-none focus:ring-0 text-luxury-cream placeholder-luxury-cream/50 text-base md:text-lg"
            />

            {query && (
              <motion.button
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                onClick={() => {
                  setQuery('')
                  onSearch('')
                }}
                className="w-6 h-6 md:w-7 md:h-7 text-luxury-cream/50 hover:text-luxury-gold transition-colors flex-shrink-0"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </motion.button>
            )}
          </div>

          {/* Glowing border effect */}
          <motion.div
            className="absolute inset-0 rounded-[2rem] border-2 border-luxury-gold/20 pointer-events-none"
            animate={{
              opacity: isFocused ? [0.3, 0.9, 0.3] : 0.3,
            }}
            transition={{
              duration: 2,
              repeat: isFocused ? Infinity : 0,
              ease: 'easeInOut',
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  )
}

