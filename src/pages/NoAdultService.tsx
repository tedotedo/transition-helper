import { Link } from 'react-router-dom'
import ReadAloud from '../components/ReadAloud'
import { InfoCard, OfficialLinks } from '../components/content/ContentBits'
import { useRole } from '../hooks'

const intro =
  "Sometimes there isn't a specialist adult team that matches the care you had as a child. Or an adult service might say you don't meet their criteria. This is quite common, for example for some autistic young people who don't have mental health needs. It can feel worrying or unfair. It doesn't mean you're on your own."

const whatHappens = [
  'Your GP (family doctor) usually becomes your main doctor. National guidance says involving your GP in planning is really important when there is no specialist adult service.',
  'Ask your children’s team to send your GP a summary of your care, your medicines, and what to do if things change.',
  'Your named worker should give you information about other support you can use instead.',
  'You can still use NHS 111, your pharmacy and your GP for everyday health worries.',
]

const askInWriting = [
  'Which service did you refer me to?',
  'Why didn’t I meet their criteria?',
  'Can I have the reason in writing, please?',
  'Who should I contact if things change?',
  'Is there anyone else who could help me?',
]

const otherSupport = [
  {
    emoji: '🏠',
    title: 'Adult social care',
    text: 'If you need help with everyday things, like washing, cooking, getting out or staying safe, you can ask your local council for a needs assessment. It’s free, and you can ask for one yourself. Before you turn 18, you or your family can ask for a "transition assessment".',
  },
  {
    emoji: '🤝',
    title: 'Charities and local groups',
    text: 'Voluntary groups and charities can offer advice, activities and peer support. Your council’s website lists local services. For young people with special educational needs, this is called the Local Offer.',
  },
  {
    emoji: '🎓',
    title: 'School, college or work',
    text: 'If you have an Education, Health and Care Plan (EHCP), it can carry on up to age 25 while you’re in education. Colleges and workplaces can also make reasonable adjustments.',
  },
  {
    emoji: '🩺',
    title: 'Your GP',
    text: 'Your GP can look after your health, review your medicines, and refer you to other services if you need them.',
  },
]

const changeLater = [
  'Your needs can change. Services can change too.',
  'If things get harder, ask your GP to refer you again.',
  'Write down what has changed and how it affects your daily life.',
  'Take your written reason and your health summary with you.',
  'If you’re unhappy with a decision, you can ask the service to look at it again. You can also contact the hospital’s Patient Advice and Liaison Service (PALS).',
]

export function NoAdultService() {
  const { isYoungPerson } = useRole()

  return (
    <div className="space-y-8 animate-fade-in max-w-3xl">
      <header className="space-y-3">
        <Link to="/journey" className="inline-flex items-center gap-2 text-sm text-warm-500 hover:text-primary-600 transition-colors">
          <span>←</span>
          <span>Back to My Journey</span>
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-3xl">🧭</span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-warm-500">Planning your move</p>
            <h1 className="text-2xl md:text-3xl font-bold text-warm-800">If there's no adult service for you</h1>
          </div>
        </div>
        <p className="text-sm md:text-base text-warm-600 leading-relaxed">{intro}</p>
        <div className="mt-2"><ReadAloud text={intro} /></div>
      </header>

      <InfoCard title="What usually happens 🩺" highlight>
        <ul className="list-disc space-y-2 pl-5">
          {whatHappens.map((item) => <li key={item}>{item}</li>)}
        </ul>
        <ReadAloud text={whatHappens.join(' ')} />
      </InfoCard>

      <InfoCard title="Ask for the reason in writing ✍️">
        <p>If you’re told you can’t use an adult service, it’s OK to ask questions. You could ask:</p>
        <ul className="space-y-1">
          {askInWriting.map((q) => <li key={q}>💬 “{q}”</li>)}
        </ul>
        <p>Having the reason written down helps if you, your family or your GP want to ask again later.</p>
        <ReadAloud text={`If you're told you can't use an adult service, it's OK to ask questions. You could ask: ${askInWriting.join(' ')} Having the reason written down helps if you, your family or your GP want to ask again later.`} />
      </InfoCard>

      <InfoCard title="Other support you can ask about 🌟">
        <div className="grid gap-3 md:grid-cols-2">
          {otherSupport.map((item) => (
            <div key={item.title} className="rounded-xl border border-warm-200 bg-warm-50 px-4 py-3">
              <p className="font-semibold text-warm-800">{item.emoji} {item.title}</p>
              <p className="mt-1">{item.text}</p>
            </div>
          ))}
        </div>
        <ReadAloud text={otherSupport.map((item) => `${item.title}. ${item.text}`).join(' ')} />
        <p>
          Got ADHD, autism or a learning disability? See{' '}
          <Link to="/neurodevelopmental" className="text-primary-600 underline hover:text-primary-700">
            ADHD, autism and learning disability
          </Link>
          .
        </p>
      </InfoCard>

      <InfoCard title="If things change later 🔄">
        <ul className="list-disc space-y-2 pl-5">
          {changeLater.map((item) => <li key={item}>{item}</li>)}
        </ul>
        <ReadAloud text={changeLater.join(' ')} />
      </InfoCard>

      {!isYoungPerson && (
        <InfoCard title="For parents and carers 💛">
          <p>
            If you care for your young person, you can ask your council for a carer’s assessment. As your young person gets close to 18, you can also ask for an assessment of your own needs as a carer, because things may change for you too.
          </p>
          <p>
            Read more in{' '}
            <Link to="/resources#more-support" className="text-primary-600 underline hover:text-primary-700">
              support for families
            </Link>
            .
          </p>
        </InfoCard>
      )}

      <OfficialLinks
        links={[
          { title: 'NHS: Getting a needs assessment', href: 'https://www.nhs.uk/social-care-and-support/help-from-social-services-and-charities/getting-a-needs-assessment/' },
          { title: "NHS: Moving from children's to adults' social care", href: 'https://www.nhs.uk/social-care-and-support/caring-for-children-and-young-people/moving-from-childrens-social-care-to-adults-social-care/' },
          { title: 'NHS: What is PALS?', href: 'https://www.nhs.uk/nhs-services/hospitals/what-is-pals-patient-advice-and-liaison-service/' },
          { title: 'NICE guideline NG43 (transition)', href: 'https://www.nice.org.uk/guidance/ng43' },
        ]}
      />
    </div>
  )
}
