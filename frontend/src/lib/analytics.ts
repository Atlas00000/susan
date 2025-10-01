// Simple analytics tracking for quiz interactions
export interface QuizAnalytics {
  quizStarted: boolean
  quizCompleted: boolean
  timeSpent: number
  answers: string[]
  profileGenerated: boolean
  recommendationsViewed: boolean
}

export function trackQuizStart(): void {
  const analytics: QuizAnalytics = {
    quizStarted: true,
    quizCompleted: false,
    timeSpent: 0,
    answers: [],
    profileGenerated: false,
    recommendationsViewed: false
  }
  
  sessionStorage.setItem('quizAnalytics', JSON.stringify(analytics))
  console.log('Quiz started - analytics tracked')
}

export function trackQuizAnswer(questionId: string, answer: string): void {
  const stored = sessionStorage.getItem('quizAnalytics')
  if (!stored) return

  try {
    const analytics: QuizAnalytics = JSON.parse(stored)
    analytics.answers.push(`${questionId}:${answer}`)
    sessionStorage.setItem('quizAnalytics', JSON.stringify(analytics))
  } catch (error) {
    console.error('Error tracking quiz answer:', error)
  }
}

export function trackQuizCompletion(): void {
  const stored = sessionStorage.getItem('quizAnalytics')
  if (!stored) return

  try {
    const analytics: QuizAnalytics = JSON.parse(stored)
    analytics.quizCompleted = true
    analytics.profileGenerated = true
    sessionStorage.setItem('quizAnalytics', JSON.stringify(analytics))
    console.log('Quiz completed - analytics tracked')
  } catch (error) {
    console.error('Error tracking quiz completion:', error)
  }
}

export function trackRecommendationsViewed(): void {
  const stored = sessionStorage.getItem('quizAnalytics')
  if (!stored) return

  try {
    const analytics: QuizAnalytics = JSON.parse(stored)
    analytics.recommendationsViewed = true
    sessionStorage.setItem('quizAnalytics', JSON.stringify(analytics))
    console.log('Recommendations viewed - analytics tracked')
  } catch (error) {
    console.error('Error tracking recommendations view:', error)
  }
}

export function getQuizAnalytics(): QuizAnalytics | null {
  const stored = sessionStorage.getItem('quizAnalytics')
  if (!stored) return null

  try {
    return JSON.parse(stored)
  } catch (error) {
    console.error('Error parsing quiz analytics:', error)
    return null
  }
}

// Track time spent on quiz
export function startQuizTimer(): void {
  sessionStorage.setItem('quizStartTime', Date.now().toString())
}

export function endQuizTimer(): void {
  const startTime = sessionStorage.getItem('quizStartTime')
  if (!startTime) return

  const timeSpent = Date.now() - parseInt(startTime)
  const stored = sessionStorage.getItem('quizAnalytics')
  
  if (stored) {
    try {
      const analytics: QuizAnalytics = JSON.parse(stored)
      analytics.timeSpent = Math.round(timeSpent / 1000) // Convert to seconds
      sessionStorage.setItem('quizAnalytics', JSON.stringify(analytics))
    } catch (error) {
      console.error('Error updating quiz timer:', error)
    }
  }
}
