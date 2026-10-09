import ReadAloud from '../components/ReadAloud'
import { Link } from 'react-router-dom'

const ownResources = [
  {
    title: "Zach's transition journey comic",
    emoji: '🎨',
    description:
      'A picture-led comic strip explaining transition in short, friendly steps for anyone who prefers a visual format.',
    href: '/comic-guide',
    audience: 'Young person and family',
    linkLabel: 'Open visual guide →',
  },
  {
    title: 'My Transition Checklist',
    emoji: '✅',
    description: 'Practical tasks for each stage, from 11 to 18 and beyond. Tick them off at your own pace.',
    href: '/checklist',
    audience: 'Young person',
    linkLabel: 'Open the checklist →',
  },
  {
    title: 'Skills Builder',
    emoji: '🛠️',
    description: 'Practise real-life skills, like booking an appointment or explaining how you feel.',
    href: '/skills',
    audience: 'Young person',
    linkLabel: 'Open Skills Builder →',
  },
  {
    title: 'ADHD, autism and learning disability',
    emoji: '🧠',
    description: 'ADHD medicine after 18, free annual health checks from 14, and where autistic young people usually get support.',
    href: '/neurodevelopmental',
    audience: 'Young person and family',
    linkLabel: 'Open the guide →',
  },
  {
    title: "If there's no adult service for you",
    emoji: '🧭',
    description: "What happens if there's no adult team, or you're told you're not eligible, and how to ask again later.",
    href: '/journey/no-adult-service',
    audience: 'Young person and family',
    linkLabel: 'Find out more →',
  },
]

// Third-party documents. Links are unchanged from the original publisher.
const thirdPartySite = 'https://www.readysteadygo.net/uploads/4/7/8/1/47810883'

const thirdPartyDocs = [
  { title: 'Ready questionnaire (age 11–13)', href: `${thirdPartySite}/readysteadygoreadyquestionnaire_1-3_1.pdf` },
  { title: 'Ready questionnaire (Easy Read)', href: `${thirdPartySite}/easy-read-ready-3.pdf` },
  { title: 'Steady questionnaire (age 14–15)', href: `${thirdPartySite}/readysteadygosteadyquestionnaire_1-2_1.pdf` },
  { title: 'Steady questionnaire (Easy Read)', href: `${thirdPartySite}/easy-read-steady-3.pdf` },
  { title: 'Go questionnaire (age 16–17)', href: `${thirdPartySite}/readysteadygogoquestionnaire_1-2_1.pdf` },
  { title: 'Go questionnaire (Easy Read)', href: `${thirdPartySite}/easy-read-go-3.pdf` },
  { title: 'Ready Steady Go transition plan', href: `${thirdPartySite}/ready-steady-go-transition-plan_1-2_1.pdf` },
  { title: 'Parent plan and information', href: `${thirdPartySite}/readysteadygoparentplanpatientinformation_1-2_1.pdf` },
  { title: 'Moving into adult care', href: `${thirdPartySite}/transitionmovingintoadultcare-patientinformation_2.pdf` },
  { title: 'Ready Steady Go programme Easy Read booklet', href: `${thirdPartySite}/ready-steady-go-programme-easy-read-booklet-2459-patient-information.pdf` },
]

const thirdPartyIntro =
  "Ready Steady Go is a separate transition programme from Southampton Children's Hospital / RSG-TIER. These are their original, unchanged documents. This app does not contain or adapt them."

export function Resources() {
  return (
    <div className="space-y-8 animate-fade-in">
      <header className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-warm-500">Resources</p>
        <h1 className="text-2xl md:text-3xl font-bold text-warm-800">Resources 📚</h1>
        <p className="max-w-2xl text-sm md:text-base text-warm-600 leading-relaxed">
          Tools in this app that can help you get ready to move to adult services.
        </p>
        <div className="mt-2"><ReadAloud text="Tools in this app that can help you get ready to move to adult services." /></div>
      </header>

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {ownResources.map((item) => (
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
            <div className="mt-4">
              <Link
                to={item.href}
                className="inline-flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
              >
                {item.linkLabel}
              </Link>
            </div>
          </article>
        ))}
      </section>

      <section id="more-support" className="scroll-mt-24 rounded-2xl border border-warm-200 bg-white px-5 py-5 shadow-card space-y-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-warm-500">More support</p>
          <h2 className="mt-1 text-lg font-bold text-warm-800">Support for you and your family 💛</h2>
        </div>
        <div className="grid gap-3 md:grid-cols-3 text-sm text-warm-600">
          <div className="rounded-xl border border-warm-200 bg-warm-50 px-4 py-3 space-y-2">
            <p className="font-semibold text-warm-800">🤝 Peer support</p>
            <p>Talking to other young people who've been through the move can really help. Ask your team or named worker about local groups. Many charities for your condition run groups too.</p>
          </div>
          <div className="rounded-xl border border-warm-200 bg-warm-50 px-4 py-3 space-y-2">
            <p className="font-semibold text-warm-800">🧡 Young carers</p>
            <p>If you help look after someone in your family, you're a young carer. You have the right to ask your council for an assessment of what support you need.</p>
            <a href="https://www.nhs.uk/social-care-and-support/support-and-benefits-for-carers/being-a-young-carer-your-rights/" target="_blank" rel="noopener noreferrer" className="inline-block text-primary-600 underline hover:text-primary-700">NHS: Young carers' rights ↗</a>
          </div>
          <div className="rounded-xl border border-warm-200 bg-warm-50 px-4 py-3 space-y-2">
            <p className="font-semibold text-warm-800">👨‍👩‍👧 Parents and carers</p>
            <p>If you care for a young person, you can ask your council for a free carer's assessment. It looks at what would help you. Carers UK gives advice on caring, money and your rights.</p>
            <a href="https://www.nhs.uk/social-care-and-support/support-and-benefits-for-carers/carer-assessments/" target="_blank" rel="noopener noreferrer" className="block text-primary-600 underline hover:text-primary-700">NHS: Carer's assessments ↗</a>
            <a href="https://www.carersuk.org/help-and-advice/" target="_blank" rel="noopener noreferrer" className="block text-primary-600 underline hover:text-primary-700">Carers UK: Help and advice ↗</a>
          </div>
        </div>
        <div className="mt-2"><ReadAloud text="Peer support. Talking to other young people who have been through the move can really help. Ask your team or named worker about local groups. Many charities for your condition run groups too. Young carers. If you help look after someone in your family, you are a young carer. You have the right to ask your council for an assessment of what support you need. Parents and carers. If you care for a young person, you can ask your council for a free carer's assessment. It looks at what would help you. Carers UK gives advice on caring, money and your rights." /></div>
        <p className="text-xs text-warm-500">For the most up-to-date information, see the official websites.</p>
      </section>

      <section className="text-sm text-warm-600 bg-warm-50 px-4 py-4 rounded-xl border border-warm-100 space-y-2">
        <h2 className="text-base font-semibold text-warm-800">How this app follows NICE NG43</h2>
        <p>
          The{' '}
          <a
            href="https://www.nice.org.uk/guidance/ng43"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 underline hover:text-primary-700"
          >
            NICE guideline NG43: Transition from children's to adults' services ↗
          </a>{' '}
          is the national guidance on how health and social care services should plan the move to adult services. It is NICE's own document and is separate from this app.
        </p>
        <p>This app uses NG43 to help you know what to expect and what to ask for. For example:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Planning starts by Year 9 (age 13–14) and is reviewed at least once a year</li>
          <li>You lead your plan, and choose how your family is involved</li>
          <li>A named worker helps coordinate your move</li>
          <li>You get the chance to meet the adult team before you move</li>
          <li>Your GP is involved, especially if there's no specialist adult service</li>
          <li>Adult services follow you up if you miss appointments, instead of just discharging you</li>
        </ul>
        <p>NG43 is written for services. Not every area does everything it suggests yet, so it's OK to ask.</p>
        <div className="mt-2"><ReadAloud text="This app uses NICE guideline NG43 to help you know what to expect and what to ask for. For example: planning starts by Year 9, age 13 to 14, and is reviewed at least once a year. You lead your plan, and choose how your family is involved. A named worker helps coordinate your move. You get the chance to meet the adult team before you move. Your GP is involved, especially if there is no specialist adult service. Adult services follow you up if you miss appointments, instead of just discharging you. NG43 is written for services. Not every area does everything it suggests yet, so it is OK to ask." /></div>
        <p className="text-xs text-warm-500">For the most up-to-date guidance, see the official NICE website.</p>
      </section>

      {/* Separate third-party resource: kept apart from the rest of the app */}
      <section
        aria-labelledby="other-resource-heading"
        className="rounded-2xl border border-warm-200 bg-white px-5 py-5 shadow-card space-y-4"
      >
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-warm-500">Other resource</p>
          <h2 id="other-resource-heading" className="mt-1 text-lg font-bold text-warm-800">
            Ready Steady Go (separate programme)
          </h2>
          <p className="mt-2 text-sm text-warm-600 leading-relaxed">{thirdPartyIntro}</p>
          <div className="mt-2"><ReadAloud text={thirdPartyIntro} /></div>
        </div>

        <ul className="space-y-2">
          {thirdPartyDocs.map((doc) => (
            <li key={doc.href}>
              <a
                href={doc.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 bg-warm-50 hover:bg-warm-100 rounded-xl transition-colors text-sm font-medium text-warm-800"
              >
                <span>{doc.title} (PDF)</span>
                <span className="text-warm-500">↗</span>
              </a>
            </li>
          ))}
        </ul>

        <p className="text-sm text-warm-600">
          Their website is at{' '}
          <a
            href="https://www.readysteadygo.net/rsg.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 underline hover:text-primary-700"
          >
            www.readysteadygo.net ↗
          </a>
          . Please check their terms before you use or share the documents. They say the materials can be used in their original format for non-commercial purposes only, with no changes. For the most up-to-date versions, see the official Ready Steady Go website.
        </p>

        <div className="p-3 bg-warm-50 rounded-lg border border-warm-200 text-xs text-warm-600 leading-relaxed space-y-1">
          <p>© Copyright RSG-TIER 2024/5</p>
          <p>
            “Ready Steady Go’ and ‘Hello to adult services’ developed by the Transition Steering Group led by Dr Arvind Nagra, paediatric nephrologist and clinical lead for transitional care at Southampton Children’s Hospital, University Hospital Southampton NHS Foundation Trust.
          </p>
        </div>
      </section>
    </div>
  )
}
