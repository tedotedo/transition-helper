import { Link } from 'react-router-dom'
import ReadAloud from '../components/ReadAloud'
import { InfoCard, OfficialLinks } from '../components/content/ContentBits'
import { useRole } from '../hooks'

const intro =
  'If you have ADHD, autism or a learning disability, moving to adult services can look a bit different. Some adult services work in other ways, and some don’t exist everywhere. This page explains what usually happens, and what you can ask for.'

const adhdWho = [
  'ADHD medicine is started and checked by a specialist. As an adult, this is usually an adult ADHD service.',
  'Your GP may take over writing your prescriptions. They can only do this if there’s a "shared care agreement" between your GP and the specialist.',
  'Shared care doesn’t always carry on automatically when you move. It’s worth checking.',
]

const adhdQuestions = [
  'Who will prescribe my medicine after I move?',
  'Have I been referred to the adult ADHD service yet?',
  'Is there a shared care agreement with my GP, and will it carry on?',
  'Who checks my blood pressure, heart rate, weight and how the medicine is working?',
]

const adhdGap = [
  'Adult ADHD services can have long waits. Ask early, well before your move.',
  'Ask your children’s team what will happen to your prescription while you wait.',
  'Ask your GP if they can keep prescribing under shared care in the meantime.',
  'In England, your GP can tell you about your choices for where you’re referred, including "Right to Choose".',
  'If you’re thinking about stopping your medicine, talk to your team or GP first.',
]

const adhdSupply = [
  'Some ADHD medicines are "controlled drugs". This means stricter rules.',
  'A prescription usually covers up to 30 days at a time.',
  'It needs to be collected within 28 days of the date it was written.',
  'Order your next prescription about a week before you run out.',
  'Set a reminder on your phone.',
  'If your pharmacy can’t get your medicine, tell them and your GP straight away.',
]

const ldRegister = [
  'Your GP practice keeps a list of people with a learning disability. This is called the learning disability register.',
  'Being on it helps your practice make changes so appointments work for you, and invite you for health checks.',
  'Ask your practice if you’re on it. You can ask to go on it if you think you have a learning disability.',
]

const ldCheck = [
  'If you’re 14 or over and on the register, you can have a free health check with your GP or practice nurse once a year.',
  'You don’t have to be ill. Most people go when they feel well.',
  'They check things like your weight, heart rate and blood pressure, your medicines and your vaccinations.',
  'They can also help make sure your move to adult services goes well.',
  'It’s your choice whether you go.',
  'If you’re not invited, you can ask for one. If the practice says no, your local community learning disability team can help.',
]

const ldPlan = [
  'After the health check, what you agree is written down in a health action plan (sometimes called a health profile).',
  'It can also list the changes you need at appointments, called reasonable adjustments.',
  'Take a copy to new appointments and add it to your care plan in this app.',
]

const ldTeam = [
  'Many areas have a community learning disability team for adults. It often includes nurses, therapists and other professionals.',
  'They can help with health needs, like getting to appointments or understanding treatment.',
  'Your GP or children’s team can tell you about the team in your area and refer you.',
]

const autismFacts = [
  'Adult autism services are usually about diagnosis. They assess adults who think they might be autistic.',
  'Most don’t offer regular follow-up after diagnosis. So if you were diagnosed as a child, there may not be an adult autism team that keeps seeing you.',
  'That’s normal. It doesn’t mean support stops. It usually comes from other places.',
]

const autismSupport = [
  'Your GP, for your physical and mental health.',
  'Adult mental health services, if you have mental health needs.',
  'A community learning disability team, if you also have a learning disability.',
  'Your council’s adult social care team, through a needs assessment.',
  'Support at college, university or work.',
  'Charities, like the National Autistic Society, and local autism groups.',
]

const adjustments = [
  'An appointment at the start or end of the day, when it’s quieter',
  'A quiet place to wait',
  'A longer appointment',
  'Clear written information, or pictures',
  'Bringing someone you trust',
  'Telling staff about lights, noise or touch that you find hard',
]

function List({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-2 pl-5">
      {items.map((item) => <li key={item}>{item}</li>)}
    </ul>
  )
}

function SectionHeading({ id, emoji, title, subtitle }: { id: string; emoji: string; title: string; subtitle: string }) {
  return (
    <div id={id} className="scroll-mt-24 flex items-center gap-3 pt-2">
      <span className="text-3xl">{emoji}</span>
      <div>
        <h2 className="text-xl md:text-2xl font-bold text-warm-800">{title}</h2>
        <p className="text-sm text-warm-500">{subtitle}</p>
      </div>
    </div>
  )
}

export function Neurodevelopmental() {
  const { isYoungPerson } = useRole()

  return (
    <div className="space-y-8 animate-fade-in max-w-3xl">
      <header className="space-y-3">
        <Link to="/journey" className="inline-flex items-center gap-2 text-sm text-warm-500 hover:text-primary-600 transition-colors">
          <span>←</span>
          <span>Back to My Journey</span>
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-3xl">🧠</span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-warm-500">Your condition</p>
            <h1 className="text-2xl md:text-3xl font-bold text-warm-800">ADHD, autism and learning disability</h1>
          </div>
        </div>
        <p className="text-sm md:text-base text-warm-600 leading-relaxed">{intro}</p>
        <div className="mt-2"><ReadAloud text={intro} /></div>
        <nav aria-label="Sections on this page" className="flex flex-wrap gap-2 pt-1">
          <a href="#adhd" className="rounded-full border border-primary-200 bg-primary-50 px-3 py-1 text-sm font-medium text-primary-700 hover:bg-primary-100">💊 ADHD medicine</a>
          <a href="#learning-disability" className="rounded-full border border-accent-200 bg-accent-50 px-3 py-1 text-sm font-medium text-accent-700 hover:bg-accent-100">🩺 Learning disability</a>
          <a href="#autism" className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 hover:bg-blue-100">🧩 Autism</a>
        </nav>
      </header>

      <SectionHeading id="adhd" emoji="💊" title="ADHD medicine after 18" subtitle="Who prescribes, and how not to run out" />

      <InfoCard title="Who prescribes after you move?" highlight>
        <List items={adhdWho} />
        <ReadAloud text={adhdWho.join(' ')} />
      </InfoCard>

      <InfoCard title="Questions to ask your team">
        <ul className="space-y-1">
          {adhdQuestions.map((q) => <li key={q}>💬 “{q}”</li>)}
        </ul>
        <ReadAloud text={adhdQuestions.join(' ')} />
      </InfoCard>

      <InfoCard title="If there’s a wait or a gap">
        <List items={adhdGap} />
        <ReadAloud text={adhdGap.join(' ')} />
      </InfoCard>

      <InfoCard title="Don’t run out of medicine">
        <List items={adhdSupply} />
        <ReadAloud text={adhdSupply.join(' ')} />
        <p>
          You can keep a list of your medicines in{' '}
          <Link to="/journey/my-medicines" className="text-primary-600 underline hover:text-primary-700">Know your medicines</Link>.
        </p>
      </InfoCard>

      <SectionHeading id="learning-disability" emoji="🩺" title="Learning disability" subtitle="The GP register, health checks and local teams" />

      <InfoCard title="The GP learning disability register">
        <List items={ldRegister} />
        <ReadAloud text={ldRegister.join(' ')} />
      </InfoCard>

      <InfoCard title="Free annual health check from age 14" highlight>
        <List items={ldCheck} />
        <ReadAloud text={ldCheck.join(' ')} />
      </InfoCard>

      <InfoCard title="Your health action plan">
        <List items={ldPlan} />
        <ReadAloud text={ldPlan.join(' ')} />
        <p>
          <Link to="/care-plan" className="text-primary-600 underline hover:text-primary-700">Open my care plan</Link>
        </p>
      </InfoCard>

      <InfoCard title="Community learning disability teams">
        <List items={ldTeam} />
        <ReadAloud text={ldTeam.join(' ')} />
      </InfoCard>

      <SectionHeading id="autism" emoji="🧩" title="Autism" subtitle="What adult services usually look like" />

      <InfoCard title="Adult autism services">
        <List items={autismFacts} />
        <ReadAloud text={autismFacts.join(' ')} />
        <p>
          See{' '}
          <Link to="/journey/no-adult-service" className="text-primary-600 underline hover:text-primary-700">
            If there's no adult service for you
          </Link>{' '}
          for what to ask.
        </p>
      </InfoCard>

      <InfoCard title="Where support usually comes from">
        <List items={autismSupport} />
        <ReadAloud text={autismSupport.join(' ')} />
      </InfoCard>

      <InfoCard title="Reasonable adjustments" highlight>
        <p>
          The NHS has to make changes so that disabled people, including autistic people, can use services as easily as anyone else. These are called reasonable adjustments. You can ask for things like:
        </p>
        <List items={adjustments} />
        <p>
          A{' '}
          <Link to="/care-plan/passport" className="text-primary-600 underline hover:text-primary-700">communication passport</Link>{' '}
          can help you explain what works for you.
        </p>
        <ReadAloud text={`The NHS has to make changes so that disabled people, including autistic people, can use services as easily as anyone else. These are called reasonable adjustments. You can ask for things like: ${adjustments.join('. ')}. A communication passport can help you explain what works for you.`} />
      </InfoCard>

      {!isYoungPerson && (
        <InfoCard title="For parents and carers 💛">
          <p>
            If you care for your young person, you can ask your council for a carer’s assessment. If your young person has a learning disability, the annual health check can also ask whether you’re getting the support you need.
          </p>
          <p>
            Read more in{' '}
            <Link to="/resources#more-support" className="text-primary-600 underline hover:text-primary-700">support for families</Link>.
          </p>
        </InfoCard>
      )}

      <OfficialLinks
        links={[
          { title: 'NHS: ADHD in adults', href: 'https://www.nhs.uk/conditions/adhd-adults/' },
          { title: 'NHS: Learning disability annual health checks', href: 'https://www.nhs.uk/conditions/learning-disabilities/annual-health-checks/' },
          { title: 'Mencap: Annual health checks (includes Easy Read)', href: 'https://www.mencap.org.uk/help-and-advice/health/annual-health-checks' },
          { title: 'NHS: Help and support for autistic people', href: 'https://www.nhs.uk/conditions/autism/help-and-support/' },
          { title: 'National Autistic Society: Advice and guidance', href: 'https://www.autism.org.uk/advice-and-guidance' },
        ]}
      />
    </div>
  )
}
