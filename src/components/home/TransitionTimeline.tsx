interface TimelineStage {
  age: string
  title: string
  subtitle: string
  emoji: string
  color: string
  bgColor: string
  borderColor: string
}

const stages: TimelineStage[] = [
  {
    age: '11-13',
    title: 'Ready',
    subtitle: 'Start learning about your health',
    emoji: '🌱',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
  },
  {
    age: '14-15',
    title: 'Steady',
    subtitle: 'Practice doing more yourself',
    emoji: '🌿',
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
  },
  {
    age: '16-17',
    title: 'Go',
    subtitle: 'You can make your own decisions',
    emoji: '🚀',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
  },
  {
    age: '18+',
    title: 'Adult Services',
    subtitle: 'Welcome to your new team',
    emoji: '🎓',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
  },
]

interface TransitionTimelineProps {
  currentStage?: 'ready' | 'steady' | 'go' | 'adult'
  compact?: boolean
  onStageClick?: (stage: 'ready' | 'steady' | 'go' | 'adult') => void
}

const stageKeys: ('ready' | 'steady' | 'go' | 'adult')[] = ['ready', 'steady', 'go', 'adult']

export function TransitionTimeline({ currentStage, compact = false, onStageClick }: TransitionTimelineProps) {
  const stageIndex = currentStage
    ? { ready: 0, steady: 1, go: 2, adult: 3 }[currentStage]
    : undefined

  if (compact) {
    return (
      <div className="flex items-center justify-between gap-2 p-4 rounded-2xl bg-white/80 backdrop-blur-sm border border-warm-200 shadow-card">
        {stages.map((stage, index) => {
          const isActive = stageIndex === index
          const isPast = stageIndex !== undefined && index < stageIndex

          return (
            <div key={stage.age} className="flex items-center flex-1">
              {/* Stage dot */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all ${
                    isActive
                      ? `${stage.bgColor} ${stage.borderColor} border-2 ring-2 ring-offset-2 ring-${stage.color.replace('text-', '')}/30`
                      : isPast
                      ? `${stage.bgColor} ${stage.borderColor} border`
                      : 'bg-warm-100 border border-warm-200'
                  }`}
                >
                  {stage.emoji}
                </div>
                <span className={`text-xs mt-1 font-medium ${isActive ? stage.color : 'text-warm-500'}`}>
                  {stage.age}
                </span>
              </div>

              {/* Connector line */}
              {index < stages.length - 1 && (
                <div
                  className={`flex-1 h-1 mx-2 rounded-full ${
                    isPast ? 'bg-accent-300' : 'bg-warm-200'
                  }`}
                />
              )}
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Desktop: Horizontal timeline */}
      <div className="hidden sm:block">
        <div className="relative">
          {/* Background line */}
          <div className="absolute top-8 left-0 right-0 h-1 bg-warm-200 rounded-full" />

          {/* Progress line */}
          {stageIndex !== undefined && stageIndex > 0 && (
            <div
              className="absolute top-8 left-0 h-1 bg-gradient-to-r from-accent-400 to-accent-500 rounded-full transition-all duration-500"
              style={{ width: `${(stageIndex / (stages.length - 1)) * 100}%` }}
            />
          )}

          {/* Stage cards */}
          <div className="relative grid grid-cols-4 gap-4">
            {stages.map((stage, index) => {
              const isActive = stageIndex === index
              const isPast = stageIndex !== undefined && index < stageIndex
              const isClickable = !!onStageClick

              return (
                <div key={stage.age} className="flex flex-col items-center">
                  {/* Stage circle */}
                  <button
                    type="button"
                    onClick={() => onStageClick?.(stageKeys[index])}
                    disabled={!isClickable}
                    className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl transition-all z-10 ${
                      isClickable ? 'cursor-pointer hover:scale-110' : ''
                    } ${
                      isActive
                        ? `${stage.bgColor} ${stage.borderColor} border-2 shadow-lg ring-4 ring-offset-2 ring-${stage.color.replace('text-', '')}/20`
                        : isPast
                        ? `${stage.bgColor} ${stage.borderColor} border-2`
                        : 'bg-white border-2 border-warm-200'
                    }`}
                  >
                    {stage.emoji}
                  </button>

                  {/* Stage info */}
                  <div className={`mt-4 text-center p-3 rounded-xl transition-all ${
                    isActive ? `${stage.bgColor} ${stage.borderColor} border` : ''
                  }`}>
                    <span className={`block text-sm font-bold ${isActive ? stage.color : 'text-warm-600'}`}>
                      Age {stage.age}
                    </span>
                    <span className={`block text-base font-bold mt-1 ${isActive ? stage.color : 'text-warm-800'}`}>
                      {stage.title}
                    </span>
                    <span className="block text-xs text-warm-500 mt-1">
                      {stage.subtitle}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Mobile: Vertical timeline */}
      <div className="sm:hidden space-y-3">
        {stages.map((stage, index) => {
          const isActive = stageIndex === index
          const isPast = stageIndex !== undefined && index < stageIndex
          const isClickable = !!onStageClick

          return (
            <div key={stage.age} className="flex items-start gap-4">
              {/* Timeline column */}
              <div className="flex flex-col items-center">
                <button
                  type="button"
                  onClick={() => onStageClick?.(stageKeys[index])}
                  disabled={!isClickable}
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-xl shrink-0 ${
                    isClickable ? 'cursor-pointer hover:scale-110 transition-transform' : ''
                  } ${
                    isActive
                      ? `${stage.bgColor} ${stage.borderColor} border-2 shadow-md`
                      : isPast
                      ? `${stage.bgColor} ${stage.borderColor} border`
                      : 'bg-white border border-warm-200'
                  }`}
                >
                  {stage.emoji}
                </button>
                {index < stages.length - 1 && (
                  <div
                    className={`w-0.5 flex-1 my-2 min-h-[2rem] ${
                      isPast ? 'bg-accent-300' : 'bg-warm-200'
                    }`}
                  />
                )}
              </div>

              {/* Content */}
              <div className={`flex-1 pb-4 ${isActive ? '' : ''}`}>
                <div className={`p-3 rounded-xl ${isActive ? `${stage.bgColor} ${stage.borderColor} border` : ''}`}>
                  <span className={`text-xs font-bold ${isActive ? stage.color : 'text-warm-500'}`}>
                    Age {stage.age}
                  </span>
                  <h4 className={`text-lg font-bold ${isActive ? stage.color : 'text-warm-800'}`}>
                    {stage.title}
                  </h4>
                  <p className="text-sm text-warm-600 mt-1">
                    {stage.subtitle}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
