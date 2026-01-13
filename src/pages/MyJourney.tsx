import { useState } from 'react'

type StageKey = 'ready' | 'steady' | 'go' | 'adult'

const stages: { key: StageKey; name: string; ages: string; tagline: string; description: string; emoji: string }[] = [
  {
    key: 'ready',
    name: 'Ready',
    ages: 'Age 11–13',
    tagline: 'Start learning about your health',
    emoji: '🌱',
    description:
      "This is where it all begins! You're starting to learn more about your condition and getting to know the people who help look after you.",
  },
  {
    key: 'steady',
    name: 'Steady',
    ages: 'Age 14–15',
    tagline: 'Building your confidence',
    emoji: '💪',
    description:
      "You're practising small steps towards independence - like speaking up about how you feel, knowing your medicines, and asking questions.",
  },
  {
    key: 'go',
    name: 'Go',
    ages: 'Age 16–17',
    tagline: 'Getting ready for the move',
    emoji: '🚀',
    description:
      "You're usually old enough now to make decisions about your own care. This is the time to plan your move to adult services!",
  },
  {
    key: 'adult',
    name: 'Hello adult services!',
    ages: 'Age 18+',
    tagline: 'Welcome to your new team',
    emoji: '🎉',
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
    <div className="space-y-8 animate-fade-in">
      <header className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-warm-500">My journey</p>
        <h1 className="text-2xl md:text-3xl font-bold text-warm-800">Your journey to adult care 🗺️</h1>
        <p className="max-w-2xl text-sm md:text-base text-warm-600 leading-relaxed">
          Small steps over time make a big difference! Here are the main stages and some things you can do to feel more ready and confident.
        </p>
      </header>

      <section className="space-y-4">
        <div className="grid gap-3 md:grid-cols-4">
          {stages.map((stage) => (
            <button
              key={stage.key}
              type="button"
              onClick={() => setActiveStage(stage.key)}
              className={`flex flex-col rounded-2xl border px-4 py-4 text-left text-sm transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-300 ${
                stage.key === activeStage
                  ? 'border-primary-300 bg-gradient-to-br from-primary-50 to-white shadow-card-hover ring-2 ring-primary-200'
                  : 'border-warm-200 bg-white hover:border-primary-200 hover:shadow-card hover:-translate-y-0.5'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">{stage.emoji}</span>
                <span className="text-[0.7rem] font-semibold uppercase tracking-wider text-warm-500">{stage.ages}</span>
              </div>
              <span className={`mt-2 text-base font-semibold ${stage.key === activeStage ? 'text-primary-700' : 'text-warm-800'}`}>
                {stage.name}
              </span>
              <span className="mt-1 text-xs text-warm-500">{stage.tagline}</span>
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
    <section className="mt-4 rounded-2xl border border-warm-200 bg-white px-5 py-5 shadow-card">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">{stage.emoji}</span>
            <p className="text-xs font-semibold uppercase tracking-wider text-warm-500">{stage.ages}</p>
          </div>
          <h2 className="mt-1 text-lg md:text-xl font-bold text-warm-800">{stage.name}</h2>
        </div>
        <p className="max-w-xl text-sm text-warm-600 leading-relaxed bg-warm-50 px-4 py-3 rounded-xl border border-warm-100">{stage.description}</p>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {items.map((item) => (
          <div
            key={item.title}
            className="group flex flex-col rounded-2xl border border-warm-200 bg-gradient-to-br from-white to-warm-50/50 px-5 py-4 text-sm transition-all duration-300 hover:border-primary-200 hover:shadow-card hover:-translate-y-0.5"
          >
            <div className="flex items-start gap-3">
              <span className="text-xl">{item.emoji}</span>
              <div className="flex-1">
                <p className="text-sm font-semibold text-warm-800">{item.title}</p>
                <p className="mt-1 text-warm-600 leading-relaxed">{item.description}</p>
                {item.linkHref && item.linkLabel && (
                  <a
                    href={item.linkHref}
                    className="mt-3 inline-flex text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
                  >
                    {item.linkLabel}
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
