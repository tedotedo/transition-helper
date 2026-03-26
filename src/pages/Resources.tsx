import ReadAloud from '../components/ReadAloud'

const rsgSite = 'https://www.readysteadygo.net/uploads/4/7/8/1/47810883'

const resources = [
  {
    title: 'Ready questionnaire (age 11–13)',
    emoji: '🌱',
    description:
      "Helps younger children start talking about their condition, who's in their team, and what they understand so far.",
    href: `${rsgSite}/readysteadygoreadyquestionnaire_1-3_1.pdf`,
    audience: 'Young person',
    easyReadHref: `${rsgSite}/easy-read-ready-3.pdf`,
  },
  {
    title: 'Steady questionnaire (age 14–15)',
    emoji: '💪',
    description:
      'Helps you think about independence, your medicines, and what you want to know before transition.',
    href: `${rsgSite}/readysteadygosteadyquestionnaire_1-2_1.pdf`,
    audience: 'Young person',
    easyReadHref: `${rsgSite}/easy-read-steady-3.pdf`,
  },
  {
    title: 'Go questionnaire (age 16–17)',
    emoji: '🚀',
    description:
      "For when you're getting close to moving to adult services. Fill it in and bring it to your next appointment!",
    href: `${rsgSite}/readysteadygogoquestionnaire_1-2_1.pdf`,
    audience: 'Young person',
    easyReadHref: `${rsgSite}/easy-read-go-3.pdf`,
  },
  {
    title: 'Ready Steady Go transition plan',
    emoji: '📋',
    description:
      'A plan that you, your family, and your team can fill in together to record your goals and next steps.',
    href: `${rsgSite}/ready-steady-go-transition-plan_1-2_1.pdf`,
    audience: 'Young person and family',
  },
  {
    title: 'Parent plan and info',
    emoji: '👨‍👩‍👧',
    description:
      'Info and questions for parents and carers to think about how to support growing independence.',
    href: `${rsgSite}/readysteadygoparentplanpatientinformation_1-2_1.pdf`,
    audience: 'Parent or carer',
  },
  {
    title: 'Moving into adult care',
    emoji: '🎓',
    description:
      'Easy-to-understand info about what to expect from adult services and how they might work differently.',
    href: `${rsgSite}/transitionmovingintoadultcare-patientinformation_2.pdf`,
    audience: 'Young person and family',
  },
  {
    title: 'Easy-read booklet',
    emoji: '📖',
    description:
      'A booklet explaining Ready Steady Go with simple words and pictures - great for everyone!',
    href: `${rsgSite}/ready-steady-go-programme-easy-read-booklet-2459-patient-information.pdf`,
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
          These official resources are provided by the Ready Steady Go &amp; Hello programme. We link directly to the original materials on the official RSG website so you always have the latest versions.
        </p>
        <div className="mt-2"><ReadAloud text="These official resources are provided by the Ready Steady Go and Hello programme. We link directly to the original materials on the official RSG website so you always have the latest versions." /></div>
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
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
              >
                Open PDF on RSG website ↗
              </a>
              {item.easyReadHref && (
                <a
                  href={item.easyReadHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-xs font-medium text-warm-500 hover:text-primary-600 transition-colors"
                >
                  📖 Easy-read version (PDF) ↗
                </a>
              )}
            </div>
          </article>
        ))}
      </section>

      <section className="text-sm text-warm-500 bg-warm-50 px-4 py-3 rounded-xl border border-warm-100">
        <p>
          These documents are hosted on the official{' '}
          <a
            href="https://www.readysteadygo.net/rsg.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 underline hover:text-primary-700"
          >
            Ready Steady Go website
          </a>. For the latest details about how your local service uses Ready Steady Go, check with your hospital or clinic.
        </p>
        <div className="mt-2"><ReadAloud text="These documents are hosted on the official Ready Steady Go website. For the latest details about how your local service uses Ready Steady Go, check with your hospital or clinic." /></div>
      </section>
    </div>
  )
}
