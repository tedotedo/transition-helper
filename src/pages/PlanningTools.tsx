import { useState } from 'react'
import { Link } from 'react-router-dom'

type StageKey = 'ready' | 'steady' | 'go'

export function PlanningTools() {
  const [expandedStage, setExpandedStage] = useState<StageKey | null>('ready')

  const toggleStage = (stage: StageKey) => {
    setExpandedStage(expandedStage === stage ? null : stage)
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <header className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-warm-500">Planning Tools</p>
        <h1 className="text-2xl md:text-3xl font-bold text-warm-800">Ready Steady Go resources 📝</h1>
        <p className="max-w-2xl text-sm md:text-base text-warm-600 leading-relaxed">
          Download, view and print official NHS Ready Steady Go questionnaires and guides to support
          your transition journey.
        </p>
      </header>

      {/* What is RSG */}
      <div className="rounded-2xl border border-purple-200 bg-gradient-to-br from-purple-50 to-accent-50 px-5 py-5">
        <h3 className="text-lg font-semibold text-warm-800 mb-3">What is Ready Steady Go?</h3>
        <p className="text-sm text-warm-600 mb-3">
          Right now, you see doctors and nurses who work with children and teenagers. As you get older,
          you'll move to doctors who work with adults. This is called "transition".
        </p>
        <p className="text-sm text-warm-600 mb-4">
          Think of it like moving up in school - you learn new things gradually. The Ready Steady Go
          programme has three stages to help you:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-white p-4 rounded-xl border border-green-200">
            <span className="text-2xl mb-2 block">🌱</span>
            <p className="font-semibold text-green-700 text-sm">Stage 1: Ready</p>
            <p className="text-xs text-warm-600 mt-1">Learn about your health</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-amber-200">
            <span className="text-2xl mb-2 block">🚴</span>
            <p className="font-semibold text-amber-700 text-sm">Stage 2: Steady</p>
            <p className="text-xs text-warm-600 mt-1">Practice doing things yourself</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-blue-200">
            <span className="text-2xl mb-2 block">🎯</span>
            <p className="font-semibold text-blue-700 text-sm">Stage 3: Go</p>
            <p className="text-xs text-warm-600 mt-1">You're ready for adult care!</p>
          </div>
        </div>
      </div>

      {/* Progress Timeline */}
      <div className="flex items-center justify-between max-w-xl mx-auto px-4">
        <div className="flex flex-col items-center flex-1">
          <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-lg">
            1
          </div>
          <span className="text-xs font-medium text-green-700 mt-2">Ready</span>
        </div>
        <div className="flex-1 h-1 bg-gradient-to-r from-green-500 to-amber-500 mx-2" />
        <div className="flex flex-col items-center flex-1">
          <div className="w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold text-lg">
            2
          </div>
          <span className="text-xs font-medium text-amber-700 mt-2">Steady</span>
        </div>
        <div className="flex-1 h-1 bg-gradient-to-r from-amber-500 to-blue-500 mx-2" />
        <div className="flex flex-col items-center flex-1">
          <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-lg">
            3
          </div>
          <span className="text-xs font-medium text-blue-700 mt-2">Go</span>
        </div>
      </div>

      {/* Stage Cards */}
      <div className="space-y-4">
        {/* Ready Stage */}
        <div
          className={`rounded-2xl border-2 ${expandedStage === 'ready' ? 'border-green-300' : 'border-green-200'} bg-green-50/50 overflow-hidden shadow-card hover:shadow-card-hover transition-all`}
        >
          <button onClick={() => toggleStage('ready')} className="w-full px-5 py-5 text-left">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white shrink-0">
                  <span className="text-xl">📚</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-green-900">Stage 1: Ready (Ages 11-13)</h2>
                  <p className="text-sm text-green-700 mt-1">
                    Learn about your health condition and start asking questions
                  </p>
                </div>
              </div>
              <span className="text-green-700 text-xl">{expandedStage === 'ready' ? '−' : '+'}</span>
            </div>
          </button>

          {expandedStage === 'ready' && (
            <div className="px-5 pb-5 space-y-4 border-t border-green-200 pt-4">
              <div className="bg-white p-4 rounded-xl border border-green-200">
                <h4 className="font-semibold text-green-900 mb-2">What happens in this stage?</h4>
                <p className="text-sm text-warm-600 mb-2">
                  This is the beginning! Right now, your parents or carers probably do most of the
                  talking at doctor appointments. That's okay - but now it's time to start learning about
                  your own health.
                </p>
                <p className="text-sm text-warm-600">
                  Don't worry, you won't be doing everything alone yet. This stage is just about
                  understanding more about yourself and your condition.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-green-900 mb-3">Things you'll learn about:</h4>
                <ul className="space-y-2">
                  {[
                    { title: 'Your health condition', desc: 'What it is, why you have it, and how it affects your body' },
                    { title: 'Your healthcare team', desc: 'Who the doctors and nurses are, and what each person does' },
                    { title: 'Asking questions', desc: "It's okay to ask questions! It shows you're interested in your health" },
                  ].map((item) => (
                    <li key={item.title} className="flex items-start gap-3 bg-white p-3 rounded-xl">
                      <span className="text-green-600 mt-0.5">✓</span>
                      <div>
                        <p className="font-medium text-sm text-warm-800">{item.title}</p>
                        <p className="text-xs text-warm-600">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white p-4 rounded-xl border border-green-200">
                <h4 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
                  <span>📄</span>
                  Ready Stage Downloads
                </h4>
                <p className="text-xs text-warm-500 mb-3">
                  Worksheets to help you learn about your health (you can fill these in with your
                  parent/carer or doctor)
                </p>
                <div className="space-y-2">
                  <a
                    href="https://www.readysteadygo.net/uploads/4/7/8/1/47810883/readysteadygoreadyquestionnaire_1-3_1.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 bg-green-50 hover:bg-green-100 rounded-xl transition-colors group"
                  >
                    <span className="text-sm font-medium text-warm-800">Ready Questionnaire (PDF)</span>
                    <span className="text-green-600">↗</span>
                  </a>
                  <a
                    href="https://www.readysteadygo.net/uploads/4/7/8/1/47810883/easy-read-ready-3.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 bg-green-50 hover:bg-green-100 rounded-xl transition-colors group"
                  >
                    <span className="text-sm font-medium text-warm-800">Ready Questionnaire (Easy Read)</span>
                    <span className="text-green-600">↗</span>
                  </a>
                </div>
              </div>

              <Link
                to="/resources/ready-steady-go/ready-questionnaire"
                className="block w-full text-center px-4 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-medium transition-colors"
              >
                View Ready Questionnaire
              </Link>
            </div>
          )}
        </div>

        {/* Steady Stage */}
        <div
          className={`rounded-2xl border-2 ${expandedStage === 'steady' ? 'border-amber-300' : 'border-amber-200'} bg-amber-50/50 overflow-hidden shadow-card hover:shadow-card-hover transition-all`}
        >
          <button onClick={() => toggleStage('steady')} className="w-full px-5 py-5 text-left">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center text-white shrink-0">
                  <span className="text-xl">🎯</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-amber-900">Stage 2: Steady (Ages 14-15)</h2>
                  <p className="text-sm text-amber-700 mt-1">
                    Start doing more for yourself with support nearby
                  </p>
                </div>
              </div>
              <span className="text-amber-700 text-xl">{expandedStage === 'steady' ? '−' : '+'}</span>
            </div>
          </button>

          {expandedStage === 'steady' && (
            <div className="px-5 pb-5 space-y-4 border-t border-amber-200 pt-4">
              <div className="bg-white p-4 rounded-xl border border-amber-200">
                <h4 className="font-semibold text-amber-900 mb-2">What happens in this stage?</h4>
                <p className="text-sm text-warm-600 mb-2">
                  Now you know about your health, it's time to practice doing some things yourself! Think
                  of it like learning to ride a bike - at first someone holds the bike steady, then they
                  let go but stay close, and finally you're riding on your own.
                </p>
                <p className="text-sm text-warm-600">
                  Your parents and healthcare team are still here to help, but you'll gradually start
                  doing more things independently.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-amber-900 mb-3">Skills you'll practice:</h4>
                <ul className="space-y-2">
                  {[
                    { title: 'Booking appointments', desc: 'Learning to call the surgery or hospital to arrange your own appointments' },
                    { title: 'Understanding your medicines', desc: 'Knowing what tablets or treatments you take, when, and what they do' },
                    { title: 'Talking about your health', desc: 'Being able to explain your condition to teachers, friends, or others' },
                    { title: 'Managing at school/college', desc: 'Working out how to handle your health needs while studying' },
                  ].map((item) => (
                    <li key={item.title} className="flex items-start gap-3 bg-white p-3 rounded-xl">
                      <span className="text-amber-600 mt-0.5">✓</span>
                      <div>
                        <p className="font-medium text-sm text-warm-800">{item.title}</p>
                        <p className="text-xs text-warm-600">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white p-4 rounded-xl border border-amber-200">
                <h4 className="font-semibold text-amber-900 mb-2 flex items-center gap-2">
                  <span>📄</span>
                  Steady Stage Downloads
                </h4>
                <p className="text-xs text-warm-500 mb-3">Worksheets to track your growing independence</p>
                <div className="space-y-2">
                  <a
                    href="https://www.readysteadygo.net/uploads/4/7/8/1/47810883/readysteadygosteadyquestionnaire_1-2_1.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 bg-amber-50 hover:bg-amber-100 rounded-xl transition-colors group"
                  >
                    <span className="text-sm font-medium text-warm-800">Steady Questionnaire (PDF)</span>
                    <span className="text-amber-600">↗</span>
                  </a>
                  <a
                    href="https://www.readysteadygo.net/uploads/4/7/8/1/47810883/easy-read-steady-3.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 bg-amber-50 hover:bg-amber-100 rounded-xl transition-colors group"
                  >
                    <span className="text-sm font-medium text-warm-800">Steady Questionnaire (Easy Read)</span>
                    <span className="text-amber-600">↗</span>
                  </a>
                </div>
              </div>

              <Link
                to="/resources/ready-steady-go/steady-questionnaire"
                className="block w-full text-center px-4 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-medium transition-colors"
              >
                View Steady Questionnaire
              </Link>
            </div>
          )}
        </div>

        {/* Go Stage */}
        <div
          className={`rounded-2xl border-2 ${expandedStage === 'go' ? 'border-blue-300' : 'border-blue-200'} bg-blue-50/50 overflow-hidden shadow-card hover:shadow-card-hover transition-all`}
        >
          <button onClick={() => toggleStage('go')} className="w-full px-5 py-5 text-left">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white shrink-0">
                  <span className="text-xl">🚀</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-blue-900">Stage 3: Go (Ages 16-17)</h2>
                  <p className="text-sm text-blue-700 mt-1">
                    Get ready to move to adult healthcare services
                  </p>
                </div>
              </div>
              <span className="text-blue-700 text-xl">{expandedStage === 'go' ? '−' : '+'}</span>
            </div>
          </button>

          {expandedStage === 'go' && (
            <div className="px-5 pb-5 space-y-4 border-t border-blue-200 pt-4">
              <div className="bg-white p-4 rounded-xl border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-2">What happens in this stage?</h4>
                <p className="text-sm text-warm-600 mb-2">
                  You're nearly there! This is when you prepare to move from children's healthcare to
                  adult healthcare. It might feel a bit scary, but you've been building up to this through
                  the Ready and Steady stages.
                </p>
                <p className="text-sm text-warm-600">
                  The adult healthcare team works differently from the children's team, but they're still
                  there to help you.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-blue-900 mb-3">What you'll learn about:</h4>
                <ul className="space-y-2">
                  {[
                    { title: 'How adult healthcare is different', desc: 'Adult clinics might be in different buildings, appointments longer apart' },
                    { title: 'Your rights and responsibilities', desc: 'What you can legally decide, and what you are responsible for' },
                    { title: 'Managing health with work or university', desc: 'How to tell employers or lecturers about your needs' },
                    { title: 'Meeting your new healthcare team', desc: 'What to expect in your first adult clinic appointment' },
                  ].map((item) => (
                    <li key={item.title} className="flex items-start gap-3 bg-white p-3 rounded-xl">
                      <span className="text-blue-600 mt-0.5">✓</span>
                      <div>
                        <p className="font-medium text-sm text-warm-800">{item.title}</p>
                        <p className="text-xs text-warm-600">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gradient-to-r from-blue-100 via-purple-100 to-primary-100 rounded-xl p-4 border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-2">Feeling nervous?</h4>
                <p className="text-sm text-warm-600 mb-2">
                  It's completely normal to feel worried about moving to adult services. Lots of young
                  people feel the same way!
                </p>
                <p className="text-sm text-warm-600">
                  Remember: your adult healthcare team are experts at helping people like you. They know
                  you're moving from children's services and they'll help you settle in.
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                  <span>📄</span>
                  Go Stage Downloads
                </h4>
                <p className="text-xs text-warm-500 mb-3">Final preparation tools for your transition</p>
                <div className="space-y-2">
                  <a
                    href="https://www.readysteadygo.net/uploads/4/7/8/1/47810883/readysteadygogoquestionnaire_1-2_1.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors group"
                  >
                    <span className="text-sm font-medium text-warm-800">Go Questionnaire (PDF)</span>
                    <span className="text-blue-600">↗</span>
                  </a>
                  <a
                    href="https://www.readysteadygo.net/uploads/4/7/8/1/47810883/easy-read-go-3.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors group"
                  >
                    <span className="text-sm font-medium text-warm-800">Go Questionnaire (Easy Read)</span>
                    <span className="text-blue-600">↗</span>
                  </a>
                </div>
              </div>

              <Link
                to="/resources/ready-steady-go/go-questionnaire"
                className="block w-full text-center px-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
              >
                View Go Questionnaire
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Parent Resources */}
      <div className="rounded-2xl border border-purple-200 bg-white overflow-hidden shadow-card">
        <div className="px-5 py-5">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center shrink-0">
              <span className="text-lg">👨‍👩‍👧</span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-warm-800">For Parents, Guardians & Carers</h2>
              <p className="text-sm text-warm-500 mt-1">Supporting your young person's journey</p>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <a
              href="https://www.readysteadygo.net/uploads/4/7/8/1/47810883/readysteadygoparentplanpatientinformation_1-2_1.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors group"
            >
              <span className="text-sm font-medium text-warm-800">Parent Questionnaire (PDF)</span>
              <span className="text-purple-600">↗</span>
            </a>
          </div>
        </div>
      </div>

      {/* Acknowledgement */}
      <div className="rounded-2xl border border-warm-200 bg-warm-50 px-5 py-4">
        <div className="flex items-start gap-3">
          <span className="text-xl">💜</span>
          <div>
            <h4 className="font-semibold text-warm-800 text-sm mb-1">Acknowledgement</h4>
            <p className="text-xs text-warm-600">
              This app is built upon the NHS Ready Steady Go programme, developed by Dr. Arvind Nagra,
              Paediatric Nephrologist at Southampton Children's Hospital. Learn more at{' '}
              <a
                href="https://www.readysteadygo.net"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-700 underline"
              >
                www.readysteadygo.net
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
