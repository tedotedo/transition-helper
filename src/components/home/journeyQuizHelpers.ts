import type { UserRole } from '../../hooks/useRole'

export type AgeGroup = '11-13' | '14-15' | '16-17' | '18+'
export type Familiarity = 'yes' | 'no' | 'not-sure'
export type Goal = 'understand' | 'plan' | 'stories' | 'rights'
// Parent-specific goals
export type ParentGoal = 'understand' | 'role-change' | 'worries' | 'consent' | 'conversations'
// Parent familiarity options
export type ParentFamiliarity = 'not-started' | 'talked-a-bit' | 'they-know-more' | 'actively-planning'

export interface QuizAnswers {
  age?: AgeGroup
  familiar?: Familiarity
  goal?: Goal
}

export interface ParentQuizAnswers {
  childAge?: AgeGroup
  familiarity?: ParentFamiliarity
  goal?: ParentGoal
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

// Parent-specific routing
export function getParentRecommendedRoute(answers: ParentQuizAnswers): string {
  const { childAge, familiarity, goal } = answers

  // If they specified a clear goal, prioritize that
  if (goal) {
    switch (goal) {
      case 'understand':
        return '/journey' // Journey page has good overview
      case 'role-change':
        return '/rights' // Rights page explains changing responsibilities
      case 'worries':
        return '/videos' // Stories from other families
      case 'consent':
        return '/rights' // Consent info
      case 'conversations':
        return '/resources' // Communication guides
    }
  }

  // If they haven't started, give them the overview
  if (familiarity === 'not-started' || familiarity === 'they-know-more') {
    return '/journey'
  }

  // Age-based recommendations
  if (childAge === '11-13' || childAge === '14-15') {
    return '/journey' // Early stages - overview
  } else if (childAge === '16-17' || childAge === '18+') {
    return '/rights' // Later stages - rights and consent
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

// Parent-specific welcome messages
export function getParentWelcomeMessage(answers: ParentQuizAnswers): string {
  const { childAge, familiarity, goal } = answers

  // Goal-specific messages
  if (goal === 'worries') {
    return "It's completely normal to feel anxious about this. You'll see from other parents — it really does work out! 💙"
  }

  if (goal === 'role-change') {
    return "Your job isn't ending — it's evolving. You're moving from 'manager' to 'trusted advisor'. That's still incredibly important."
  }

  // Familiarity-based messages
  if (familiarity === 'not-started') {
    return "Great that you're thinking about this now! 🌱 We'll show you gentle ways to start the conversation."
  }

  if (familiarity === 'they-know-more') {
    return "That's actually a great sign! Let's get you up to speed so you can support them confidently."
  }

  if (familiarity === 'actively-planning') {
    return "You're doing brilliantly! 🎯 Let's get you the practical tools to keep supporting them."
  }

  // Age-based fallbacks
  if (childAge === '11-13') {
    return "You've got plenty of time to prepare together. Small conversations now make a big difference later!"
  } else if (childAge === '14-15') {
    return "This is a great time to start building their confidence — and yours too!"
  } else if (childAge === '16-17') {
    return "Important changes are happening. We'll help you both navigate this together."
  } else if (childAge === '18+') {
    return "They're in adult services now. Let's help you find your new role in supporting them."
  }

  return "We're here to help you support your young person through this journey!"
}

// Combined type for use in Home.tsx
export type CombinedQuizAnswers = {
  role: UserRole
  youngPerson?: QuizAnswers
  parent?: ParentQuizAnswers
}

export function getRouteForAnswers(combined: CombinedQuizAnswers): string {
  if (combined.role === 'young-person' && combined.youngPerson) {
    return getRecommendedRoute(combined.youngPerson)
  } else if (combined.role === 'parent-carer' && combined.parent) {
    return getParentRecommendedRoute(combined.parent)
  }
  return '/journey'
}

export function getMessageForAnswers(combined: CombinedQuizAnswers): string {
  if (combined.role === 'young-person' && combined.youngPerson) {
    return getWelcomeMessage(combined.youngPerson)
  } else if (combined.role === 'parent-carer' && combined.parent) {
    return getParentWelcomeMessage(combined.parent)
  }
  return "Let's get started!"
}
