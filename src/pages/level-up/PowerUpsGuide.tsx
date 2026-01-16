import { useState } from 'react'
import { Link } from 'react-router-dom'
import { powers } from '../../data/level-up/powers'
import { useLevelUpProgress, useEasyRead } from '../../hooks'

export default function PowerUpsGuide() {
  const { progress, viewPower, hasBadge } = useLevelUpProgress()
  const { easyRead } = useEasyRead()
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

  const easyStageLabels = {
    'getting-ready': 'Age 11-13',
    'getting-steady': 'Age 14-15',
    'ready-steady': 'Age 16-17',
    'go': 'Age 18 and older',
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
            <h1 className={`font-bold text-warm-800 ${easyRead ? 'text-3xl' : 'text-2xl md:text-3xl'}`}>
              {easyRead ? 'Your Super Powers!' : 'Power-Ups Guide'}
            </h1>
            <p className={`text-warm-500 ${easyRead ? 'text-base' : 'text-sm'}`}>
              {easyRead ? 'Things you can do as you get older' : 'Abilities you unlock as you grow'}
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
        <div className={`bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-200 ${easyRead ? 'p-6' : 'p-5'} text-center`}>
          <span className={`mb-2 block ${easyRead ? 'text-5xl' : 'text-3xl'}`}>🌟</span>
          <p className={`font-semibold text-warm-800 ${easyRead ? 'text-xl' : ''}`}>
            {easyRead ? 'You saw all your super powers!' : "You've discovered all powers!"}
          </p>
          <p className={`text-warm-600 mt-1 ${easyRead ? 'text-base' : 'text-sm'}`}>
            {easyRead ? 'These are things you CAN do!' : 'Now you know what abilities await you.'}
          </p>
        </div>
      )}

      {/* Powers by stage */}
      {Object.entries(groupedPowers).map(([stage, stagePowers]) => (
        <div key={stage} className="space-y-3">
          <h2 className={`font-semibold text-warm-700 px-1 flex items-center gap-2 ${easyRead ? 'text-lg' : ''}`}>
            <span className={easyRead ? 'text-2xl' : 'text-lg'}>
              {stage === 'getting-ready' && '🌱'}
              {stage === 'getting-steady' && '🌿'}
              {stage === 'ready-steady' && '🌳'}
              {stage === 'go' && '🌲'}
            </span>
            {easyRead
              ? easyStageLabels[stage as keyof typeof easyStageLabels]
              : stageLabels[stage as keyof typeof stageLabels]
            }
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
                    className={`w-full ${easyRead ? 'p-5' : 'p-4'} flex items-center gap-4 text-left hover:bg-warm-50/50 transition-colors`}
                    aria-expanded={isExpanded}
                  >
                    <div
                      className={`${easyRead ? 'w-14 h-14 text-3xl' : 'w-12 h-12 text-2xl'} rounded-xl flex items-center justify-center flex-shrink-0`}
                      style={{ backgroundColor: `${power.color}20` }}
                    >
                      {power.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className={`font-semibold text-warm-800 ${easyRead ? 'text-lg' : ''}`}>
                          {easyRead ? power.easyName : power.name}
                        </h3>
                        {isViewed && <span className={`text-accent-500 ${easyRead ? 'text-lg' : 'text-sm'}`}>✓</span>}
                      </div>
                      <p className={`text-warm-500 ${easyRead ? 'text-base' : 'text-sm'}`}>
                        {easyRead ? power.easyDescription : power.shortDescription}
                      </p>
                    </div>
                    <div className="flex-shrink-0 flex items-center gap-2">
                      <span className={`font-medium px-2 py-1 rounded-full bg-warm-100 text-warm-600 ${easyRead ? 'text-sm' : 'text-xs'}`}>
                        {easyRead ? `${power.unlockAge}+` : `Age ${power.unlockAge}+`}
                      </span>
                      <span className={`text-warm-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                        ▼
                      </span>
                    </div>
                  </button>

                  {isExpanded && (
                    <div className={`${easyRead ? 'px-5 pb-5' : 'px-4 pb-4'} border-t border-warm-100`}>
                      <div className="pt-4 space-y-4">
                        <p className={`text-warm-700 ${easyRead ? 'text-lg' : ''}`}>
                          {easyRead ? power.easyDescription : power.fullDescription}
                        </p>

                        <div>
                          <h4 className={`font-medium text-warm-600 mb-2 ${easyRead ? 'text-base' : 'text-sm'}`}>
                            {easyRead ? 'You can:' : 'Examples:'}
                          </h4>
                          <ul className="space-y-2">
                            {(easyRead ? power.easyExamples : power.examples).map((example, i) => (
                              <li key={i} className={`flex items-start gap-2 text-warm-600 ${easyRead ? 'text-base' : 'text-sm'}`}>
                                <span className={`text-accent-500 ${easyRead ? 'text-lg' : 'mt-0.5'}`}>
                                  {easyRead ? '✓' : '•'}
                                </span>
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
      <div className={`bg-warm-50 rounded-xl ${easyRead ? 'p-5' : 'p-4'} text-center`}>
        <p className={`text-warm-600 ${easyRead ? 'text-base' : 'text-sm'}`}>
          {easyRead ? '💡 Take your time. Do things when YOU are ready!' : "💡 You don't have to use all your powers at once - go at your own pace!"}
        </p>
      </div>
    </div>
  )
}
