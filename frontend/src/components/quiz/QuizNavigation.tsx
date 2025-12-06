'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'

interface QuizNavigationProps {
  currentStep: number
  totalSteps: number
  selectedOption: string | null
  isLastQuestion: boolean
  isTransitioning: boolean
  onBack: () => void
  onNext: () => void
}

export function QuizNavigation({
  currentStep,
  totalSteps,
  selectedOption,
  isLastQuestion,
  isTransitioning,
  onBack,
  onNext,
}: QuizNavigationProps) {
  return (
    <motion.div
      className="mt-12"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
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
              onClick={onBack}
              disabled={isTransitioning}
              className="px-8 py-4 relative overflow-hidden"
              style={{
                borderColor: 'rgba(212, 175, 55, 0.5)',
                background: 'transparent',
              }}
            >
              <motion.span
                className="flex items-center space-x-2 relative z-10"
                whileHover={{ x: -2 }}
              >
                <span>←</span>
                <span>Previous Question</span>
              </motion.span>
            </Button>
          </motion.div>
        )}

        {/* Next Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div
            whileHover={selectedOption ? { scale: 1.05, y: -2 } : {}}
            whileTap={selectedOption ? { scale: 0.95 } : {}}
            style={{ display: 'inline-block' }}
          >
            <Button
              size="lg"
              onClick={onNext}
              disabled={!selectedOption || isTransitioning}
              className="px-12 py-4 text-lg relative overflow-hidden group/button"
              style={{
                background: selectedOption
                  ? 'linear-gradient(135deg, #D4AF37, #FFD700)'
                  : 'linear-gradient(135deg, rgba(212, 175, 55, 0.3), rgba(212, 175, 55, 0.2))',
                opacity: selectedOption ? 1 : 0.5,
                cursor: selectedOption ? 'pointer' : 'not-allowed',
              }}
            >
            <motion.span
              className="relative z-10"
              animate={{
                x: selectedOption ? [0, 2, 0] : 0,
              }}
              transition={{
                duration: 2,
                repeat: selectedOption ? Infinity : 0,
                ease: 'easeInOut',
              }}
            >
              {isLastQuestion ? 'Discover My Scents' : 'Next Question'}
            </motion.span>
            {selectedOption && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
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
          </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Help Text */}
      <motion.div
        className="text-center mt-8"
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
    </motion.div>
  )
}

