'use client'

export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Container } from '@/components/ui/Container'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { ProductCard } from '@/components/ui/ProductCard'
import { QuizAnswer, Product, ScentProfile } from '@/types'
import { calculateScentProfile, getRecommendations, getScentFamilyFromProfile, getProfileDescription } from '@/lib/quiz-logic'
import { trackRecommendationsViewed, endQuizTimer } from '@/lib/analytics'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function QuizResultsPage() {
  const [answers, setAnswers] = useState<QuizAnswer[]>([])
  const [profile, setProfile] = useState<ScentProfile | null>(null)
  const [recommendations, setRecommendations] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [aiEnhancement, setAiEnhancement] = useState<{
    profileTitle: string
    personalizedDescription: string
    recommendations: Array<{ productId: string; reasoning: string }>
  } | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Get answers from sessionStorage
    const storedAnswers = sessionStorage.getItem('quizAnswers')
    if (!storedAnswers) {
      router.push('/quiz')
      return
    }

    try {
      const parsedAnswers: QuizAnswer[] = JSON.parse(storedAnswers)
      setAnswers(parsedAnswers)

      // Calculate scent profile
      const scentProfile = calculateScentProfile(parsedAnswers)
      setProfile(scentProfile)

      // Get recommendations
      const productRecommendations = getRecommendations(scentProfile, 6)
      setRecommendations(productRecommendations)

      // Get AI enhancement
      fetchAIEnhancement(parsedAnswers, productRecommendations)

      // Track analytics
      trackRecommendationsViewed()
      endQuizTimer()

      setLoading(false)
    } catch (error) {
      console.error('Error parsing quiz answers:', error)
      router.push('/quiz')
    }
  }, [router])

  const fetchAIEnhancement = async (quizAnswers: QuizAnswer[], products: Product[]) => {
    try {
      const response = await fetch('/api/quiz-enhance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answers: quizAnswers,
          recommendedProductIds: products.map(p => p.id),
          userId: `quiz-${Date.now()}`,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setAiEnhancement(data)
        console.log('AI Enhancement received:', data)
      }
    } catch (error) {
      console.error('Failed to get AI enhancement:', error)
      // Continue without AI enhancement - fallback to static
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-luxury-charcoal flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-luxury-gold border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-luxury-cream/70">Analyzing your preferences...</p>
        </div>
      </div>
    )
  }

  const dominantFamily = profile ? getScentFamilyFromProfile(profile) : 'signature'
  const profileDescription = profile ? getProfileDescription(profile) : ''

  const familyNames: Record<string, string> = {
    'oud-rich': 'Oud & Rich',
    'amber-gold': 'Amber & Gold',
    'floral-fresh': 'Floral & Fresh',
    'gourmand-unique': 'Gourmand & Unique',
    'signature': 'Signature Editions'
  }

  return (
    <div className="min-h-screen bg-luxury-charcoal">
      <Container className="py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-luxury-cream mb-6">
            Your <span className="luxury-text-gradient">Scent Profile</span>
          </h1>
          <p className="text-xl text-luxury-cream/70 max-w-3xl mx-auto leading-relaxed">
            Based on your answers, we've discovered your perfect fragrance personality.
          </p>
        </motion.div>

        {/* Scent Profile Card - AI Enhanced */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <Card className="max-w-4xl mx-auto">
            <CardHeader className="text-center">
              <div className="mb-6">
                {aiEnhancement && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="inline-flex items-center gap-2 bg-luxury-gold/20 border border-luxury-gold/30 rounded-full px-4 py-2 mb-4"
                  >
                    <span className="text-xs font-semibold text-luxury-gold">AI-Powered Profile</span>
                  </motion.div>
                )}
                <Badge variant="luxury" size="lg" className="mb-4">
                  {familyNames[dominantFamily]} Collection
                </Badge>
                <CardTitle className="text-3xl md:text-4xl font-heading font-bold text-luxury-cream mb-4">
                  {aiEnhancement ? aiEnhancement.profileTitle : 'Your Perfect Match'}
                </CardTitle>
              </div>
              <CardDescription className="text-lg text-luxury-cream/80 leading-relaxed max-w-2xl mx-auto">
                {aiEnhancement ? aiEnhancement.personalizedDescription : profileDescription}
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              {/* Scent Profile Visualization */}
              <div className="space-y-4">
                <h3 className="text-xl font-heading font-semibold text-luxury-cream mb-4 text-center">
                  Your Scent Preferences
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {profile && Object.entries(profile).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <div className="w-full bg-luxury-charcoal/50 rounded-full h-3 mb-2">
                        <div 
                          className="bg-luxury-gold h-3 rounded-full transition-all duration-1000"
                          style={{ width: `${value * 100}%` }}
                        />
                      </div>
                      <p className="text-sm text-luxury-cream/70 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </p>
                      <p className="text-xs text-luxury-gold font-medium">
                        {Math.round(value * 100)}%
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold text-luxury-cream mb-4">
              Your Perfect Matches
            </h2>
            <p className="text-luxury-cream/70 max-w-2xl mx-auto">
              Based on your scent profile, we've curated these fragrances just for you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recommendations.map((product, index) => {
              // Find AI reasoning for this product
              const aiReasoning = aiEnhancement?.recommendations?.find(
                rec => rec.productId === product.id
              )?.reasoning

              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  className="relative"
                >
                  {/* AI Reasoning Badge */}
                  {aiReasoning && index < 3 && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1 + index * 0.1 }}
                      className="absolute -top-3 left-4 z-10 bg-luxury-gold text-luxury-charcoal px-3 py-1 rounded-full text-xs font-bold shadow-lg"
                    >
                      Top {index + 1} Match
                    </motion.div>
                  )}
                  
                  <ProductCard product={product} />
                  
                  {/* AI Reasoning */}
                  {aiReasoning && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ delay: 1.2 + index * 0.1 }}
                      className="mt-3 bg-luxury-gold/10 border border-luxury-gold/20 rounded-lg p-3"
                    >
                      <div className="flex items-start gap-2">
                        <p className="text-xs text-luxury-cream/80 leading-relaxed">
                          <span className="font-semibold text-luxury-gold">Why this matches: </span>
                          {aiReasoning}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center space-y-6"
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/collections/${dominantFamily}`}>
              <Button size="lg" className="w-full sm:w-auto">
                Explore {familyNames[dominantFamily]} Collection
              </Button>
            </Link>
            <Link href="/collections">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                View All Collections
              </Button>
            </Link>
          </div>

          <div className="pt-8 border-t border-luxury-gold/20">
            <p className="text-luxury-cream/70 mb-4">
              Want to explore more? Take the quiz again or discover our full collection.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/quiz">
                <Button variant="ghost" size="sm">
                  Retake Quiz
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="ghost" size="sm">
                  Learn More About Us
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </Container>
    </div>
  )
}
