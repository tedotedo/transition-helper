import { useState } from 'react'
import ReadAloud from '../components/ReadAloud'

type SectionKey = 'benefits' | 'legal' | 'education' | null

export function MoneyPip() {
  const [openSection, setOpenSection] = useState<SectionKey>(null)

  const toggleSection = (section: SectionKey) => {
    setOpenSection(openSection === section ? null : section)
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <header className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-warm-500">Money & Support</p>
        <h1 className="text-2xl md:text-3xl font-bold text-warm-800">Money help & your rights 💰</h1>
        <p className="max-w-2xl text-sm md:text-base text-warm-600 leading-relaxed">
          Info about benefits you might be able to get, important legal stuff, and support as you move to adult services.
        </p>
      </header>

      {/* Important Notice */}
      <div className="rounded-2xl border border-primary-200 bg-gradient-to-r from-primary-50 to-accent-50 px-5 py-4">
        <div className="flex items-start gap-3">
          <span className="text-xl">💚</span>
          <div>
            <h3 className="font-semibold text-warm-800 mb-1">Not everyone needs all this stuff!</h3>
            <p className="text-sm text-warm-600 mb-2">
              This page has lots of info, but you probably won't need all of it. Most young people moving
              to adult care don't need benefits or special legal arrangements - and that's totally fine!
            </p>
            <p className="text-sm font-medium text-warm-700">
              Have a look through and see what applies to you. If you're not sure, your GP can help.
            </p>
            <div className="mt-2"><ReadAloud text="This page has lots of info, but you probably won't need all of it. Most young people moving to adult care don't need benefits or special legal arrangements - and that's totally fine! Have a look through and see what applies to you. If you're not sure, your GP can help." /></div>
          </div>
        </div>
      </div>

      {/* Parent Focus Alert */}
      <div className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4">
        <div className="flex items-start gap-3">
          <span className="text-xl">👨‍👩‍👧</span>
          <div>
            <h3 className="font-semibold text-warm-800 mb-1">For parents and carers</h3>
            <p className="text-sm text-warm-600 mb-4">
              Some of this stuff is a bit complicated - here are people who can help you out.
            </p>
            <div className="mt-2"><ReadAloud text="Some of this stuff is a bit complicated. Here are people who can help you. Citizens Advice provides free help with benefits like PIP, DLA, and Universal Credit. IPSEA provides free advice about EHCPs and getting support at school or college. Contact is a helpline for families covering benefits, education, health and local services. Mencap provides help understanding legal things like Power of Attorney and making decisions." /></div>

            <h4 className="font-semibold text-warm-800 mb-3 flex items-center gap-2">
              <span>🎯</span> People who can help
            </h4>

            <div className="space-y-4 text-sm">
              <div>
                <p className="font-medium text-warm-700">💷 Money and benefits help</p>
                <p className="text-warm-600">
                  <strong>Citizens Advice</strong> - Free help with benefits like PIP, DLA, and Universal Credit
                </p>
                <p className="text-warm-500">
                  Website: <a href="https://www.citizensadvice.org.uk" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">www.citizensadvice.org.uk</a>
                  <br />Phone: 0800 144 8848 (free)
                </p>
              </div>

              <div>
                <p className="font-medium text-warm-700">🎓 School and college support</p>
                <p className="text-warm-600">
                  <strong>IPSEA</strong> - Free advice about EHCPs and getting support at school or college
                </p>
                <p className="text-warm-500">
                  Website: <a href="https://www.ipsea.org.uk" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">www.ipsea.org.uk</a>
                  <br />Helpline: 0800 018 4016 (free)
                </p>
              </div>

              <div>
                <p className="font-medium text-warm-700">📞 General family support</p>
                <p className="text-warm-600">
                  <strong>Contact</strong> - Helpline for families covering benefits, education, health and local services
                </p>
                <p className="text-warm-500">
                  Website: <a href="https://www.contact.org.uk" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">www.contact.org.uk</a>
                  <br />Helpline: 0808 808 3555 (free)
                </p>
              </div>

              <div>
                <p className="font-medium text-warm-700">⚖️ Legal stuff and decision-making</p>
                <p className="text-warm-600">
                  <strong>Mencap</strong> - Help understanding legal things like Power of Attorney and making decisions
                </p>
                <p className="text-warm-500">
                  Website: <a href="https://www.mencap.org.uk" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">www.mencap.org.uk</a>
                  <br />Helpline: 0808 808 1111 (free)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {/* Benefits Section */}
        <div className="rounded-2xl border-2 border-warm-200 bg-white overflow-hidden shadow-card hover:shadow-card-hover transition-shadow">
          <button
            onClick={() => toggleSection('benefits')}
            className="w-full px-5 py-5 text-left"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center shrink-0">
                  <span className="text-lg">💷</span>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-warm-800">PIP and benefits 💷</h2>
                  <p className="text-sm text-warm-500 mt-1">
                    Money you might be able to get if you have a disability or health condition
                  </p>
                  <span className="inline-flex mt-2 px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 border border-amber-200">
                    Only if you get DLA now
                  </span>
                </div>
              </div>
              <span className="text-warm-400 text-xl">{openSection === 'benefits' ? '−' : '+'}</span>
            </div>
          </button>

          {openSection === 'benefits' && (
            <div className="px-5 pb-5 space-y-5 border-t border-warm-100 pt-5">
              {/* Who This Is For */}
              <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
                <div className="flex items-start gap-2">
                  <span className="text-lg">👀</span>
                  <div>
                    <h4 className="font-semibold text-warm-800 text-sm">Is this section for me?</h4>
                    <p className="text-sm text-warm-600 mt-1">
                      This is mainly for people who already get DLA (Disability Living Allowance).
                      If you don't get DLA, you can probably skip this bit. Most young people don't need PIP!
                    </p>
                    <div className="mt-2"><ReadAloud text="This section is mainly for people who already get DLA or Disability Living Allowance. If you do not get DLA, you can probably skip this bit. Most young people do not need PIP." /></div>
                  </div>
                </div>
              </div>

              {/* What is PIP */}
              <div>
                <h3 className="font-semibold text-warm-800 mb-2">
                  What's PIP?
                </h3>
                <p className="text-sm text-warm-600 leading-relaxed">
                  PIP (Personal Independence Payment) is money from the government that helps with
                  extra costs if you have a health condition or disability. It doesn't matter how
                  much money you earn or whether you're working - it's based on how your condition
                  affects you. It's for people aged 16 and over.
                </p>
                <div className="mt-2"><ReadAloud text="PIP or Personal Independence Payment is money from the government that helps with extra costs if you have a health condition or disability. It does not matter how much money you earn or whether you are working. It is based on how your condition affects you. It is for people aged 16 and over." /></div>
              </div>

              {/* Transitioning from DLA */}
              <div className="rounded-xl border border-primary-200 bg-primary-50 px-4 py-4 space-y-3">
                <h3 className="font-semibold text-warm-800 flex items-center gap-2">
                  <span>📬</span>
                  Switching from DLA to PIP at 16
                </h3>
                <p className="text-sm text-warm-600 leading-relaxed">
                  If you get DLA, you'll need to apply for PIP when you turn 16. It doesn't happen
                  automatically! You'll get a letter from the DWP (Department for Work and Pensions)
                  shortly after your 16th birthday.
                </p>
                <div className="mt-2"><ReadAloud text="If you get DLA, you will need to apply for PIP when you turn 16. It does not happen automatically. You will get a letter from the DWP or Department for Work and Pensions shortly after your 16th birthday. Apply within 28 days of getting the letter to keep your DLA payments while they decide. It usually takes about 3 to 4 months to process. If a parent managed your DLA, they will need to apply again to manage your PIP." /></div>
                <ul className="space-y-2 text-sm text-warm-600">
                  <li className="flex items-start gap-2">
                    <span className="text-primary-500 mt-1">•</span>
                    <span><strong>Apply within 28 days</strong> of getting the letter to keep your DLA payments while they decide</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-500 mt-1">•</span>
                    <span>It usually takes about <strong>3-4 months</strong> to process</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-500 mt-1">•</span>
                    <span>
                      If a parent managed your DLA, they'll need to apply again to manage your PIP
                    </span>
                  </li>
                </ul>
              </div>

              {/* Talk to Your GP */}
              <div className="rounded-xl border border-accent-200 bg-accent-50 px-4 py-3">
                <div className="flex items-start gap-2">
                  <span className="text-lg">💚</span>
                  <div>
                    <h4 className="font-semibold text-warm-800 text-sm">Your GP can help!</h4>
                    <p className="text-sm text-warm-600 mt-1">
                      Your GP or children's doctor can write a letter to support your PIP application.
                      They can explain how your condition affects your everyday life - this really helps!
                    </p>
                    <div className="mt-2"><ReadAloud text="Your GP or children's doctor can write a letter to support your PIP application. They can explain how your condition affects your everyday life. This really helps." /></div>
                  </div>
                </div>
              </div>

              {/* Official Resources */}
              <div>
                <h3 className="font-semibold text-warm-800 mb-3">Helpful links</h3>
                <div className="space-y-2">
                  {[
                    {
                      title: 'GOV.UK - Personal Independence Payment',
                      desc: 'Official government information and application',
                      url: 'https://www.gov.uk/pip',
                    },
                    {
                      title: 'Citizens Advice - PIP Guide',
                      desc: 'Independent advice and application support',
                      url: 'https://www.citizensadvice.org.uk/benefits/sick-or-disabled-people-and-carers/pip/',
                    },
                    {
                      title: 'Scope - PIP Information',
                      desc: 'Disability charity guidance and support',
                      url: 'https://www.scope.org.uk/advice-and-support/personal-independence-payment-pip-guide/',
                    },
                    {
                      title: 'Contact - Benefits Advice',
                      desc: 'Charity for families with disabled children',
                      url: 'https://contact.org.uk/advice-and-support/benefits-financial-help/',
                    },
                  ].map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 rounded-xl border border-warm-200 hover:border-primary-200 hover:bg-warm-50 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-warm-400">📄</span>
                        <div>
                          <p className="font-medium text-sm text-warm-800 group-hover:text-primary-600 transition-colors">
                            {link.title}
                          </p>
                          <p className="text-xs text-warm-500">{link.desc}</p>
                        </div>
                      </div>
                      <span className="text-warm-400 group-hover:text-primary-500">↗</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Legal Capacity Section */}
        <div className="rounded-2xl border-2 border-warm-200 bg-white overflow-hidden shadow-card hover:shadow-card-hover transition-shadow">
          <button
            onClick={() => toggleSection('legal')}
            className="w-full px-5 py-5 text-left"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center shrink-0">
                  <span className="text-lg">⚖️</span>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-warm-800">Making decisions at 18 ⚖️</h2>
                  <p className="text-sm text-warm-500 mt-1">
                    What happens when you turn 18 and who can help make decisions
                  </p>
                </div>
              </div>
              <span className="text-warm-400 text-xl">{openSection === 'legal' ? '−' : '+'}</span>
            </div>
          </button>

          {openSection === 'legal' && (
            <div className="px-5 pb-5 space-y-5 border-t border-warm-100 pt-5">
              {/* Critical Alert */}
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                <div className="flex items-start gap-2">
                  <span className="text-lg">🚨</span>
                  <div>
                    <h4 className="font-semibold text-warm-800 text-sm">
                      Important: Sort this out before you're 18!
                    </h4>
                    <p className="text-sm text-warm-600 mt-1">
                      When you turn 18, your parents can't automatically make decisions for you anymore -
                      even if you need help with some decisions. If you might need help, it's best to
                      sort out the legal stuff BEFORE your 18th birthday.
                    </p>
                    <div className="mt-2"><ReadAloud text="When you turn 18, your parents cannot automatically make decisions for you anymore, even if you need help with some decisions. If you might need help, it is best to sort out the legal stuff before your 18th birthday." /></div>
                  </div>
                </div>
              </div>

              {/* What Changes at 18 */}
              <div>
                <h3 className="font-semibold text-warm-800 mb-2">What changes at 18?</h3>
                <p className="text-sm text-warm-600 leading-relaxed">
                  At 18, you're legally an adult. This means YOU make decisions about your health, money,
                  and life - not your parents. This is great for most people! But if you have a condition
                  that makes some decisions tricky, there are legal ways to get help from people you trust.
                </p>
                <div className="mt-2"><ReadAloud text="At 18, you are legally an adult. This means you make decisions about your health, money, and life, not your parents. This is great for most people. But if you have a condition that makes some decisions tricky, there are legal ways to get help from people you trust." /></div>
              </div>

              {/* Lasting Power of Attorney */}
              <div className="rounded-xl border border-accent-200 bg-accent-50 px-4 py-4 space-y-3">
                <h3 className="font-semibold text-warm-800">Power of Attorney (LPA)</h3>
                <p className="text-sm text-warm-600 leading-relaxed">
                  An LPA is a legal document where you choose someone you trust to help make decisions
                  if you can't. You set it up yourself when you're 18+. There are two types:
                </p>
                <div className="mt-2"><ReadAloud text="An LPA is a legal document where you choose someone you trust to help make decisions if you cannot. You set it up yourself when you are 18 and older. Health and Welfare LPA is for decisions about your care, medical treatment, and where you live. Money LPA is for decisions about your bank accounts, bills, and money stuff. To make an LPA, you need to understand what you are doing and who you are choosing. If this is tricky, there is another option." /></div>
                <div className="space-y-3 ml-2">
                  <div>
                    <p className="font-medium text-sm text-warm-800">🏥 Health and Welfare LPA</p>
                    <p className="text-xs text-warm-600">
                      For decisions about your care, medical treatment, and where you live
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-sm text-warm-800">💰 Money LPA</p>
                    <p className="text-xs text-warm-600">
                      For decisions about your bank accounts, bills, and money stuff
                    </p>
                  </div>
                </div>
                <p className="text-xs text-warm-600 mt-3">
                  <strong>Note:</strong> To make an LPA, you need to understand what you're doing and
                  who you're choosing. If this is tricky, there's another option below.
                </p>
              </div>

              {/* Court of Protection */}
              <div>
                <h3 className="font-semibold text-warm-800 mb-2">If you need more support: Deputyship</h3>
                <p className="text-sm text-warm-600 leading-relaxed">
                  If making an LPA yourself is too tricky, someone who cares about you (like a parent)
                  can apply to the Court to become your "Deputy". This means they can officially help
                  you with decisions. It's best to start this process well before you turn 18.
                </p>
                <div className="mt-2"><ReadAloud text="If making an LPA yourself is too tricky, someone who cares about you, like a parent, can apply to the Court to become your Deputy. This means they can officially help you with decisions. It is best to start this process well before you turn 18." /></div>
              </div>

              {/* Timeline */}
              <div className="rounded-xl border border-primary-200 bg-primary-50 px-4 py-3">
                <h4 className="font-semibold text-warm-800 text-sm mb-2">📅 When to do what</h4>
                <ul className="space-y-2 text-sm text-warm-600">
                  <li className="flex items-start gap-2">
                    <span className="font-semibold text-primary-600 shrink-0">Age 16-17:</span>
                    <span>Chat with your GP about whether you might need help with decisions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-semibold text-primary-600 shrink-0">6 months before 18:</span>
                    <span>Start the LPA or deputyship paperwork</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-semibold text-primary-600 shrink-0">Before you're 18:</span>
                    <span>Make sure everything is signed and sorted</span>
                  </li>
                </ul>
              </div>

              {/* Official Resources */}
              <div>
                <h3 className="font-semibold text-warm-800 mb-3">Helpful links</h3>
                <div className="space-y-2">
                  {[
                    {
                      title: 'GOV.UK - Lasting Power of Attorney',
                      desc: 'Official information and application process',
                      url: 'https://www.gov.uk/power-of-attorney',
                    },
                    {
                      title: 'GOV.UK - Court of Protection Deputies',
                      desc: 'How to apply to become a deputy',
                      url: 'https://www.gov.uk/become-deputy',
                    },
                    {
                      title: 'Mencap - Mental Capacity Act Guide',
                      desc: 'Guidance for families and young people',
                      url: 'https://www.mencap.org.uk/advice-and-support/mental-capacity-act',
                    },
                    {
                      title: 'Scope - LPA Information',
                      desc: 'Practical advice from disability charity',
                      url: 'https://www.scope.org.uk/advice-and-support/lasting-powers-of-attorney',
                    },
                  ].map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 rounded-xl border border-warm-200 hover:border-primary-200 hover:bg-warm-50 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-warm-400">📄</span>
                        <div>
                          <p className="font-medium text-sm text-warm-800 group-hover:text-primary-600 transition-colors">
                            {link.title}
                          </p>
                          <p className="text-xs text-warm-500">{link.desc}</p>
                        </div>
                      </div>
                      <span className="text-warm-400 group-hover:text-primary-500">↗</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Education Section */}
        <div className="rounded-2xl border-2 border-warm-200 bg-white overflow-hidden shadow-card hover:shadow-card-hover transition-shadow">
          <button
            onClick={() => toggleSection('education')}
            className="w-full px-5 py-5 text-left"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center shrink-0">
                  <span className="text-lg">🎓</span>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-warm-800">School & college support 🎓</h2>
                  <p className="text-sm text-warm-500 mt-1">
                    About EHCPs and getting help with learning until you're 25
                  </p>
                </div>
              </div>
              <span className="text-warm-400 text-xl">{openSection === 'education' ? '−' : '+'}</span>
            </div>
          </button>

          {openSection === 'education' && (
            <div className="px-5 pb-5 space-y-5 border-t border-warm-100 pt-5">
              {/* What is an EHCP */}
              <div>
                <h3 className="font-semibold text-warm-800 mb-2">
                  What's an EHCP?
                </h3>
                <p className="text-sm text-warm-600 leading-relaxed">
                  An EHCP (Education, Health and Care Plan) is a document that describes what extra help
                  you need at school or college. If you have one, it lists your needs and what support
                  you should get. It's there to help you do your best!
                </p>
                <div className="mt-2"><ReadAloud text="An EHCP or Education, Health and Care Plan is a document that describes what extra help you need at school or college. If you have one, it lists your needs and what support you should get. It is there to help you do your best." /></div>
              </div>

              {/* Key Highlight */}
              <div className="rounded-xl border border-accent-200 bg-accent-50 px-4 py-4">
                <h3 className="font-semibold text-warm-800 flex items-center gap-2 mb-2">
                  <span>🎉</span>
                  Good news: Support can carry on until you're 25!
                </h3>
                <p className="text-sm text-warm-600 leading-relaxed">
                  Unlike lots of other support that stops at 18, your EHCP can carry on until you're 25
                  if you're still in education or training. It's not automatic though - they'll check
                  each year if you still need it.
                </p>
                <div className="mt-2"><ReadAloud text="Unlike lots of other support that stops at 18, your EHCP can carry on until you are 25 if you are still in education or training. It is not automatic though. They will check each year if you still need it." /></div>
              </div>

              {/* When EHCPs Continue */}
              <div>
                <h3 className="font-semibold text-warm-800 mb-2">When can my EHCP carry on after 18?</h3>
                <p className="text-sm text-warm-600 mb-2">
                  Your EHCP can keep going until 25 if you're doing:
                </p>
                <div className="mt-2"><ReadAloud text="Your EHCP can keep going until 25 if you are doing college or sixth form, an apprenticeship, or other training courses. EHCPs do not cover university, but universities have their own support services you can use." /></div>
                <ul className="space-y-1 text-sm text-warm-600 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-primary-500 mt-1">•</span>
                    <span>College or sixth form</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-500 mt-1">•</span>
                    <span>An apprenticeship</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-500 mt-1">•</span>
                    <span>Other training courses</span>
                  </li>
                </ul>
                <p className="text-xs text-warm-500 mt-3">
                  Note: EHCPs don't cover university, but unis have their own support services you can use!
                </p>
              </div>

              {/* GP Role */}
              <div className="rounded-xl border border-accent-200 bg-accent-50 px-4 py-3">
                <div className="flex items-start gap-2">
                  <span className="text-lg">💚</span>
                  <div>
                    <h4 className="font-semibold text-warm-800 text-sm">Your GP can help here too</h4>
                    <p className="text-sm text-warm-600 mt-1">
                      Your GP can write letters to support your EHCP applications and reviews. They can
                      explain how your health affects your learning and help make sure you get the right support.
                    </p>
                    <div className="mt-2"><ReadAloud text="Your GP can write letters to support your EHCP applications and reviews. They can explain how your health affects your learning and help make sure you get the right support." /></div>
                  </div>
                </div>
              </div>

              {/* Official Resources */}
              <div>
                <h3 className="font-semibold text-warm-800 mb-3">Helpful links</h3>
                <div className="space-y-2">
                  {[
                    {
                      title: 'GOV.UK - Special Educational Needs Support',
                      desc: 'Official government information on EHCPs',
                      url: 'https://www.gov.uk/children-with-special-educational-needs/extra-SEN-help',
                    },
                    {
                      title: 'IPSEA - Independent Advice',
                      desc: 'Free and independent special education advice',
                      url: 'https://www.ipsea.org.uk/',
                    },
                    {
                      title: 'Council for Disabled Children',
                      desc: 'Resources and guidance for families',
                      url: 'https://www.councilfordisabledchildren.org.uk/',
                    },
                    {
                      title: 'Contact - Education Support',
                      desc: 'Helpline and practical guidance',
                      url: 'https://contact.org.uk/advice-and-support/education-learning/',
                    },
                  ].map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 rounded-xl border border-warm-200 hover:border-primary-200 hover:bg-warm-50 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-warm-400">📄</span>
                        <div>
                          <p className="font-medium text-sm text-warm-800 group-hover:text-primary-600 transition-colors">
                            {link.title}
                          </p>
                          <p className="text-xs text-warm-500">{link.desc}</p>
                        </div>
                      </div>
                      <span className="text-warm-400 group-hover:text-primary-500">↗</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
