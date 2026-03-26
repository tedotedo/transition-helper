import { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useLocalStorage } from '../hooks'

type Stage = 'getting-started' | 'building-skills' | 'almost-there' | 'flying-solo'

interface ChecklistItem {
  id: string
  text: string
  stage: Stage
}

interface ChecklistData {
  completedItems: string[]
  currentStage: Stage
  lastUpdated?: string
}

export const CHECKLIST_STORAGE_KEY = 'transition-care-checklist'

// Fully original transition readiness checklist items
const checklistItems: ChecklistItem[] = [
  // Getting Started (11-13)
  { id: 'gs-1', text: "I've written down what my health condition is called", stage: 'getting-started' },
  { id: 'gs-2', text: 'I can tell someone one thing about why I see my doctor', stage: 'getting-started' },
  { id: 'gs-3', text: 'I know the names of the people who look after my health', stage: 'getting-started' },
  { id: 'gs-4', text: "I've thought about one question I'd like to ask at my next appointment", stage: 'getting-started' },
  { id: 'gs-5', text: 'I know what to do if I feel really unwell at home', stage: 'getting-started' },

  // Building Skills (14-15)
  { id: 'bs-1', text: 'I can explain my condition to a friend or teacher in my own words', stage: 'building-skills' },
  { id: 'bs-2', text: 'I know what each of my medicines or treatments does', stage: 'building-skills' },
  { id: 'bs-3', text: "I've tried answering a question from my doctor or nurse myself", stage: 'building-skills' },
  { id: 'bs-4', text: 'I know what to do if I run out of medicine or a prescription', stage: 'building-skills' },
  { id: 'bs-5', text: "I've thought about how my health might affect college or work plans", stage: 'building-skills' },

  // Almost There (16-17)
  { id: 'at-1', text: 'I can describe my full health history to someone new', stage: 'almost-there' },
  { id: 'at-2', text: 'I know how to book a GP or hospital appointment', stage: 'almost-there' },
  { id: 'at-3', text: 'I understand what changes when I turn 16 (like consent)', stage: 'almost-there' },
  { id: 'at-4', text: "I've asked my team about when and how I'll move to adult services", stage: 'almost-there' },
  { id: 'at-5', text: 'I know how to order repeat prescriptions', stage: 'almost-there' },
  { id: 'at-6', text: "I've looked into whether I might be eligible for PIP or other support", stage: 'almost-there' },
  { id: 'at-7', text: "I've practised speaking to a healthcare professional on my own", stage: 'almost-there' },

  // Flying Solo (18+)
  { id: 'fs-1', text: "I've attended an appointment with my new adult care team", stage: 'flying-solo' },
  { id: 'fs-2', text: 'I have the contact details for my adult service and know how to reach them', stage: 'flying-solo' },
  { id: 'fs-3', text: 'I manage my own appointments, prescriptions, and repeat orders', stage: 'flying-solo' },
  { id: 'fs-4', text: "I've checked what benefits or support I'm entitled to as an adult", stage: 'flying-solo' },
  { id: 'fs-5', text: 'I feel confident explaining my needs to a new healthcare professional', stage: 'flying-solo' },
  { id: 'fs-6', text: "I have an up-to-date summary of my health that I can share if needed", stage: 'flying-solo' },
]

const stageInfo: Record<Stage, { name: string; ages: string; emoji: string; color: string }> = {
  'getting-started': { name: 'Getting Started', ages: '11-13', emoji: '🌱', color: 'from-green-400 to-green-500' },
  'building-skills': { name: 'Building Skills', ages: '14-15', emoji: '🌿', color: 'from-teal-400 to-teal-500' },
  'almost-there': { name: 'Almost There', ages: '16-17', emoji: '🚀', color: 'from-primary-400 to-primary-500' },
  'flying-solo': { name: 'Flying Solo', ages: '18+', emoji: '⭐', color: 'from-accent-400 to-accent-500' },
}

const initialData: ChecklistData = {
  completedItems: [],
  currentStage: 'almost-there',
}

export function Checklist() {
  const [data, setData] = useLocalStorage<ChecklistData>(CHECKLIST_STORAGE_KEY, initialData)
  const [showAllStages, setShowAllStages] = useState(false)

  const { completedItems, currentStage } = data

  const toggleItem = useCallback((itemId: string) => {
    setData(prev => ({
      ...prev,
      completedItems: prev.completedItems.includes(itemId)
        ? prev.completedItems.filter(id => id !== itemId)
        : [...prev.completedItems, itemId],
      lastUpdated: new Date().toISOString()
    }))
  }, [setData])

  const setStage = useCallback((stage: Stage) => {
    setData(prev => ({
      ...prev,
      currentStage: stage,
      lastUpdated: new Date().toISOString()
    }))
  }, [setData])

  // Get items for current stage (or all stages if showing all)
  const displayItems = showAllStages
    ? checklistItems
    : checklistItems.filter(item => item.stage === currentStage)

  const currentStageItems = checklistItems.filter(item => item.stage === currentStage)
  const completedInCurrentStage = currentStageItems.filter(item => completedItems.includes(item.id)).length
  const progressPercent = Math.round((completedInCurrentStage / currentStageItems.length) * 100)

  const stages: Stage[] = ['getting-started', 'building-skills', 'almost-there', 'flying-solo']

  return (
    <div className="space-y-6 animate-fade-in max-w-3xl">
      {/* Header */}
      <header className="space-y-3">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-warm-500 hover:text-primary-600 transition-colors">
          <span>←</span>
          <span>Back to Home</span>
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-3xl">✅</span>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-warm-800">My Transition Checklist</h1>
            <p className="text-sm text-warm-500">Track your progress towards independence</p>
          </div>
        </div>
      </header>

      {/* Stage Selector */}
      <section className="bg-white rounded-2xl border border-warm-200 p-4 shadow-card">
        <p className="text-sm font-medium text-warm-700 mb-3">What stage are you at?</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {stages.map(stage => {
            const info = stageInfo[stage]
            const stageItems = checklistItems.filter(item => item.stage === stage)
            const stageCompleted = stageItems.filter(item => completedItems.includes(item.id)).length
            return (
              <button
                key={stage}
                onClick={() => setStage(stage)}
                className={`relative p-3 rounded-xl border-2 text-left transition-all ${
                  currentStage === stage
                    ? 'border-primary-400 bg-primary-50'
                    : 'border-warm-200 hover:border-warm-300 bg-white'
                }`}
              >
                <span className="text-xl">{info.emoji}</span>
                <p className="font-semibold text-warm-800 text-sm mt-1">{info.name}</p>
                <p className="text-xs text-warm-500">Age {info.ages}</p>
                <p className="text-xs text-primary-600 font-medium mt-1">
                  {stageCompleted}/{stageItems.length} done
                </p>
              </button>
            )
          })}
        </div>
      </section>

      {/* Progress for current stage */}
      <section className="bg-gradient-to-br from-primary-50 to-white rounded-2xl border border-primary-100 p-5 shadow-card">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">{stageInfo[currentStage].emoji}</span>
            <div>
              <p className="font-semibold text-warm-800">{stageInfo[currentStage].name} Stage Progress</p>
              <p className="text-xs text-warm-500">Age {stageInfo[currentStage].ages}</p>
            </div>
          </div>
          <span className="text-2xl font-bold text-primary-600">{progressPercent}%</span>
        </div>
        <div className="h-3 w-full rounded-full bg-warm-100 overflow-hidden">
          <div
            className={`h-full rounded-full bg-gradient-to-r ${stageInfo[currentStage].color} transition-all duration-500`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <p className="mt-2 text-sm text-warm-600">
          {completedInCurrentStage} of {currentStageItems.length} tasks completed
        </p>
      </section>

      {/* Toggle for showing all stages */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setShowAllStages(!showAllStages)}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            showAllStages
              ? 'bg-primary-100 text-primary-700'
              : 'bg-warm-100 text-warm-600 hover:bg-warm-200'
          }`}
        >
          {showAllStages ? '📋 Showing all stages' : '📋 Show all stages'}
        </button>
      </div>

      {/* Checklist Items */}
      <section className="space-y-3">
        {showAllStages ? (
          // Group by stage when showing all
          stages.map(stage => {
            const stageItems = checklistItems.filter(item => item.stage === stage)
            if (stageItems.length === 0) return null
            return (
              <div key={stage} className="bg-white rounded-2xl border border-warm-200 overflow-hidden shadow-card">
                <div className={`px-4 py-3 bg-gradient-to-r ${stageInfo[stage].color} text-white`}>
                  <span className="mr-2">{stageInfo[stage].emoji}</span>
                  <span className="font-semibold">{stageInfo[stage].name}</span>
                  <span className="text-sm opacity-90 ml-2">({stageInfo[stage].ages})</span>
                </div>
                <div className="p-4 space-y-2">
                  {stageItems.map(item => (
                    <ChecklistItemRow
                      key={item.id}
                      item={item}
                      completed={completedItems.includes(item.id)}
                      onToggle={() => toggleItem(item.id)}
                    />
                  ))}
                </div>
              </div>
            )
          })
        ) : (
          // Show current stage items only
          <div className="bg-white rounded-2xl border border-warm-200 p-4 shadow-card space-y-2">
            {displayItems.map(item => (
              <ChecklistItemRow
                key={item.id}
                item={item}
                completed={completedItems.includes(item.id)}
                onToggle={() => toggleItem(item.id)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Encouragement */}
      {progressPercent === 100 && (
        <div className="bg-gradient-to-br from-accent-50 to-white rounded-2xl border border-accent-200 p-5 text-center">
          <span className="text-4xl">🎉</span>
          <p className="mt-2 font-semibold text-warm-800">Amazing work!</p>
          <p className="text-sm text-warm-600">
            You've completed all the {stageInfo[currentStage].name} stage tasks!
          </p>
        </div>
      )}

      {progressPercent > 0 && progressPercent < 100 && (
        <div className="bg-gradient-to-br from-primary-50 to-white rounded-2xl border border-primary-100 p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💪</span>
            <div className="text-sm text-warm-600">
              <p className="font-semibold text-warm-800">Keep going!</p>
              <p>Every task you complete brings you closer to feeling confident about adult services.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

interface ChecklistItemRowProps {
  item: ChecklistItem
  completed: boolean
  onToggle: () => void
}

function ChecklistItemRow({ item, completed, onToggle }: ChecklistItemRowProps) {
  return (
    <button
      onClick={onToggle}
      className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all ${
        completed
          ? 'bg-green-50 border border-green-200'
          : 'bg-warm-50 border border-warm-200 hover:border-primary-200 hover:bg-primary-50/50'
      }`}
    >
      <span className={`flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center text-sm ${
        completed
          ? 'bg-green-500 text-white'
          : 'bg-white border-2 border-warm-300'
      }`}>
        {completed && '✓'}
      </span>
      <span className={`flex-1 text-sm ${completed ? 'text-green-700 line-through' : 'text-warm-700'}`}>
        {item.text}
      </span>
    </button>
  )
}

// Export helper function for getting checklist progress (used by Home page)
export function getChecklistProgress(): { completed: number; total: number; stage: Stage; percent: number } {
  const stored = localStorage.getItem(CHECKLIST_STORAGE_KEY)
  if (!stored) {
    const defaultStageItems = checklistItems.filter(item => item.stage === 'almost-there')
    return { completed: 0, total: defaultStageItems.length, stage: 'almost-there', percent: 0 }
  }

  try {
    const data: ChecklistData = JSON.parse(stored)
    // Handle migration from old RSG stage names
    const stageMap: Record<string, Stage> = {
      'ready': 'getting-started',
      'steady': 'building-skills',
      'go': 'almost-there',
      'adult': 'flying-solo',
    }
    const currentStage = stageMap[data.currentStage] || data.currentStage as Stage
    const stageItems = checklistItems.filter(item => item.stage === currentStage)
    const completed = stageItems.filter(item => data.completedItems.includes(item.id)).length
    const percent = Math.round((completed / stageItems.length) * 100)
    return { completed, total: stageItems.length, stage: currentStage, percent }
  } catch {
    const defaultStageItems = checklistItems.filter(item => item.stage === 'almost-there')
    return { completed: 0, total: defaultStageItems.length, stage: 'almost-there', percent: 0 }
  }
}
