import type { ReactNode } from 'react'
import ReadAloud from '../components/ReadAloud'

export function Consent18Plus() {
  return (
    <div className="space-y-8 animate-fade-in">
      <header className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-warm-500">Know your rights</p>
        <h1 className="text-2xl md:text-3xl font-bold text-warm-800">Your Rights at 18+ 🎓</h1>
        <p className="max-w-2xl text-sm md:text-base text-warm-600 leading-relaxed">
          At 18, you become a legal adult. This means you're in charge of your own healthcare decisions.
          Here's what changes, what stays the same, and how the law protects you.
        </p>
        <div className="mt-2">
          <ReadAloud text="At 18, you become a legal adult. This means you're in charge of your own healthcare decisions. Here's what changes, what stays the same, and how the law protects you." />
        </div>
      </header>

      <section className="grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,1.1fr)]">
        <div className="space-y-6">
          <Card title="The basics 📌">
            <ul className="list-disc space-y-2 pl-5 text-sm text-warm-600">
              <li>You're legally presumed to have capacity to make your own decisions</li>
              <li>Your parents no longer have automatic rights to make decisions for you</li>
              <li>Staff need YOUR permission to share information with family</li>
              <li>You sign your own consent forms</li>
              <li>You can still involve family if YOU choose to</li>
            </ul>
            <div className="mt-2"><ReadAloud text="You're legally presumed to have capacity to make your own decisions. Your parents no longer have automatic rights to make decisions for you. Staff need YOUR permission to share information with family. You sign your own consent forms. You can still involve family if YOU choose to." /></div>
          </Card>

          <Card title="What changes at 18?" emoji="🔄">
            <p className="text-sm text-warm-600">
              Turning 18 brings some important legal changes to your healthcare:
            </p>
            <div className="mt-4 grid gap-3 md:grid-cols-2 text-sm">
              <div className="rounded-xl border border-warm-200 bg-warm-50 px-4 py-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-warm-500">Before 18</p>
                <ul className="mt-2 space-y-1 list-disc pl-4 text-warm-600">
                  <li>Parents could be involved in decisions</li>
                  <li>Staff might share info with parents</li>
                  <li>Children's services looked after you</li>
                </ul>
              </div>
              <div className="rounded-xl border border-primary-200 bg-gradient-to-br from-primary-50 to-white px-4 py-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary-600">From 18 🎉</p>
                <ul className="mt-2 space-y-1 list-disc pl-4 text-warm-700">
                  <li>YOU make your own decisions</li>
                  <li>YOUR permission needed to share info</li>
                  <li>Adult services take over your care</li>
                  <li>You can sign legal documents</li>
                </ul>
              </div>
            </div>
            <div className="mt-2"><ReadAloud text="Turning 18 brings some important legal changes to your healthcare. Before 18: Parents could be involved in decisions. Staff might share info with parents. Children's services looked after you. From 18: YOU make your own decisions. YOUR permission needed to share info. Adult services take over your care. You can sign legal documents." /></div>
          </Card>

          <Card title="The Mental Capacity Act" emoji="📜">
            <p className="text-sm text-warm-600">
              The Mental Capacity Act (MCA) is a law that protects adults who might need support making decisions.
              It's based on five important principles:
            </p>
            <div className="mt-4 space-y-3">
              <div className="rounded-xl border border-blue-200 bg-blue-50 p-3">
                <p className="font-medium text-sm text-warm-800">1. Assume capacity</p>
                <p className="text-xs text-warm-600 mt-1">Everyone is assumed to be able to make their own decisions unless proven otherwise</p>
              </div>
              <div className="rounded-xl border border-blue-200 bg-blue-50 p-3">
                <p className="font-medium text-sm text-warm-800">2. Support to decide</p>
                <p className="text-xs text-warm-600 mt-1">People must be given all possible help to make decisions before anyone concludes they can't</p>
              </div>
              <div className="rounded-xl border border-blue-200 bg-blue-50 p-3">
                <p className="font-medium text-sm text-warm-800">3. Unwise decisions are allowed</p>
                <p className="text-xs text-warm-600 mt-1">Making a decision others think is unwise doesn't mean you lack capacity</p>
              </div>
              <div className="rounded-xl border border-blue-200 bg-blue-50 p-3">
                <p className="font-medium text-sm text-warm-800">4. Best interests</p>
                <p className="text-xs text-warm-600 mt-1">Any decision made FOR someone must be in their best interests</p>
              </div>
              <div className="rounded-xl border border-blue-200 bg-blue-50 p-3">
                <p className="font-medium text-sm text-warm-800">5. Less restrictive option</p>
                <p className="text-xs text-warm-600 mt-1">Choose the option that limits the person's freedom least</p>
              </div>
            </div>
            <div className="mt-2"><ReadAloud text="The Mental Capacity Act, or MCA, is a law that protects adults who might need support making decisions. It's based on five important principles. 1. Assume capacity: Everyone is assumed to be able to make their own decisions unless proven otherwise. 2. Support to decide: People must be given all possible help to make decisions before anyone concludes they can't. 3. Unwise decisions are allowed: Making a decision others think is unwise doesn't mean you lack capacity. 4. Best interests: Any decision made for someone must be in their best interests. 5. Less restrictive option: Choose the option that limits the person's freedom least." /></div>
          </Card>

          <Card title="Involving your family" emoji="👨‍👩‍👧">
            <p className="text-sm text-warm-600">
              Being 18 doesn't mean you have to do everything alone! You can choose to involve family:
            </p>
            <ul className="mt-3 space-y-2 text-sm text-warm-600">
              <li className="flex items-start gap-2">
                <span className="text-primary-500">✓</span>
                <span>Bring someone to appointments for support</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-500">✓</span>
                <span>Give permission for staff to share info with specific people</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-500">✓</span>
                <span>Ask family to help you understand information</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-500">✓</span>
                <span>Set up formal arrangements like Lasting Power of Attorney</span>
              </li>
            </ul>
            <div className="mt-4 rounded-xl border border-accent-200 bg-accent-50 p-4">
              <p className="text-sm text-warm-700">
                <strong>Key point:</strong> The difference is that it's YOUR choice now.
                Staff will ask you, not your parents, for permission.
              </p>
            </div>
            <div className="mt-2"><ReadAloud text="Being 18 doesn't mean you have to do everything alone! You can choose to involve family: Bring someone to appointments for support. Give permission for staff to share info with specific people. Ask family to help you understand information. Set up formal arrangements like Lasting Power of Attorney. The difference is that it's YOUR choice now. Staff will ask you, not your parents, for permission." /></div>
          </Card>

          <Card title="Lasting Power of Attorney" emoji="📋">
            <p className="text-sm text-warm-600">
              A Lasting Power of Attorney (LPA) lets you choose someone to make decisions for you if you
              ever can't make them yourself. You need to set this up WHILE you have capacity.
            </p>
            <div className="mt-4 grid gap-3 md:grid-cols-2 text-sm">
              <div className="rounded-xl border border-accent-200 bg-accent-50 p-4">
                <h5 className="font-semibold text-warm-800">Health & Welfare LPA</h5>
                <p className="text-xs text-warm-600 mt-2">
                  Covers decisions about daily care, medical treatment, where you live.
                  Only used if you lose capacity.
                </p>
              </div>
              <div className="rounded-xl border border-primary-200 bg-primary-50 p-4">
                <h5 className="font-semibold text-warm-800">Property & Finance LPA</h5>
                <p className="text-xs text-warm-600 mt-2">
                  Covers money, bills, and property decisions.
                  Can be used anytime you choose.
                </p>
              </div>
            </div>
            <p className="mt-3 text-sm text-warm-500">
              Many young people with health conditions choose to set up an LPA, just in case.
              It gives peace of mind knowing someone you trust can help if needed.
            </p>
            <div className="mt-2"><ReadAloud text="A Lasting Power of Attorney, or LPA, lets you choose someone to make decisions for you if you ever can't make them yourself. You need to set this up WHILE you have capacity. Health and Welfare LPA: Covers decisions about daily care, medical treatment, where you live. Only used if you lose capacity. Property and Finance LPA: Covers money, bills, and property decisions. Can be used anytime you choose. Many young people with health conditions choose to set up an LPA, just in case. It gives peace of mind knowing someone you trust can help if needed." /></div>
          </Card>

          <Card title="If you need support with decisions" emoji="🤝">
            <p className="text-sm text-warm-600">
              Some people need extra support to make decisions. This doesn't mean someone else takes over -
              it means you get the help you need to decide yourself.
            </p>
            <div className="mt-4 space-y-3 text-sm">
              <div className="rounded-xl border border-warm-200 bg-warm-50 px-4 py-3">
                <p className="font-medium text-warm-800">Supported decision-making</p>
                <p className="mt-1 text-warm-600">
                  Getting help to make YOUR own decisions - like having info explained differently,
                  more time, or someone to help you think things through.
                </p>
              </div>
              <div className="rounded-xl border border-warm-200 bg-warm-50 px-4 py-3">
                <p className="font-medium text-warm-800">Independent Mental Capacity Advocate (IMCA)</p>
                <p className="mt-1 text-warm-600">
                  A trained person who can support you with serious decisions if you don't have
                  family or friends who can help.
                </p>
              </div>
              <div className="rounded-xl border border-warm-200 bg-warm-50 px-4 py-3">
                <p className="font-medium text-warm-800">Best interests meeting</p>
                <p className="mt-1 text-warm-600">
                  If you truly can't make a specific decision, people who know you meet to decide
                  what you would have wanted.
                </p>
              </div>
            </div>
            <div className="mt-2"><ReadAloud text="Some people need extra support to make decisions. This doesn't mean someone else takes over - it means you get the help you need to decide yourself. Supported decision-making: Getting help to make YOUR own decisions - like having info explained differently, more time, or someone to help you think things through. Independent Mental Capacity Advocate, or IMCA: A trained person who can support you with serious decisions if you don't have family or friends who can help. Best interests meeting: If you truly can't make a specific decision, people who know you meet to decide what you would have wanted." /></div>
          </Card>
        </div>

        <aside className="space-y-4">
          <Card title="You're in charge now! 👑" highlight>
            <p className="text-sm text-warm-600 mb-4">
              Being 18 means you have the right to:
            </p>
            <ul className="space-y-3 text-sm">
              <li className="p-3 bg-warm-50 rounded-xl border border-warm-100">
                <p className="font-semibold text-warm-800">Make your own choices</p>
                <p className="mt-1 text-warm-600">Even if others disagree with them</p>
              </li>
              <li className="p-3 bg-warm-50 rounded-xl border border-warm-100">
                <p className="font-semibold text-warm-800">Keep things private</p>
                <p className="mt-1 text-warm-600">Staff can't tell your family without permission</p>
              </li>
              <li className="p-3 bg-warm-50 rounded-xl border border-warm-100">
                <p className="font-semibold text-warm-800">Choose your support</p>
                <p className="mt-1 text-warm-600">Decide who helps you and how</p>
              </li>
              <li className="p-3 bg-warm-50 rounded-xl border border-warm-100">
                <p className="font-semibold text-warm-800">Access your records</p>
                <p className="mt-1 text-warm-600">See and manage your health information</p>
              </li>
            </ul>
            <div className="mt-2"><ReadAloud text="Being 18 means you have the right to: Make your own choices - even if others disagree with them. Keep things private - staff can't tell your family without permission. Choose your support - decide who helps you and how. Access your records - see and manage your health information." /></div>
          </Card>

          <Card title="NHS App access 📱">
            <p className="text-sm text-warm-600">
              From 18, you can use the NHS App to:
            </p>
            <ul className="mt-3 space-y-2 text-sm text-warm-600">
              <li className="flex items-start gap-2">
                <span>📋</span>
                <span>View your GP health record</span>
              </li>
              <li className="flex items-start gap-2">
                <span>📅</span>
                <span>Book appointments</span>
              </li>
              <li className="flex items-start gap-2">
                <span>💊</span>
                <span>Order repeat prescriptions</span>
              </li>
              <li className="flex items-start gap-2">
                <span>📄</span>
                <span>Access test results</span>
              </li>
            </ul>
            <p className="mt-3 text-xs text-warm-500">
              Download the NHS App and register with your GP to get started.
            </p>
            <div className="mt-2"><ReadAloud text="From 18, you can use the NHS App to: View your GP health record. Book appointments. Order repeat prescriptions. Access test results. Download the NHS App and register with your GP to get started." /></div>
          </Card>

          <Card title="Questions to ask 📝">
            <ul className="space-y-2 text-sm text-warm-600">
              <li className="flex items-start gap-2"><span>❓</span> Who will be my main contact in adult services?</li>
              <li className="flex items-start gap-2"><span>❓</span> How do I give permission for my family to be involved?</li>
              <li className="flex items-start gap-2"><span>❓</span> Should I think about setting up an LPA?</li>
              <li className="flex items-start gap-2"><span>❓</span> How do I access my medical records?</li>
            </ul>
            <div className="mt-2"><ReadAloud text="Questions to ask: Who will be my main contact in adult services? How do I give permission for my family to be involved? Should I think about setting up an LPA? How do I access my medical records?" /></div>
          </Card>

          <Card title="Helpful links 🔗">
            <ul className="space-y-2 text-sm text-warm-600">
              <li className="flex items-start gap-2">
                <span>📖</span>
                <a href="/money" className="text-primary-600 hover:text-primary-700 font-medium">
                  Money & PIP page
                </a>
                <span className="text-warm-500">- More on LPA and legal capacity</span>
              </li>
              <li className="flex items-start gap-2">
                <span>🏠</span>
                <a href="/care-plan" className="text-primary-600 hover:text-primary-700 font-medium">
                  My Care Plan
                </a>
                <span className="text-warm-500">- Keep your health info organized</span>
              </li>
            </ul>
            <div className="mt-2"><ReadAloud text="Helpful links: Money and PIP page - More on LPA and legal capacity. My Care Plan - Keep your health info organized." /></div>
          </Card>
        </aside>
      </section>
    </div>
  )
}

interface CardProps {
  title: string
  emoji?: string
  highlight?: boolean
  children: ReactNode
}

function Card({ title, children, highlight }: CardProps) {
  return (
    <section className={`rounded-2xl border px-5 py-5 shadow-card transition-all duration-300 hover:shadow-card-hover ${
      highlight
        ? 'border-primary-200 bg-gradient-to-br from-primary-50 to-white'
        : 'border-warm-200 bg-white hover:border-primary-200'
    }`}>
      <h2 className="text-base md:text-lg font-bold text-warm-800">{title}</h2>
      <div className="mt-3 space-y-2">{children}</div>
    </section>
  )
}
