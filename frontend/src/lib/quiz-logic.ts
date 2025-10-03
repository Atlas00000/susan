import { QuizAnswer, ScentProfile, Product } from '@/types'
import { mockProducts } from '@/data/products'

export function calculateScentProfile(answers: QuizAnswer[]): ScentProfile {
  const profile: ScentProfile = {
    oud: 0,
    amber: 0,
    floral: 0,
    gourmand: 0
  }

  // Calculate weighted averages based on answers
  answers.forEach(answer => {
    const weights = getWeightsForAnswer(answer.questionId, answer.answer)
    if (weights) {
      profile.oud += weights.oud * answer.weight
      profile.amber += weights.amber * answer.weight
      profile.floral += weights.floral * answer.weight
      profile.gourmand += weights.gourmand * answer.weight
    }
  })

  // Normalize the profile (ensure values are between 0 and 1)
  const total = profile.oud + profile.amber + profile.floral + profile.gourmand
  if (total > 0) {
    profile.oud = profile.oud / total
    profile.amber = profile.amber / total
    profile.floral = profile.floral / total
    profile.gourmand = profile.gourmand / total
  }

  return profile
}

function getWeightsForAnswer(questionId: string, answer: string) {
  // This would typically come from the quiz questions data
  // For now, we'll use a simplified mapping
  const weightMappings: Record<string, Record<string, ScentProfile>> = {
    'mood': {
      'elegant-romantic': { oud: 0.3, amber: 0.7, floral: 0.5, gourmand: 0.2 },
      'fresh-clean': { oud: 0.1, amber: 0.2, floral: 0.8, gourmand: 0.1 },
      'bold-mysterious': { oud: 0.8, amber: 0.4, floral: 0.2, gourmand: 0.3 },
      'sweet-playful': { oud: 0.1, amber: 0.3, floral: 0.4, gourmand: 0.7 }
    },
    'fragrance-type': {
      'oud-rich': { oud: 0.9, amber: 0.3, floral: 0.1, gourmand: 0.2 },
      'fruity-floral': { oud: 0.1, amber: 0.2, floral: 0.8, gourmand: 0.3 },
      'sweet-gourmand': { oud: 0.1, amber: 0.4, floral: 0.2, gourmand: 0.8 },
      'woody-musky': { oud: 0.6, amber: 0.7, floral: 0.2, gourmand: 0.3 }
    },
    'occasion': {
      'daily': { oud: 0.2, amber: 0.5, floral: 0.6, gourmand: 0.3 },
      'evening': { oud: 0.7, amber: 0.6, floral: 0.4, gourmand: 0.5 },
      'special': { oud: 0.8, amber: 0.8, floral: 0.3, gourmand: 0.4 },
      'collector': { oud: 0.6, amber: 0.6, floral: 0.6, gourmand: 0.6 }
    },
    'personality': {
      'classic': { oud: 0.4, amber: 0.7, floral: 0.5, gourmand: 0.3 },
      'modern': { oud: 0.3, amber: 0.4, floral: 0.7, gourmand: 0.5 },
      'bohemian': { oud: 0.6, amber: 0.5, floral: 0.6, gourmand: 0.4 },
      'minimalist': { oud: 0.2, amber: 0.3, floral: 0.8, gourmand: 0.2 }
    },
    'intensity': {
      'subtle': { oud: 0.2, amber: 0.4, floral: 0.6, gourmand: 0.3 },
      'moderate': { oud: 0.5, amber: 0.6, floral: 0.7, gourmand: 0.5 },
      'bold': { oud: 0.8, amber: 0.7, floral: 0.4, gourmand: 0.6 },
      'versatile': { oud: 0.4, amber: 0.6, floral: 0.6, gourmand: 0.5 }
    }
  }

  return weightMappings[questionId]?.[answer]
}

export function getRecommendations(profile: ScentProfile, limit: number = 6): Product[] {
  // Calculate compatibility score for each product
  const productsWithScores = mockProducts.map(product => {
    const score = calculateCompatibilityScore(profile, product)
    return { product, score }
  })

  // Sort by compatibility score (highest first)
  productsWithScores.sort((a, b) => b.score - a.score)

  // Return top recommendations
  return productsWithScores.slice(0, limit).map(item => item.product)
}

function calculateCompatibilityScore(profile: ScentProfile, product: Product): number {
  // Map product category to scent profile weights
  const categoryWeights: Record<string, ScentProfile> = {
    'oud-rich': { oud: 0.9, amber: 0.3, floral: 0.1, gourmand: 0.2 },
    'amber-gold': { oud: 0.2, amber: 0.9, floral: 0.3, gourmand: 0.4 },
    'floral-fresh': { oud: 0.1, amber: 0.2, floral: 0.9, gourmand: 0.1 },
    'gourmand-unique': { oud: 0.3, amber: 0.4, floral: 0.2, gourmand: 0.9 },
    'signature': { oud: 0.6, amber: 0.6, floral: 0.6, gourmand: 0.6 }
  }

  const productWeights = categoryWeights[product.category] || { oud: 0.5, amber: 0.5, floral: 0.5, gourmand: 0.5 }

  // Calculate dot product for compatibility
  const compatibility = 
    profile.oud * productWeights.oud +
    profile.amber * productWeights.amber +
    profile.floral * productWeights.floral +
    profile.gourmand * productWeights.gourmand

  // Boost score for featured products
  const featuredBoost = product.featured ? 0.1 : 0

  // Boost score for in-stock products
  const availabilityBoost = product.availability === 'in-stock' ? 0.05 : 0

  return Math.min(1, compatibility + featuredBoost + availabilityBoost)
}

export function getScentFamilyFromProfile(profile: ScentProfile): string {
  const maxValue = Math.max(profile.oud, profile.amber, profile.floral, profile.gourmand)
  
  if (maxValue === profile.oud) return 'oud-rich'
  if (maxValue === profile.amber) return 'amber-gold'
  if (maxValue === profile.floral) return 'floral-fresh'
  if (maxValue === profile.gourmand) return 'gourmand-unique'
  
  return 'signature' // Default for balanced profiles
}

export function getProfileDescription(profile: ScentProfile): string {
  const dominant = getScentFamilyFromProfile(profile)
  
  const descriptions: Record<string, string> = {
    'oud-rich': 'You\'re drawn to deep, complex fragrances with rich, mysterious notes. You appreciate luxury and sophistication.',
    'amber-gold': 'You love warm, golden fragrances that radiate elegance and confidence. You appreciate timeless beauty.',
    'floral-fresh': 'You prefer fresh, beautiful fragrances that are light and natural. You appreciate clean, effortless elegance.',
    'gourmand-unique': 'You enjoy unique, unconventional fragrances that make a statement. You\'re not afraid to stand out.',
    'signature': 'You have a balanced appreciation for all types of fragrances. You enjoy exploring different scent families.'
  }
  
  return descriptions[dominant] ?? descriptions['signature']!
}
