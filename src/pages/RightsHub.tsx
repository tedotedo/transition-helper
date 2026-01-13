export function RightsHub() {
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
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-warm-800">Topics to explore</h2>
        <div className="grid gap-3 md:grid-cols-3">
          <TopicPill title="Consent and capacity" emoji="✅" active />
          <TopicPill title="Privacy & sharing info" emoji="🔒" />
          <TopicPill title="Decision-making after 18" emoji="📝" />
        </div>
        <p className="text-sm text-warm-500">
          More topics coming soon! For now, check out the consent at 16–17 guide to get started.
        </p>
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
}

function TopicPill({ title, emoji, active }: TopicPillProps) {
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
        active
          ? 'border-primary-300 bg-gradient-to-r from-primary-50 to-primary-100 text-primary-700 shadow-sm'
          : 'border-warm-200 bg-white text-warm-600 hover:border-primary-200 hover:bg-warm-50 hover:text-warm-800'
      }`}
    >
      {emoji && <span>{emoji}</span>}
      {title}
    </button>
  )
}
