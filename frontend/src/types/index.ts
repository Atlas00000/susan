export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: 'oud-rich' | 'amber-gold' | 'floral-fresh' | 'gourmand-unique' | 'signature'
  mood: 'elegant-romantic' | 'fresh-clean' | 'bold-mysterious' | 'sweet-playful'
  notes: string[]
  story: string
  images: string[]
  availability: 'in-stock' | 'limited' | 'out-of-stock'
  featured?: boolean
}

export interface Collection {
  id: string
  name: string
  description: string
  category: Product['category']
  products: Product[]
  featured?: boolean
}

export interface QuizAnswer {
  questionId: string
  answer: string
  weight: number
}

export interface ScentProfile {
  oud: number
  amber: number
  floral: number
  gourmand: number
}

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  className?: string
  onClick?: () => void
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

export interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  padding?: 'sm' | 'md' | 'lg'
}

export interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'luxury' | 'outline' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}
