import { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useLocalStorage } from '../hooks'

interface ConditionData {
  conditionName: string
  myDescription: string
  healthyHabits: string[]
  questionsForDoctor: string[]
  lastUpdated?: string
}

const STORAGE_KEY = 'transition-care-my-condition'

const initialData: ConditionData = {
  conditionName: '',
  myDescription: '',
  healthyHabits: ['', '', ''],
  questionsForDoctor: ['', '', ''],
}

export function LearnAboutCondition() {
  const [data, setData] = useLocalStorage<ConditionData>(STORAGE_KEY, initialData)
  const [saved, setSaved] = useState(false)

  // Destructure for easier access
  const { conditionName, myDescription, healthyHabits, questionsForDoctor, lastUpdated } = data
  const hasExistingData = Boolean(lastUpdated)

  // Ensure arrays have at least 3 items for display
  const displayHabits = healthyHabits.length >= 3 ? healthyHabits : [...healthyHabits, '', '', ''].slice(0, 3)
  const displayQuestions = questionsForDoctor.length >= 3 ? questionsForDoctor : [...questionsForDoctor, '', '', ''].slice(0, 3)

  const handleSave = useCallback(() => {
    setData({
      conditionName,
      myDescription,
      healthyHabits: healthyHabits.filter(h => h.trim() !== ''),
      questionsForDoctor: questionsForDoctor.filter(q => q.trim() !== ''),
      lastUpdated: new Date().toISOString()
    })
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }, [conditionName, myDescription, healthyHabits, questionsForDoctor, setData])

  const handlePrint = () => {
    window.print()
  }

  const updateField = useCallback(<K extends keyof ConditionData>(field: K, value: ConditionData[K]) => {
    setData(prev => ({ ...prev, [field]: value }))
  }, [setData])

  const updateHealthyHabit = useCallback((index: number, value: string) => {
    const newHabits = [...displayHabits]
    newHabits[index] = value
    setData(prev => ({ ...prev, healthyHabits: newHabits }))
  }, [displayHabits, setData])

  const updateQuestion = useCallback((index: number, value: string) => {
    const newQuestions = [...displayQuestions]
    newQuestions[index] = value
    setData(prev => ({ ...prev, questionsForDoctor: newQuestions }))
  }, [displayQuestions, setData])

  const addMoreQuestions = useCallback(() => {
    setData(prev => ({ ...prev, questionsForDoctor: [...prev.questionsForDoctor, ''] }))
  }, [setData])

  return (
    <div className="space-y-8 animate-fade-in max-w-3xl">
      {/* Header */}
      <header className="space-y-3">
        <Link to="/journey" className="inline-flex items-center gap-2 text-sm text-warm-500 hover:text-primary-600 transition-colors">
          <span>←</span>
          <span>Back to My Journey</span>
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-3xl">📚</span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-warm-500">Ready Stage Activity</p>
            <h1 className="text-2xl md:text-3xl font-bold text-warm-800">Learn About Your Condition</h1>
          </div>
        </div>
      </header>

      {/* Introduction */}
      <section className="bg-gradient-to-br from-primary-50 to-white rounded-2xl border border-primary-100 p-5 shadow-card">
        <h2 className="text-lg font-semibold text-warm-800 mb-3">Why is this important? 🤔</h2>
        <div className="space-y-3 text-sm text-warm-600 leading-relaxed">
          <p>
            Understanding your own health condition is like having a superpower! When you know what's going on with your body, you can:
          </p>
          <ul className="space-y-2 ml-4">
            <li className="flex items-start gap-2">
              <span className="text-primary-500">✓</span>
              <span>Help your doctors and nurses look after you better</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-500">✓</span>
              <span>Feel more confident at appointments</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-500">✓</span>
              <span>Explain to friends or teachers what you need</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-500">✓</span>
              <span>Take charge of your own health as you grow up</span>
            </li>
          </ul>
          <p className="mt-3 text-warm-500 italic">
            Don't worry if you don't know all the answers yet - that's okay! You can ask your family or care team to help, and come back to update this anytime.
          </p>
        </div>
      </section>

      {/* Form */}
      <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
        {/* Condition Name */}
        <section className="bg-white rounded-2xl border border-warm-200 p-5 shadow-card">
          <label htmlFor="condition-name" className="flex items-center gap-2 text-base font-semibold text-warm-800 mb-3">
            <span>🏷️</span>
            <span>What's your condition called?</span>
          </label>
          <input
            id="condition-name"
            type="text"
            value={conditionName}
            onChange={(e) => updateField('conditionName', e.target.value)}
            placeholder="e.g. Diabetes, Asthma, Epilepsy, Cerebral Palsy..."
            className="w-full px-4 py-3 rounded-xl border border-warm-200 bg-warm-50/50 text-warm-800 placeholder:text-warm-400 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all"
          />
          <p className="mt-2 text-xs text-warm-500">
            If you have more than one condition, you can write the main one here or list them all.
          </p>
        </section>

        {/* My Description */}
        <section className="bg-white rounded-2xl border border-warm-200 p-5 shadow-card">
          <label htmlFor="my-description" className="flex items-center gap-2 text-base font-semibold text-warm-800 mb-3">
            <span>💭</span>
            <span>Describe it in your own words</span>
          </label>
          <p className="text-sm text-warm-500 mb-3">
            Try starting with "My condition means..." - there's no wrong answer here!
          </p>
          <textarea
            id="my-description"
            value={myDescription}
            onChange={(e) => updateField('myDescription', e.target.value)}
            placeholder="My condition means that my body... / I need to... / Sometimes I feel..."
            rows={4}
            className="w-full px-4 py-3 rounded-xl border border-warm-200 bg-warm-50/50 text-warm-800 placeholder:text-warm-400 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all resize-none"
          />
        </section>

        {/* Healthy Habits */}
        <section className="bg-white rounded-2xl border border-warm-200 p-5 shadow-card">
          <div className="flex items-center gap-2 text-base font-semibold text-warm-800 mb-3">
            <span>💪</span>
            <span>3 things I do to stay healthy</span>
          </div>
          <p className="text-sm text-warm-500 mb-4">
            What do you do to look after yourself? This could be taking medicine, doing exercises, eating certain foods, or going to appointments.
          </p>
          <div className="space-y-3">
            {displayHabits.map((habit, index) => (
              <div key={index} className="flex items-center gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-accent-100 to-accent-200 flex items-center justify-center text-sm font-bold text-accent-700">
                  {index + 1}
                </span>
                <input
                  type="text"
                  value={habit}
                  onChange={(e) => updateHealthyHabit(index, e.target.value)}
                  placeholder={
                    index === 0 ? "e.g. I take my medicine every morning" :
                    index === 1 ? "e.g. I do my physio exercises" :
                    "e.g. I go to my check-ups"
                  }
                  className="flex-1 px-4 py-3 rounded-xl border border-warm-200 bg-warm-50/50 text-warm-800 placeholder:text-warm-400 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Questions for Doctor */}
        <section className="bg-white rounded-2xl border border-warm-200 p-5 shadow-card">
          <div className="flex items-center gap-2 text-base font-semibold text-warm-800 mb-3">
            <span>❓</span>
            <span>Questions I want to ask my doctor or nurse</span>
          </div>
          <p className="text-sm text-warm-500 mb-4">
            Is there anything you're wondering about? Write your questions here so you don't forget them at your next appointment!
          </p>
          <div className="space-y-3">
            {displayQuestions.map((question, index) => (
              <div key={index} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center text-lg">
                  ?
                </span>
                <input
                  type="text"
                  value={question}
                  onChange={(e) => updateQuestion(index, e.target.value)}
                  placeholder={
                    index === 0 ? "e.g. Why do I need to take this medicine?" :
                    index === 1 ? "e.g. Can I do sports with my condition?" :
                    "e.g. What happens when I'm older?"
                  }
                  className="flex-1 px-4 py-3 rounded-xl border border-warm-200 bg-warm-50/50 text-warm-800 placeholder:text-warm-400 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all"
                />
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addMoreQuestions}
            className="mt-3 text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1 transition-colors"
          >
            <span>+</span>
            <span>Add another question</span>
          </button>
        </section>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 pt-2">
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2"
          >
            <span>💾</span>
            <span>Save My Answers</span>
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="px-6 py-3 rounded-xl bg-white border border-warm-200 text-warm-700 font-semibold hover:border-primary-200 hover:shadow-card transition-all duration-200 flex items-center gap-2"
          >
            <span>🖨️</span>
            <span>Print / Share</span>
          </button>
        </div>

        {/* Save Confirmation */}
        {saved && (
          <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 border border-green-200 rounded-xl px-4 py-3 animate-fade-in">
            <span>✓</span>
            <span>Your answers have been saved! You can come back anytime to update them.</span>
          </div>
        )}

        {hasExistingData && !saved && (
          <p className="text-xs text-warm-500 flex items-center gap-2">
            <span>💡</span>
            <span>Your previous answers have been loaded. Feel free to update them!</span>
          </p>
        )}
      </form>

      {/* Encouragement */}
      <section className="bg-gradient-to-br from-accent-50 to-white rounded-2xl border border-accent-100 p-5">
        <div className="flex items-start gap-3">
          <span className="text-2xl">🌟</span>
          <div className="text-sm text-warm-600">
            <p className="font-semibold text-warm-800 mb-1">Great job!</p>
            <p>
              Every bit you write down helps you understand your health better. It's okay if you need help from a parent or your care team - that's what they're there for!
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
