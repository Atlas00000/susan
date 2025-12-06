'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { QuizQuestion as QuizQuestionType } from '@/data/quiz-questions'

interface QuizQuestionCardProps {
  question: QuizQuestionType
  selectedOption: string | null
  onSelect: (optionId: string) => void
  currentStep: number
}

export function QuizQuestionCard({
  question,
  selectedOption,
  onSelect,
  currentStep,
}: QuizQuestionCardProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: 100, scale: 0.9 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: -100, scale: 0.9 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative"
      >
        {/* Question Card */}
        <motion.div
          className="relative rounded-3xl p-8 md:p-12 overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(30, 30, 30, 0.8), rgba(20, 20, 20, 0.9))',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(212, 175, 55, 0.3)',
          }}
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.3 }}
        >
          {/* Morphing background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-luxury-gold/10 via-transparent to-luxury-royal/10"
            animate={{
              borderRadius: [
                '30% 70% 70% 30% / 30% 30% 70% 70%',
                '70% 30% 30% 70% / 70% 70% 30% 30%',
                '30% 70% 70% 30% / 30% 30% 70% 70%',
              ],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          <div className="relative z-10 text-center">
            <motion.h2
              className="text-3xl md:text-4xl font-heading font-bold text-luxury-cream mb-4"
              animate={{
                textShadow: [
                  '0 0 20px rgba(212, 175, 55, 0.2)',
                  '0 0 40px rgba(212, 175, 55, 0.4)',
                  '0 0 20px rgba(212, 175, 55, 0.2)',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              {question.question}
            </motion.h2>
            {question.description && (
              <p className="text-lg text-luxury-cream/70 max-w-2xl mx-auto mb-8">
                {question.description}
              </p>
            )}

            {/* Options Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {question.options.map((option, index) => (
                <motion.div
                  key={option.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <motion.div
                    role="button"
                    tabIndex={0}
                    onClick={() => onSelect(option.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        onSelect(option.id)
                      }
                    }}
                    className="focus:outline-none focus:ring-2 focus:ring-luxury-gold/50 rounded-xl"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div
                      className="relative rounded-2xl p-6 overflow-hidden cursor-pointer"
                      style={{
                        background:
                          selectedOption === option.id
                            ? 'linear-gradient(135deg, rgba(212, 175, 55, 0.15), rgba(212, 175, 55, 0.05))'
                            : 'linear-gradient(135deg, rgba(30, 30, 30, 0.7), rgba(20, 20, 20, 0.9))',
                        backdropFilter: 'blur(10px)',
                        border:
                          selectedOption === option.id
                            ? '1px solid rgba(212, 175, 55, 0.5)'
                            : '1px solid rgba(212, 175, 55, 0.2)',
                      }}
                      animate={{
                        boxShadow:
                          selectedOption === option.id
                            ? [
                                '0 0 20px rgba(212, 175, 55, 0.2)',
                                '0 0 40px rgba(212, 175, 55, 0.4)',
                                '0 0 20px rgba(212, 175, 55, 0.2)',
                              ]
                            : '0 0 0px rgba(212, 175, 55, 0)',
                      }}
                      transition={{
                        duration: 2,
                        repeat: selectedOption === option.id ? Infinity : 0,
                        ease: 'easeInOut',
                      }}
                    >
                      {/* Shimmer effect when selected */}
                      {selectedOption === option.id && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-luxury-gold/10 to-transparent"
                          animate={{
                            x: ['-100%', '100%'],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'linear',
                          }}
                        />
                      )}

                      <div className="relative z-10 flex items-start space-x-4">
                        <motion.div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1 ${
                            selectedOption === option.id
                              ? 'border-luxury-gold bg-luxury-gold'
                              : 'border-luxury-cream/30'
                          }`}
                          animate={{
                            scale: selectedOption === option.id ? [1, 1.2, 1] : 1,
                          }}
                          transition={{
                            duration: 0.3,
                            repeat: selectedOption === option.id ? Infinity : 0,
                          }}
                        >
                          {selectedOption === option.id && (
                            <motion.div
                              className="w-2 h-2 bg-luxury-charcoal rounded-full"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ duration: 0.2 }}
                            />
                          )}
                        </motion.div>

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
                    </motion.div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

