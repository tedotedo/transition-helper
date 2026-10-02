import { useState } from 'react'
import { Link } from 'react-router-dom'
import ReadAloud from '../components/ReadAloud'

type StageKey = 'getting-started' | 'building-skills' | 'almost-there' | 'flying-solo'

interface PlanningStage {
  key: StageKey
  number: number
  name: string
  ages: string
  emoji: string
  summary: string
  intro: string[]
  introAudio: string
  learnHeading: string
  learn: { title: string; desc: string }[]
  tools: { label: string; to: string }[]
  // Tailwind classes are written out in full so the build can find them
  c: {
    cardBorderOpen: string
    cardBorder: string
    cardBg: string
    circle: string
    heading: string
    sub: string
    divider: string
    innerBorder: string
    tick: string
    toolBg: string
    toolText: string
  }
}

const stages: PlanningStage[] = [
  {
    key: 'getting-started',
    number: 1,
    name: 'Getting Started',
    ages: '11-13',
    emoji: '📚',
    summary: 'Learn about your health condition and start asking questions',
    intro: [
      "This is the beginning! Right now, your parents or carers probably do most of the talking at appointments. That's okay - now it's time to start learning about your own health.",
      "Don't worry, you won't be doing everything alone yet. This stage is about understanding more about yourself and your condition.",
    ],
    introAudio:
      'This is the beginning. Right now, your parents or carers probably do most of the talking at appointments. That is okay. Now it is time to start learning about your own health. Do not worry, you will not be doing everything alone yet. This stage is about understanding more about yourself and your condition.',
    learnHeading: "Things you'll learn about:",
    learn: [
      { title: 'Your health condition', desc: 'What it is, why you have it, and how it affects your body' },
      { title: 'Your healthcare team', desc: 'Who the doctors and nurses are, and what each person does' },
      { title: 'Asking questions', desc: "It's okay to ask questions! It shows you're interested in your health" },
    ],
    tools: [
      { label: 'Learn about your condition', to: '/journey/learn-about-condition' },
      { label: 'Get to know your team', to: '/journey/my-team' },
    ],
    c: {
      cardBorderOpen: 'border-green-300',
      cardBorder: 'border-green-200',
      cardBg: 'bg-green-50/50',
      circle: 'bg-green-500',
      heading: 'text-green-900',
      sub: 'text-green-700',
      divider: 'border-green-200',
      innerBorder: 'border-green-200',
      tick: 'text-green-600',
      toolBg: 'bg-green-50 hover:bg-green-100',
      toolText: 'text-green-600',
    },
  },
  {
    key: 'building-skills',
    number: 2,
    name: 'Building Skills',
    ages: '14-15',
    emoji: '🎯',
    summary: 'Start doing more for yourself with support nearby',
    intro: [
      "Now you know more about your health, it's time to practise doing some things yourself. Think of it like learning to ride a bike: at first someone holds the saddle, then they let go but stay close, and finally you're riding on your own.",
      "Your parents and healthcare team are still here to help, but you'll gradually do more things independently.",
    ],
    introAudio:
      'Now you know more about your health, it is time to practise doing some things yourself. Think of it like learning to ride a bike. At first someone holds the saddle, then they let go but stay close, and finally you are riding on your own. Your parents and healthcare team are still here to help, but you will gradually do more things independently.',
    learnHeading: "Skills you'll practise:",
    learn: [
      { title: 'Booking appointments', desc: 'Learning to call the surgery or hospital to arrange your own appointments' },
      { title: 'Understanding your medicines', desc: 'Knowing what tablets or treatments you take, when, and what they do' },
      { title: 'Talking about your health', desc: 'Being able to explain your condition to teachers, friends, or others' },
      { title: 'Managing at school/college', desc: 'Working out how to handle your health needs while studying' },
    ],
    tools: [
      { label: 'Speak up at appointments', to: '/journey/speak-up' },
      { label: 'Know your medicines', to: '/journey/my-medicines' },
      { label: 'Skills Builder', to: '/skills' },
    ],
    c: {
      cardBorderOpen: 'border-amber-300',
      cardBorder: 'border-amber-200',
      cardBg: 'bg-amber-50/50',
      circle: 'bg-amber-500',
      heading: 'text-amber-900',
      sub: 'text-amber-700',
      divider: 'border-amber-200',
      innerBorder: 'border-amber-200',
      tick: 'text-amber-600',
      toolBg: 'bg-amber-50 hover:bg-amber-100',
      toolText: 'text-amber-600',
    },
  },
  {
    key: 'almost-there',
    number: 3,
    name: 'Almost There',
    ages: '16-17',
    emoji: '🚀',
    summary: 'Get ready to move to adult healthcare services',
    intro: [
      "You're nearly there! This is when you prepare to move from children's healthcare to adult healthcare. It might feel a bit scary, but you've been building up to this through the earlier stages.",
      "The adult healthcare team works differently from the children's team, but they're still there to help you.",
    ],
    introAudio:
      "You are nearly there. This is when you prepare to move from children's healthcare to adult healthcare. It might feel a bit scary, but you have been building up to this through the earlier stages. The adult healthcare team works differently from the children's team, but they are still there to help you.",
    learnHeading: "What you'll learn about:",
    learn: [
      { title: 'How adult healthcare is different', desc: 'Adult clinics might be in different buildings, with appointments further apart' },
      { title: 'Your rights and responsibilities', desc: 'What you can legally decide, and what you are responsible for' },
      { title: 'Managing health with work or university', desc: 'How to tell employers or lecturers about your needs' },
      { title: 'Meeting your new healthcare team', desc: 'What to expect in your first adult clinic appointment' },
    ],
    tools: [
      { label: 'Consent guide for 16-17', to: '/rights/consent-16-17' },
      { label: 'Plan my move', to: '/journey/move-date' },
      { label: 'Look into PIP', to: '/journey/pip' },
    ],
    c: {
      cardBorderOpen: 'border-blue-300',
      cardBorder: 'border-blue-200',
      cardBg: 'bg-blue-50/50',
      circle: 'bg-blue-500',
      heading: 'text-blue-900',
      sub: 'text-blue-700',
      divider: 'border-blue-200',
      innerBorder: 'border-blue-200',
      tick: 'text-blue-600',
      toolBg: 'bg-blue-50 hover:bg-blue-100',
      toolText: 'text-blue-600',
    },
  },
  {
    key: 'flying-solo',
    number: 4,
    name: 'Flying Solo',
    ages: '18+',
    emoji: '⭐',
    summary: 'Settle in with your adult team and look after your own care',
    intro: [
      "You're now using adult services. Things may work a little differently: appointments can be further apart, and you're the main person who makes the decisions.",
      'You can still ask family or friends to help if you want them to. And your new team is there to support you.',
    ],
    introAudio:
      'You are now using adult services. Things may work a little differently. Appointments can be further apart, and you are the main person who makes the decisions. You can still ask family or friends to help if you want them to. And your new team is there to support you.',
    learnHeading: 'Things to sort out:',
    learn: [
      { title: 'Your new team', desc: 'Who they are and how to get in touch with them' },
      { title: 'Your own appointments and medicines', desc: 'Booking visits and ordering what you need, in a way that works for you' },
      { title: 'Money and support', desc: 'Checking what help you can get at college, at work or at home' },
      { title: 'Your adult rights', desc: 'How consent and privacy work now that you are 18' },
    ],
    tools: [
      { label: 'Meet your new team', to: '/journey/new-team' },
      { label: 'Check your support', to: '/journey/check-support' },
      { label: 'Consent at 18+', to: '/rights/consent-18-plus' },
    ],
    c: {
      cardBorderOpen: 'border-purple-300',
      cardBorder: 'border-purple-200',
      cardBg: 'bg-purple-50/50',
      circle: 'bg-purple-500',
      heading: 'text-purple-900',
      sub: 'text-purple-700',
      divider: 'border-purple-200',
      innerBorder: 'border-purple-200',
      tick: 'text-purple-600',
      toolBg: 'bg-purple-50 hover:bg-purple-100',
      toolText: 'text-purple-600',
    },
  },
]

const overviewIntro =
  "Right now, you see doctors and nurses who work with children and teenagers. As you get older, you'll move to doctors who work with adults. This is called \"transition\". Think of it like moving up in school - you learn new things gradually. This app breaks it into four stages:"
const overviewAudio =
  'Right now, you see doctors and nurses who work with children and teenagers. As you get older, you will move to doctors who work with adults. This is called transition. Think of it like moving up in school. You learn new things gradually. This app breaks it into four stages.'

export function PlanningTools() {
  const [expandedStage, setExpandedStage] = useState<StageKey | null>('getting-started')

  const toggleStage = (stage: StageKey) => {
    setExpandedStage(expandedStage === stage ? null : stage)
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <header className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-warm-500">Planning Tools</p>
        <h1 className="text-2xl md:text-3xl font-bold text-warm-800">Plan your four stages 📝</h1>
        <p className="max-w-2xl text-sm md:text-base text-warm-600 leading-relaxed">
          See what happens at each stage of your transition, and jump straight to the tools that help.
        </p>
      </header>

      {/* Overview */}
      <div className="rounded-2xl border border-purple-200 bg-gradient-to-br from-purple-50 to-accent-50 px-5 py-5">
        <h3 className="text-lg font-semibold text-warm-800 mb-3">What is transition?</h3>
        <p className="text-sm text-warm-600 mb-3">{overviewIntro}</p>
        <div className="mt-2 mb-4"><ReadAloud text={overviewAudio} /></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {stages.map((s) => (
            <div key={s.key} className={`bg-white p-4 rounded-xl border ${s.c.innerBorder}`}>
              <span className="text-2xl mb-2 block">{s.emoji}</span>
              <p className={`font-semibold text-sm ${s.c.sub}`}>Stage {s.number}: {s.name}</p>
              <p className="text-xs text-warm-500">Ages {s.ages}</p>
              <p className="text-xs text-warm-600 mt-1">{s.summary}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Progress strip */}
      <div className="flex items-center justify-between max-w-2xl mx-auto px-4">
        {stages.map((s, index) => (
          <div key={s.key} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center">
              <div className={`w-12 h-12 rounded-full ${s.c.circle} flex items-center justify-center text-white font-bold text-lg`}>
                {s.number}
              </div>
              <span className={`text-xs font-medium mt-2 text-center ${s.c.sub}`}>{s.name}</span>
            </div>
            {index < stages.length - 1 && <div className="flex-1 h-1 bg-warm-200 mx-2 mb-6" />}
          </div>
        ))}
      </div>

      {/* Stage Cards */}
      <div className="space-y-4">
        {stages.map((s) => {
          const open = expandedStage === s.key
          return (
            <div
              key={s.key}
              className={`rounded-2xl border-2 ${open ? s.c.cardBorderOpen : s.c.cardBorder} ${s.c.cardBg} overflow-hidden shadow-card hover:shadow-card-hover transition-all`}
            >
              <button
                onClick={() => toggleStage(s.key)}
                aria-expanded={open}
                className="w-full px-5 py-5 text-left"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-full ${s.c.circle} flex items-center justify-center text-white shrink-0`}>
                      <span className="text-xl">{s.emoji}</span>
                    </div>
                    <div>
                      <h2 className={`text-xl font-bold ${s.c.heading}`}>
                        Stage {s.number}: {s.name} (Ages {s.ages})
                      </h2>
                      <p className={`text-sm mt-1 ${s.c.sub}`}>{s.summary}</p>
                    </div>
                  </div>
                  <span className={`${s.c.sub} text-xl`}>{open ? '−' : '+'}</span>
                </div>
              </button>

              {open && (
                <div className={`px-5 pb-5 space-y-4 border-t ${s.c.divider} pt-4`}>
                  <div className={`bg-white p-4 rounded-xl border ${s.c.innerBorder}`}>
                    <h4 className={`font-semibold mb-2 ${s.c.heading}`}>What happens in this stage?</h4>
                    {s.intro.map((p, i) => (
                      <p key={i} className="text-sm text-warm-600 mb-2 last:mb-0">{p}</p>
                    ))}
                    <div className="mt-2"><ReadAloud text={s.introAudio} /></div>
                  </div>

                  <div>
                    <h4 className={`font-semibold mb-3 ${s.c.heading}`}>{s.learnHeading}</h4>
                    <ul className="space-y-2">
                      {s.learn.map((item) => (
                        <li key={item.title} className="flex items-start gap-3 bg-white p-3 rounded-xl">
                          <span className={`${s.c.tick} mt-0.5`}>✓</span>
                          <div>
                            <p className="font-medium text-sm text-warm-800">{item.title}</p>
                            <p className="text-xs text-warm-600">{item.desc}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className={`bg-white p-4 rounded-xl border ${s.c.innerBorder}`}>
                    <h4 className={`font-semibold mb-2 flex items-center gap-2 ${s.c.heading}`}>
                      <span>🧰</span>
                      Tools for this stage
                    </h4>
                    <div className="space-y-2">
                      {s.tools.map((tool) => (
                        <Link
                          key={tool.to}
                          to={tool.to}
                          className={`flex items-center justify-between p-3 ${s.c.toolBg} rounded-xl transition-colors`}
                        >
                          <span className="text-sm font-medium text-warm-800">{tool.label}</span>
                          <span className={s.c.toolText}>→</span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {s.key === 'almost-there' && (
                    <div className="bg-gradient-to-r from-blue-100 via-purple-100 to-primary-100 rounded-xl p-4 border border-blue-200">
                      <h4 className="font-semibold text-blue-900 mb-2">Feeling nervous?</h4>
                      <p className="text-sm text-warm-600 mb-2">
                        It's completely normal to feel worried about moving to adult services. Lots of young
                        people feel the same way!
                      </p>
                      <p className="text-sm text-warm-600">
                        Remember: your adult healthcare team are experts at helping people like you. They know
                        you're moving from children's services and they'll help you settle in.
                      </p>
                      <div className="mt-2"><ReadAloud text="It is completely normal to feel worried about moving to adult services. Lots of young people feel the same way. Remember, your adult healthcare team are experts at helping people like you. They know you are moving from children's services and they will help you settle in." /></div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* For families */}
      <div className="rounded-2xl border border-purple-200 bg-white overflow-hidden shadow-card">
        <div className="px-5 py-5">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center shrink-0">
              <span className="text-lg">👨‍👩‍👧</span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-warm-800">For Parents, Guardians & Carers</h2>
              <p className="text-sm text-warm-500 mt-1">Supporting your young person's journey</p>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <Link
              to="/checklist"
              className="flex items-center justify-between p-3 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors"
            >
              <span className="text-sm font-medium text-warm-800">Open the transition checklist</span>
              <span className="text-purple-600">→</span>
            </Link>
            <Link
              to="/rights"
              className="flex items-center justify-between p-3 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors"
            >
              <span className="text-sm font-medium text-warm-800">Consent and rights at each age</span>
              <span className="text-purple-600">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
