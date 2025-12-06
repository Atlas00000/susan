'use client'

import { motion } from 'framer-motion'

interface FragranceNoteCategory {
  key: string
  title: string
  description: string
  color: string
}

interface FragranceNoteCategoryProps {
  categories: FragranceNoteCategory[]
  selectedCategory: string | null
  onSelect: (key: string) => void
  className?: string
}

export function FragranceNoteCategory({
  categories,
  selectedCategory,
  onSelect,
  className,
}: FragranceNoteCategoryProps) {
  return (
    <div className={`flex justify-center mb-16 ${className || ''}`}>
      <div className="flex flex-wrap justify-center gap-3 bg-luxury-charcoal/60 backdrop-blur-xl border border-luxury-gold/20 rounded-[2rem] p-3">
        {categories.map((category) => {
          const isSelected = selectedCategory === category.key
          return (
            <motion.button
              key={category.key}
              onClick={() => onSelect(category.key)}
              className="relative group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className={`relative px-6 md:px-8 py-3 md:py-4 rounded-[1.5rem] font-semibold text-sm md:text-base transition-all duration-300 overflow-hidden ${
                  isSelected
                    ? 'bg-luxury-gold text-luxury-charcoal'
                    : 'text-luxury-cream hover:bg-luxury-gold/20'
                }`}
                animate={{
                  boxShadow: isSelected
                    ? '0 10px 30px rgba(212, 175, 55, 0.4), 0 0 20px rgba(212, 175, 55, 0.2)'
                    : '0 0 0px rgba(212, 175, 55, 0)',
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Shimmer effect for selected */}
                {isSelected && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{
                      x: ['-100%', '200%'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  />
                )}

                <span className="relative z-10">{category.title}</span>

                {/* Glow effect */}
                {isSelected && (
                  <motion.div
                    className="absolute -inset-1 bg-luxury-gold/30 rounded-[1.5rem] blur-md"
                    animate={{
                      opacity: [0.5, 0.8, 0.5],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                )}
              </motion.div>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}

