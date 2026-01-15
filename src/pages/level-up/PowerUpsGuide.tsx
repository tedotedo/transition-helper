import { useState } from 'react'
import { Link } from 'react-router-dom'
import { powers } from '../../data/level-up/powers'
import { useLevelUpProgress } from '../../hooks'

export default function PowerUpsGuide() {
  const { progress, viewPower, hasBadge } = useLevelUpProgress()
  const [expandedPower, setExpandedPower] = useState<string | null>(null)

  const handleExpand = (powerId: string) => {
    if (expandedPower === powerId) {
      setExpandedPower(null)
    } else {
      setExpandedPower(powerId)
      viewPower(powerId)
    }
  }

  const allViewed = progress.powersViewed.length >= powers.length
  const earnedBadge = hasBadge('power-collector')

  const stageLabels = {
    'getting-ready': 'Getting Ready (11-13)',
    'getting-steady': 'Getting Steady (14-15)',
    'ready-steady': 'Ready Steady (16-17)',
    'go': 'Go! (18+)',
  }

  const groupedPowers = powers.reduce((acc, power) => {
    if (!acc[power.stage]) acc[power.stage] = []
    acc[power.stage].push(power)
    return acc
  }, {} as Record<string, typeof powers>)

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-20 md:pb-8">
      {/* Header */}
      <header className="space-y-3">
        <Link
          to="/level-up"
          className="inline-flex items-center gap-2 text-sm text-warm-500 hover:text-primary-600 transition-colors"
        >
          ← Back to Level Up
        </Link>

        <div className="flex items-center gap-3">
          <span className="text-3xl">⚡</span>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-warm-800">
              Power-Ups Guide
            </h1>
            <p className="text-sm text-warm-500">
              Abilities you unlock as you grow
            </p>
          </div>
        </div>
      </header>

      {/* Progress */}
      <div className="bg-white rounded-2xl border border-warm-200 shadow-card p-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm text-warm-600">Powers discovered</span>
            <div className="text-xl font-bold text-warm-800">
              {progress.powersViewed.length} / {powers.length}
            </div>
          </div>
          {earnedBadge && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-50 rounded-full">
              <span>⚡</span>
              <span className="text-sm font-medium text-amber-700">Badge earned!</span>
            </div>
          )}
        </div>
      </div>

      {/* Success message */}
      {allViewed && (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-200 p-5 text-center">
          <span className="text-3xl mb-2 block">🌟</span>
          <p className="font-semibold text-warm-800">You've discovered all powers!</p>
          <p className="text-sm text-warm-600 mt-1">
            Now you know what abilities await you.
          </p>
        </div>
      )}

      {/* Powers by stage */}
      {Object.entries(groupedPowers).map(([stage, stagePowers]) => (
        <div key={stage} className="space-y-3">
          <h2 className="font-semibold text-warm-700 px-1 flex items-center gap-2">
            <span className="text-lg">
              {stage === 'getting-ready' && '🌱'}
              {stage === 'getting-steady' && '🌿'}
              {stage === 'ready-steady' && '🌳'}
              {stage === 'go' && '🌲'}
            </span>
            {stageLabels[stage as keyof typeof stageLabels]}
          </h2>

          <div className="space-y-3">
            {stagePowers.map(power => {
              const isExpanded = expandedPower === power.id
              const isViewed = progress.powersViewed.includes(power.id)

              return (
                <div
                  key={power.id}
                  className="bg-white rounded-2xl border border-warm-200 shadow-card overflow-hidden"
                >
                  <button
                    onClick={() => handleExpand(power.id)}
                    className="w-full p-4 flex items-center gap-4 text-left hover:bg-warm-50/50 transition-colors"
                    aria-expanded={isExpanded}
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                      style={{ backgroundColor: `${power.color}20` }}
                    >
                      {power.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-warm-800">{power.name}</h3>
                        {isViewed && <span className="text-accent-500 text-sm">✓</span>}
                      </div>
                      <p className="text-sm text-warm-500">{power.shortDescription}</p>
                    </div>
                    <div className="flex-shrink-0 flex items-center gap-2">
                      <span className="text-xs font-medium px-2 py-1 rounded-full bg-warm-100 text-warm-600">
                        Age {power.unlockAge}+
                      </span>
                      <span className={`text-warm-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                        ▼
                      </span>
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="px-4 pb-4 border-t border-warm-100">
                      <div className="pt-4 space-y-4">
                        <p className="text-warm-700">{power.fullDescription}</p>

                        <div>
                          <h4 className="text-sm font-medium text-warm-600 mb-2">Examples:</h4>
                          <ul className="space-y-2">
                            {power.examples.map((example, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-warm-600">
                                <span className="text-accent-500 mt-0.5">•</span>
                                <span>{example}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      ))}

      {/* Tip */}
      <div className="bg-warm-50 rounded-xl p-4 text-center">
        <p className="text-sm text-warm-600">
          💡 You don't have to use all your powers at once - go at your own pace!
        </p>
      </div>
    </div>
  )
}
