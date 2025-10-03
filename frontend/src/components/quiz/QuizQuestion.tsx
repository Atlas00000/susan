'use client'

import { QuizQuestion as QuizQuestionType, QuizOption } from '@/data/quiz-questions'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { motion } from 'framer-motion'

interface QuizQuestionProps {
  question: QuizQuestionType
  selectedOption: string | null
  onSelect: (optionId: string) => void
  onNext: () => void
  isLastQuestion: boolean
}

export function QuizQuestion({ 
  question, 
  selectedOption, 
  onSelect, 
  onNext, 
  isLastQuestion 
}: QuizQuestionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl mx-auto"
    >
      <Card className="mb-8">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl md:text-4xl font-heading font-bold text-luxury-cream mb-4">
            {question.question}
          </CardTitle>
          {question.description && (
            <CardDescription className="text-lg text-luxury-cream/70 max-w-2xl mx-auto">
              {question.description}
            </CardDescription>
          )}
        </CardHeader>
      </Card>

      {/* Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {question.options.map((option, index) => (
          <motion.div
            key={option.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div
              role="button"
              tabIndex={0}
              onClick={() => onSelect(option.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  onSelect(option.id)
                }
              }}
              className="cursor-pointer"
            >
              <Card 
                className={`transition-all duration-300 hover:border-luxury-gold/50 hover:shadow-lg hover:shadow-luxury-gold/10 ${
                  selectedOption === option.id 
                    ? 'border-luxury-gold bg-luxury-gold/10 shadow-lg shadow-luxury-gold/20' 
                    : 'border-luxury-gold/20 hover:bg-luxury-charcoal/30'
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1 ${
                      selectedOption === option.id 
                        ? 'border-luxury-gold bg-luxury-gold' 
                        : 'border-luxury-cream/30'
                    }`}>
                      {selectedOption === option.id && (
                        <div className="w-2 h-2 bg-luxury-charcoal rounded-full" />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-xl font-heading font-semibold text-luxury-cream mb-2">
                        {option.label}
                      </h3>
                      {option.description && (
                        <p className="text-luxury-cream/70 leading-relaxed">
                          {option.description}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Next Button */}
      <div className="text-center">
        <Button
          size="lg"
          onClick={onNext}
          disabled={!selectedOption}
          className="px-8 py-3 text-lg"
        >
          {isLastQuestion ? 'Discover My Scents' : 'Next Question'}
        </Button>
      </div>
    </motion.div>
  )
}
