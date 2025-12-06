'use client'

import { useState, useEffect, useRef } from 'react'
import { useInView } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { FragranceNotesHeader } from '@/components/fragrance-notes/FragranceNotesHeader'
import { FragranceNotesBackground } from '@/components/fragrance-notes/FragranceNotesBackground'
import { FragranceNoteCategory } from '@/components/fragrance-notes/FragranceNoteCategory'
import { FragranceNotesCategorySection } from '@/components/fragrance-notes/FragranceNotesCategorySection'
import { FragranceNotesCTA } from '@/components/fragrance-notes/FragranceNotesCTA'

const fragranceNotes = {
  top: {
    title: 'Top Notes',
    description: 'The first impression that greets you',
    notes: [
      { name: 'Bergamot', intensity: 90, description: 'Fresh and citrusy' },
      { name: 'Lemon', intensity: 85, description: 'Bright and energizing' },
      { name: 'Pink Pepper', intensity: 80, description: 'Spicy and warm' },
      { name: 'Green Apple', intensity: 75, description: 'Crisp and refreshing' },
    ],
  },
  heart: {
    title: 'Heart Notes',
    description: 'The soul of the fragrance that develops over time',
    notes: [
      { name: 'Rose', intensity: 95, description: 'Romantic and elegant' },
      { name: 'Jasmine', intensity: 90, description: 'Intoxicating and floral' },
      { name: 'Lily of the Valley', intensity: 85, description: 'Delicate and fresh' },
      { name: 'Peony', intensity: 80, description: 'Soft and feminine' },
    ],
  },
  base: {
    title: 'Base Notes',
    description: 'The foundation that lingers and creates lasting memories',
    notes: [
      { name: 'Sandalwood', intensity: 100, description: 'Warm and woody' },
      { name: 'Vanilla', intensity: 95, description: 'Sweet and comforting' },
      { name: 'Amber', intensity: 90, description: 'Rich and resinous' },
      { name: 'Musk', intensity: 85, description: 'Animalic and sensual' },
    ],
  },
}

export function InteractiveFragranceNotes() {
  const [activeNote, setActiveNote] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.1 })

  // Auto-rotate through categories
  useEffect(() => {
    if (isPlaying) return

    const interval = setInterval(() => {
        const categories = Object.keys(fragranceNotes)
        const currentIndex = categories.indexOf(selectedCategory || 'top')
        const nextIndex = (currentIndex + 1) % categories.length
        setSelectedCategory(categories[nextIndex] ?? 'top')
    }, 4000)

    return () => clearInterval(interval)
  }, [selectedCategory, isPlaying])

  const handleCategorySelect = (key: string) => {
    setSelectedCategory(key)
    setIsPlaying(true)
    setActiveNote(null)
  }

  const handleNoteSelect = (name: string) => {
    setActiveNote(activeNote === name ? null : name)
  }

  const categories = Object.entries(fragranceNotes).map(([key, category]) => ({
    key,
    title: category.title,
    description: category.description,
    color: key === 'top' ? 'from-luxury-gold to-luxury-amber' : key === 'heart' ? 'from-luxury-royal to-luxury-gold' : 'from-luxury-amber to-luxury-royal',
  }))

  return (
    <section
      ref={containerRef}
      className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-br from-luxury-charcoal via-luxury-gold/5 to-luxury-charcoal"
    >
      {/* Animated Background */}
      <FragranceNotesBackground />

      {/* Content Container */}
      <Container className="relative z-10">
        {/* Header */}
        <FragranceNotesHeader />

        {/* Category Selector */}
        <FragranceNoteCategory
          categories={categories}
          selectedCategory={selectedCategory}
          onSelect={handleCategorySelect}
        />

        {/* Notes Categories */}
        <div className="space-y-20">
          {Object.entries(fragranceNotes).map(([key, category], categoryIndex) => (
            <FragranceNotesCategorySection
              key={key} 
              category={{
                key,
                title: category.title,
                description: category.description,
                notes: category.notes,
              }}
              categoryIndex={categoryIndex}
              selectedCategory={selectedCategory}
              activeNote={activeNote}
              onNoteSelect={handleNoteSelect}
              isInView={isInView}
            />
          ))}
        </div>

        {/* CTA Section */}
        <FragranceNotesCTA />
      </Container>
    </section>
  )
}
