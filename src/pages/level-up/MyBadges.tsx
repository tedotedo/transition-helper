import { Link } from 'react-router-dom'
import { badges, getBadgesByCategory } from '../../data/level-up/badges'
import { useLevelUpProgress } from '../../hooks'

export default function MyBadges() {
  const { hasBadge, getStats } = useLevelUpProgress()
  const stats = getStats()

  const explorerBadges = getBadgesByCategory('explorer')
  const practiceBadges = getBadgesByCategory('practice')
  const specialBadges = getBadgesByCategory('special')

  const BadgeCard = ({ badge }: { badge: typeof badges[0] }) => {
    const earned = hasBadge(badge.id)

    return (
      <div
        className={`rounded-2xl border-2 p-4 text-center transition-all ${
          earned
            ? 'bg-gradient-to-br from-amber-50 to-orange-50 border-amber-300 shadow-card'
            : 'bg-warm-50 border-warm-200 opacity-60'
        }`}
      >
        <div
          className={`text-4xl mb-2 ${earned ? '' : 'grayscale'}`}
        >
          {badge.icon}
        </div>
        <h3 className={`font-semibold text-sm ${earned ? 'text-warm-800' : 'text-warm-500'}`}>
          {badge.name}
        </h3>
        {earned ? (
          <p className="text-xs text-warm-600 mt-1">{badge.description}</p>
        ) : (
          <p className="text-xs text-warm-400 mt-1">{badge.howToEarn}</p>
        )}
        {earned && (
          <div className="mt-2">
            <span className="inline-flex items-center gap-1 text-xs font-medium text-accent-600 bg-accent-100 px-2 py-0.5 rounded-full">
              ✓ Earned
            </span>
          </div>
        )}
      </div>
    )
  }

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
          <span className="text-3xl">🏆</span>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-warm-800">
              My Badges
            </h1>
            <p className="text-sm text-warm-500">
              Your achievements collection
            </p>
          </div>
        </div>
      </header>

      {/* Progress summary */}
      <div className="bg-white rounded-2xl border border-warm-200 shadow-card p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-sm text-warm-600">Badges earned</span>
            <div className="text-2xl font-bold text-warm-800">
              {stats.earnedBadges} / {stats.totalBadges}
            </div>
          </div>
          <div className="text-5xl">
            {stats.earnedBadges === 0 && '🎯'}
            {stats.earnedBadges > 0 && stats.earnedBadges < 5 && '⭐'}
            {stats.earnedBadges >= 5 && stats.earnedBadges < 10 && '🌟'}
            {stats.earnedBadges >= 10 && '🏆'}
          </div>
        </div>
        <div className="h-3 bg-warm-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full transition-all duration-500"
            style={{ width: `${(stats.earnedBadges / stats.totalBadges) * 100}%` }}
          />
        </div>
      </div>

      {/* All badges earned celebration */}
      {stats.earnedBadges === stats.totalBadges && (
        <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-2xl border-2 border-amber-300 p-6 text-center">
          <span className="text-5xl mb-3 block">🏆</span>
          <p className="text-xl font-bold text-warm-800">Level Up Champion!</p>
          <p className="text-warm-600 mt-2">
            You've earned every single badge. Amazing work!
          </p>
        </div>
      )}

      {/* Explorer badges */}
      <section className="space-y-3">
        <h2 className="font-semibold text-warm-700 px-1 flex items-center gap-2">
          <span>🗺️</span>
          Explorer Badges
        </h2>
        <p className="text-sm text-warm-500 px-1">Earned by exploring all the content</p>
        <div className="grid grid-cols-2 gap-3">
          {explorerBadges.map(badge => (
            <BadgeCard key={badge.id} badge={badge} />
          ))}
        </div>
      </section>

      {/* Practice badges */}
      <section className="space-y-3">
        <h2 className="font-semibold text-warm-700 px-1 flex items-center gap-2">
          <span>🎮</span>
          Practice Badges
        </h2>
        <p className="text-sm text-warm-500 px-1">Earned by completing practice scenarios</p>
        <div className="grid grid-cols-2 gap-3">
          {practiceBadges.map(badge => (
            <BadgeCard key={badge.id} badge={badge} />
          ))}
        </div>
        <p className="text-xs text-warm-400 text-center italic">
          Practice Zone coming soon!
        </p>
      </section>

      {/* Special badges */}
      <section className="space-y-3">
        <h2 className="font-semibold text-warm-700 px-1 flex items-center gap-2">
          <span>✨</span>
          Special Badges
        </h2>
        <p className="text-sm text-warm-500 px-1">Extra achievements for dedication</p>
        <div className="grid grid-cols-2 gap-3">
          {specialBadges.map(badge => (
            <BadgeCard key={badge.id} badge={badge} />
          ))}
        </div>
      </section>

      {/* Encouragement */}
      <div className="bg-warm-50 rounded-xl p-4 text-center">
        <p className="text-sm text-warm-600">
          {stats.earnedBadges === 0
            ? '💪 Start exploring to earn your first badge!'
            : stats.earnedBadges < 5
              ? '🌟 Great start! Keep going to collect more badges.'
              : '🔥 You\'re on fire! So close to collecting them all!'}
        </p>
      </div>
    </div>
  )
}
