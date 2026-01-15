import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLevelUpProgress } from '../../hooks'

export default function LevelUpHome() {
  const { trackVisit, getStats } = useLevelUpProgress()
  const stats = getStats()

  // Track visit when component mounts
  useEffect(() => {
    trackVisit()
  }, [])

  const activities = [
    {
      id: 'myths',
      path: '/level-up/myths',
      icon: '🔍',
      name: 'Myth Busters',
      description: 'Flip fears into facts',
      progress: `${stats.mythsFlipped}/${stats.totalMyths}`,
      color: 'from-purple-400 to-purple-500',
    },
    {
      id: 'powers',
      path: '/level-up/powers',
      icon: '⚡',
      name: 'Power-Ups',
      description: 'Discover abilities you\'ll unlock',
      progress: `${stats.powersViewed}/${stats.totalPowers}`,
      color: 'from-amber-400 to-orange-500',
    },
    {
      id: 'badges',
      path: '/level-up/badges',
      icon: '🏆',
      name: 'My Badges',
      description: 'See your achievements',
      progress: `${stats.earnedBadges}/${stats.totalBadges}`,
      color: 'from-teal-400 to-teal-500',
    },
  ]

  const progressPercent = Math.round(
    ((stats.mythsFlipped + stats.powersViewed) / (stats.totalMyths + stats.totalPowers)) * 100
  )

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-20 md:pb-8">
      {/* Header */}
      <header className="space-y-3">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-warm-500 hover:text-primary-600 transition-colors"
        >
          ← Back to Home
        </Link>

        <div className="text-center py-4">
          <span className="text-5xl mb-3 block">🚀</span>
          <h1 className="text-2xl md:text-3xl font-bold text-warm-800">
            Level Up
          </h1>
          <p className="text-warm-600 mt-1">
            Your Transition Adventure
          </p>
        </div>
      </header>

      {/* Main message card */}
      <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl border border-warm-200 p-6 text-center">
        <p className="text-lg font-medium text-warm-800">
          Transition isn't about losing support...
        </p>
        <p className="text-xl font-bold text-primary-600 mt-2">
          It's about gaining superpowers! 💪
        </p>
      </div>

      {/* Overall progress */}
      <div className="bg-white rounded-2xl border border-warm-200 shadow-card p-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-warm-800">Your Progress</h2>
          <span className="text-sm font-medium text-primary-600">{progressPercent}%</span>
        </div>
        <div className="h-3 bg-warm-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary-400 to-accent-400 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <p className="text-sm text-warm-500 mt-2">
          {stats.earnedBadges > 0
            ? `You've earned ${stats.earnedBadges} badge${stats.earnedBadges !== 1 ? 's' : ''}!`
            : 'Start exploring to earn badges!'}
        </p>
      </div>

      {/* Activity tiles */}
      <div className="space-y-3">
        <h2 className="font-semibold text-warm-800 px-1">Activities</h2>
        <div className="grid gap-4">
          {activities.map(activity => (
            <Link
              key={activity.id}
              to={activity.path}
              className="bg-white rounded-2xl border border-warm-200 shadow-card hover:shadow-card-hover transition-all p-5 flex items-center gap-4"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${activity.color} flex items-center justify-center text-2xl flex-shrink-0`}>
                {activity.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-warm-800">{activity.name}</h3>
                <p className="text-sm text-warm-500">{activity.description}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="text-sm font-medium text-warm-600">{activity.progress}</div>
                <div className="text-xs text-warm-400">complete</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Coming soon placeholder */}
      <div className="bg-warm-50 rounded-2xl border border-warm-200 border-dashed p-5">
        <h3 className="font-medium text-warm-600 mb-2">Coming Soon</h3>
        <div className="grid grid-cols-2 gap-3 text-sm text-warm-500">
          <div className="flex items-center gap-2">
            <span>🗺️</span>
            <span>Journey Map</span>
          </div>
          <div className="flex items-center gap-2">
            <span>🎮</span>
            <span>Practice Zone</span>
          </div>
          <div className="flex items-center gap-2">
            <span>💬</span>
            <span>Real Stories</span>
          </div>
        </div>
      </div>

      {/* Encouragement */}
      <div className="text-center py-4">
        <p className="text-warm-500 text-sm">
          Remember: Every expert was once a beginner! 🌟
        </p>
      </div>
    </div>
  )
}
