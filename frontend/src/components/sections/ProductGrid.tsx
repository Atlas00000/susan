'use client'

import { useState, useMemo } from 'react'
import { Product } from '@/types'
import { ProductCard } from '@/components/ui/ProductCard'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'

interface ProductGridProps {
  products: Product[]
  title?: string
  showFilters?: boolean
}

const moodFilters = [
  { id: 'all', label: 'All Moods' },
  { id: 'elegant-romantic', label: 'Elegant & Romantic' },
  { id: 'fresh-clean', label: 'Fresh & Clean' },
  { id: 'bold-mysterious', label: 'Bold & Mysterious' },
  { id: 'sweet-playful', label: 'Sweet & Playful' }
]

const availabilityFilters = [
  { id: 'all', label: 'All' },
  { id: 'in-stock', label: 'In Stock' },
  { id: 'limited', label: 'Limited Edition' }
]

export function ProductGrid({ products, title, showFilters = true }: ProductGridProps) {
  const [selectedMood, setSelectedMood] = useState('all')
  const [selectedAvailability, setSelectedAvailability] = useState('all')
  const [sortBy, setSortBy] = useState('name')

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products

    // Filter by mood
    if (selectedMood !== 'all') {
      filtered = filtered.filter(product => product.mood === selectedMood)
    }

    // Filter by availability
    if (selectedAvailability !== 'all') {
      filtered = filtered.filter(product => product.availability === selectedAvailability)
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'name':
          return a.name.localeCompare(b.name)
        case 'featured':
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
        default:
          return 0
      }
    })

    return filtered
  }, [products, selectedMood, selectedAvailability, sortBy])

  return (
    <div className="py-16">
      <Container>
        {title && (
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold text-luxury-cream mb-4">
              {title}
            </h2>
            <p className="text-luxury-cream/70">
              {filteredAndSortedProducts.length} of {products.length} fragrances
            </p>
          </div>
        )}

        {showFilters && (
          <div className="mb-12">
            {/* Filter Controls */}
            <div className="flex flex-wrap gap-4 mb-6">
              {/* Mood Filters */}
              <div className="flex flex-wrap gap-2">
                {moodFilters.map((filter) => (
                  <Button
                    key={filter.id}
                    variant={selectedMood === filter.id ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedMood(filter.id)}
                    className="text-sm"
                  >
                    {filter.label}
                  </Button>
                ))}
              </div>

              {/* Availability Filters */}
              <div className="flex flex-wrap gap-2">
                {availabilityFilters.map((filter) => (
                  <Button
                    key={filter.id}
                    variant={selectedAvailability === filter.id ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedAvailability(filter.id)}
                    className="text-sm"
                  >
                    {filter.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Sort Controls */}
            <div className="flex items-center gap-4">
              <span className="text-luxury-cream/70 text-sm">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-luxury-charcoal/50 border border-luxury-gold/30 rounded-lg px-3 py-2 text-luxury-cream text-sm focus:outline-none focus:border-luxury-gold"
              >
                <option value="name">Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="featured">Featured First</option>
              </select>
            </div>
          </div>
        )}

        {/* Products Grid */}
        {filteredAndSortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredAndSortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-heading font-bold text-luxury-cream mb-4">
              No fragrances found
            </h3>
            <p className="text-luxury-cream/70 mb-8">
              Try adjusting your filters to see more results.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSelectedMood('all')
                setSelectedAvailability('all')
                setSortBy('name')
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </Container>
    </div>
  )
}
