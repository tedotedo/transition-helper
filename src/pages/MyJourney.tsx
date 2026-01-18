import { useState } from 'react'

type StageKey = 'ready' | 'steady' | 'go' | 'adult'

const stages: { key: StageKey; name: string; ages: string; tagline: string; description: string; emoji: string; color: string; bgGradient: string }[] = [
  {
    key: 'ready',
    name: 'Ready',
    ages: 'Age 11–13',
    tagline: 'Start learning about your health',
    emoji: '🌱',
    color: 'text-green-600',
    bgGradient: 'from-green-50 to-emerald-50 border-green-200 hover:border-green-300',
    description:
      "This is where it all begins! You're starting to learn more about your condition and getting to know the people who help look after you.",
  },
  {
    key: 'steady',
    name: 'Steady',
    ages: 'Age 14–15',
    tagline: 'Building your confidence',
    emoji: '💪',
    color: 'text-blue-600',
    bgGradient: 'from-blue-50 to-sky-50 border-blue-200 hover:border-blue-300',
    description:
      "You're practising small steps towards independence - like speaking up about how you feel, knowing your medicines, and asking questions.",
  },
  {
    key: 'go',
    name: 'Go',
    ages: 'Age 16–17',
    tagline: 'Getting ready for the move',
    emoji: '🚀',
    color: 'text-primary-600',
    bgGradient: 'from-primary-50 to-orange-50 border-primary-200 hover:border-primary-300',
    description:
      "You're usually old enough now to make decisions about your own care. This is the time to plan your move to adult services!",
  },
  {
    key: 'adult',
    name: 'Hello adult services!',
    ages: 'Age 18+',
    tagline: 'Welcome to your new team',
    emoji: '🎉',
    color: 'text-purple-600',
    bgGradient: 'from-purple-50 to-pink-50 border-purple-200 hover:border-purple-300',
    description:
      "You've made it to adult services! Now it's about getting to know how your new team works and what support is out there for you.",
  },
]

const tasks: Record<
  StageKey,
  { title: string; description: string; linkLabel?: string; linkHref?: string; emoji: string }[]
> = {
  ready: [
    {
      title: 'Learn about your condition',
      emoji: '📚',
      description: 'Have a go at explaining your condition in your own words - what is it and what does it mean for you?',
      linkLabel: 'Start activity →',
      linkHref: '/journey/learn-about-condition',
    },
    {
      title: 'Get to know your team',
      emoji: '👋',
      description: 'Start noticing who helps look after you - your nurse, doctor, therapist, or GP.',
      linkLabel: 'Meet your team →',
      linkHref: '/journey/my-team',
    },
  ],
  steady: [
    {
      title: 'Speak up at appointments',
      emoji: '💬',
      description: 'Try answering a question or two yourself at your next appointment - you can do it!',
      linkLabel: 'Practice speaking up →',
      linkHref: '/journey/speak-up',
    },
    {
      title: 'Know your medicines',
      emoji: '💊',
      description: 'Learn what your medicines are for and when you need to take them.',
      linkLabel: 'Track my medicines →',
      linkHref: '/journey/my-medicines',
    },
  ],
  go: [
    {
      title: 'Check out the consent guide',
      emoji: '✨',
      description:
        'Find out who can agree to treatment, how staff check if you can make decisions, and how your family can still be involved.',
      linkLabel: 'Open consent guide →',
      linkHref: '/rights/consent-16-17',
    },
    {
      title: 'Fill in the Go questionnaire',
      emoji: '📋',
      description:
        'Use the Ready Steady Go questionnaire to think about how ready you feel for adult services.',
      linkLabel: 'Start questionnaire →',
      linkHref: '/resources/ready-steady-go/go-questionnaire',
    },
    {
      title: 'Ask about your move date',
      emoji: '📅',
      description:
        "Chat with your team about when you're likely to move to adult services, and what your new service will be called.",
      linkLabel: 'Plan my move →',
      linkHref: '/journey/move-date',
    },
    {
      title: 'Look into PIP',
      emoji: '💰',
      description:
        'If you\'re turning 16 and have extra care or mobility needs, it\'s worth checking out Personal Independence Payment (PIP).',
      linkLabel: 'Learn about PIP →',
      linkHref: '/journey/pip',
    },
  ],
  adult: [
    {
      title: 'Say hello to your new team',
      emoji: '🤝',
      description: 'Get to know the names of your new adult doctors and nurses, and find out how to get in touch with them.',
      linkLabel: 'Meet my new team →',
      linkHref: '/journey/new-team',
    },
    {
      title: 'Check your support',
      emoji: '🛡️',
      description:
        'Make sure you\'ve got the right support at college, work, or home - and know who to talk to if things change.',
      linkLabel: 'Review my support →',
      linkHref: '/journey/check-support',
    },
  ],
}

export function MyJourney() {
  const [activeStage, setActiveStage] = useState<StageKey>('go')

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      {/* Friendly header */}
      <header className="text-center space-y-4 py-4">
        <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary-100 to-accent-100 px-4 py-2 text-sm font-bold text-primary-700">
          <span className="text-xl">🗺️</span>
          <span>Your Adventure Map</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-warm-800 leading-tight">
          Every step counts! ✨
        </h1>
        <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-warm-600 leading-relaxed font-medium">
          Growing up is an adventure — tap a stage below to see what's coming up and discover things you can try!
        </p>
      </header>

      <section className="space-y-5">
        {/* Stage selector cards */}
        <div className="grid gap-3 grid-cols-2 md:grid-cols-4">
          {stages.map((stage) => (
            <button
              key={stage.key}
              type="button"
              onClick={() => setActiveStage(stage.key)}
              className={`flex flex-col rounded-2xl border-2 px-4 py-4 text-left transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-300 bg-gradient-to-br ${stage.bgGradient} ${
                stage.key === activeStage
                  ? 'shadow-lg ring-2 ring-primary-300 scale-[1.02]'
                  : 'hover:shadow-card hover:-translate-y-1'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-2xl sm:text-3xl">{stage.emoji}</span>
                <span className="text-[0.65rem] sm:text-xs font-bold uppercase tracking-wider text-warm-500">{stage.ages}</span>
              </div>
              <span className={`mt-2 text-base sm:text-lg font-bold ${stage.key === activeStage ? stage.color : 'text-warm-800'}`}>
                {stage.name}
              </span>
              <span className="mt-1 text-xs sm:text-sm text-warm-500 font-medium">{stage.tagline}</span>
            </button>
          ))}
        </div>

        <JourneyStageDetail stageKey={activeStage} />
      </section>
    </div>
  )
}

interface JourneyStageDetailProps {
  stageKey: StageKey
}

function JourneyStageDetail({ stageKey }: JourneyStageDetailProps) {
  const stage = stages.find((s) => s.key === stageKey)!
  const items = tasks[stageKey]

  return (
    <section className={`relative mt-4 rounded-3xl border-2 overflow-hidden px-5 py-6 sm:px-6 sm:py-8 shadow-lg bg-gradient-to-br ${stage.bgGradient}`}>
      {/* Subtle animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/30 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute -bottom-20 -left-20 w-32 h-32 bg-white/20 rounded-full blur-2xl" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-white/10 rounded-full blur-xl animate-pulse-soft" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
          <div className="flex items-center gap-3">
            <span className="text-4xl sm:text-5xl">{stage.emoji}</span>
            <div>
              <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-warm-500">{stage.ages}</p>
              <h2 className={`text-2xl sm:text-3xl font-black ${stage.color}`}>{stage.name}</h2>
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm px-4 py-3 rounded-2xl border border-white/50 shadow-sm max-w-md">
            <p className="text-sm sm:text-base text-warm-700 leading-relaxed font-medium">{stage.description}</p>
          </div>
        </div>

        {/* Task cards */}
        <div className="grid gap-4 sm:grid-cols-2">
          {items.map((item, index) => (
            <div
              key={item.title}
              className="group flex flex-col rounded-2xl border-2 border-white/60 bg-white/90 backdrop-blur-sm px-5 py-5 transition-all duration-300 hover:bg-white hover:shadow-lg hover:-translate-y-1 hover:border-primary-200"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start gap-4">
                <span className="text-3xl sm:text-4xl flex-shrink-0">{item.emoji}</span>
                <div className="flex-1">
                  <p className="text-base sm:text-lg font-bold text-warm-800">{item.title}</p>
                  <p className="mt-2 text-sm sm:text-base text-warm-600 leading-relaxed">{item.description}</p>
                  {item.linkHref && item.linkLabel && (
                    <a
                      href={item.linkHref}
                      className="mt-4 inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white text-sm font-bold shadow-md hover:shadow-lg hover:scale-105 transition-all"
                    >
                      {item.linkLabel.replace(' →', '')}
                      <span className="ml-1">→</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
