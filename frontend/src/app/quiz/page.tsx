'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { QuizProgress } from '@/components/quiz/QuizProgress'
import { QuizQuestion } from '@/components/quiz/QuizQuestion'
import { quizQuestions, getTotalQuestions } from '@/data/quiz-questions'
import { QuizAnswer } from '@/types'
import { useRouter } from 'next/navigation'
import { trackQuizStart, trackQuizAnswer, trackQuizCompletion, startQuizTimer } from '@/lib/analytics'
import { Button } from '@/components/ui/Button'

// Floating Elements Component
const FloatingElements = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-luxury-gold/30 rounded-full"
          style={{
            left: `${5 + i * 8}%`,
            top: `${10 + i * 6}%`,
          }}
          animate={{
            y: [-30, 30, -30],
            x: [-15, 15, -15],
            opacity: [0.2, 1, 0.2],
            scale: [0.5, 1.5, 0.5],
          }}
          transition={{
            duration: 6 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.8,
          }}
        />
      ))}
    </div>
  )
}

// Interactive Progress Ring
const InteractiveProgressRing = ({ progress }: { progress: number }) => {
  const circumference = 2 * Math.PI * 45
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <motion.div
      className="relative w-32 h-32 mx-auto mb-8"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.8, type: "spring" }}
    >
      <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="rgba(212, 175, 55, 0.2)"
          strokeWidth="8"
          fill="none"
        />
        {/* Progress circle */}
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          stroke="url(#gradient)"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4AF37" />
            <stop offset="50%" stopColor="#FFD700" />
            <stop offset="100%" stopColor="#B8860B" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Center content */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-2xl font-bold text-luxury-gold">
          {Math.round(progress)}%
        </span>
      </motion.div>
    </motion.div>
  )
}

// Animated Question Counter
const AnimatedQuestionCounter = ({ current, total }: { current: number; total: number }) => {
  return (
    <motion.div
      className="text-center mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="inline-block bg-luxury-gold/20 rounded-full px-6 py-3 border border-luxury-gold/30 backdrop-blur-sm"
        animate={{ 
          boxShadow: [
            '0 0 20px rgba(212, 175, 55, 0.3)',
            '0 0 40px rgba(212, 175, 55, 0.6)',
            '0 0 20px rgba(212, 175, 55, 0.3)'
          ]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-luxury-gold font-semibold">
          Question {current} of {total}
        </span>
      </motion.div>
    </motion.div>
  )
}

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
    offset: ["start end", "end start"]
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

    // Track the answer (guard for type safety)
    if (currentQuestion) {
      trackQuizAnswer(currentQuestion.id, selectedOption)
    }

    // Save the answer
    const newAnswer: QuizAnswer = currentQuestion
      ? {
          questionId: currentQuestion.id,
          answer: selectedOption,
          weight: 1.0
        }
      : {
          questionId: 'unknown',
          answer: selectedOption,
          weight: 1.0
        }

    const newAnswers = [...answers, newAnswer]
    setAnswers(newAnswers)

    // Wait for transition animation
    await new Promise(resolve => setTimeout(resolve, 500))

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
    <div className="min-h-screen bg-gradient-to-b from-luxury-charcoal via-luxury-royal/5 to-luxury-charcoal relative overflow-hidden">
      {/* Animated Background Elements */}
      <FloatingElements />
      
      <motion.div
        ref={containerRef}
        className="relative py-16"
        style={{ y, opacity }}
      >
        <Container className="relative z-10">
          {/* Hero Section */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-block bg-luxury-gold/20 rounded-full px-8 py-4 mb-8 border border-luxury-gold/30 backdrop-blur-sm"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <span className="text-luxury-gold font-semibold text-lg">
                ✨ Scent Discovery Journey ✨
              </span>
            </motion.div>
            
            <motion.h1
              className="text-6xl md:text-8xl font-heading font-bold text-luxury-cream mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <motion.span
                className="block"
                animate={{ 
                  backgroundPosition: ['0%', '100%', '0%'],
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  background: 'linear-gradient(45deg, #D4AF37, #FFD700, #B8860B, #D4AF37)',
                  backgroundSize: '300% 300%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Discover Your
              </motion.span>
              <motion.span
                className="block bg-gradient-to-r from-luxury-gold via-luxury-amber to-luxury-gold bg-clip-text text-transparent"
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                Perfect Scent
              </motion.span>
            </motion.h1>
            
            <motion.p
              className="text-xl md:text-2xl text-luxury-cream/80 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              Answer a few quick questions and we'll help you find your perfect fragrance match. 
              Your scent is your story, and we're here to help you tell it.
            </motion.p>
          </motion.div>

          {/* Interactive Progress Section */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              {/* Progress Ring */}
              <div className="flex-shrink-0">
                <InteractiveProgressRing progress={progress} />
              </div>
              
              {/* Progress Bar */}
              <div className="flex-1 max-w-md">
                <AnimatedQuestionCounter current={currentStep + 1} total={totalSteps} />
                <QuizProgress 
                  currentStep={currentStep + 1} 
                  totalSteps={totalSteps}
                />
              </div>
            </div>
          </motion.div>

          {/* Question Section */}
          <motion.div
            className="relative"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 100, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -100, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                {/* Question Card with Enhanced Styling */}
                <div className="bg-luxury-charcoal/80 backdrop-blur-lg border border-luxury-gold/30 rounded-3xl p-8 md:p-12 shadow-2xl shadow-luxury-gold/10">
                  {currentQuestion && (
                    <QuizQuestion
                      question={currentQuestion}
                      selectedOption={selectedOption}
                      onSelect={handleSelect}
                      onNext={handleNext}
                      isLastQuestion={isLastQuestion}
                      isTransitioning={isTransitioning}
                    />
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Navigation Controls */}
          <motion.div
            className="mt-12"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.4, duration: 0.8 }}
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              {/* Back Button */}
              {currentStep > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Button
                    variant="outline"
                    onClick={handleBack}
                    disabled={isTransitioning}
                    className="px-8 py-4 border-luxury-gold/50 hover:border-luxury-gold hover:bg-luxury-gold/10 transition-all duration-300"
                  >
                    <span className="flex items-center space-x-2">
                      <span>←</span>
                      <span>Previous Question</span>
                    </span>
                  </Button>
                </motion.div>
              )}

              {/* Skip Option */}
              <motion.div
                className="text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6, duration: 0.8 }}
              >
                <p className="text-luxury-cream/60 text-sm mb-4">
                  Need help? Our fragrance experts are here to guide you.
                </p>
                <button className="text-luxury-gold hover:text-luxury-gold/80 transition-colors text-sm font-medium">
                  Contact Our Experts
                </button>
              </motion.div>
            </div>
          </motion.div>

          {/* Motivational Messages */}
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.8, duration: 0.8 }}
          >
            <motion.div
              className="inline-block bg-luxury-charcoal/50 rounded-2xl p-6 border border-luxury-gold/20 backdrop-blur-sm"
              animate={{ 
                boxShadow: [
                  '0 0 20px rgba(212, 175, 55, 0.1)',
                  '0 0 40px rgba(212, 175, 55, 0.2)',
                  '0 0 20px rgba(212, 175, 55, 0.1)'
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <p className="text-luxury-cream/80 text-lg">
                "Every question brings you closer to your perfect scent match"
              </p>
            </motion.div>
          </motion.div>
        </Container>
      </motion.div>
    </div>
  )
}