import { Collection } from '@/types'
import { getProductsByCategory } from './products'

export const collections: Collection[] = [
  {
    id: 'oud-rich',
    name: 'Oud & Rich',
    description: 'For the sophisticated soul who appreciates depth and complexity. Our oud collection features the finest oud fragrances from around the world.',
    category: 'oud-rich',
    products: getProductsByCategory('oud-rich'),
    featured: true
  },
  {
    id: 'amber-gold',
    name: 'Amber & Gold',
    description: 'Warmth, elegance, and timeless luxury. Our amber collection embodies the golden hour of sophistication.',
    category: 'amber-gold',
    products: getProductsByCategory('amber-gold'),
    featured: true
  },
  {
    id: 'floral-fresh',
    name: 'Floral & Fresh',
    description: 'Effortless elegance for the modern individual. Fresh, beautiful, and eternally chic.',
    category: 'floral-fresh',
    products: getProductsByCategory('floral-fresh'),
    featured: false
  },
  {
    id: 'gourmand-unique',
    name: 'Gourmand & Unique',
    description: 'Bold statements for the unconventional. Unique fragrances that stand out in a crowd.',
    category: 'gourmand-unique',
    products: getProductsByCategory('gourmand-unique'),
    featured: false
  },
  {
    id: 'signature',
    name: 'Signature Editions',
    description: 'Exclusive creations for the discerning few. Limited edition fragrances that define luxury.',
    category: 'signature',
    products: getProductsByCategory('signature'),
    featured: true
  }
]

export const getCollectionById = (id: string) => {
  return collections.find(collection => collection.id === id)
}

export const getFeaturedCollections = () => {
  return collections.filter(collection => collection.featured)
}
