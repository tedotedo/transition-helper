import { useState } from 'react'
import { Link } from 'react-router-dom'
import ReadAloud from '../components/ReadAloud'

interface FAQ {
  id: string
  question: string
  answer: string
  emoji: string
  category: 'basics' | 'appointments' | 'rights' | 'worries'
}

const faqs: FAQ[] = [
  // Basics
  {
    id: 'what-is-transition',
    question: 'What actually IS transition?',
    answer: 'Transition is the process of moving from children\'s (paediatric) healthcare services to adult healthcare services. It\'s not just one moment - it\'s a gradual journey that usually happens between ages 14-25. The goal is for YOU to become the expert on your own health, with support from your healthcare team.',
    emoji: '🔄',
    category: 'basics',
  },
  {
    id: 'when-does-it-happen',
    question: 'When will I transition?',
    answer: 'There\'s no single age - it depends on your condition, your local services, and how ready you feel. Most young people transition between 16-19, but it can be earlier or later. Your team should talk to you about timing well in advance. If no one has mentioned it yet, it\'s okay to ask!',
    emoji: '📅',
    category: 'basics',
  },
  {
    id: 'why-cant-i-stay',
    question: 'Why can\'t I just stay with my children\'s team forever?',
    answer: 'We get it - change is hard, especially when you trust your current team. But children\'s services are set up for growing bodies and involve parents more. Adult services are designed for YOUR needs as an independent person. Plus, adult teams have different expertise for managing long-term conditions in adults.',
    emoji: '🤔',
    category: 'basics',
  },
  {
    id: 'who-decides',
    question: 'Who decides when I\'m ready?',
    answer: 'YOU have a big say in this! Your healthcare team will work WITH you (and your family if you want) to figure out the right time. They\'ll look at things like: how well you understand your condition, whether you can manage medications, and if you\'re comfortable speaking to doctors yourself.',
    emoji: '🎯',
    category: 'basics',
  },

  // Appointments
  {
    id: 'first-adult-appointment',
    question: 'What will my first adult appointment be like?',
    answer: 'It might feel different - adult clinics can be busier and appointments shorter. But your new team knows you\'re new to this! Many services offer a "getting to know you" appointment first. Bring a summary of your health history, your medication list, and any questions. It\'s okay to be nervous!',
    emoji: '🏥',
    category: 'appointments',
  },
  {
    id: 'can-parents-come',
    question: 'Can my parents still come to appointments?',
    answer: 'Yes, if YOU want them to! As an adult, you\'re in charge of who comes. Many young people like having support at first. You could also ask parents to wait outside for part of the appointment. Over time, most people feel more comfortable going alone.',
    emoji: '👨‍👩‍👧',
    category: 'appointments',
  },
  {
    id: 'what-if-i-forget',
    question: 'What if I forget to take my medication or miss appointments?',
    answer: 'It happens to everyone sometimes - you\'re human! The important thing is what you do next. If you miss medication, don\'t panic - check the instructions or call your pharmacist. If you miss an appointment, ring to rebook ASAP. Setting phone reminders really helps!',
    emoji: '😅',
    category: 'appointments',
  },
  {
    id: 'different-doctor',
    question: 'What if I don\'t like my new doctor?',
    answer: 'Give it a few appointments - it takes time to build trust. But if you really don\'t click, you CAN ask to see someone else. You might also have a specialist nurse or other team members you prefer. Your comfort matters for your care.',
    emoji: '👩‍⚕️',
    category: 'appointments',
  },

  // Rights
  {
    id: 'confidentiality',
    question: 'Will the doctor tell my parents everything?',
    answer: 'Once you\'re 16+, your medical information is confidential by default. Doctors need YOUR permission to share with parents. There are only rare exceptions (if you or someone else is at serious risk). You can also ask to speak privately during appointments.',
    emoji: '🔒',
    category: 'rights',
  },
  {
    id: 'say-no-to-treatment',
    question: 'Can I say no to a treatment I don\'t want?',
    answer: 'Yes! At 16+, you can usually consent to OR refuse treatment. Doctors should explain options and respect your decision. If you\'re unsure, ask for time to think, or request more information. Your body, your choice (though do listen to medical advice!).',
    emoji: '✋',
    category: 'rights',
  },
  {
    id: 'see-my-records',
    question: 'Can I see what\'s written in my medical records?',
    answer: 'Absolutely! You have the right to see your records. You can request them from your GP or hospital (it\'s called a Subject Access Request). The NHS App also lets you view some records online from age 16. It\'s YOUR information!',
    emoji: '📋',
    category: 'rights',
  },
  {
    id: 'second-opinion',
    question: 'Can I get a second opinion?',
    answer: 'Yes, you have the right to ask for a second opinion from another doctor. This is completely normal and doctors won\'t be offended. It can help you feel more confident about important decisions. Just ask your GP for a referral.',
    emoji: '🤷',
    category: 'rights',
  },

  // Worries
  {
    id: 'scared-of-change',
    question: 'I\'m scared of all this change - is that normal?',
    answer: 'Completely normal! Change is scary, especially when it\'s about your health. Most young people feel nervous about transition. It helps to take things one step at a time, ask lots of questions, and remember that your team WANTS you to succeed. You\'ve got this! 💪',
    emoji: '😰',
    category: 'worries',
  },
  {
    id: 'not-ready',
    question: 'What if I\'m not ready?',
    answer: 'That\'s okay to admit! Talk to your team about your concerns - they can slow down, offer more support, or work on specific skills with you. Transition isn\'t a race. Some people need more time, and that\'s fine. The goal is for you to feel prepared.',
    emoji: '🐢',
    category: 'worries',
  },
  {
    id: 'will-care-be-worse',
    question: 'Will I get worse care as an adult?',
    answer: 'Different doesn\'t mean worse! Adult services are just... different. Appointments might be shorter and less frequent, but that\'s because you\'re more independent. You\'ll still have access to specialists, emergency care, and support when you need it.',
    emoji: '📊',
    category: 'worries',
  },
  {
    id: 'what-if-emergency',
    question: 'What do I do in an emergency?',
    answer: 'Know your emergency plan BEFORE you need it! This includes: when to call 999, when to go to A&E, and when to contact your GP or specialist team. Keep emergency numbers in your phone. If in doubt, call 111 for advice. Your safety always comes first.',
    emoji: '🚨',
    category: 'worries',
  },
]

const categoryConfig = {
  basics: {
    label: 'The Basics',
    emoji: '📚',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    gradient: 'from-blue-400 to-sky-500',
  },
  appointments: {
    label: 'Appointments & Care',
    emoji: '🏥',
    color: 'text-green-600',
    bg: 'bg-green-50',
    border: 'border-green-200',
    gradient: 'from-green-400 to-emerald-500',
  },
  rights: {
    label: 'Your Rights',
    emoji: '⚖️',
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    gradient: 'from-purple-400 to-pink-500',
  },
  worries: {
    label: 'Common Worries',
    emoji: '💭',
    color: 'text-primary-600',
    bg: 'bg-primary-50',
    border: 'border-primary-200',
    gradient: 'from-primary-400 to-orange-500',
  },
}

export function QuestionsAnswers() {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState<keyof typeof categoryConfig | 'all'>('all')

  const toggleQuestion = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  const filteredFaqs = activeCategory === 'all'
    ? faqs
    : faqs.filter(f => f.category === activeCategory)

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in relative">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-40 -left-20 w-48 h-48 bg-gradient-to-br from-primary-200/30 to-green-200/30 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '1s' }} />
      </div>

      {/* Header */}
      <header className="relative text-center space-y-3 sm:space-y-4 py-4 sm:py-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-warm-500 hover:text-primary-600 transition-colors mb-2"
        >
          ← Back to Home
        </Link>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100/80 backdrop-blur-sm border border-blue-200/50">
          <span className="text-lg">❓</span>
          <span className="text-sm font-semibold text-blue-700">Questions & Answers</span>
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-warm-800 leading-tight">
          Got questions? We've got answers! 💬
        </h1>

        <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-warm-600 leading-relaxed font-medium px-4">
          Real questions from young people just like you, answered in plain English.
          No jargon, no judgment!
        </p>
        <div className="mt-2"><ReadAloud text="Real questions from young people just like you, answered in plain English. No jargon, no judgment!" /></div>
      </header>

      {/* Category Filter */}
      <section className="relative">
        <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
          <CategoryButton
            label="All Questions"
            emoji="🌟"
            isActive={activeCategory === 'all'}
            onClick={() => setActiveCategory('all')}
          />
          {(Object.keys(categoryConfig) as Array<keyof typeof categoryConfig>).map((cat) => (
            <CategoryButton
              key={cat}
              label={categoryConfig[cat].label}
              emoji={categoryConfig[cat].emoji}
              isActive={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
            />
          ))}
        </div>
      </section>

      {/* Questions */}
      <section className="relative space-y-3 sm:space-y-4">
        {filteredFaqs.map((faq) => {
          const config = categoryConfig[faq.category]
          return (
            <div
              key={faq.id}
              className={`rounded-2xl border-2 transition-all duration-300 overflow-hidden ${
                expandedId === faq.id
                  ? `${config.bg} ${config.border}`
                  : 'bg-white/80 backdrop-blur-sm border-warm-200/60 hover:border-warm-300'
              }`}
            >
              <button
                type="button"
                onClick={() => toggleQuestion(faq.id)}
                className="w-full p-4 sm:p-5 text-left"
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl sm:text-3xl mt-0.5">{faq.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-warm-800 text-base sm:text-lg md:text-xl leading-tight">
                      {faq.question}
                    </h3>
                    <span className={`inline-block mt-2 px-2 py-0.5 rounded-full text-xs font-semibold ${config.bg} ${config.color}`}>
                      {config.label}
                    </span>
                  </div>
                  <span className={`text-xl transition-transform duration-300 shrink-0 ${expandedId === faq.id ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </div>
              </button>

              {expandedId === faq.id && (
                <div className="px-4 sm:px-5 pb-4 sm:pb-5 animate-fade-in">
                  <div className="border-t border-warm-200/50 pt-4">
                    <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-warm-200/50">
                      <p className="text-base sm:text-lg text-warm-700 leading-relaxed">
                        {faq.answer}
                      </p>
                      <div className="mt-2"><ReadAloud text={faq.answer} /></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </section>

      {/* Still have questions */}
      <section className="relative">
        <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-br from-blue-400 via-purple-500 to-primary-400 p-6 sm:p-8 text-center text-white overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="relative">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3">
              Still got questions? 🙋
            </h3>
            <p className="text-sm sm:text-base text-white/90 max-w-xl mx-auto mb-5">
              These FAQs cover the common stuff, but YOUR situation is unique.
              Don't be afraid to ask your healthcare team - no question is too small!
            </p>
            <div className="mt-2"><ReadAloud text="These FAQs cover the common stuff, but your situation is unique. Do not be afraid to ask your healthcare team. No question is too small." /></div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/rights"
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-white text-purple-700 font-semibold hover:bg-white/90 transition-all shadow-lg"
              >
                <span>⚖️</span>
                Learn about your rights
              </Link>
              <Link
                to="/care-team"
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-white/20 text-white font-semibold hover:bg-white/30 transition-all border border-white/30"
              >
                <span>📋</span>
                View my care team
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

interface CategoryButtonProps {
  label: string
  emoji: string
  isActive: boolean
  onClick: () => void
}

function CategoryButton({ label, emoji, isActive, onClick }: CategoryButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full font-semibold transition-all duration-200 ${
        isActive
          ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-md'
          : 'bg-white/80 backdrop-blur-sm text-warm-600 border border-warm-200 hover:border-warm-300 hover:bg-warm-50'
      }`}
    >
      <span>{emoji}</span>
      <span className="text-sm sm:text-base">{label}</span>
    </button>
  )
}
