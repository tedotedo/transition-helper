import { useState } from 'react'

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
        <h1 className="text-2xl md:text-3xl font-bold text-warm-800">Benefits, legal rights & support 💰</h1>
        <p className="max-w-2xl text-sm md:text-base text-warm-600 leading-relaxed">
          Essential guidance on benefits, legal rights, and support services for young people
          transitioning to adult care in the UK.
        </p>
      </header>

      {/* Important Notice */}
      <div className="rounded-2xl border border-primary-200 bg-gradient-to-r from-primary-50 to-accent-50 px-5 py-4">
        <div className="flex items-start gap-3">
          <span className="text-xl">💚</span>
          <div>
            <h3 className="font-semibold text-warm-800 mb-1">Every Family's Journey is Different</h3>
            <p className="text-sm text-warm-600 mb-2">
              Not all the information on this page will apply to your situation, and that's completely
              normal. Many young people transition to adult care without needing benefits, legal capacity
              arrangements, or education support plans.
            </p>
            <p className="text-sm font-medium text-warm-700">
              Read through the sections to identify what's relevant to your family. When in doubt, your
              GP is always there to help guide you.
            </p>
          </div>
        </div>
      </div>

      {/* Parent Focus Alert */}
      <div className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4">
        <div className="flex items-start gap-3">
          <span className="text-xl">⚠️</span>
          <div>
            <h3 className="font-semibold text-warm-800 mb-1">For Parents, Guardians & Carers</h3>
            <p className="text-sm text-warm-600 mb-4">
              This section contains important information about legal and financial matters.
            </p>

            <h4 className="font-semibold text-warm-800 mb-3 flex items-center gap-2">
              <span>🎯</span> Who Can Help
            </h4>

            <div className="space-y-4 text-sm">
              <div>
                <p className="font-medium text-warm-700">Benefits & Financial Support</p>
                <p className="text-warm-600">
                  <strong>Citizens Advice</strong> - Free, expert advice on disability benefits (PIP, DLA, ESA, Universal Credit)
                </p>
                <p className="text-warm-500">
                  Website: <a href="https://www.citizensadvice.org.uk" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">www.citizensadvice.org.uk</a>
                  <br />Phone: 0800 144 8848
                </p>
              </div>

              <div>
                <p className="font-medium text-warm-700">Education Rights & Support</p>
                <p className="text-warm-600">
                  <strong>IPSEA</strong> (Independent Provider of Special Education Advice) - Free legal advice on EHCPs, SEN support, and education rights
                </p>
                <p className="text-warm-500">
                  Website: <a href="https://www.ipsea.org.uk" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">www.ipsea.org.uk</a>
                  <br />Helpline: 0800 018 4016
                </p>
              </div>

              <div>
                <p className="font-medium text-warm-700">General Support & Guidance</p>
                <p className="text-warm-600">
                  <strong>Contact</strong> (for families with disabled children) - Parent helpline covering benefits, education, health, and local services
                </p>
                <p className="text-warm-500">
                  Website: <a href="https://www.contact.org.uk" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">www.contact.org.uk</a>
                  <br />Helpline: 0808 808 3555
                </p>
              </div>

              <div>
                <p className="font-medium text-warm-700">Legal Capacity & Decision-Making</p>
                <p className="text-warm-600">
                  <strong>Mencap</strong> - Guidance on Court of Protection, Lasting Powers of Attorney, and mental capacity
                </p>
                <p className="text-warm-500">
                  Website: <a href="https://www.mencap.org.uk" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">www.mencap.org.uk</a>
                  <br />Helpline: 0808 808 1111
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
                  <h2 className="text-lg font-bold text-warm-800">Benefits & Financial Support</h2>
                  <p className="text-sm text-warm-500 mt-1">
                    Understanding Personal Independence Payment (PIP) and the transition from DLA
                  </p>
                  <span className="inline-flex mt-2 px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 border border-amber-200">
                    Only if your child receives DLA
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
                  <span className="text-lg">⚠️</span>
                  <div>
                    <h4 className="font-semibold text-warm-800 text-sm">Who This Section Is For</h4>
                    <p className="text-sm text-warm-600 mt-1">
                      This information is specifically for families whose child currently receives
                      Disability Living Allowance (DLA). If your child doesn't receive DLA, you can skip
                      this section. Most young people transitioning to adult care do not need to apply for
                      PIP.
                    </p>
                  </div>
                </div>
              </div>

              {/* What is PIP */}
              <div>
                <h3 className="font-semibold text-warm-800 mb-2">
                  What is Personal Independence Payment (PIP)?
                </h3>
                <p className="text-sm text-warm-600 leading-relaxed">
                  PIP is a benefit that helps with the extra costs of living with a long-term health
                  condition or disability. It's not means-tested (your income doesn't matter) and it
                  doesn't depend on whether you're working or not. PIP is for people aged 16 to State
                  Pension age.
                </p>
              </div>

              {/* Transitioning from DLA */}
              <div className="rounded-xl border border-primary-200 bg-primary-50 px-4 py-4 space-y-3">
                <h3 className="font-semibold text-warm-800 flex items-center gap-2">
                  <span>⚠️</span>
                  Important: Transitioning from DLA at Age 16
                </h3>
                <p className="text-sm text-warm-600 leading-relaxed">
                  If your child receives Disability Living Allowance (DLA), they will need to apply for
                  PIP when they turn 16. This transition is not automatic. The Department for Work and
                  Pensions (DWP) will send an invitation letter shortly after their 16th birthday.
                </p>
                <ul className="space-y-2 text-sm text-warm-600">
                  <li className="flex items-start gap-2">
                    <span className="text-primary-500 mt-1">•</span>
                    <span>Apply within 28 days of the invitation to keep DLA payments during assessment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-500 mt-1">•</span>
                    <span>The assessment can take 13-14 weeks on average</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-500 mt-1">•</span>
                    <span>
                      If you were an appointee for DLA, you'll need to reapply for PIP appointee status
                    </span>
                  </li>
                </ul>
              </div>

              {/* Talk to Your GP */}
              <div className="rounded-xl border border-accent-200 bg-accent-50 px-4 py-3">
                <div className="flex items-start gap-2">
                  <span className="text-lg">💚</span>
                  <div>
                    <h4 className="font-semibold text-warm-800 text-sm">Talk to Your GP</h4>
                    <p className="text-sm text-warm-600 mt-1">
                      Your GP can provide supporting evidence for PIP applications and help explain how
                      your child's condition affects their daily life. They know your family's situation
                      and can help ensure the application accurately reflects your child's needs.
                    </p>
                  </div>
                </div>
              </div>

              {/* Official Resources */}
              <div>
                <h3 className="font-semibold text-warm-800 mb-3">Official Resources & Support</h3>
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
                  <h2 className="text-lg font-bold text-warm-800">Legal Capacity & Decision-Making</h2>
                  <p className="text-sm text-warm-500 mt-1">
                    Understanding Lasting Power of Attorney and Court of Protection
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
                      Critical: Action Required Before 18th Birthday
                    </h4>
                    <p className="text-sm text-warm-600 mt-1">
                      At age 18, parents automatically lose the legal right to make decisions for their
                      child, even if the young person lacks capacity to make certain decisions themselves.
                      Legal arrangements must be in place BEFORE the 18th birthday to ensure continuity of
                      care and treatment.
                    </p>
                  </div>
                </div>
              </div>

              {/* What Changes at 18 */}
              <div>
                <h3 className="font-semibold text-warm-800 mb-2">What Changes at Age 18?</h3>
                <p className="text-sm text-warm-600 leading-relaxed">
                  When a young person turns 18, they become a legal adult. This means that even if they
                  have a learning disability or other condition that affects their ability to make
                  decisions, parents can no longer automatically make medical, financial, or legal
                  decisions on their behalf. Proper legal arrangements are essential for maintaining
                  continuity of care.
                </p>
              </div>

              {/* Lasting Power of Attorney */}
              <div className="rounded-xl border border-accent-200 bg-accent-50 px-4 py-4 space-y-3">
                <h3 className="font-semibold text-warm-800">Lasting Power of Attorney (LPA)</h3>
                <p className="text-sm text-warm-600 leading-relaxed">
                  An LPA is a legal document that allows a young person (aged 18+) to appoint trusted
                  people (attorneys) to make decisions on their behalf if they lose mental capacity.
                  There are two types:
                </p>
                <div className="space-y-3 ml-2">
                  <div>
                    <p className="font-medium text-sm text-warm-800">Health and Welfare LPA</p>
                    <p className="text-xs text-warm-600">
                      Covers daily care, medical treatment, moving into a care home, and life-sustaining
                      treatment decisions
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-sm text-warm-800">Property and Financial Affairs LPA</p>
                    <p className="text-xs text-warm-600">
                      Covers managing bank accounts, paying bills, and handling financial matters
                    </p>
                  </div>
                </div>
                <p className="text-xs text-warm-600 mt-3">
                  Important: The young person must have sufficient mental capacity at the time of making
                  an LPA. This means they need to understand what an LPA is, who they're appointing, and
                  what powers those people will have.
                </p>
              </div>

              {/* Court of Protection */}
              <div>
                <h3 className="font-semibold text-warm-800 mb-2">Court of Protection Deputyship</h3>
                <p className="text-sm text-warm-600 leading-relaxed">
                  If a young person does not have the mental capacity to make an LPA, family members or
                  friends can apply to the Court of Protection to become a Deputy. A Deputy has similar
                  powers to an attorney but is appointed by the court and must follow the court's
                  supervision. This process should ideally begin well before the 18th birthday.
                </p>
              </div>

              {/* Timeline */}
              <div className="rounded-xl border border-primary-200 bg-primary-50 px-4 py-3">
                <h4 className="font-semibold text-warm-800 text-sm mb-2">Recommended Timeline</h4>
                <ul className="space-y-2 text-sm text-warm-600">
                  <li className="flex items-start gap-2">
                    <span className="font-semibold text-primary-600 shrink-0">Age 16-17:</span>
                    <span>Start discussions with your GP and legal advisors about capacity and options</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-semibold text-primary-600 shrink-0">6 months before 18:</span>
                    <span>Begin LPA or deputyship application process</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-semibold text-primary-600 shrink-0">Before 18th birthday:</span>
                    <span>Ensure all legal documents are registered and in place</span>
                  </li>
                </ul>
              </div>

              {/* Official Resources */}
              <div>
                <h3 className="font-semibold text-warm-800 mb-3">Official Resources & Guidance</h3>
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
                  <h2 className="text-lg font-bold text-warm-800">Education & Training Support</h2>
                  <p className="text-sm text-warm-500 mt-1">
                    Understanding Education, Health and Care Plans (EHCPs) and support until age 25
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
                  What is an Education, Health and Care Plan (EHCP)?
                </h3>
                <p className="text-sm text-warm-600 leading-relaxed">
                  An EHCP is a legal document for children and young people with special educational
                  needs (SEN). It describes their educational, health and social care needs, and sets out
                  the additional support they should receive. EHCPs are designed to help young people
                  achieve their goals and prepare for adulthood.
                </p>
              </div>

              {/* Key Highlight */}
              <div className="rounded-xl border border-accent-200 bg-accent-50 px-4 py-4">
                <h3 className="font-semibold text-warm-800 flex items-center gap-2 mb-2">
                  <span>ℹ️</span>
                  Important: Support Can Continue Until Age 25
                </h3>
                <p className="text-sm text-warm-600 leading-relaxed">
                  Unlike many other services that end at 18, EHCPs can continue until the end of the
                  academic year in which a young person turns 25, as long as they remain in education or
                  training. This is not automatic - the local authority will review whether continued
                  support is needed.
                </p>
              </div>

              {/* When EHCPs Continue */}
              <div>
                <h3 className="font-semibold text-warm-800 mb-2">When Can an EHCP Continue Past 18?</h3>
                <p className="text-sm text-warm-600 mb-2">
                  An EHCP can be maintained up to age 25 if the young person is in:
                </p>
                <ul className="space-y-1 text-sm text-warm-600 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-primary-500 mt-1">•</span>
                    <span>Further education (college, sixth form)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-500 mt-1">•</span>
                    <span>Apprenticeships (not level 4 or above)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-500 mt-1">•</span>
                    <span>Other approved education or training courses</span>
                  </li>
                </ul>
                <p className="text-xs text-warm-500 mt-3">
                  Note: EHCPs are not available for higher education (university), though universities
                  have their own disability support services.
                </p>
              </div>

              {/* GP Role */}
              <div className="rounded-xl border border-accent-200 bg-accent-50 px-4 py-3">
                <div className="flex items-start gap-2">
                  <span className="text-lg">💚</span>
                  <div>
                    <h4 className="font-semibold text-warm-800 text-sm">Your GP's Support</h4>
                    <p className="text-sm text-warm-600 mt-1">
                      Your GP can provide medical evidence for EHCP applications and reviews, help
                      coordinate health services mentioned in the plan, and support transition planning by
                      explaining how health needs might affect education and training.
                    </p>
                  </div>
                </div>
              </div>

              {/* Official Resources */}
              <div>
                <h3 className="font-semibold text-warm-800 mb-3">Official Resources & Support</h3>
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
