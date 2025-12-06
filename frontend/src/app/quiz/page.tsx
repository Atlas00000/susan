'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { quizQuestions, getTotalQuestions } from '@/data/quiz-questions'
import { QuizAnswer } from '@/types'
import { useRouter } from 'next/navigation'
import { trackQuizStart, trackQuizAnswer, trackQuizCompletion, startQuizTimer } from '@/lib/analytics'
import { QuizHeader } from '@/components/quiz/QuizHeader'
import { QuizBackground } from '@/components/quiz/QuizBackground'
import { QuizProgressEnhanced } from '@/components/quiz/QuizProgressEnhanced'
import { QuizQuestionCard } from '@/components/quiz/QuizQuestionCard'
import { QuizNavigation } from '@/components/quiz/QuizNavigation'
import { QuizMotivational } from '@/components/quiz/QuizMotivational'

export default function QuizPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<QuizAnswer[]>([])
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.1 })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [50, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  // Initialize analytics tracking
  useEffect(() => {
    trackQuizStart()
    startQuizTimer()
  }, [])

  const currentQuestion = quizQuestions[currentStep]
  const totalSteps = getTotalQuestions()
  const isLastQuestion = currentStep === totalSteps - 1
  const progress = ((currentStep + 1) / totalSteps) * 100

  const handleSelect = (optionId: string) => {
    setSelectedOption(optionId)
  }

  const handleNext = async () => {
    if (!selectedOption || isTransitioning) return

    setIsTransitioning(true)

    // Track the answer
    if (currentQuestion) {
      trackQuizAnswer(currentQuestion.id, selectedOption)
    }

    // Save the answer
    const newAnswer: QuizAnswer = currentQuestion
      ? {
          questionId: currentQuestion.id,
          answer: selectedOption,
          weight: 1.0,
        }
      : {
          questionId: 'unknown',
          answer: selectedOption,
          weight: 1.0,
        }

    const newAnswers = [...answers, newAnswer]
    setAnswers(newAnswers)

    // Wait for transition animation
    await new Promise((resolve) => setTimeout(resolve, 500))

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
      setIsTransitioning(false)
    }
  }

  const handleBack = () => {
    if (currentStep > 0 && !isTransitioning) {
      setCurrentStep(currentStep - 1)
      // Restore previous answer if it exists
      const previousAnswer = answers[currentStep - 1]
      setSelectedOption(previousAnswer?.answer || null)
      // Remove the last answer
      setAnswers(answers.slice(0, -1))
    }
  }

  return (
    <div className="min-h-screen bg-luxury-charcoal relative overflow-hidden">
      {/* Animated Background */}
      <QuizBackground scrollYProgress={scrollYProgress} />

      <motion.div
        ref={containerRef}
        className="relative py-16"
        style={{ y, opacity }}
      >
        <Container className="relative z-10">
          {/* Header */}
          <QuizHeader />

          {/* Progress Section */}
          <QuizProgressEnhanced
            current={currentStep + 1}
            total={totalSteps}
            progress={progress}
          />

          {/* Question Section */}
          <motion.div
            className="relative"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            {currentQuestion && (
              <QuizQuestionCard
                question={currentQuestion}
                selectedOption={selectedOption}
                onSelect={handleSelect}
                currentStep={currentStep}
              />
            )}
          </motion.div>

          {/* Navigation */}
          <QuizNavigation
            currentStep={currentStep}
            totalSteps={totalSteps}
            selectedOption={selectedOption}
            isLastQuestion={isLastQuestion}
            isTransitioning={isTransitioning}
            onBack={handleBack}
            onNext={handleNext}
          />

          {/* Motivational Message */}
          <QuizMotivational />
        </Container>
      </motion.div>
    </div>
  )
}
