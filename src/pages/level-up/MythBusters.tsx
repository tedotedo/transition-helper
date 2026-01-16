import { useState } from 'react'
import { Link } from 'react-router-dom'
import { myths } from '../../data/level-up/myths'
import { useLevelUpProgress, useEasyRead } from '../../hooks'

export default function MythBusters() {
  const { progress, flipMyth, hasBadge } = useLevelUpProgress()
  const { easyRead } = useEasyRead()
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set())

  const handleFlip = (mythId: string) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev)
      if (newSet.has(mythId)) {
        newSet.delete(mythId)
      } else {
        newSet.add(mythId)
        // Track the flip for badge progress
        flipMyth(mythId)
      }
      return newSet
    })
  }

  const allFlipped = progress.mythsFlipped.length >= myths.length
  const earnedBadge = hasBadge('myth-buster')

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
          <span className="text-3xl">🔍</span>
          <div>
            <h1 className={`font-bold text-warm-800 ${easyRead ? 'text-3xl' : 'text-2xl md:text-3xl'}`}>
              {easyRead ? 'True or False?' : 'Myth Busters'}
            </h1>
            <p className={`text-warm-500 ${easyRead ? 'text-base' : 'text-sm'}`}>
              {easyRead ? 'Tap to see what is TRUE!' : 'Tap cards to flip fears into facts!'}
            </p>
          </div>
        </div>
      </header>

      {/* Progress */}
      <div className="bg-white rounded-2xl border border-warm-200 shadow-card p-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm text-warm-600">Myths busted</span>
            <div className="text-xl font-bold text-warm-800">
              {progress.mythsFlipped.length} / {myths.length}
            </div>
          </div>
          {earnedBadge && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-accent-50 rounded-full">
              <span>🔍</span>
              <span className="text-sm font-medium text-accent-700">Badge earned!</span>
            </div>
          )}
        </div>
      </div>

      {/* Success message */}
      {allFlipped && (
        <div className={`bg-gradient-to-r from-accent-50 to-primary-50 rounded-2xl border border-accent-200 ${easyRead ? 'p-6' : 'p-5'} text-center`}>
          <span className={`mb-2 block ${easyRead ? 'text-5xl' : 'text-3xl'}`}>🎉</span>
          <p className={`font-semibold text-warm-800 ${easyRead ? 'text-xl' : ''}`}>
            {easyRead ? 'Well done! You found all the answers!' : "You've busted all the myths!"}
          </p>
          <p className={`text-warm-600 mt-1 ${easyRead ? 'text-base' : 'text-sm'}`}>
            {easyRead ? 'Now you know what is TRUE!' : 'Now you know the truth about transition.'}
          </p>
        </div>
      )}

      {/* Cards grid */}
      <div className="grid gap-4">
        {myths.map(myth => {
          const isFlipped = flippedCards.has(myth.id)
          const wasEverFlipped = progress.mythsFlipped.includes(myth.id)

          return (
            <button
              key={myth.id}
              onClick={() => handleFlip(myth.id)}
              className="w-full text-left focus:outline-none focus:ring-2 focus:ring-primary-300 rounded-2xl"
              aria-label={isFlipped ? 'Show fear' : 'Reveal fact'}
            >
              <div
                className="relative transition-all duration-500"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}
              >
                {/* Front - Fear side */}
                <div
                  className={`bg-white rounded-2xl border-2 shadow-card ${easyRead ? 'p-6' : 'p-5'} ${
                    wasEverFlipped ? 'border-accent-200' : 'border-warm-200'
                  }`}
                  style={{
                    backfaceVisibility: 'hidden',
                  }}
                >
                  <div className="flex items-start gap-3">
                    <span className={easyRead ? 'text-4xl' : 'text-2xl'}>{myth.fearEmoji}</span>
                    <div className="flex-1">
                      <div className={`font-medium text-red-500 uppercase tracking-wide mb-1 ${easyRead ? 'text-sm' : 'text-xs'}`}>
                        {easyRead ? 'Not True!' : 'Fear'}
                      </div>
                      <p className={`text-warm-800 font-medium ${easyRead ? 'text-lg' : ''}`}>
                        "{easyRead ? myth.easyFear : myth.fear}"
                      </p>
                    </div>
                    {wasEverFlipped && (
                      <span className={`text-accent-500 ${easyRead ? 'text-xl' : 'text-sm'}`}>✓</span>
                    )}
                  </div>
                  <div className="mt-3 text-center">
                    <span className={`text-warm-400 ${easyRead ? 'text-sm font-medium' : 'text-xs'}`}>
                      {easyRead ? '👆 TAP ME!' : 'tap to reveal the truth'}
                    </span>
                  </div>
                </div>

                {/* Back - Fact side */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br from-accent-50 to-primary-50 rounded-2xl border-2 border-accent-300 shadow-card ${easyRead ? 'p-6' : 'p-5'}`}
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                  }}
                >
                  <div className="flex items-start gap-3">
                    <span className={easyRead ? 'text-4xl' : 'text-2xl'}>{myth.factEmoji}</span>
                    <div className="flex-1">
                      <div className={`font-medium text-accent-600 uppercase tracking-wide mb-1 ${easyRead ? 'text-sm' : 'text-xs'}`}>
                        {easyRead ? 'TRUE! ✓' : 'Fact'}
                      </div>
                      <p className={`text-warm-800 font-medium ${easyRead ? 'text-lg' : ''}`}>
                        {easyRead ? myth.easyFact : myth.fact}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 text-center">
                    <span className={`text-warm-500 ${easyRead ? 'text-sm' : 'text-xs'}`}>
                      {easyRead ? '👆 Tap again' : 'tap to flip back'}
                    </span>
                  </div>
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {/* Tip */}
      <div className={`bg-warm-50 rounded-xl ${easyRead ? 'p-5' : 'p-4'} text-center`}>
        <p className={`text-warm-600 ${easyRead ? 'text-base' : 'text-sm'}`}>
          {easyRead ? '💡 It is OK to feel worried. Now you know what is true!' : '💡 Feeling worried is normal - but now you know the facts!'}
        </p>
      </div>
    </div>
  )
}
