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
      className={`relative flex flex-col items-center justify-center rounded-2xl border bg-white px-3 py-5 text-center shadow-card transition-all duration-300 ${
        disabled
          ? 'border-warm-100 opacity-60 cursor-not-allowed'
          : 'border-warm-200 hover:border-primary-300 hover:shadow-card-hover hover:-translate-y-1'
      }`}
    >
      {badge !== undefined && (
        <span className="absolute -top-2 -right-2 inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-gradient-to-r from-primary-500 to-primary-600 px-2 text-[0.7rem] font-bold text-white shadow-sm">
          {badge}
        </span>
      )}

      <span className="text-3xl">{icon}</span>
      <p className="mt-2 text-sm font-medium text-warm-700">{title}</p>

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
