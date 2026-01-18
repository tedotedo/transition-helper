import { useState } from 'react'
import type { AgeGroup, Familiarity, Goal, QuizAnswers } from './journeyQuizHelpers'

interface JourneyQuizProps {
  onComplete: (answers: QuizAnswers) => void
  onSkip: () => void
}

const ageOptions: { value: AgeGroup; label: string; emoji: string }[] = [
  { value: '11-13', label: '11-13', emoji: '🌱' },
  { value: '14-15', label: '14-15', emoji: '🌿' },
  { value: '16-17', label: '16-17', emoji: '🌳' },
  { value: '18+', label: '18+', emoji: '🎓' },
]

const familiarOptions: { value: Familiarity; label: string; emoji: string }[] = [
  { value: 'yes', label: 'Yes, I know about it', emoji: '👍' },
  { value: 'no', label: 'No, this is new to me', emoji: '🆕' },
  { value: 'not-sure', label: 'I\'ve heard of it but not sure', emoji: '🤔' },
]

const goalOptions: { value: Goal; label: string; emoji: string; description: string }[] = [
  { value: 'understand', label: 'Understand what\'s changing', emoji: '📚', description: 'Learn what happens at 16 and 18' },
  { value: 'plan', label: 'Plan my transition', emoji: '📝', description: 'Get ready step by step' },
  { value: 'stories', label: 'Hear from others', emoji: '💬', description: 'Watch videos from young people' },
  { value: 'rights', label: 'Know my rights', emoji: '⚖️', description: 'Understand consent and decisions' },
]

export function JourneyQuiz({ onComplete, onSkip }: JourneyQuizProps) {
  const [step, setStep] = useState(1)
  const [answers, setAnswers] = useState<QuizAnswers>({})

  const handleAgeSelect = (age: AgeGroup) => {
    setAnswers(prev => ({ ...prev, age }))
    setStep(2)
  }

  const handleFamiliarSelect = (familiar: Familiarity) => {
    setAnswers(prev => ({ ...prev, familiar }))
    setStep(3)
  }

  const handleGoalSelect = (goal: Goal) => {
    const finalAnswers = { ...answers, goal }
    setAnswers(finalAnswers)
    onComplete(finalAnswers)
  }

  const handleBack = () => {
    setStep(prev => Math.max(1, prev - 1))
  }

  return (
    <div className="space-y-6">
      {/* Progress indicator */}
      <div className="flex items-center justify-center gap-2">
        {[1, 2, 3].map(i => (
          <div
            key={i}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === step
                ? 'w-8 bg-white'
                : i < step
                ? 'w-2 bg-white/60'
                : 'w-2 bg-white/30'
            }`}
          />
        ))}
      </div>

      {/* Question 1: Age */}
      {step === 1 && (
        <div className="space-y-4 animate-fade-in">
          <h3 className="text-xl sm:text-2xl font-bold text-white text-center">
            How old are you? 🎂
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {ageOptions.map(option => (
              <button
                key={option.value}
                onClick={() => handleAgeSelect(option.value)}
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 hover:scale-105 transition-all"
              >
                <span className="text-2xl">{option.emoji}</span>
                <span className="text-white font-semibold">{option.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Question 2: Familiarity */}
      {step === 2 && (
        <div className="space-y-4 animate-fade-in">
          <h3 className="text-xl sm:text-2xl font-bold text-white text-center">
            Have you heard of "transition to adult care"? 🏥
          </h3>
          <div className="flex flex-col gap-3 max-w-md mx-auto">
            {familiarOptions.map(option => (
              <button
                key={option.value}
                onClick={() => handleFamiliarSelect(option.value)}
                className="flex items-center gap-3 p-4 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 hover:scale-[1.02] transition-all text-left"
              >
                <span className="text-2xl">{option.emoji}</span>
                <span className="text-white font-semibold">{option.label}</span>
              </button>
            ))}
          </div>
          <button
            onClick={handleBack}
            className="text-white/70 hover:text-white text-sm flex items-center gap-1 mx-auto"
          >
            ← Back
          </button>
        </div>
      )}

      {/* Question 3: Goal */}
      {step === 3 && (
        <div className="space-y-4 animate-fade-in">
          <h3 className="text-xl sm:text-2xl font-bold text-white text-center">
            What would help you most right now? 🎯
          </h3>
          <div className="grid sm:grid-cols-2 gap-3 max-w-lg mx-auto">
            {goalOptions.map(option => (
              <button
                key={option.value}
                onClick={() => handleGoalSelect(option.value)}
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 hover:scale-[1.02] transition-all text-center"
              >
                <span className="text-3xl">{option.emoji}</span>
                <span className="text-white font-bold">{option.label}</span>
                <span className="text-white/70 text-xs">{option.description}</span>
              </button>
            ))}
          </div>
          <button
            onClick={handleBack}
            className="text-white/70 hover:text-white text-sm flex items-center gap-1 mx-auto"
          >
            ← Back
          </button>
        </div>
      )}

      {/* Skip option */}
      <div className="text-center pt-2">
        <button
          onClick={onSkip}
          className="text-white/60 hover:text-white text-sm underline underline-offset-2"
        >
          Skip quiz and explore on my own
        </button>
      </div>
    </div>
  )
}
