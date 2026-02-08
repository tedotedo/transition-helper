import { useState } from 'react'
import { Link } from 'react-router-dom'
import ReadAloud from '../components/ReadAloud'

type TopicKey = 'consent' | 'privacy' | 'decision-making' | null

export function RightsHub() {
  const [activeTopic, setActiveTopic] = useState<TopicKey>(null)

  const toggleTopic = (topic: TopicKey) => {
    setActiveTopic(activeTopic === topic ? null : topic)
  }

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in relative">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-purple-200/30 to-accent-200/30 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute top-1/3 -left-20 w-48 h-48 bg-gradient-to-br from-primary-200/30 to-pink-200/30 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-blue-200/30 to-accent-200/30 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '2s' }} />
      </div>

      {/* Hero Header */}
      <header className="relative text-center space-y-3 sm:space-y-4 py-4 sm:py-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100/80 backdrop-blur-sm border border-purple-200/50">
          <span className="text-lg">⚖️</span>
          <span className="text-sm font-semibold text-purple-700">Know Your Rights</span>
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-warm-800 leading-tight">
          You're in charge! 💪
        </h1>

        <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-warm-600 leading-relaxed font-medium px-4">
          Understanding your rights helps you feel confident about your healthcare.
          Let's explore what you can decide and who can help!
        </p>
        <div className="mt-2">
          <ReadAloud text="Understanding your rights helps you feel confident about your healthcare. Let's explore what you can decide and who can help!" />
        </div>
      </header>

      {/* Age Stage Cards */}
      <section className="relative grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-3">
        <AgeCard
          label="Under 16"
          emoji="🌱"
          tagline="Growing & Learning"
          description="Learn how you can start having a say in your healthcare decisions as you grow and develop!"
          bgGradient="from-green-50 to-emerald-50/80 border-green-200/60 hover:border-green-300"
          accentColor="text-green-600"
          href="/rights/consent-under-16"
        />
        <AgeCard
          label="Age 16–17"
          emoji="🔑"
          tagline="Unlocking Your Rights"
          description="Big news: at 16, you can usually say yes to your own treatment. Let's unpack what that means!"
          bgGradient="from-primary-50 to-orange-50/80 border-primary-200/60 hover:border-primary-300"
          accentColor="text-primary-600"
          highlight
          href="/rights/consent-16-17"
        />
        <AgeCard
          label="Age 18+"
          emoji="🎓"
          tagline="Full Independence"
          description="You're officially an adult! Here's everything that changes and how to get support if you need it."
          bgGradient="from-purple-50 to-pink-50/80 border-purple-200/60 hover:border-purple-300"
          accentColor="text-purple-600"
          href="/rights/consent-18-plus"
        />
      </section>

      {/* Topics Section */}
      <section className="relative space-y-4 sm:space-y-5">
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-warm-800">
            Explore the details 🔍
          </h2>
          <p className="text-sm sm:text-base text-warm-500 mt-2">
            Tap a topic to learn more - it's all explained in plain English!
          </p>
        </div>

        <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-3">
          <TopicCard
            title="Consent & Capacity"
            emoji="✅"
            description="When can you say yes or no to treatment? What's 'Gillick competence'? Let's demystify the jargon!"
            active={activeTopic === 'consent'}
            onClick={() => toggleTopic('consent')}
            gradient="from-green-400 to-emerald-500"
            bgColor="bg-green-50/90"
            borderColor="border-green-200"
          />
          <TopicCard
            title="Privacy"
            emoji="🔒"
            description="Your health info is YOUR business. Find out what stays private and when staff might need to share."
            active={activeTopic === 'privacy'}
            onClick={() => toggleTopic('privacy')}
            gradient="from-blue-400 to-sky-500"
            bgColor="bg-blue-50/90"
            borderColor="border-blue-200"
          />
          <TopicCard
            title="Decisions at 18+"
            emoji="📝"
            description="What happens when you become an adult? Learn about the Mental Capacity Act and getting support."
            active={activeTopic === 'decision-making'}
            onClick={() => toggleTopic('decision-making')}
            gradient="from-purple-400 to-pink-500"
            bgColor="bg-purple-50/90"
            borderColor="border-purple-200"
          />
        </div>

        {/* Topic Content Sections */}
        {activeTopic === 'consent' && <ConsentContent />}
        {activeTopic === 'privacy' && <PrivacyContent />}
        {activeTopic === 'decision-making' && <DecisionMakingContent />}

        {!activeTopic && (
          <div className="text-center py-6 sm:py-8">
            <div className="inline-flex flex-col items-center gap-3 px-6 py-4 rounded-2xl bg-white/70 backdrop-blur-sm border border-warm-200/50">
              <span className="text-3xl sm:text-4xl">👆</span>
              <p className="text-sm sm:text-base text-warm-600 font-medium">
                Pick a topic above to learn more!
              </p>
              <p className="text-xs sm:text-sm text-warm-500">
                Or check out the <Link to="/rights/consent-16-17" className="text-primary-600 hover:text-primary-700 font-semibold underline decoration-2 underline-offset-2">16-17 consent guide</Link> to get started
              </p>
            </div>
          </div>
        )}
      </section>

      {/* Encouragement Footer */}
      <section className="relative">
        <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-br from-accent-400 via-accent-500 to-primary-400 p-6 sm:p-8 text-center text-white overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="relative">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3">
              Questions? That's great! 🌟
            </h3>
            <p className="text-sm sm:text-base text-white/90 max-w-xl mx-auto mb-5">
              It's totally normal to have questions about your rights. Talk to your healthcare team -
              they want to help you understand and feel confident!
            </p>
            <div className="mt-2"><ReadAloud text="It is totally normal to have questions about your rights. Talk to your healthcare team. They want to help you understand and feel confident." /></div>
            <Link
              to="/care-team"
              className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-white text-accent-700 font-semibold hover:bg-white/90 transition-all shadow-lg"
            >
              <span>📋</span>
              View my care team
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

interface AgeCardProps {
  label: string
  tagline: string
  description: string
  emoji?: string
  highlight?: boolean
  href?: string
  bgGradient: string
  accentColor: string
}

function AgeCard({ label, tagline, description, emoji, highlight, href, bgGradient, accentColor }: AgeCardProps) {
  const isDisabled = !href

  const content = (
    <div
      className={`relative flex flex-col h-full rounded-2xl sm:rounded-3xl border-2 px-5 py-5 sm:px-6 sm:py-6 shadow-card text-sm transition-all duration-300 bg-gradient-to-br backdrop-blur-sm ${bgGradient} ${
        highlight
          ? 'ring-2 ring-primary-300 ring-offset-2'
          : isDisabled
            ? 'opacity-60'
            : 'hover:shadow-card-hover hover:-translate-y-1'
      }`}
    >
      <div className="flex items-center gap-3 mb-3">
        <span className="text-4xl sm:text-5xl">{emoji}</span>
        <div>
          <p className={`text-sm sm:text-base font-bold uppercase tracking-wide ${accentColor}`}>{label}</p>
          <p className="text-sm sm:text-xs text-warm-500 font-medium">{tagline}</p>
        </div>
      </div>

      <p className="text-base sm:text-lg text-warm-700 leading-relaxed flex-1">{description}</p>

      <div className="mt-4 pt-3 border-t border-warm-200/50">
        <span className={`inline-flex items-center gap-1 text-base sm:text-lg font-semibold ${isDisabled ? 'text-warm-400' : accentColor}`}>
          {isDisabled ? (
            <>🔜 Coming soon</>
          ) : (
            <>Learn more <span className="text-xl">→</span></>
          )}
        </span>
      </div>
    </div>
  )

  if (isDisabled) {
    return content
  }

  return (
    <Link to={href} className="block group">
      {content}
    </Link>
  )
}

interface TopicCardProps {
  title: string
  emoji?: string
  description: string
  active?: boolean
  onClick?: () => void
  gradient: string
  bgColor: string
  borderColor: string
}

function TopicCard({ title, emoji, description, active, onClick, gradient, bgColor, borderColor }: TopicCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left rounded-2xl border-2 p-4 sm:p-5 transition-all duration-300 ${
        active
          ? `${bgColor} ${borderColor} shadow-lg ring-2 ring-offset-2 ${borderColor.replace('border-', 'ring-')}`
          : `bg-white/80 backdrop-blur-sm border-warm-200/60 hover:border-warm-300 hover:shadow-card hover:-translate-y-0.5`
      }`}
    >
      <div className="flex items-start gap-3">
        <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-md shrink-0`}>
          <span className="text-2xl sm:text-3xl">{emoji}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-bold text-warm-800 text-base sm:text-lg">{title}</h3>
            <span className={`text-xl transition-transform duration-300 ${active ? 'rotate-180' : ''}`}>
              {active ? '▲' : '▼'}
            </span>
          </div>
          <p className="text-sm sm:text-base text-warm-600 mt-1 leading-relaxed">{description}</p>
        </div>
      </div>
    </button>
  )
}

// Content Section: Consent and Capacity
function ConsentContent() {
  return (
    <div id="consent" className="rounded-2xl sm:rounded-3xl border-2 border-green-200 bg-gradient-to-br from-green-50/90 to-emerald-50/90 backdrop-blur-sm p-5 sm:p-6 md:p-8 space-y-5 sm:space-y-6 animate-fade-in">
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shrink-0 shadow-lg">
          <span className="text-2xl sm:text-3xl">✅</span>
        </div>
        <div>
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-warm-800">Consent & Capacity</h3>
          <p className="text-sm sm:text-base text-warm-600 mt-1">
            Understanding when you can make your own healthcare decisions
          </p>
        </div>
      </div>

      {/* What is consent */}
      <div className="space-y-3">
        <h4 className="font-bold text-warm-800 flex items-center gap-2 text-base sm:text-lg">
          <span>💡</span>
          What is consent?
        </h4>
        <p className="text-sm sm:text-base text-warm-600 leading-relaxed">
          Consent means agreeing to something after you've understood what it involves. In healthcare,
          this means agreeing to treatment, tests, or sharing your information. For your consent to be valid,
          you need to:
        </p>
        <div className="mt-2"><ReadAloud text="Consent means agreeing to something after you have understood what it involves. In healthcare, this means agreeing to treatment, tests, or sharing your information. For your consent to be valid, you need to understand what is being proposed and why, be able to weigh up the pros and cons, communicate your decision, and give it freely with nobody pressuring you." /></div>
        <ul className="space-y-2 text-sm sm:text-base text-warm-600 ml-4">
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-1">•</span>
            <span><strong>Understand</strong> what's being proposed and why</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-1">•</span>
            <span><strong>Be able to weigh up</strong> the pros and cons</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-1">•</span>
            <span><strong>Communicate</strong> your decision (this can be in any way that works for you)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-1">•</span>
            <span><strong>Give it freely</strong> - nobody should pressure you</span>
          </li>
        </ul>
      </div>

      {/* Gillick Competence */}
      <div className="rounded-xl sm:rounded-2xl border-2 border-accent-200 bg-accent-50/80 p-4 sm:p-5 space-y-3">
        <h4 className="font-bold text-warm-800 flex items-center gap-2 text-base sm:text-lg">
          <span>🌟</span>
          What is Gillick Competence?
        </h4>
        <p className="text-sm sm:text-base text-warm-600 leading-relaxed">
          You might hear staff talk about "Gillick competence" - this is a way of checking if someone under 16
          can make their own decisions about treatment. It's named after a court case from the 1980s.
        </p>
        <p className="text-sm sm:text-base text-warm-600 leading-relaxed">
          Being "Gillick competent" means you understand enough about the treatment to make your own choice,
          even without your parents' permission. Staff will consider:
        </p>
        <div className="mt-2"><ReadAloud text="You might hear staff talk about Gillick competence. This is a way of checking if someone under 16 can make their own decisions about treatment. Being Gillick competent means you understand enough about the treatment to make your own choice, even without your parents permission. Staff will consider how well you understand the treatment and its effects, whether you understand what could happen without treatment, and your maturity and ability to weigh up options." /></div>
        <ul className="space-y-1 text-sm sm:text-base text-warm-600 ml-4">
          <li className="flex items-start gap-2">
            <span className="text-accent-600">✓</span>
            <span>How well you understand the treatment and its effects</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-600">✓</span>
            <span>Whether you understand what could happen without treatment</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-600">✓</span>
            <span>Your maturity and ability to weigh up options</span>
          </li>
        </ul>
      </div>

      {/* Fraser Guidelines */}
      <div className="rounded-xl sm:rounded-2xl border-2 border-purple-200 bg-purple-50/80 p-4 sm:p-5 space-y-3">
        <h4 className="font-bold text-warm-800 flex items-center gap-2 text-base sm:text-lg">
          <span>📋</span>
          Fraser Guidelines
        </h4>
        <p className="text-sm sm:text-base text-warm-600 leading-relaxed">
          Fraser guidelines are similar but specifically about contraception and sexual health advice for under-16s.
          They help staff decide if they can give this advice without telling your parents.
        </p>
        <div className="mt-2"><ReadAloud text="Fraser guidelines are similar but specifically about contraception and sexual health advice for under-16s. They help staff decide if they can give this advice without telling your parents. Even if you are under 16, you might be able to consent to treatment yourself if staff believe you are mature enough to understand what is involved." /></div>
        <div className="bg-white/60 rounded-xl p-3 sm:p-4 border border-purple-100">
          <p className="text-sm sm:text-base text-warm-700">
            <strong>Key point:</strong> Even if you're under 16, you might be able to consent to treatment yourself
            if staff believe you're mature enough to understand what's involved.
          </p>
        </div>
      </div>

      {/* How capacity is assessed */}
      <div className="space-y-3">
        <h4 className="font-bold text-warm-800 flex items-center gap-2 text-base sm:text-lg">
          <span>🔍</span>
          How is capacity assessed?
        </h4>
        <p className="text-sm sm:text-base text-warm-600 leading-relaxed">
          When healthcare staff check if you can make a decision, they're looking at whether you can:
        </p>
        <div className="mt-2"><ReadAloud text="When healthcare staff check if you can make a decision, they look at four things. Can you understand the information they are telling you? Can you remember it long enough to decide? Can you think about the pros and cons? And can you share what you have decided? Capacity is assessed for each decision separately. You might be able to consent to some things but need support with others, and that is totally okay." /></div>
        <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 mt-3">
          <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-green-200 p-3 sm:p-4">
            <p className="font-semibold text-sm sm:text-base text-warm-800">1. Understand the info</p>
            <p className="text-xs sm:text-sm text-warm-500 mt-1">Can you take in what they're telling you?</p>
          </div>
          <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-green-200 p-3 sm:p-4">
            <p className="font-semibold text-sm sm:text-base text-warm-800">2. Remember it</p>
            <p className="text-xs sm:text-sm text-warm-500 mt-1">Can you hold onto it long enough to decide?</p>
          </div>
          <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-green-200 p-3 sm:p-4">
            <p className="font-semibold text-sm sm:text-base text-warm-800">3. Weigh it up</p>
            <p className="text-xs sm:text-sm text-warm-500 mt-1">Can you think about pros and cons?</p>
          </div>
          <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-green-200 p-3 sm:p-4">
            <p className="font-semibold text-sm sm:text-base text-warm-800">4. Communicate</p>
            <p className="text-xs sm:text-sm text-warm-500 mt-1">Can you share what you've decided?</p>
          </div>
        </div>
        <div className="bg-white/60 rounded-xl p-3 sm:p-4 border border-warm-200 mt-3">
          <p className="text-sm sm:text-base text-warm-600">
            <strong>Remember:</strong> Capacity is assessed for each decision separately. You might be able to
            consent to some things but need support with others - and that's totally okay! 👍
          </p>
        </div>
      </div>
    </div>
  )
}

// Content Section: Privacy & Sharing Information
function PrivacyContent() {
  return (
    <div id="privacy" className="rounded-2xl sm:rounded-3xl border-2 border-blue-200 bg-gradient-to-br from-blue-50/90 to-sky-50/90 backdrop-blur-sm p-5 sm:p-6 md:p-8 space-y-5 sm:space-y-6 animate-fade-in">
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-blue-400 to-sky-500 flex items-center justify-center shrink-0 shadow-lg">
          <span className="text-2xl sm:text-3xl">🔒</span>
        </div>
        <div>
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-warm-800">Privacy & Sharing Info</h3>
          <p className="text-sm sm:text-base text-warm-600 mt-1">
            Your right to keep your health information private
          </p>
        </div>
      </div>

      {/* Your right to confidentiality */}
      <div className="space-y-3">
        <h4 className="font-bold text-warm-800 flex items-center gap-2 text-base sm:text-lg">
          <span>🔐</span>
          Your right to confidentiality
        </h4>
        <p className="text-sm sm:text-base text-warm-600 leading-relaxed">
          Confidentiality means keeping your personal information private. When you talk to doctors, nurses,
          or other healthcare staff, what you tell them is confidential. This includes:
        </p>
        <div className="mt-2"><ReadAloud text="Confidentiality means keeping your personal information private. When you talk to doctors, nurses, or other healthcare staff, what you tell them is confidential. This includes what you tell them about your health and life, results from tests and examinations, notes written about your appointments, and letters and reports about you. Even if you are under 16, you have a right to privacy. Staff will not automatically share everything with your parents, especially if you ask them not to." /></div>
        <ul className="space-y-2 text-sm sm:text-base text-warm-600 ml-4">
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-1">•</span>
            <span>What you tell them about your health and life</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-1">•</span>
            <span>Results from tests and examinations</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-1">•</span>
            <span>Notes written about your appointments</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-1">•</span>
            <span>Letters and reports about you</span>
          </li>
        </ul>
        <div className="bg-white/60 rounded-xl p-3 sm:p-4 border border-blue-100">
          <p className="text-sm sm:text-base text-warm-700">
            <strong>Even if you're under 16</strong>, you have a right to privacy. Staff won't automatically
            share everything with your parents - especially if you ask them not to.
          </p>
        </div>
      </div>

      {/* When information might be shared */}
      <div className="rounded-xl sm:rounded-2xl border-2 border-amber-200 bg-amber-50/80 p-4 sm:p-5 space-y-3">
        <h4 className="font-bold text-warm-800 flex items-center gap-2 text-base sm:text-lg">
          <span>⚠️</span>
          When info might be shared
        </h4>
        <p className="text-sm sm:text-base text-warm-600 leading-relaxed">
          Sometimes staff need to share information without your permission. This usually only happens when
          there's a serious concern about safety - yours or someone else's. This is called "safeguarding".
        </p>
        <p className="text-sm sm:text-base text-warm-600 leading-relaxed">
          They might share information if they believe:
        </p>
        <div className="mt-2"><ReadAloud text="Sometimes staff need to share information without your permission. This usually only happens when there is a serious concern about safety, yours or someone else's. This is called safeguarding. They might share information if they believe you are at risk of serious harm, someone else is at risk of serious harm, or there is a legal requirement like certain infections. Staff will usually try to talk to you first and explain why they need to share information." /></div>
        <ul className="space-y-1 text-sm sm:text-base text-warm-600 ml-4">
          <li className="flex items-start gap-2">
            <span className="text-amber-600">•</span>
            <span>You're at risk of serious harm</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-600">•</span>
            <span>Someone else is at risk of serious harm</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-600">•</span>
            <span>There's a legal requirement (like certain infections)</span>
          </li>
        </ul>
        <p className="text-xs sm:text-sm text-warm-500 mt-2">
          Staff will usually try to talk to you first and explain why they need to share information.
        </p>
      </div>

      {/* Accessing your records */}
      <div className="space-y-3">
        <h4 className="font-bold text-warm-800 flex items-center gap-2 text-base sm:text-lg">
          <span>📂</span>
          Accessing your medical records
        </h4>
        <p className="text-sm sm:text-base text-warm-600 leading-relaxed">
          You have the right to see your own medical records. This is called a "Subject Access Request" (SAR).
          You can ask for:
        </p>
        <div className="mt-2"><ReadAloud text="You have the right to see your own medical records. This is called a Subject Access Request or SAR. You can ask for a copy of your GP records, hospital notes and letters, and test results and scan images. To request them, ask your GP surgery or hospital medical records department. They must respond within one month and it is usually free." /></div>
        <ul className="space-y-1 text-sm sm:text-base text-warm-600 ml-4">
          <li className="flex items-start gap-2">
            <span className="text-blue-500">✓</span>
            <span>A copy of your GP records</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500">✓</span>
            <span>Hospital notes and letters</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500">✓</span>
            <span>Test results and scan images</span>
          </li>
        </ul>
        <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-blue-200 p-3 sm:p-4 mt-3">
          <p className="text-sm sm:text-base text-warm-700">
            <strong>How to request:</strong> Ask your GP surgery or hospital's medical records
            department. They must respond within one month and it's usually free! 📋
          </p>
        </div>
      </div>

      {/* Controlling who sees your info */}
      <div className="rounded-xl sm:rounded-2xl border-2 border-accent-200 bg-accent-50/80 p-4 sm:p-5 space-y-3">
        <h4 className="font-bold text-warm-800 flex items-center gap-2 text-base sm:text-lg">
          <span>🎛️</span>
          You're in control
        </h4>
        <p className="text-sm sm:text-base text-warm-600 leading-relaxed">
          You can have a say in who sees your health information:
        </p>
        <div className="mt-2"><ReadAloud text="You can have a say in who sees your health information. You can ask for private time to speak to staff alone without parents in the room. You can set preferences and tell your team who you are happy for them to share information with. From age 16, you can register to view your records online using the NHS App. You can also give permission for someone like a parent to access your records." /></div>
        <ul className="space-y-2 text-sm sm:text-base text-warm-600 ml-4">
          <li className="flex items-start gap-2">
            <span className="text-accent-600">✓</span>
            <span><strong>Ask for private time:</strong> Speak to staff alone, without parents in the room</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-600">✓</span>
            <span><strong>Set preferences:</strong> Tell your team who you're happy for them to share info with</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-600">✓</span>
            <span><strong>NHS App:</strong> From 16, register to view your records online</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-600">✓</span>
            <span><strong>Proxy access:</strong> Give permission for someone (like a parent) to access your records</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

// Content Section: Decision-Making After 18
function DecisionMakingContent() {
  return (
    <div id="decision-making" className="rounded-2xl sm:rounded-3xl border-2 border-purple-200 bg-gradient-to-br from-purple-50/90 to-pink-50/90 backdrop-blur-sm p-5 sm:p-6 md:p-8 space-y-5 sm:space-y-6 animate-fade-in">
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center shrink-0 shadow-lg">
          <span className="text-2xl sm:text-3xl">📝</span>
        </div>
        <div>
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-warm-800">Decisions at 18+</h3>
          <p className="text-sm sm:text-base text-warm-600 mt-1">
            What changes when you become a legal adult
          </p>
        </div>
      </div>

      {/* Legal changes at 18 */}
      <div className="space-y-3">
        <h4 className="font-bold text-warm-800 flex items-center gap-2 text-base sm:text-lg">
          <span>🎂</span>
          What changes at 18?
        </h4>
        <p className="text-sm sm:text-base text-warm-600 leading-relaxed">
          When you turn 18, you become a legal adult. This means some important things change:
        </p>
        <div className="mt-2"><ReadAloud text="When you turn 18, you become a legal adult. This means important things change. Staff assume you can make decisions unless there is reason not to. Your parents no longer automatically decide for you. Staff need your permission to share with family. And you will consent to treatment yourself." /></div>
        <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 mt-3">
          <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-purple-200 p-3 sm:p-4">
            <p className="font-semibold text-sm sm:text-base text-warm-800">You're presumed capable</p>
            <p className="text-xs sm:text-sm text-warm-500 mt-1">Staff assume you can make decisions unless there's reason not to</p>
          </div>
          <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-purple-200 p-3 sm:p-4">
            <p className="font-semibold text-sm sm:text-base text-warm-800">Parents' rights change</p>
            <p className="text-xs sm:text-sm text-warm-500 mt-1">They no longer automatically decide for you</p>
          </div>
          <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-purple-200 p-3 sm:p-4">
            <p className="font-semibold text-sm sm:text-base text-warm-800">Confidentiality is yours</p>
            <p className="text-xs sm:text-sm text-warm-500 mt-1">Staff need YOUR permission to share with family</p>
          </div>
          <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-purple-200 p-3 sm:p-4">
            <p className="font-semibold text-sm sm:text-base text-warm-800">You sign forms</p>
            <p className="text-xs sm:text-sm text-warm-500 mt-1">You'll consent to treatment yourself</p>
          </div>
        </div>
      </div>

      {/* Mental Capacity Act */}
      <div className="rounded-xl sm:rounded-2xl border-2 border-blue-200 bg-blue-50/80 p-4 sm:p-5 space-y-3">
        <h4 className="font-bold text-warm-800 flex items-center gap-2 text-base sm:text-lg">
          <span>📜</span>
          The Mental Capacity Act
        </h4>
        <p className="text-sm sm:text-base text-warm-600 leading-relaxed">
          The Mental Capacity Act (MCA) is a law that protects people who might struggle to make some decisions.
          It has five important principles:
        </p>
        <div className="mt-2"><ReadAloud text="The Mental Capacity Act is a law that protects people who might struggle to make some decisions. It has five important principles. First, assume capacity and start by assuming someone can make decisions. Second, support first and help people make their own decisions where possible. Third, unwise is okay, you can make choices others disagree with. Fourth, best interests, decisions made for someone must help them. And fifth, least restrictive, choose options that limit freedom least." /></div>
        <ol className="space-y-2 text-sm sm:text-base text-warm-600 ml-4">
          <li className="flex items-start gap-2">
            <span className="font-bold text-blue-600">1.</span>
            <span><strong>Assume capacity:</strong> Start by assuming someone CAN make decisions</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-blue-600">2.</span>
            <span><strong>Support first:</strong> Help people make their own decisions where possible</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-blue-600">3.</span>
            <span><strong>Unwise is OK:</strong> You can make choices others disagree with</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-blue-600">4.</span>
            <span><strong>Best interests:</strong> Decisions made for someone must help them</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-blue-600">5.</span>
            <span><strong>Least restrictive:</strong> Choose options that limit freedom least</span>
          </li>
        </ol>
      </div>

      {/* Lasting Power of Attorney */}
      <div className="space-y-3">
        <h4 className="font-bold text-warm-800 flex items-center gap-2 text-base sm:text-lg">
          <span>📋</span>
          Lasting Power of Attorney (LPA)
        </h4>
        <p className="text-sm sm:text-base text-warm-600 leading-relaxed">
          An LPA lets you choose someone to make decisions for you if you can't in the future. There are two types:
        </p>
        <div className="mt-2"><ReadAloud text="An LPA lets you choose someone to make decisions for you if you cannot in the future. Health and Welfare LPA covers daily care, medical treatment, and where you live, and is only used if you lose capacity to decide. Property and Finance LPA covers money, bills, and property, and can be used anytime you choose, even if you still have capacity. You need mental capacity when making an LPA, you need to understand what you are doing and who you are choosing." /></div>
        <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 mt-3">
          <div className="rounded-xl border-2 border-accent-200 bg-accent-50/80 p-4">
            <h5 className="font-bold text-warm-800 text-sm sm:text-base">Health & Welfare LPA</h5>
            <p className="text-xs sm:text-sm text-warm-600 mt-2">
              Covers daily care, medical treatment, and where you live.
              Only used if you lose capacity to decide.
            </p>
          </div>
          <div className="rounded-xl border-2 border-primary-200 bg-primary-50/80 p-4">
            <h5 className="font-bold text-warm-800 text-sm sm:text-base">Property & Finance LPA</h5>
            <p className="text-xs sm:text-sm text-warm-600 mt-2">
              Covers money, bills, and property. Can be used
              anytime you choose, even if you still have capacity.
            </p>
          </div>
        </div>
        <div className="bg-white/60 rounded-xl p-3 sm:p-4 border border-warm-200 mt-3">
          <p className="text-sm sm:text-base text-warm-600">
            <strong>Important:</strong> You need mental capacity when making an LPA - you need to
            understand what you're doing and who you're choosing.
          </p>
        </div>
      </div>

      {/* Supported decision-making vs best interests */}
      <div className="rounded-xl sm:rounded-2xl border-2 border-amber-200 bg-amber-50/80 p-4 sm:p-5 space-y-3">
        <h4 className="font-bold text-warm-800 flex items-center gap-2 text-base sm:text-lg">
          <span>🤝</span>
          Getting help with decisions
        </h4>
        <div className="space-y-3 text-sm sm:text-base text-warm-600">
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-warm-200">
            <p className="font-semibold text-warm-800">Supported decision-making</p>
            <p className="text-xs sm:text-sm mt-1">
              Getting help to make YOUR own decisions. You might need info explained differently,
              more time, or someone to help you think things through. The decision is still yours!
            </p>
          </div>
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-warm-200">
            <p className="font-semibold text-warm-800">Best interests decisions</p>
            <p className="text-xs sm:text-sm mt-1">
              If you truly can't make a particular decision (even with support), someone else may
              decide for you - considering your wishes, feelings, and what you would have wanted.
            </p>
          </div>
        </div>
        <div className="mt-2"><ReadAloud text="Supported decision-making is getting help to make your own decisions. You might need information explained differently, more time, or someone to help you think things through. The decision is still yours. Best interests decisions happen if you truly cannot make a particular decision, even with support, and someone else may decide for you, considering your wishes, feelings, and what you would have wanted. The goal is always to support you to make decisions yourself. Best interests decisions are a last resort." /></div>
        <div className="bg-white/60 rounded-xl p-3 sm:p-4 border border-amber-100 mt-3">
          <p className="text-sm sm:text-base text-warm-600">
            <strong>Remember:</strong> The goal is always to support YOU to make decisions yourself.
            Best interests decisions are a last resort. 💪
          </p>
        </div>
      </div>

      {/* Link to Money & PIP page */}
      <div className="rounded-xl sm:rounded-2xl border-2 border-warm-200 bg-white/70 backdrop-blur-sm p-4 sm:p-5">
        <p className="text-sm sm:text-base text-warm-600">
          <span className="font-semibold">Want to know more?</span> Visit the{' '}
          <Link to="/money" className="text-primary-600 hover:text-primary-700 font-semibold underline decoration-2 underline-offset-2">
            Money & PIP page
          </Link>{' '}
          for more about LPAs, Court of Protection, and legal capacity.
        </p>
      </div>
    </div>
  )
}
