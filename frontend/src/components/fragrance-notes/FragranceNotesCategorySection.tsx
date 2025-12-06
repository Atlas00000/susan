'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { FragranceNoteCard } from './FragranceNoteCard'

interface FragranceNote {
  name: string
  intensity: number
  description: string
}

interface FragranceCategory {
  key: string
  title: string
  description: string
  notes: FragranceNote[]
}

interface FragranceNotesCategorySectionProps {
  category: FragranceCategory
  categoryIndex: number
  selectedCategory: string | null
  activeNote: string | null
  onNoteSelect: (name: string) => void
  isInView: boolean
}

export function FragranceNotesCategorySection({
  category,
  categoryIndex,
  selectedCategory,
  activeNote,
  onNoteSelect,
  isInView,
}: FragranceNotesCategorySectionProps) {
  const isVisible = selectedCategory === null || selectedCategory === category.key

  const getGradient = () => {
    if (category.key === 'top') return 'from-luxury-gold/20 to-luxury-amber/20'
    if (category.key === 'heart') return 'from-luxury-royal/20 to-luxury-gold/20'
    return 'from-luxury-amber/20 to-luxury-royal/20'
  }

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 50 }}
      animate={{
        opacity: isVisible ? 1 : 0.3,
        scale: isVisible ? 1 : 0.95,
        y: isVisible ? 0 : 20,
      }}
      transition={{ duration: 0.5 }}
    >
      {/* Category Header */}
      <div className="text-center mb-12">
        <motion.div
          className="inline-block p-6 md:p-8 rounded-[2.5rem] bg-gradient-to-br backdrop-blur-xl border border-luxury-gold/30 transition-all duration-500"
          animate={{
            scale: selectedCategory === category.key ? [1, 1.02, 1] : 1,
            boxShadow:
              selectedCategory === category.key
                ? '0 0 30px rgba(212, 175, 55, 0.3)'
                : '0 0 0px rgba(212, 175, 55, 0)',
          }}
          transition={{ duration: 2, repeat: selectedCategory === category.key ? Infinity : 0 }}
        >
          {/* Animated background */}
          <motion.div
            className={`absolute inset-0 bg-gradient-to-br ${getGradient()} rounded-[2.5rem]`}
            animate={{
              opacity: selectedCategory === category.key ? [0.3, 0.5, 0.3] : 0.2,
            }}
            transition={{
              duration: 3,
              repeat: selectedCategory === category.key ? Infinity : 0,
              ease: 'easeInOut',
            }}
          />

          <div className="relative z-10">
            <motion.h3
              className="text-2xl md:text-3xl font-heading font-bold text-luxury-cream mb-4"
              animate={{
                color: selectedCategory === category.key ? '#D4AF37' : '#F5F5DC',
              }}
              transition={{ duration: 0.3 }}
            >
              {category.title}
            </motion.h3>
            <p className="text-luxury-cream/70 text-base md:text-lg leading-relaxed">
              {category.description}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnimatePresence mode="wait">
          {category.notes.map((note, noteIndex) => (
            <FragranceNoteCard
              key={note.name}
              note={note}
              categoryKey={category.key}
              categoryIndex={categoryIndex}
              noteIndex={noteIndex}
              isSelected={activeNote === note.name}
              onSelect={onNoteSelect}
              isInView={isInView && isVisible}
            />
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

