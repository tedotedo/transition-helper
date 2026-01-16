import type { ReactNode } from 'react'

export function ConsentUnder16() {
  return (
    <div className="space-y-8 animate-fade-in">
      <header className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-warm-500">Know your rights</p>
        <h1 className="text-2xl md:text-3xl font-bold text-warm-800">Consent Under 16 🌱</h1>
        <p className="max-w-2xl text-sm md:text-base text-warm-600 leading-relaxed">
          Even though you're under 16, your voice matters! Here's how decisions about your healthcare work,
          when you might be able to decide things yourself, and how your family stays involved.
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,1.1fr)]">
        <div className="space-y-6">
          <Card title="The basics 📌">
            <ul className="list-disc space-y-2 pl-5 text-sm text-warm-600">
              <li>Usually your parents or carers make healthcare decisions with you</li>
              <li>But your opinion really matters - staff should always ask what YOU think</li>
              <li>Sometimes you can make decisions yourself if you understand enough (this is called being "Gillick competent")</li>
              <li>As you get older and more mature, you'll have more say in your care</li>
            </ul>
          </Card>

          <Card title="What is Gillick Competence?" emoji="🌟">
            <p className="text-sm text-warm-600">
              "Gillick competent" is a way of saying you understand enough to make your own decisions about treatment,
              even without your parents agreeing. It's named after a court case from the 1980s.
            </p>
            <div className="mt-4 rounded-xl border border-accent-200 bg-accent-50 p-4">
              <p className="text-sm font-medium text-warm-800">Staff will think about:</p>
              <ul className="mt-2 space-y-1 list-disc pl-5 text-sm text-warm-600">
                <li>How well you understand the treatment</li>
                <li>Whether you understand what could happen without treatment</li>
                <li>Your maturity and ability to think things through</li>
                <li>Whether you can explain your decision</li>
              </ul>
            </div>
            <p className="mt-3 text-sm text-warm-600">
              <strong>Important:</strong> Being Gillick competent isn't about your age - it's about your understanding.
              A mature 13-year-old might be competent for some decisions, while a 15-year-old might need more support for others.
            </p>
          </Card>

          <Card title="Fraser Guidelines" emoji="📋">
            <p className="text-sm text-warm-600">
              Fraser guidelines are similar to Gillick competence but specifically about contraception and sexual health advice.
              They help staff decide if they can give you this advice without telling your parents.
            </p>
            <div className="mt-4 rounded-xl border border-purple-200 bg-purple-50 p-4">
              <p className="text-sm font-medium text-warm-800">Staff will check that:</p>
              <ul className="mt-2 space-y-1 list-disc pl-5 text-sm text-warm-600">
                <li>You understand the advice being given</li>
                <li>They can't persuade you to tell your parents</li>
                <li>You're likely to have sex with or without contraception</li>
                <li>Your health would suffer without the advice/treatment</li>
                <li>It's in your best interests to give advice without parental consent</li>
              </ul>
            </div>
          </Card>

          <Card title="How decisions work day-to-day" emoji="🔄">
            <p className="text-sm text-warm-600">
              Most of the time, decisions happen together with you, your family, and your healthcare team.
            </p>
            <div className="mt-4 grid gap-3 text-sm">
              <div className="rounded-xl border border-warm-200 bg-warm-50 px-4 py-3">
                <p className="font-medium text-warm-800">🩺 Routine appointments</p>
                <p className="mt-1 text-warm-600">
                  Staff will ask YOU how you're feeling and what's happening. Your parents might add details,
                  but your experience matters most.
                </p>
              </div>
              <div className="rounded-xl border border-warm-200 bg-warm-50 px-4 py-3">
                <p className="font-medium text-warm-800">💊 Starting new treatments</p>
                <p className="mt-1 text-warm-600">
                  Staff will explain what the treatment does and ask if you have questions.
                  Your parent usually signs consent, but you should understand and agree too.
                </p>
              </div>
              <div className="rounded-xl border border-warm-200 bg-warm-50 px-4 py-3">
                <p className="font-medium text-warm-800">🔬 Tests and procedures</p>
                <p className="mt-1 text-warm-600">
                  Before any test, staff should explain what will happen. You can ask questions
                  and say if you're worried or uncomfortable.
                </p>
              </div>
            </div>
          </Card>

          <Card title="Your right to be heard" emoji="🗣️">
            <p className="text-sm text-warm-600">
              Even if you can't make the final decision, you have the right to:
            </p>
            <ul className="mt-3 space-y-2 text-sm text-warm-600">
              <li className="flex items-start gap-2">
                <span className="text-primary-500">✓</span>
                <span>Have things explained in a way you understand</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-500">✓</span>
                <span>Ask questions about your care</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-500">✓</span>
                <span>Say what you prefer and why</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-500">✓</span>
                <span>Have your views taken seriously</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-500">✓</span>
                <span>Know why a decision was made</span>
              </li>
            </ul>
          </Card>

          <Card title="What if I disagree with my parents?" emoji="😕">
            <p className="text-sm text-warm-600">
              Sometimes you might want something different from what your parents want. This can be tricky, but here's what can help:
            </p>
            <ul className="mt-3 space-y-2 pl-5 text-sm text-warm-600 list-disc">
              <li>Talk to your healthcare team - they can help explain your point of view to your parents</li>
              <li>Ask if you can have some time alone with the doctor or nurse</li>
              <li>If it's about something you feel strongly about, staff will consider if you're Gillick competent for that decision</li>
              <li>You can ask for an advocate - someone independent who can help you express your views</li>
            </ul>
            <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4">
              <p className="text-sm text-warm-700">
                <strong>Remember:</strong> Your parents usually want what's best for you, even when it doesn't feel like it.
                Healthcare staff will try to help everyone work together.
              </p>
            </div>
          </Card>
        </div>

        <aside className="space-y-4">
          <Card title="Your growing independence 🌱" highlight>
            <p className="text-sm text-warm-600 mb-4">
              As you get older, you'll gradually get more control over your healthcare:
            </p>
            <div className="space-y-3 text-sm">
              <div className="p-3 bg-warm-50 rounded-xl border border-warm-100">
                <p className="font-semibold text-warm-800">Age 11-13</p>
                <p className="mt-1 text-warm-600">Start learning about your condition and asking questions</p>
              </div>
              <div className="p-3 bg-warm-50 rounded-xl border border-warm-100">
                <p className="font-semibold text-warm-800">Age 13-15</p>
                <p className="mt-1 text-warm-600">Have more say in decisions, might have some time alone with staff</p>
              </div>
              <div className="p-3 bg-primary-50 rounded-xl border border-primary-200">
                <p className="font-semibold text-primary-700">Age 16+</p>
                <p className="mt-1 text-warm-600">Usually make your own decisions about treatment</p>
              </div>
            </div>
          </Card>

          <Card title="Privacy under 16 🔒">
            <p className="text-sm text-warm-600">
              You have some privacy rights even under 16:
            </p>
            <ul className="mt-3 space-y-2 text-sm text-warm-600">
              <li className="flex items-start gap-2">
                <span>🔐</span>
                <span>You can ask to speak to staff privately</span>
              </li>
              <li className="flex items-start gap-2">
                <span>📝</span>
                <span>Some things can stay between you and your doctor</span>
              </li>
              <li className="flex items-start gap-2">
                <span>⚠️</span>
                <span>Staff must share if they're worried about your safety</span>
              </li>
            </ul>
          </Card>

          <Card title="Questions to ask 📝">
            <ul className="space-y-2 text-sm text-warm-600">
              <li className="flex items-start gap-2"><span>❓</span> Can you explain what this treatment does?</li>
              <li className="flex items-start gap-2"><span>❓</span> What are my choices?</li>
              <li className="flex items-start gap-2"><span>❓</span> Can I have some time to think about it?</li>
              <li className="flex items-start gap-2"><span>❓</span> Can I talk to you without my parents for a bit?</li>
            </ul>
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
