const rsgBase = '/ready-steady-go-pdfs'

const resources = [
  {
    title: 'Ready questionnaire (age 11–13)',
    emoji: '🌱',
    description:
      "Helps younger children start talking about their condition, who's in their team, and what they understand so far.",
    href: '/resources/ready-steady-go/ready-questionnaire',
    audience: 'Young person',
    internal: true,
    easyReadHref: `${rsgBase}/easy-read-ready-3.pdf`,
  },
  {
    title: 'Steady questionnaire (age 14–15)',
    emoji: '💪',
    description:
      'Helps you think about independence, your medicines, and what you want to know before transition.',
    href: '/resources/ready-steady-go/steady-questionnaire',
    audience: 'Young person',
    internal: true,
    easyReadHref: `${rsgBase}/easy-read-steady-3.pdf`,
  },
  {
    title: 'Go questionnaire (age 16–17)',
    emoji: '🚀',
    description:
      "For when you're getting close to moving to adult services. Fill it in and bring it to your next appointment!",
    href: '/resources/ready-steady-go/go-questionnaire',
    audience: 'Young person',
    internal: true,
    easyReadHref: `${rsgBase}/easy-read-go-3.pdf`,
  },
  {
    title: 'Ready Steady Go transition plan',
    emoji: '📋',
    description:
      'A plan that you, your family, and your team can fill in together to record your goals and next steps.',
    href: `${rsgBase}/ready-steady-go-transition-plan_1-2_1.pdf`,
    audience: 'Young person and family',
  },
  {
    title: 'Parent plan and info',
    emoji: '👨‍👩‍👧',
    description:
      'Info and questions for parents and carers to think about how to support growing independence.',
    href: `${rsgBase}/readysteadygoparentplanpatientinformation_1-2_1.pdf`,
    audience: 'Parent or carer',
  },
  {
    title: 'Moving into adult care',
    emoji: '🎓',
    description:
      'Easy-to-understand info about what to expect from adult services and how they might work differently.',
    href: `${rsgBase}/transitionmovingintoadultcare-patientinformation_2.pdf`,
    audience: 'Young person and family',
  },
  {
    title: 'Easy-read booklet',
    emoji: '📖',
    description:
      'A booklet explaining Ready Steady Go with simple words and pictures - great for everyone!',
    href: `${rsgBase}/ready-steady-go-programme-easy-read-booklet-2459-patient-information.pdf`,
    audience: 'Young person and family',
  },
]

export function Resources() {
  return (
    <div className="space-y-8 animate-fade-in">
      <header className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-warm-500">Resources</p>
        <h1 className="text-2xl md:text-3xl font-bold text-warm-800">Ready Steady Go resources 📚</h1>
        <p className="max-w-2xl text-sm md:text-base text-warm-600 leading-relaxed">
          These resources are from the Ready Steady Go transition programme. They help you and your family think about what you already know, what questions you have, and what support you might need.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {resources.map((item) => (
          <article
            key={item.title}
            className="group flex h-full flex-col rounded-2xl border border-warm-200 bg-white px-5 py-5 shadow-card text-sm transition-all duration-300 hover:border-primary-200 hover:shadow-card-hover hover:-translate-y-0.5"
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">{item.emoji}</span>
              <p className="text-[0.7rem] font-semibold uppercase tracking-wider text-warm-500">{item.audience}</p>
            </div>
            <h2 className="mt-2 text-base font-semibold text-warm-800">{item.title}</h2>
            <p className="mt-2 flex-1 text-warm-600 leading-relaxed">{item.description}</p>
            <div className="mt-4 space-y-2">
              <a
                href={item.href}
                className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
              >
                {item.internal ? 'Open in app →' : 'Open PDF →'}
              </a>
              {item.easyReadHref && (
                <a
                  href={item.easyReadHref}
                  className="block text-xs font-medium text-warm-500 hover:text-primary-600 transition-colors"
                >
                  📖 Easy-read version (PDF)
                </a>
              )}
            </div>
          </article>
        ))}
      </section>

      <p className="text-sm text-warm-500 bg-warm-50 px-4 py-3 rounded-xl border border-warm-100">
        These documents are for info and planning only. For the latest details about how your local service uses Ready Steady Go, check with your hospital or clinic.
      </p>
    </div>
  )
}
