import type { ReactNode } from 'react'

interface QuickActionTileProps {
  icon: ReactNode
  title: string
  href?: string
  badge?: string | number
  progress?: number // 0-100
  disabled?: boolean
}

export function QuickActionTile({ icon, title, href, badge, progress, disabled }: QuickActionTileProps) {
  const content = (
    <div
      className={`group/tile relative flex flex-col items-center justify-center rounded-2xl border bg-white px-3 py-5 text-center shadow-card transition-all duration-300 ${
        disabled
          ? 'border-warm-100 opacity-60 cursor-not-allowed'
          : 'border-warm-200 hover:border-primary-300 hover:shadow-card-hover hover:-translate-y-1 hover:bg-gradient-to-br hover:from-white hover:to-primary-50/30'
      }`}
    >
      {badge !== undefined && (
        <span className="absolute -top-2 -right-2 inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-gradient-to-r from-primary-500 to-primary-600 px-2 text-[0.7rem] font-bold text-white shadow-sm animate-pulse">
          {badge}
        </span>
      )}

      <span className={`text-3xl transition-transform duration-300 ${!disabled ? 'group-hover/tile:scale-110 group-hover/tile:rotate-3' : ''}`}>{icon}</span>
      <p className={`mt-2 text-sm font-medium transition-colors duration-300 ${!disabled ? 'text-warm-700 group-hover/tile:text-primary-600' : 'text-warm-700'}`}>{title}</p>

      {progress !== undefined && (
        <div className="mt-3 h-1.5 w-full max-w-[5rem] rounded-full bg-warm-100 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-accent-400 to-accent-500 transition-all duration-500"
            style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
          />
        </div>
      )}
    </div>
  )

  if (disabled || !href) {
    return content
  }

  return (
    <a href={href} className="block group">
      {content}
    </a>
  )
}
