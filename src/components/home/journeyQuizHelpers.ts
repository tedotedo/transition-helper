export type AgeGroup = '11-13' | '14-15' | '16-17' | '18+'
export type Familiarity = 'yes' | 'no' | 'not-sure'
export type Goal = 'understand' | 'plan' | 'stories' | 'rights'

export interface QuizAnswers {
  age?: AgeGroup
  familiar?: Familiarity
  goal?: Goal
}

// Helper function to determine the best route based on quiz answers
export function getRecommendedRoute(answers: QuizAnswers): string {
  const { age, familiar, goal } = answers

  // If they specified a clear goal, prioritize that
  if (goal) {
    switch (goal) {
      case 'understand':
        return '/rights'
      case 'plan':
        return '/journey'
      case 'stories':
        return '/videos'
      case 'rights':
        return '/rights'
    }
  }

  // If they're new to transition, start with the journey overview
  if (familiar === 'no' || familiar === 'not-sure') {
    return '/journey'
  }

  // Age-based recommendations
  if (age === '11-13') {
    return '/journey' // Ready stage
  } else if (age === '14-15') {
    return '/journey' // Steady stage
  } else if (age === '16-17') {
    return '/rights' // Go stage - rights become important
  } else if (age === '18+') {
    return '/rights' // Adult services - need to understand rights
  }

  // Default fallback
  return '/journey'
}

// Helper to get a personalized welcome message
export function getWelcomeMessage(answers: QuizAnswers): string {
  const { age, familiar } = answers

  if (familiar === 'no') {
    return "No worries — we'll explain everything step by step!"
  }

  if (age === '11-13') {
    return "You're starting early — that's brilliant! Small steps now make a big difference later."
  } else if (age === '14-15') {
    return "You're at a great stage to start building your confidence!"
  } else if (age === '16-17') {
    return "Big changes are coming — let's make sure you're ready!"
  } else if (age === '18+') {
    return "Welcome to adult services — we'll help you settle in!"
  }

  return "Let's get you started on your journey!"
}
