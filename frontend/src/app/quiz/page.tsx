'use client'

import { useState, useEffect } from 'react'
import { Container } from '@/components/ui/Container'
import { QuizProgress } from '@/components/quiz/QuizProgress'
import { QuizQuestion } from '@/components/quiz/QuizQuestion'
import { quizQuestions, getTotalQuestions } from '@/data/quiz-questions'
import { QuizAnswer } from '@/types'
import { useRouter } from 'next/navigation'
import { trackQuizStart, trackQuizAnswer, trackQuizCompletion, startQuizTimer } from '@/lib/analytics'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Scent Discovery Quiz - Find Your Perfect Fragrance',
  description: 'Take our personalized scent discovery quiz to find your perfect fragrance match. Answer 5 simple questions and discover fragrances tailored to your personality.',
  keywords: ['scent quiz', 'fragrance quiz', 'perfume quiz', 'scent discovery', 'personalized fragrance'],
  openGraph: {
    title: 'Scent Discovery Quiz - Find Your Perfect Fragrance',
    description: 'Take our personalized quiz to discover fragrances that match your personality and preferences.',
  },
}

export default function QuizPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<QuizAnswer[]>([])
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const router = useRouter()

  // Initialize analytics tracking
  useEffect(() => {
    trackQuizStart()
    startQuizTimer()
  }, [])

  const currentQuestion = quizQuestions[currentStep]
  const totalSteps = getTotalQuestions()
  const isLastQuestion = currentStep === totalSteps - 1

  const handleSelect = (optionId: string) => {
    setSelectedOption(optionId)
  }

  const handleNext = () => {
    if (!selectedOption) return

    // Track the answer
    trackQuizAnswer(currentQuestion.id, selectedOption)

    // Save the answer
    const newAnswer: QuizAnswer = {
      questionId: currentQuestion.id,
      answer: selectedOption,
      weight: 1.0 // All questions have equal weight for now
    }

    const newAnswers = [...answers, newAnswer]
    setAnswers(newAnswers)

    if (isLastQuestion) {
      // Track completion
      trackQuizCompletion()
      
      // Store answers in sessionStorage and navigate to results
      sessionStorage.setItem('quizAnswers', JSON.stringify(newAnswers))
      router.push('/quiz/results')
    } else {
      // Move to next question
      setCurrentStep(currentStep + 1)
      setSelectedOption(null)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      // Restore previous answer if it exists
      const previousAnswer = answers[currentStep - 1]
      setSelectedOption(previousAnswer?.answer || null)
      // Remove the last answer
      setAnswers(answers.slice(0, -1))
    }
  }

  return (
    <div className="min-h-screen bg-luxury-charcoal">
      <Container className="py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-luxury-cream mb-6">
            Discover Your <span className="luxury-text-gradient">Perfect Scent</span>
          </h1>
          <p className="text-xl text-luxury-cream/70 max-w-3xl mx-auto leading-relaxed">
            Answer a few quick questions and we'll help you find your perfect fragrance match. 
            Your scent is your story.
          </p>
        </div>

        {/* Progress */}
        <div className="mb-12">
          <QuizProgress 
            currentStep={currentStep + 1} 
            totalSteps={totalSteps}
          />
        </div>

        {/* Question */}
        <QuizQuestion
          question={currentQuestion}
          selectedOption={selectedOption}
          onSelect={handleSelect}
          onNext={handleNext}
          isLastQuestion={isLastQuestion}
        />

        {/* Back Button */}
        {currentStep > 0 && (
          <div className="text-center mt-8">
            <button
              onClick={handleBack}
              className="text-luxury-cream/70 hover:text-luxury-gold transition-colors"
            >
              ← Back to Previous Question
            </button>
          </div>
        )}

        {/* Skip Option */}
        <div className="text-center mt-8">
          <p className="text-luxury-cream/50 text-sm mb-4">
            Need help? Our fragrance experts are here to guide you.
          </p>
          <button className="text-luxury-gold hover:text-luxury-gold/80 transition-colors text-sm">
            Contact Our Experts
          </button>
        </div>
      </Container>
    </div>
  )
}
