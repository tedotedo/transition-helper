import { useState } from 'react'

type TopicKey = 'consent' | 'privacy' | 'decision-making' | null

export function RightsHub() {
  const [activeTopic, setActiveTopic] = useState<TopicKey>(null)

  const toggleTopic = (topic: TopicKey) => {
    setActiveTopic(activeTopic === topic ? null : topic)
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <header className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-warm-500">Know your rights</p>
        <h1 className="text-2xl md:text-3xl font-bold text-warm-800">Your rights & who makes decisions ⚖️</h1>
        <p className="max-w-2xl text-sm md:text-base text-warm-600 leading-relaxed">
          This section explains how decisions about your care work at different ages, what consent means, and how your family can stay involved as you become more independent.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        <AgeCard
          label="Under 16"
          emoji="🌱"
          description="Find out how consent works for under 16s - including when staff check if you understand enough to make your own decisions."
          href="/rights/consent-under-16"
        />
        <AgeCard
          label="Age 16–17"
          emoji="🚀"
          description="From 16, you can usually agree to your own treatment. Let's explain what that actually means in real life!"
          highlight
          href="/rights/consent-16-17"
        />
        <AgeCard
          label="Age 18+"
          emoji="🎓"
          description="Discover what changes when you become an adult, including how the Mental Capacity Act helps people who need support with decisions."
          href="/rights/consent-18-plus"
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-warm-800">Topics to explore</h2>
        <div className="grid gap-3 md:grid-cols-3">
          <TopicPill
            title="Consent and capacity"
            emoji="✅"
            active={activeTopic === 'consent'}
            onClick={() => toggleTopic('consent')}
          />
          <TopicPill
            title="Privacy & sharing info"
            emoji="🔒"
            active={activeTopic === 'privacy'}
            onClick={() => toggleTopic('privacy')}
          />
          <TopicPill
            title="Decision-making after 18"
            emoji="📝"
            active={activeTopic === 'decision-making'}
            onClick={() => toggleTopic('decision-making')}
          />
        </div>

        {/* Topic Content Sections */}
        {activeTopic === 'consent' && <ConsentContent />}
        {activeTopic === 'privacy' && <PrivacyContent />}
        {activeTopic === 'decision-making' && <DecisionMakingContent />}

        {!activeTopic && (
          <p className="text-sm text-warm-500">
            Click a topic above to learn more, or check out the consent at 16–17 guide to get started.
          </p>
        )}
      </section>
    </div>
  )
}

interface AgeCardProps {
  label: string
  description: string
  emoji?: string
  highlight?: boolean
  href?: string
}

function AgeCard({ label, description, emoji, highlight, href }: AgeCardProps) {
  const isDisabled = !href

  const content = (
    <div
      className={`flex h-full flex-col rounded-2xl border px-5 py-5 shadow-card text-sm transition-all duration-300 ${
        highlight
          ? 'border-primary-300 bg-gradient-to-br from-primary-50 to-white ring-2 ring-primary-100'
          : isDisabled
            ? 'border-warm-100 bg-white opacity-70'
            : 'border-warm-200 bg-white hover:border-primary-200 hover:shadow-card-hover hover:-translate-y-0.5'
      }`}
    >
      <div className="flex items-center gap-2">
        {emoji && <span className="text-xl">{emoji}</span>}
        <p className={`text-[0.7rem] font-semibold uppercase tracking-wider ${highlight ? 'text-primary-600' : 'text-warm-500'}`}>{label}</p>
      </div>
      <p className="mt-3 text-sm text-warm-700 leading-relaxed flex-1">{description}</p>
      <span className={`mt-4 inline-flex items-center text-sm font-medium ${isDisabled ? 'text-warm-400' : highlight ? 'text-primary-600' : 'text-primary-600'}`}>
        {isDisabled ? '🔜 Coming soon' : 'Learn more →'}
      </span>
    </div>
  )

  if (isDisabled) {
    return content
  }

  return (
    <a href={href} className="block group">
      {content}
    </a>
  )
}

interface TopicPillProps {
  title: string
  emoji?: string
  active?: boolean
  onClick?: () => void
}

function TopicPill({ title, emoji, active, onClick }: TopicPillProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
        active
          ? 'border-primary-300 bg-gradient-to-r from-primary-50 to-primary-100 text-primary-700 shadow-sm ring-2 ring-primary-200'
          : 'border-warm-200 bg-white text-warm-600 hover:border-primary-200 hover:bg-warm-50 hover:text-warm-800'
      }`}
    >
      {emoji && <span>{emoji}</span>}
      {title}
      <span className="text-xs">{active ? '▼' : '▶'}</span>
    </button>
  )
}

// Content Section: Consent and Capacity
function ConsentContent() {
  return (
    <div id="consent" className="rounded-2xl border border-primary-200 bg-gradient-to-br from-primary-50 to-white p-6 space-y-6 animate-fade-in">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center shrink-0">
          <span className="text-2xl">✅</span>
        </div>
        <div>
          <h3 className="text-lg font-bold text-warm-800">Consent and Capacity</h3>
          <p className="text-sm text-warm-600 mt-1">
            Understanding when you can make your own healthcare decisions
          </p>
        </div>
      </div>

      {/* What is consent */}
      <div className="space-y-3">
        <h4 className="font-semibold text-warm-800 flex items-center gap-2">
          <span>💡</span>
          What is consent?
        </h4>
        <p className="text-sm text-warm-600 leading-relaxed">
          Consent means agreeing to something after you've understood what it involves. In healthcare,
          this means agreeing to treatment, tests, or sharing your information. For your consent to be valid,
          you need to:
        </p>
        <ul className="space-y-2 text-sm text-warm-600 ml-4">
          <li className="flex items-start gap-2">
            <span className="text-primary-500 mt-1">•</span>
            <span><strong>Understand</strong> what's being proposed and why</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary-500 mt-1">•</span>
            <span><strong>Be able to weigh up</strong> the pros and cons</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary-500 mt-1">•</span>
            <span><strong>Communicate</strong> your decision (this can be in any way that works for you)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary-500 mt-1">•</span>
            <span><strong>Give it freely</strong> - nobody should pressure you</span>
          </li>
        </ul>
      </div>

      {/* Gillick Competence */}
      <div className="rounded-xl border border-accent-200 bg-accent-50 p-4 space-y-3">
        <h4 className="font-semibold text-warm-800 flex items-center gap-2">
          <span>🌟</span>
          What is Gillick Competence?
        </h4>
        <p className="text-sm text-warm-600 leading-relaxed">
          You might hear staff talk about "Gillick competence" - this is a way of checking if someone under 16
          can make their own decisions about treatment. It's named after a court case from the 1980s.
        </p>
        <p className="text-sm text-warm-600 leading-relaxed">
          Being "Gillick competent" means you understand enough about the treatment to make your own choice,
          even without your parents' permission. Staff will consider:
        </p>
        <ul className="space-y-1 text-sm text-warm-600 ml-4">
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
      <div className="rounded-xl border border-purple-200 bg-purple-50 p-4 space-y-3">
        <h4 className="font-semibold text-warm-800 flex items-center gap-2">
          <span>📋</span>
          Fraser Guidelines
        </h4>
        <p className="text-sm text-warm-600 leading-relaxed">
          Fraser guidelines are similar but specifically about contraception and sexual health advice for under-16s.
          They help staff decide if they can give this advice without telling your parents.
        </p>
        <p className="text-sm text-warm-600">
          <strong>Key point:</strong> Even if you're under 16, you might be able to consent to treatment yourself
          if staff believe you're mature enough to understand what's involved.
        </p>
      </div>

      {/* How capacity is assessed */}
      <div className="space-y-3">
        <h4 className="font-semibold text-warm-800 flex items-center gap-2">
          <span>🔍</span>
          How is capacity assessed?
        </h4>
        <p className="text-sm text-warm-600 leading-relaxed">
          When healthcare staff check if you can make a decision, they're looking at whether you can:
        </p>
        <div className="grid gap-3 md:grid-cols-2 mt-3">
          <div className="bg-white rounded-xl border border-warm-200 p-3">
            <p className="font-medium text-sm text-warm-800">1. Understand the information</p>
            <p className="text-xs text-warm-500 mt-1">Can you take in what they're telling you?</p>
          </div>
          <div className="bg-white rounded-xl border border-warm-200 p-3">
            <p className="font-medium text-sm text-warm-800">2. Remember it long enough</p>
            <p className="text-xs text-warm-500 mt-1">Can you hold onto the info to make a choice?</p>
          </div>
          <div className="bg-white rounded-xl border border-warm-200 p-3">
            <p className="font-medium text-sm text-warm-800">3. Weigh it up</p>
            <p className="text-xs text-warm-500 mt-1">Can you think about the pros and cons?</p>
          </div>
          <div className="bg-white rounded-xl border border-warm-200 p-3">
            <p className="font-medium text-sm text-warm-800">4. Communicate your choice</p>
            <p className="text-xs text-warm-500 mt-1">Can you tell someone what you've decided?</p>
          </div>
        </div>
        <p className="text-sm text-warm-500 mt-3">
          <strong>Remember:</strong> Capacity is assessed for each decision separately. You might be able to
          consent to some things but need support with others - and that's totally okay!
        </p>
      </div>
    </div>
  )
}

// Content Section: Privacy & Sharing Information
function PrivacyContent() {
  return (
    <div id="privacy" className="rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-white p-6 space-y-6 animate-fade-in">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
          <span className="text-2xl">🔒</span>
        </div>
        <div>
          <h3 className="text-lg font-bold text-warm-800">Privacy & Sharing Information</h3>
          <p className="text-sm text-warm-600 mt-1">
            Your right to keep your health information private
          </p>
        </div>
      </div>

      {/* Your right to confidentiality */}
      <div className="space-y-3">
        <h4 className="font-semibold text-warm-800 flex items-center gap-2">
          <span>🔐</span>
          Your right to confidentiality
        </h4>
        <p className="text-sm text-warm-600 leading-relaxed">
          Confidentiality means keeping your personal information private. When you talk to doctors, nurses,
          or other healthcare staff, what you tell them is confidential. This includes:
        </p>
        <ul className="space-y-2 text-sm text-warm-600 ml-4">
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
        <p className="text-sm text-warm-600 leading-relaxed">
          <strong>Even if you're under 16</strong>, you have a right to privacy. Staff won't automatically
          share everything with your parents - especially if you ask them not to.
        </p>
      </div>

      {/* When information might be shared */}
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 space-y-3">
        <h4 className="font-semibold text-warm-800 flex items-center gap-2">
          <span>⚠️</span>
          When information might be shared
        </h4>
        <p className="text-sm text-warm-600 leading-relaxed">
          Sometimes staff need to share information without your permission. This usually only happens when
          there's a serious concern about safety - yours or someone else's. This is called "safeguarding".
        </p>
        <p className="text-sm text-warm-600 leading-relaxed">
          They might share information if they believe:
        </p>
        <ul className="space-y-1 text-sm text-warm-600 ml-4">
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
        <p className="text-xs text-warm-500 mt-2">
          Staff will usually try to talk to you first and explain why they need to share information.
        </p>
      </div>

      {/* Accessing your records */}
      <div className="space-y-3">
        <h4 className="font-semibold text-warm-800 flex items-center gap-2">
          <span>📂</span>
          Accessing your medical records
        </h4>
        <p className="text-sm text-warm-600 leading-relaxed">
          You have the right to see your own medical records. This is called a "Subject Access Request" (SAR).
          You can ask for:
        </p>
        <ul className="space-y-1 text-sm text-warm-600 ml-4">
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
        <div className="bg-white rounded-xl border border-warm-200 p-3 mt-3">
          <p className="text-sm text-warm-700">
            <strong>How to request your records:</strong> Ask your GP surgery or hospital's medical records
            department. They must respond within one month and it's usually free.
          </p>
        </div>
      </div>

      {/* Controlling who sees your info */}
      <div className="rounded-xl border border-accent-200 bg-accent-50 p-4 space-y-3">
        <h4 className="font-semibold text-warm-800 flex items-center gap-2">
          <span>🎛️</span>
          Controlling who sees your information
        </h4>
        <p className="text-sm text-warm-600 leading-relaxed">
          You can have a say in who sees your health information:
        </p>
        <ul className="space-y-2 text-sm text-warm-600 ml-4">
          <li className="flex items-start gap-2">
            <span className="text-accent-600">✓</span>
            <span><strong>Ask for private time:</strong> You can request to speak to staff alone, without parents in the room</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-600">✓</span>
            <span><strong>Set preferences:</strong> Tell your team who you're happy for them to share info with</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-600">✓</span>
            <span><strong>NHS App:</strong> From 16, you can register for the NHS App to view your records online</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-600">✓</span>
            <span><strong>Proxy access:</strong> You can give permission for someone else (like a parent) to access your records</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

// Content Section: Decision-Making After 18
function DecisionMakingContent() {
  return (
    <div id="decision-making" className="rounded-2xl border border-purple-200 bg-gradient-to-br from-purple-50 to-white p-6 space-y-6 animate-fade-in">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center shrink-0">
          <span className="text-2xl">📝</span>
        </div>
        <div>
          <h3 className="text-lg font-bold text-warm-800">Decision-Making After 18</h3>
          <p className="text-sm text-warm-600 mt-1">
            What changes when you become a legal adult
          </p>
        </div>
      </div>

      {/* Legal changes at 18 */}
      <div className="space-y-3">
        <h4 className="font-semibold text-warm-800 flex items-center gap-2">
          <span>🎂</span>
          What changes at 18?
        </h4>
        <p className="text-sm text-warm-600 leading-relaxed">
          When you turn 18, you become a legal adult. This means some important things change:
        </p>
        <div className="grid gap-3 md:grid-cols-2 mt-3">
          <div className="bg-white rounded-xl border border-purple-200 p-3">
            <p className="font-medium text-sm text-warm-800">You're presumed capable</p>
            <p className="text-xs text-warm-500 mt-1">Staff assume you can make your own decisions unless there's a reason to think otherwise</p>
          </div>
          <div className="bg-white rounded-xl border border-purple-200 p-3">
            <p className="font-medium text-sm text-warm-800">Parents' rights change</p>
            <p className="text-xs text-warm-500 mt-1">Your parents no longer have automatic rights to make decisions for you</p>
          </div>
          <div className="bg-white rounded-xl border border-purple-200 p-3">
            <p className="font-medium text-sm text-warm-800">Confidentiality is yours</p>
            <p className="text-xs text-warm-500 mt-1">Staff need your permission to share info with your family</p>
          </div>
          <div className="bg-white rounded-xl border border-purple-200 p-3">
            <p className="font-medium text-sm text-warm-800">You sign consent forms</p>
            <p className="text-xs text-warm-500 mt-1">You'll be asked to consent to treatment yourself</p>
          </div>
        </div>
      </div>

      {/* Mental Capacity Act */}
      <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 space-y-3">
        <h4 className="font-semibold text-warm-800 flex items-center gap-2">
          <span>📜</span>
          The Mental Capacity Act
        </h4>
        <p className="text-sm text-warm-600 leading-relaxed">
          The Mental Capacity Act (MCA) is a law that protects people who might struggle to make some decisions
          for themselves. It has five important principles:
        </p>
        <ol className="space-y-2 text-sm text-warm-600 ml-4">
          <li className="flex items-start gap-2">
            <span className="font-bold text-blue-600">1.</span>
            <span><strong>Assume capacity:</strong> Start by assuming someone CAN make decisions</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-blue-600">2.</span>
            <span><strong>Support decision-making:</strong> Help people make their own decisions where possible</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-blue-600">3.</span>
            <span><strong>Unwise decisions are allowed:</strong> You can make choices others disagree with</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-blue-600">4.</span>
            <span><strong>Best interests:</strong> Decisions made for someone must be in their best interests</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-blue-600">5.</span>
            <span><strong>Less restrictive option:</strong> Choose the option that limits freedom least</span>
          </li>
        </ol>
      </div>

      {/* Lasting Power of Attorney */}
      <div className="space-y-3">
        <h4 className="font-semibold text-warm-800 flex items-center gap-2">
          <span>📋</span>
          Lasting Power of Attorney (LPA)
        </h4>
        <p className="text-sm text-warm-600 leading-relaxed">
          An LPA is a legal document that lets you choose someone to make decisions for you if you can't
          in the future. There are two types:
        </p>
        <div className="grid gap-3 md:grid-cols-2 mt-3">
          <div className="rounded-xl border border-accent-200 bg-accent-50 p-4">
            <h5 className="font-semibold text-warm-800 text-sm">Health and Welfare LPA</h5>
            <p className="text-xs text-warm-600 mt-2">
              Covers decisions about your daily care, medical treatment, and where you live.
              Can only be used if you lose capacity to make these decisions.
            </p>
          </div>
          <div className="rounded-xl border border-primary-200 bg-primary-50 p-4">
            <h5 className="font-semibold text-warm-800 text-sm">Property and Finance LPA</h5>
            <p className="text-xs text-warm-600 mt-2">
              Covers decisions about your money, bills, and property. Can be used any time
              you choose, even if you still have capacity.
            </p>
          </div>
        </div>
        <p className="text-sm text-warm-500 mt-3">
          <strong>Important:</strong> You need to have mental capacity when you make an LPA - you need to
          understand what you're doing and who you're appointing.
        </p>
      </div>

      {/* Supported decision-making vs best interests */}
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 space-y-3">
        <h4 className="font-semibold text-warm-800 flex items-center gap-2">
          <span>🤝</span>
          Supported decision-making vs Best interests decisions
        </h4>
        <div className="space-y-3 text-sm text-warm-600">
          <div className="bg-white rounded-xl p-3 border border-warm-200">
            <p className="font-medium text-warm-800">Supported decision-making</p>
            <p className="text-xs mt-1">
              This means getting help to make your OWN decisions. You might need information explained
              in a different way, more time, or someone to help you think things through.
              The decision is still yours.
            </p>
          </div>
          <div className="bg-white rounded-xl p-3 border border-warm-200">
            <p className="font-medium text-warm-800">Best interests decisions</p>
            <p className="text-xs mt-1">
              If you truly can't make a particular decision (even with support), someone else may
              need to make it for you. They must consider your wishes, feelings, beliefs, and what
              you would have wanted.
            </p>
          </div>
        </div>
        <p className="text-xs text-warm-500 mt-2">
          <strong>Remember:</strong> The goal is always to support YOU to make decisions yourself
          wherever possible. Best interests decisions are a last resort.
        </p>
      </div>

      {/* Link to Money & PIP page */}
      <div className="rounded-xl border border-warm-200 bg-white p-4">
        <p className="text-sm text-warm-600">
          <span className="font-semibold">Want to know more?</span> Visit the{' '}
          <a href="/money" className="text-primary-600 hover:text-primary-700 font-medium">
            Money & PIP page
          </a>{' '}
          for detailed information about Lasting Power of Attorney, Court of Protection, and legal capacity.
        </p>
      </div>
    </div>
  )
}
