interface ProgressTrackerProps {
  stageName: string
  percent: number // 0-100
}

export function ProgressTracker({ stageName, percent }: ProgressTrackerProps) {
  const clamped = Math.min(100, Math.max(0, percent))
  const motivationalCopy =
    clamped >= 75
      ? "Amazing! You're nearly there! 🎉"
      : clamped >= 50
        ? "You're doing brilliantly! 💪"
        : clamped >= 25
          ? 'Great start - every step counts! ⭐'
          : "Let's get started - you've got this! 🚀"

  return (
    <section className="rounded-2xl border border-warm-200 bg-gradient-to-r from-white to-accent-50/30 px-5 py-5 shadow-card hover:shadow-card-hover transition-shadow duration-300">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-warm-500">Your progress</p>
          <p className="mt-1 text-lg font-bold text-warm-800">
            {clamped}% through the {stageName} stage
          </p>
        </div>
        <p className="text-sm text-warm-600 font-medium bg-white px-3 py-1.5 rounded-full border border-warm-100 shadow-sm">{motivationalCopy}</p>
      </div>
      <div className="mt-4 h-3 w-full rounded-full bg-warm-100 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-accent-400 via-accent-500 to-primary-400 transition-all duration-700 ease-out"
          style={{ width: `${clamped}%` }}
        />
      </div>
    </section>
  )
}
