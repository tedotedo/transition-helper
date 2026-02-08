import ReadAloud from '../components/ReadAloud'

export function Consent16to17() {
  return (
    <div className="space-y-8 animate-fade-in">
      <header className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-warm-500">Know your rights</p>
        <h1 className="text-2xl md:text-3xl font-bold text-warm-800">Consent at 16 and 17 ✨</h1>
        <p className="max-w-2xl text-sm md:text-base text-warm-600 leading-relaxed">
          From 16, the law usually treats you as able to decide about your own healthcare. Here's what that actually means, how health staff check if you can make decisions, and how your family can still be there for you.
        </p>
        <div className="mt-2">
          <ReadAloud text="From 16, the law usually treats you as able to decide about your own healthcare. Here's what that actually means, how health staff check if you can make decisions, and how your family can still be there for you." />
        </div>
      </header>

      <section className="grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,1.1fr)]">
        <div className="space-y-6">
          <Card title="The basics 📌" emoji="📌">
            <ul className="list-disc space-y-2 pl-5 text-sm text-warm-600">
              <li>From 16, you can usually agree to your own treatment if you understand what's involved</li>
              <li>Health staff should explain things in a way that makes sense to you</li>
              <li>You can ask to have part of your appointment without your parent or carer there</li>
              <li>
                In rare emergencies, doctors or courts might decide treatment should go ahead to keep you safe, even if you disagree
              </li>
            </ul>
            <div className="mt-2"><ReadAloud text="From 16, you can usually agree to your own treatment if you understand what's involved. Health staff should explain things in a way that makes sense to you. You can ask to have part of your appointment without your parent or carer there. In rare emergencies, doctors or courts might decide treatment should go ahead to keep you safe, even if you disagree." /></div>
          </Card>

          <Card title="What changes at 16?" emoji="🔄">
            <p className="text-sm text-warm-600">
              Before 16, your parent or carer usually agreed to treatment. You were asked what you thought, but adults made most decisions. From 16, health staff will normally ask you directly!
            </p>
            <div className="mt-4 grid gap-3 md:grid-cols-2 text-sm">
              <div className="rounded-2xl border border-warm-200 bg-warm-50 px-4 py-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-warm-500">Before 16</p>
                <ul className="mt-2 space-y-1 list-disc pl-4 text-warm-600">
                  <li>Parents or carers usually gave consent</li>
                  <li>You were asked what you wanted, but adults decided</li>
                </ul>
              </div>
              <div className="rounded-2xl border border-primary-200 bg-gradient-to-br from-primary-50 to-white px-4 py-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary-600">From 16 🎉</p>
                <ul className="mt-2 space-y-1 list-disc pl-4 text-warm-700">
                  <li>Health staff usually ask you to agree to treatment</li>
                  <li>Your parent or carer can still support you if you want</li>
                  <li>You can choose who's in the room for part of your appointment</li>
                </ul>
              </div>
            </div>
            <div className="mt-2"><ReadAloud text="Before 16, your parent or carer usually agreed to treatment. You were asked what you thought, but adults made most decisions. From 16, health staff will normally ask you directly! Before 16: Parents or carers usually gave consent. You were asked what you wanted, but adults decided. From 16: Health staff usually ask you to agree to treatment. Your parent or carer can still support you if you want. You can choose who's in the room for part of your appointment." /></div>
          </Card>

          <Card title="How do staff check if I can make decisions?" emoji="🤔">
            <p className="text-sm text-warm-600">
              To give consent, you need to be able to understand the decision, think about your options, and share what you want to do.
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-warm-600">
              <li>Understand what the treatment is for</li>
              <li>Remember the key info long enough to decide</li>
              <li>Think about the pros and cons in a way that makes sense to you</li>
              <li>Tell someone your choice, in whatever way works for you</li>
            </ul>
            <p className="mt-3 text-sm text-warm-600">
              A doctor or nurse might ask you to explain the plan in your own words. If you don't understand yet, they should explain it again more clearly.
            </p>
            <div className="mt-2"><ReadAloud text="To give consent, you need to be able to understand the decision, think about your options, and share what you want to do. You need to understand what the treatment is for, remember the key info long enough to decide, think about the pros and cons in a way that makes sense to you, and tell someone your choice, in whatever way works for you. A doctor or nurse might ask you to explain the plan in your own words. If you don't understand yet, they should explain it again more clearly." /></div>
          </Card>

          <Card title="When do parents and carers get involved?" emoji="👨‍👩‍👧">
            <p className="text-sm text-warm-600">
              You can usually decide if you want a parent, carer or friend with you. You can also choose what info gets shared with them, or keep some things private.
            </p>
            <p className="mt-3 text-sm text-warm-600">
              If staff think you or someone else is at serious risk, they might need to share info even if you'd prefer they didn't. They should explain what they're doing and why.
            </p>
            <div className="mt-2"><ReadAloud text="You can usually decide if you want a parent, carer or friend with you. You can also choose what info gets shared with them, or keep some things private. If staff think you or someone else is at serious risk, they might need to share info even if you'd prefer they didn't. They should explain what they're doing and why." /></div>
          </Card>

          <Card title="Feeling unsure or pressured?" emoji="💭">
            <p className="text-sm text-warm-600">
              It's totally okay to say you're not sure. You can ask for more time, or ask someone to explain things differently.
            </p>
            <p className="mt-3 text-sm text-warm-700 font-medium">Try saying:</p>
            <ul className="mt-2 space-y-2 pl-5 text-sm text-warm-600">
              <li className="flex items-start gap-2"><span>💬</span> "Can you explain that again in a different way?"</li>
              <li className="flex items-start gap-2"><span>🚪</span> "Can I talk to you on my own for a few minutes?"</li>
              <li className="flex items-start gap-2"><span>🙋</span> "Can I speak to someone else, like a nurse or an advocate?"</li>
            </ul>
            <div className="mt-2"><ReadAloud text="It's totally okay to say you're not sure. You can ask for more time, or ask someone to explain things differently. You can try saying: Can you explain that again in a different way? Can I talk to you on my own for a few minutes? Can I speak to someone else, like a nurse or an advocate?" /></div>
          </Card>
        </div>

        <aside className="space-y-4">
          <Card title="Quick check! 🧠" emoji="🧠" highlight>
            <p className="text-sm text-warm-600 mb-4">See how much you've picked up so far:</p>
            <ul className="space-y-4 text-sm">
              <li className="p-3 bg-warm-50 rounded-xl border border-warm-100">
                <p className="font-semibold text-warm-800">1. From 16, who usually agrees to your treatment?</p>
                <p className="mt-1 text-warm-600">You, if you understand the decision. Parents can still support you.</p>
              </li>
              <li className="p-3 bg-warm-50 rounded-xl border border-warm-100">
                <p className="font-semibold text-warm-800">2. Can you see the doctor without your parent there?</p>
                <p className="mt-1 text-warm-600">Yes, usually! Staff should listen to what feels right for you.</p>
              </li>
              <li className="p-3 bg-warm-50 rounded-xl border border-warm-100">
                <p className="font-semibold text-warm-800">3. What if you don't understand the plan?</p>
                <p className="mt-1 text-warm-600">Just say you're not sure and ask for a clearer explanation.</p>
              </li>
            </ul>
          </Card>

          <Card title="Questions to ask your team 📝" emoji="📝">
            <ul className="space-y-2 text-sm text-warm-600">
              <li className="flex items-start gap-2"><span>❓</span> Who will be asking me for consent now I'm 16 or 17?</li>
              <li className="flex items-start gap-2"><span>❓</span> Can I have part of my appointment on my own?</li>
              <li className="flex items-start gap-2"><span>❓</span> What happens if I don't agree with a treatment?</li>
              <li className="flex items-start gap-2"><span>❓</span> How can my parent or carer stay involved if I want?</li>
            </ul>
            <p className="mt-4 text-xs text-warm-500 bg-warm-50 px-3 py-2 rounded-lg border border-warm-100">
              🔜 Soon you'll be able to save these questions to your appointment planner!
            </p>
            <div className="mt-2"><ReadAloud text="Questions to ask your team: Who will be asking me for consent now I'm 16 or 17? Can I have part of my appointment on my own? What happens if I don't agree with a treatment? How can my parent or carer stay involved if I want?" /></div>
          </Card>
        </aside>
      </section>
    </div>
  )
}

import type { ReactNode } from 'react'

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
