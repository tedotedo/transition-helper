import { useState } from 'react'
import { Link } from 'react-router-dom'

interface Skill {
  id: string
  title: string
  emoji: string
  description: string
  difficulty: 'starter' | 'growing' | 'confident'
  tips: string[]
  practicePrompt: string
  exampleResponse?: string
}

const skills: Skill[] = [
  {
    id: 'introduce-yourself',
    title: 'Introduce yourself',
    emoji: '👋',
    description: 'Start your appointment by telling staff about yourself and why you\'re there.',
    difficulty: 'starter',
    tips: [
      'Say your name and date of birth',
      'Mention why you\'re at the appointment',
      'You can bring notes if it helps!',
    ],
    practicePrompt: 'Try saying: "Hi, I\'m [your name]. I\'m here for my [appointment type] appointment."',
    exampleResponse: 'Hi, I\'m Alex. I\'m here for my diabetes check-up appointment.',
  },
  {
    id: 'describe-symptoms',
    title: 'Describe how you feel',
    emoji: '💬',
    description: 'Explain your symptoms or how you\'ve been feeling since your last visit.',
    difficulty: 'starter',
    tips: [
      'Think about when symptoms started',
      'Rate pain or discomfort from 1-10',
      'Mention what makes it better or worse',
    ],
    practicePrompt: 'Try: "I\'ve been feeling [symptom] for about [time]. It\'s worse when [trigger]."',
    exampleResponse: 'I\'ve been feeling more tired than usual for about two weeks. It\'s worse in the mornings.',
  },
  {
    id: 'ask-questions',
    title: 'Ask questions',
    emoji: '❓',
    description: 'Don\'t leave confused! It\'s okay to ask staff to explain things.',
    difficulty: 'starter',
    tips: [
      'Write questions down before your appointment',
      '"Can you explain that again?" is always okay',
      'Ask about next steps before you leave',
    ],
    practicePrompt: 'Try: "Can you explain what that means?" or "What should I do if...?"',
    exampleResponse: 'Sorry, I didn\'t quite understand that. Could you explain it in a different way?',
  },
  {
    id: 'know-your-meds',
    title: 'Know your medications',
    emoji: '💊',
    description: 'Be able to name your medications and explain what they\'re for.',
    difficulty: 'growing',
    tips: [
      'Keep a list on your phone',
      'Know the name, dose, and when you take it',
      'Mention any side effects you\'ve noticed',
    ],
    practicePrompt: 'Try: "I take [medication name], [dose], [how often], for my [condition]."',
    exampleResponse: 'I take Metformin, 500mg, twice a day with meals, for my type 2 diabetes.',
  },
  {
    id: 'book-appointment',
    title: 'Book your own appointment',
    emoji: '📅',
    description: 'Phone or use an app to arrange your own appointments.',
    difficulty: 'growing',
    tips: [
      'Have your NHS number ready',
      'Know your availability',
      'Ask for a specific doctor if you prefer',
    ],
    practicePrompt: 'Try: "Hi, I\'d like to book an appointment with [doctor/clinic] please."',
    exampleResponse: 'Hi, I\'d like to book a follow-up appointment with Dr. Smith please. I\'m available most afternoons.',
  },
  {
    id: 'collect-prescription',
    title: 'Collect your prescription',
    emoji: '🏥',
    description: 'Order and pick up your own repeat prescriptions.',
    difficulty: 'growing',
    tips: [
      'Set reminders to reorder before you run out',
      'Use the NHS App to order repeats',
      'Check the prescription is correct before leaving',
    ],
    practicePrompt: 'Try: "Hi, I\'m here to collect a prescription for [your name]."',
    exampleResponse: 'Hi, I\'m here to collect a prescription for Alex Johnson. Date of birth 15th March 2008.',
  },
  {
    id: 'speak-alone',
    title: 'Speak to staff alone',
    emoji: '🤝',
    description: 'Have part of your appointment without parents in the room.',
    difficulty: 'growing',
    tips: [
      'It\'s normal and expected as you get older',
      'You can ask for private time',
      'Staff will keep things confidential (with some exceptions)',
    ],
    practicePrompt: 'Try: "Could I have a few minutes to speak with you privately?"',
    exampleResponse: 'Mum, would you mind waiting outside for a bit? I\'d like to talk to the doctor on my own.',
  },
  {
    id: 'disagree-politely',
    title: 'Share your opinion',
    emoji: '🗣️',
    description: 'It\'s okay to disagree or ask about alternatives - respectfully!',
    difficulty: 'confident',
    tips: [
      'You have the right to be involved in decisions',
      'Ask about other options',
      'Explain your concerns clearly',
    ],
    practicePrompt: 'Try: "I\'m not sure about that. Could we talk about other options?"',
    exampleResponse: 'I\'ve read about that treatment and I\'m a bit worried about the side effects. Are there any alternatives we could consider?',
  },
  {
    id: 'emergency-plan',
    title: 'Handle an emergency',
    emoji: '🚨',
    description: 'Know what to do if something goes wrong with your health.',
    difficulty: 'confident',
    tips: [
      'Know your emergency contacts',
      'Understand your warning signs',
      'Know when to call 999, 111, or your GP',
    ],
    practicePrompt: 'Think: "If [emergency] happens, I will [action]."',
    exampleResponse: 'If my blood sugar drops too low, I\'ll eat something sugary straight away and tell someone nearby.',
  },
]

const difficultyConfig = {
  starter: {
    label: 'Getting Started',
    color: 'text-green-600',
    bg: 'bg-green-100',
    border: 'border-green-200',
    gradient: 'from-green-400 to-emerald-500',
  },
  growing: {
    label: 'Building Confidence',
    color: 'text-blue-600',
    bg: 'bg-blue-100',
    border: 'border-blue-200',
    gradient: 'from-blue-400 to-sky-500',
  },
  confident: {
    label: 'Ready for Anything',
    color: 'text-purple-600',
    bg: 'bg-purple-100',
    border: 'border-purple-200',
    gradient: 'from-purple-400 to-pink-500',
  },
}

export function SkillsBuilder() {
  const [expandedSkill, setExpandedSkill] = useState<string | null>(null)
  const [completedSkills, setCompletedSkills] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('transition-skills-completed')
    return saved ? new Set(JSON.parse(saved)) : new Set()
  })

  const toggleSkill = (id: string) => {
    setExpandedSkill(expandedSkill === id ? null : id)
  }

  const markComplete = (id: string) => {
    const newCompleted = new Set(completedSkills)
    if (newCompleted.has(id)) {
      newCompleted.delete(id)
    } else {
      newCompleted.add(id)
    }
    setCompletedSkills(newCompleted)
    localStorage.setItem('transition-skills-completed', JSON.stringify([...newCompleted]))
  }

  const starterSkills = skills.filter(s => s.difficulty === 'starter')
  const growingSkills = skills.filter(s => s.difficulty === 'growing')
  const confidentSkills = skills.filter(s => s.difficulty === 'confident')

  const totalCompleted = completedSkills.size
  const progressPercent = Math.round((totalCompleted / skills.length) * 100)

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in relative">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-green-200/30 to-blue-200/30 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-40 -left-20 w-48 h-48 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '1s' }} />
      </div>

      {/* Header */}
      <header className="relative text-center space-y-3 sm:space-y-4 py-4 sm:py-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-warm-500 hover:text-primary-600 transition-colors mb-2"
        >
          ← Back to Home
        </Link>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100/80 backdrop-blur-sm border border-green-200/50">
          <span className="text-lg">🛠️</span>
          <span className="text-sm font-semibold text-green-700">Skills Builder</span>
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-warm-800 leading-tight">
          Level up your skills! 💪
        </h1>

        <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-warm-600 leading-relaxed font-medium px-4">
          Practice the real-life skills you'll need to manage your own healthcare.
          Start easy and work your way up!
        </p>
      </header>

      {/* Progress Card */}
      <section className="relative">
        <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-br from-primary-50 to-accent-50 border-2 border-primary-200/50 p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white shadow-lg flex items-center justify-center">
              <span className="text-3xl sm:text-4xl font-black text-primary-600">{progressPercent}%</span>
            </div>
            <div className="text-center sm:text-left flex-1">
              <h2 className="text-lg sm:text-xl font-bold text-warm-800">Your Progress</h2>
              <p className="text-sm sm:text-base text-warm-600">
                You've practiced <strong>{totalCompleted}</strong> of <strong>{skills.length}</strong> skills
              </p>
              <div className="mt-3 h-3 bg-white rounded-full overflow-hidden shadow-inner">
                <div
                  className="h-full bg-gradient-to-r from-primary-400 to-accent-400 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills by Level */}
      <SkillSection
        title="Getting Started"
        subtitle="These are the basics - great for your first solo appointments!"
        emoji="🌱"
        skills={starterSkills}
        config={difficultyConfig.starter}
        expandedSkill={expandedSkill}
        completedSkills={completedSkills}
        onToggle={toggleSkill}
        onComplete={markComplete}
      />

      <SkillSection
        title="Building Confidence"
        subtitle="Ready for more? These skills show you're taking charge!"
        emoji="📈"
        skills={growingSkills}
        config={difficultyConfig.growing}
        expandedSkill={expandedSkill}
        completedSkills={completedSkills}
        onToggle={toggleSkill}
        onComplete={markComplete}
      />

      <SkillSection
        title="Ready for Anything"
        subtitle="Master level! You're becoming a pro at managing your health."
        emoji="⭐"
        skills={confidentSkills}
        config={difficultyConfig.confident}
        expandedSkill={expandedSkill}
        completedSkills={completedSkills}
        onToggle={toggleSkill}
        onComplete={markComplete}
      />

      {/* Encouragement Footer */}
      <section className="relative">
        <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-br from-accent-400 via-accent-500 to-green-400 p-6 sm:p-8 text-center text-white overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="relative">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3">
              Practice makes perfect! 🎯
            </h3>
            <p className="text-sm sm:text-base text-white/90 max-w-xl mx-auto mb-5">
              Don't worry if it feels awkward at first - everyone feels that way!
              The more you practice, the more confident you'll become.
            </p>
            <Link
              to="/journey"
              className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-white text-accent-700 font-semibold hover:bg-white/90 transition-all shadow-lg"
            >
              <span>🗺️</span>
              Continue my journey
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

interface SkillSectionProps {
  title: string
  subtitle: string
  emoji: string
  skills: Skill[]
  config: typeof difficultyConfig.starter
  expandedSkill: string | null
  completedSkills: Set<string>
  onToggle: (id: string) => void
  onComplete: (id: string) => void
}

function SkillSection({
  title,
  subtitle,
  emoji,
  skills,
  config,
  expandedSkill,
  completedSkills,
  onToggle,
  onComplete,
}: SkillSectionProps) {
  const completedInSection = skills.filter(s => completedSkills.has(s.id)).length

  return (
    <section className="relative space-y-4">
      <div className="flex items-center gap-3">
        <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${config.gradient} flex items-center justify-center shadow-md`}>
          <span className="text-2xl sm:text-3xl">{emoji}</span>
        </div>
        <div>
          <h2 className={`text-lg sm:text-xl md:text-2xl font-bold ${config.color}`}>{title}</h2>
          <p className="text-sm sm:text-base text-warm-500">{subtitle}</p>
        </div>
        <div className="ml-auto">
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${config.bg} ${config.color}`}>
            {completedInSection}/{skills.length}
          </span>
        </div>
      </div>

      <div className="grid gap-3 sm:gap-4">
        {skills.map((skill) => (
          <SkillCard
            key={skill.id}
            skill={skill}
            config={config}
            isExpanded={expandedSkill === skill.id}
            isCompleted={completedSkills.has(skill.id)}
            onToggle={() => onToggle(skill.id)}
            onComplete={() => onComplete(skill.id)}
          />
        ))}
      </div>
    </section>
  )
}

interface SkillCardProps {
  skill: Skill
  config: typeof difficultyConfig.starter
  isExpanded: boolean
  isCompleted: boolean
  onToggle: () => void
  onComplete: () => void
}

function SkillCard({ skill, config, isExpanded, isCompleted, onToggle, onComplete }: SkillCardProps) {
  return (
    <div
      className={`rounded-2xl border-2 transition-all duration-300 overflow-hidden ${
        isCompleted
          ? `${config.bg} ${config.border}`
          : 'bg-white/80 backdrop-blur-sm border-warm-200/60 hover:border-warm-300'
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        className="w-full p-4 sm:p-5 text-left"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl sm:text-3xl">{skill.emoji}</span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-warm-800 text-base sm:text-lg">{skill.title}</h3>
              {isCompleted && <span className="text-lg">✅</span>}
            </div>
            <p className="text-sm sm:text-base text-warm-600 mt-0.5">{skill.description}</p>
          </div>
          <span className={`text-xl transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </div>
      </button>

      {isExpanded && (
        <div className="px-4 sm:px-5 pb-4 sm:pb-5 space-y-4 animate-fade-in">
          <div className="border-t border-warm-200/50 pt-4">
            {/* Tips */}
            <div className="space-y-2">
              <h4 className="font-semibold text-warm-800 flex items-center gap-2">
                <span>💡</span> Top tips
              </h4>
              <ul className="space-y-1.5">
                {skill.tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm sm:text-base text-warm-600">
                    <span className={config.color}>✓</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Practice Prompt */}
            <div className="mt-4 rounded-xl bg-gradient-to-r from-warm-50 to-warm-100/50 border border-warm-200 p-4">
              <h4 className="font-semibold text-warm-800 flex items-center gap-2 mb-2">
                <span>🎯</span> Practice this
              </h4>
              <p className="text-sm sm:text-base text-warm-700 italic">{skill.practicePrompt}</p>
              {skill.exampleResponse && (
                <div className="mt-3 p-3 rounded-lg bg-white/70 border border-warm-200/50">
                  <p className="text-xs sm:text-sm text-warm-500 mb-1">Example:</p>
                  <p className="text-sm sm:text-base text-warm-700 font-medium">"{skill.exampleResponse}"</p>
                </div>
              )}
            </div>

            {/* Complete Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                onComplete()
              }}
              className={`mt-4 w-full py-3 rounded-xl font-semibold transition-all ${
                isCompleted
                  ? 'bg-white/70 text-warm-600 border-2 border-warm-200'
                  : `bg-gradient-to-r ${config.gradient} text-white shadow-md hover:shadow-lg`
              }`}
            >
              {isCompleted ? '↩️ Mark as not practiced yet' : '✅ I\'ve practiced this!'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
