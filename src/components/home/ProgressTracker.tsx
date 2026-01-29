import { useTranslation } from 'react-i18next'

interface ProgressTrackerProps {
  stageName: string
  percent: number // 0-100
}

export function ProgressTracker({ stageName, percent }: ProgressTrackerProps) {
  const { t } = useTranslation()
  const clamped = Math.min(100, Math.max(0, percent))

  const motivationalKey =
    clamped >= 75
      ? 'home.progress.motivational.threeQuarter'
      : clamped >= 50
        ? 'home.progress.motivational.half'
        : clamped >= 25
          ? 'home.progress.motivational.quarter'
          : 'home.progress.motivational.start'

  const motivationalEmoji =
    clamped >= 75 ? '🎉' : clamped >= 50 ? '💪' : clamped >= 25 ? '⭐' : '🚀'

  return (
    <section className="rounded-2xl border border-warm-200 bg-gradient-to-r from-white to-accent-50/30 px-5 py-5 shadow-card hover:shadow-card-hover transition-shadow duration-300">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-warm-500">{t('home.progress.label')}</p>
          <p className="mt-1 text-lg font-bold text-warm-800">
            {t('home.progress.throughStage', { percent: clamped, stage: stageName })}
          </p>
        </div>
        <p className="text-sm text-warm-600 font-medium bg-white px-3 py-1.5 rounded-full border border-warm-100 shadow-sm">
          {t(motivationalKey)} {motivationalEmoji}
        </p>
      </div>
      <div className="mt-4 h-3 w-full rounded-full bg-warm-100 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-accent-400 via-accent-500 to-primary-400 transition-all duration-700 ease-out"
          style={{ width: `${clamped}%` }}
        />
      </div>
      <p className="mt-3 text-sm text-warm-500">
        <span className="font-medium">{t('home.progress.howToReach')}</span> {t('home.progress.completeTasksIn')}{' '}
        <a href="/checklist" className="text-primary-600 hover:text-primary-700 font-semibold underline underline-offset-2">
          {t('nav.checklist')}
        </a>{' '}
        {t('home.progress.tickOff')}
      </p>
    </section>
  )
}
