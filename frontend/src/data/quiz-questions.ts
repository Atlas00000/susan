import { QuizAnswer } from '@/types'

export interface QuizQuestion {
  id: string
  question: string
  description?: string
  options: QuizOption[]
}

export interface QuizOption {
  id: string
  label: string
  description?: string
  weight: {
    oud: number
    amber: number
    floral: number
    gourmand: number
  }
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'mood',
    question: 'When you wear perfume, how do you want to feel?',
    description: 'Perfume isn\'t just a fragrance. It\'s a mood, a memory, a story, a signature.',
    options: [
      {
        id: 'elegant-romantic',
        label: 'Elegant & Romantic',
        description: 'Sophisticated, graceful, and alluring',
        weight: { oud: 0.3, amber: 0.7, floral: 0.5, gourmand: 0.2 }
      },
      {
        id: 'fresh-clean',
        label: 'Fresh & Clean',
        description: 'Light, airy, and effortlessly beautiful',
        weight: { oud: 0.1, amber: 0.2, floral: 0.8, gourmand: 0.1 }
      },
      {
        id: 'bold-mysterious',
        label: 'Bold & Mysterious',
        description: 'Confident, intriguing, and unforgettable',
        weight: { oud: 0.8, amber: 0.4, floral: 0.2, gourmand: 0.3 }
      },
      {
        id: 'sweet-playful',
        label: 'Sweet & Playful',
        description: 'Fun, charming, and full of joy',
        weight: { oud: 0.1, amber: 0.3, floral: 0.4, gourmand: 0.7 }
      }
    ]
  },
  {
    id: 'fragrance-type',
    question: 'Which type of fragrances do you naturally love?',
    description: 'The crave of perfumes is not just because of its availability but rather, often times it affects how we feel about ourselves.',
    options: [
      {
        id: 'oud-rich',
        label: 'Oud & Rich',
        description: 'Deep, complex, and luxurious',
        weight: { oud: 0.9, amber: 0.3, floral: 0.1, gourmand: 0.2 }
      },
      {
        id: 'fruity-floral',
        label: 'Fruity & Floral',
        description: 'Fresh, beautiful, and natural',
        weight: { oud: 0.1, amber: 0.2, floral: 0.8, gourmand: 0.3 }
      },
      {
        id: 'sweet-gourmand',
        label: 'Sweet & Gourmand',
        description: 'Vanilla, caramel, candy-like',
        weight: { oud: 0.1, amber: 0.4, floral: 0.2, gourmand: 0.8 }
      },
      {
        id: 'woody-musky',
        label: 'Woody & Musky',
        description: 'Warm, sophisticated, and grounding',
        weight: { oud: 0.6, amber: 0.7, floral: 0.2, gourmand: 0.3 }
      }
    ]
  },
  {
    id: 'occasion',
    question: 'When do you wear perfume most often?',
    description: 'Allow us walk with you on your scent discovery journey.',
    options: [
      {
        id: 'daily',
        label: 'Daily (work/school)',
        description: 'Everyday elegance and confidence',
        weight: { oud: 0.2, amber: 0.5, floral: 0.6, gourmand: 0.3 }
      },
      {
        id: 'evening',
        label: 'Nights Out & Events',
        description: 'Special occasions and memorable moments',
        weight: { oud: 0.7, amber: 0.6, floral: 0.4, gourmand: 0.5 }
      },
      {
        id: 'special',
        label: 'Special Occasions',
        description: 'Only for the most important moments',
        weight: { oud: 0.8, amber: 0.8, floral: 0.3, gourmand: 0.4 }
      },
      {
        id: 'collector',
        label: 'All the Time (A Collector)',
        description: 'I love exploring different scents',
        weight: { oud: 0.6, amber: 0.6, floral: 0.6, gourmand: 0.6 }
      }
    ]
  },
  {
    id: 'personality',
    question: 'How would you describe your personal style?',
    description: 'Your scent should reflect who you are.',
    options: [
      {
        id: 'classic',
        label: 'Classic & Timeless',
        description: 'Elegant, refined, and sophisticated',
        weight: { oud: 0.4, amber: 0.7, floral: 0.5, gourmand: 0.3 }
      },
      {
        id: 'modern',
        label: 'Modern & Trendy',
        description: 'Contemporary, fresh, and innovative',
        weight: { oud: 0.3, amber: 0.4, floral: 0.7, gourmand: 0.5 }
      },
      {
        id: 'bohemian',
        label: 'Bohemian & Free-spirited',
        description: 'Creative, artistic, and unconventional',
        weight: { oud: 0.6, amber: 0.5, floral: 0.6, gourmand: 0.4 }
      },
      {
        id: 'minimalist',
        label: 'Minimalist & Clean',
        description: 'Simple, pure, and understated',
        weight: { oud: 0.2, amber: 0.3, floral: 0.8, gourmand: 0.2 }
      }
    ]
  },
  {
    id: 'intensity',
    question: 'What intensity do you prefer?',
    description: 'Some like to make a statement, others prefer subtle elegance.',
    options: [
      {
        id: 'subtle',
        label: 'Subtle & Intimate',
        description: 'Close to the skin, personal',
        weight: { oud: 0.2, amber: 0.4, floral: 0.6, gourmand: 0.3 }
      },
      {
        id: 'moderate',
        label: 'Moderate & Balanced',
        description: 'Noticeable but not overwhelming',
        weight: { oud: 0.5, amber: 0.6, floral: 0.7, gourmand: 0.5 }
      },
      {
        id: 'bold',
        label: 'Bold & Confident',
        description: 'Makes a statement, unforgettable',
        weight: { oud: 0.8, amber: 0.7, floral: 0.4, gourmand: 0.6 }
      },
      {
        id: 'versatile',
        label: 'Versatile & Adaptable',
        description: 'Works for any occasion',
        weight: { oud: 0.4, amber: 0.6, floral: 0.6, gourmand: 0.5 }
      }
    ]
  }
]

export const getQuestionById = (id: string): QuizQuestion | undefined => {
  return quizQuestions.find(question => question.id === id)
}

export const getTotalQuestions = (): number => {
  return quizQuestions.length
}
