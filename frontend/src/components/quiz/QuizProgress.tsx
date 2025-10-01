interface QuizProgressProps {
  currentStep: number
  totalSteps: number
  className?: string
}

export function QuizProgress({ currentStep, totalSteps, className = '' }: QuizProgressProps) {
  const progress = (currentStep / totalSteps) * 100

  return (
    <div className={`w-full ${className}`}>
      {/* Progress Bar */}
      <div className="w-full bg-luxury-charcoal/50 rounded-full h-2 mb-4">
        <div 
          className="bg-luxury-gold h-2 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      {/* Step Counter */}
      <div className="flex justify-between items-center text-sm text-luxury-cream/70">
        <span>Question {currentStep} of {totalSteps}</span>
        <span>{Math.round(progress)}% Complete</span>
      </div>
    </div>
  )
}
