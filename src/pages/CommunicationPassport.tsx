import { useState, useEffect, useCallback, type ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { useLocalStorage } from '../hooks'

// ─── Types ───────────────────────────────────────────────────────────────────

interface PassportAnswers {
  a: {
    a1: string[]; a1other: string; a2: string; a3: string; a4: string[]; a4other: string
    a5: string[]; a5text: string; a6: string; a7: string
  }
  b: { b1: string[]; b1other: string; b2: string; b3: string[]; b3other: string; b3text: string; b4: string; b5: string }
  c: { c1: string[]; c1other: string; c2: string[]; c2other: string; c3: string; c4: string; c5: string; c5text: string; c6: string }
  d: {
    d1name: string; d1dob: string; d2: string[]; d2text: string; d3: string
    d4: string; d5: string[]; d5other: string; d5text: string; d6: string; d7: string
  }
  e: { e1: string[]; e1other: string; e1text: string; e2: string; e3: string; e4: string }
  f: { f1: string; f2: string[]; f2other: string; f2text: string; f3: string; f4: string }
  carer: { name: string; relationship: string; phone: string; coordName: string; coordPhone: string }
  lastUpdated: string
}

type SectionKey = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'carer'

const defaultAnswers: PassportAnswers = {
  a: { a1: [], a1other: '', a2: '', a3: '', a4: [], a4other: '', a5: [], a5text: '', a6: '', a7: '' },
  b: { b1: [], b1other: '', b2: '', b3: [], b3other: '', b3text: '', b4: '', b5: '' },
  c: { c1: [], c1other: '', c2: [], c2other: '', c3: '', c4: '', c5: '', c5text: '', c6: '' },
  d: { d1name: '', d1dob: '', d2: [], d2text: '', d3: '', d4: '', d5: [], d5other: '', d5text: '', d6: '', d7: '' },
  e: { e1: [], e1other: '', e1text: '', e2: '', e3: '', e4: '' },
  f: { f1: '', f2: [], f2other: '', f2text: '', f3: '', f4: '' },
  carer: { name: '', relationship: '', phone: '', coordName: '', coordPhone: '' },
  lastUpdated: '',
}

// ─── Chip Component ───────────────────────────────────────────────────────────

function Chips({ options, selected, onToggle, otherValue, onOtherChange }: {
  options: string[]
  selected: string[]
  onToggle: (v: string) => void
  otherValue?: string
  onOtherChange?: (v: string) => void
}) {
  const showOtherField = selected.includes('Other') && onOtherChange !== undefined
  return (
    <div className="mt-2 space-y-2">
      <div className="flex flex-wrap gap-2">
        {options.map(opt => (
          <button
            key={opt}
            onClick={() => onToggle(opt)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${
              selected.includes(opt)
                ? 'bg-primary-500 text-white border-primary-500'
                : 'bg-white text-warm-600 border-warm-200 hover:border-primary-300'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
      {showOtherField && (
        <input
          className="w-full px-4 py-2 rounded-xl border border-primary-300 bg-warm-50/50 text-warm-800 focus:outline-none focus:ring-2 focus:ring-primary-300 text-sm"
          type="text"
          placeholder="Please explain..."
          value={otherValue ?? ''}
          onChange={e => onOtherChange!(e.target.value)}
          autoFocus
        />
      )}
    </div>
  )
}

// ─── Single Chip Component ────────────────────────────────────────────────────

function SingleChips({ options, selected, onSelect }: {
  options: string[]
  selected: string
  onSelect: (v: string) => void
}) {
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {options.map(opt => (
        <button
          key={opt}
          onClick={() => onSelect(opt)}
          className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${
            selected === opt
              ? 'bg-primary-500 text-white border-primary-500'
              : 'bg-white text-warm-600 border-warm-200 hover:border-primary-300'
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  )
}

// ─── Question Bubble ─────────────────────────────────────────────────────────

function QuestionBubble({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3 mb-4">
      <span className="text-2xl flex-shrink-0">🤝</span>
      <div className="bg-warm-100 rounded-2xl rounded-tl-sm px-4 py-3 max-w-xs md:max-w-sm">
        <p className="text-warm-800 text-sm leading-relaxed">{text}</p>
      </div>
    </div>
  )
}

// ─── Text Input ───────────────────────────────────────────────────────────────

function TextInput({ value, onChange, placeholder, multiline = false }: {
  value: string
  onChange: (v: string) => void
  placeholder?: string
  multiline?: boolean
}) {
  const cls = "w-full px-4 py-2 rounded-xl border border-warm-200 bg-warm-50/50 text-warm-800 focus:outline-none focus:ring-2 focus:ring-primary-300 text-sm"
  return multiline
    ? <textarea className={cls} rows={3} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} />
    : <input className={cls} type="text" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} />
}

// ─── Nav Buttons ─────────────────────────────────────────────────────────────

function NavButtons({ onBack, onNext, onSkip, isFirst, isLast }: {
  onBack: () => void
  onNext: () => void
  onSkip: () => void
  isFirst: boolean
  isLast: boolean
}) {
  return (
    <div className="flex items-center justify-between mt-6 pt-4 border-t border-warm-100">
      <button
        onClick={onBack}
        disabled={isFirst}
        className="px-4 py-2 rounded-xl border border-warm-200 text-warm-500 text-sm disabled:opacity-30"
      >
        ← Back
      </button>
      <button onClick={onSkip} className="px-4 py-2 text-warm-400 text-sm hover:text-warm-600">
        Skip
      </button>
      <button
        onClick={onNext}
        className="px-5 py-2 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white text-sm font-semibold shadow-card"
      >
        {isLast ? 'Generate Passport ✨' : 'Next →'}
      </button>
    </div>
  )
}

// ─── Print Passport ───────────────────────────────────────────────────────────

function PrintPassport({ answers, name }: { answers: PassportAnswers; name: string }) {
  const displayName = answers.e.e2 || name || 'your young person'
  const fullName = answers.d.d1name || name || ''
  const today = new Date(answers.lastUpdated).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })

  const hasEpilepsy = answers.d.d2.includes('Epilepsy') || answers.d.d2text.toLowerCase().includes('epilepsy')
  const noReliableYesNo = ['Not reliably', 'No'].includes(answers.a.a7)

  const emergencyLines: string[] = []
  if (hasEpilepsy) emergencyLines.push(`Has epilepsy${answers.d.d3 ? ': ' + answers.d.d3 : ''}.`)
  if (noReliableYesNo) emergencyLines.push('Cannot give reliable verbal or gestural consent.')
  if (answers.carer.name) emergencyLines.push(`${answers.carer.name} (${answers.carer.relationship}) must be present for all procedures — ${answers.carer.phone}.`)

  const fmt = (arr: string[], extra = '') => [...arr, extra].filter(Boolean).join(', ')

  return (
    <div className="print-passport bg-white p-6 md:p-8 max-w-2xl mx-auto font-sans">
      {/* Header */}
      <div className="border-b-2 border-warm-200 pb-4 mb-4">
        <h1 className="text-2xl font-bold text-warm-900">Communication Passport</h1>
        <p className="text-warm-500 text-sm">{fullName}{answers.d.d1dob ? ` · DOB: ${answers.d.d1dob}` : ''} · Updated: {today}</p>
      </div>

      {/* Emergency box */}
      {emergencyLines.length > 0 && (
        <div className="bg-red-50 border-2 border-red-400 rounded-xl p-4 mb-5">
          <p className="font-bold text-red-700 text-sm mb-1">⚠️ IMPORTANT — READ FIRST</p>
          {emergencyLines.map((l, i) => <p key={i} className="text-red-700 text-sm">{l}</p>)}
        </div>
      )}

      {/* Who I am */}
      <section className="mb-5 break-inside-avoid">
        <h2 className="text-base font-bold text-warm-800 border-b border-warm-100 pb-1 mb-2">👤 Who I Am</h2>
        {answers.d.d2.length > 0 && <p className="text-sm text-warm-700 mb-1"><strong>Conditions:</strong> {fmt(answers.d.d2, answers.d.d2text)}</p>}
        {answers.e.e4 && <p className="text-sm text-warm-700 italic">"{answers.e.e4}"</p>}
      </section>

      {/* Communication */}
      <section className="mb-5 break-inside-avoid">
        <h2 className="text-base font-bold text-warm-800 border-b border-warm-100 pb-1 mb-2">💬 How to Communicate With {displayName}</h2>
        {answers.a.a1.length > 0 && <p className="text-sm text-warm-700 mb-1"><strong>Communicates by:</strong> {answers.a.a1.join(', ')}{answers.a.a2 ? ` (${answers.a.a2})` : ''}</p>}
        {answers.a.a3 && <p className="text-sm text-warm-700 mb-1"><strong>AAC system:</strong> {answers.a.a3}</p>}
        {answers.a.a4.length > 0 && <p className="text-sm text-warm-700 mb-1"><strong>Shows understanding by:</strong> {answers.a.a4.join(', ')}</p>}
        {(answers.a.a5.length > 0 || answers.a.a5text) && <p className="text-sm text-warm-700 mb-1"><strong>What helps:</strong> {fmt(answers.a.a5, answers.a.a5text)}</p>}
        {answers.a.a6 && <p className="text-sm text-warm-700 mb-1"><strong>What makes it harder:</strong> {answers.a.a6}</p>}
        {answers.a.a7 && <p className="text-sm text-warm-700"><strong>Reliable yes/no:</strong> {answers.a.a7}</p>}
      </section>

      {/* Sensory */}
      {(answers.b.b1.length > 0 || answers.b.b2 || answers.b.b3.length > 0 || answers.b.b4 || answers.b.b5) && (
        <section className="mb-5 break-inside-avoid">
          <h2 className="text-base font-bold text-warm-800 border-b border-warm-100 pb-1 mb-2">🌀 Sensory Needs</h2>
          {answers.b.b1.length > 0 && <p className="text-sm text-warm-700 mb-1"><strong>Sensitive to:</strong> {answers.b.b1.join(', ')}</p>}
          {answers.b.b2 && <p className="text-sm text-warm-700 mb-1">{answers.b.b2}</p>}
          {(answers.b.b3.length > 0 || answers.b.b3text) && <p className="text-sm text-warm-700 mb-1"><strong>What helps:</strong> {fmt(answers.b.b3, answers.b.b3text)}</p>}
          {answers.b.b4 && <p className="text-sm text-warm-700 mb-1"><strong>Clinical setting concerns:</strong> {answers.b.b4}</p>}
          {answers.b.b5 && <p className="text-sm text-warm-700"><strong>Comfort object:</strong> {answers.b.b5}</p>}
        </section>
      )}

      {/* Distress */}
      {(answers.c.c1.length > 0 || answers.c.c2.length > 0 || answers.c.c3 || answers.c.c4) && (
        <section className="mb-5 break-inside-avoid">
          <h2 className="text-base font-bold text-warm-800 border-b border-warm-100 pb-1 mb-2">⚡ Signs {displayName} Is Struggling — and What Helps</h2>
          {answers.c.c1.length > 0 && <p className="text-sm text-warm-700 mb-1"><strong>Early signs:</strong> {answers.c.c1.join(', ')}</p>}
          {answers.c.c2.length > 0 && <p className="text-sm text-warm-700 mb-1"><strong>Common triggers:</strong> {answers.c.c2.join(', ')}</p>}
          {answers.c.c3 && <p className="text-sm text-warm-700 mb-1"><strong>What helps:</strong> {answers.c.c3}</p>}
          {answers.c.c4 && <p className="text-sm text-warm-700 mb-1"><strong>Avoid:</strong> {answers.c.c4}</p>}
          {answers.c.c5 === 'Yes — I will explain' && answers.c.c5text && <p className="text-sm text-warm-700 mb-1"><strong>Shows pain differently:</strong> {answers.c.c5text}</p>}
          {answers.c.c6 && <p className="text-sm text-warm-700"><strong>De-escalation:</strong> {answers.c.c6}</p>}
        </section>
      )}

      {/* Health */}
      {(answers.d.d4 || answers.d.d5.length > 0 || answers.d.d6 || answers.d.d7) && (
        <section className="mb-5 break-inside-avoid">
          <h2 className="text-base font-bold text-warm-800 border-b border-warm-100 pb-1 mb-2">🏥 About {displayName}'s Health</h2>
          {answers.d.d4 && <p className="text-sm text-warm-700 mb-1"><strong>Medications affecting communication:</strong> {answers.d.d4}</p>}
          {(answers.d.d5.length > 0 || answers.d.d5text) && <p className="text-sm text-warm-700 mb-1"><strong>Difficult procedures:</strong> {fmt(answers.d.d5, answers.d.d5text)}</p>}
          {answers.d.d6 && <p className="text-sm text-warm-700 mb-1"><strong>What helps for difficult procedures:</strong> {answers.d.d6}</p>}
          {answers.d.d7 && <p className="text-sm text-warm-700"><strong>Allergies / urgent info:</strong> {answers.d.d7}</p>}
        </section>
      )}

      {/* Good appointment */}
      {(answers.f.f1 || answers.f.f2.length > 0 || answers.f.f3 || answers.f.f4) && (
        <section className="mb-5 break-inside-avoid">
          <h2 className="text-base font-bold text-warm-800 border-b border-warm-100 pb-1 mb-2">✅ What Makes a Good Appointment</h2>
          {answers.f.f1 && <p className="text-sm text-warm-700 mb-1"><strong>Most important:</strong> {answers.f.f1}</p>}
          {(answers.f.f2.length > 0 || answers.f.f2text) && <p className="text-sm text-warm-700 mb-1"><strong>Please always:</strong> {fmt(answers.f.f2, answers.f.f2text)}</p>}
          {answers.f.f3 && <p className="text-sm text-warm-700 mb-1"><strong>Best time:</strong> {answers.f.f3}</p>}
          {answers.f.f4 && <p className="text-sm text-warm-700"><strong>Also important:</strong> {answers.f.f4}</p>}
        </section>
      )}

      {/* Family note */}
      {answers.e.e4 && (
        <section className="mb-5 break-inside-avoid">
          <h2 className="text-base font-bold text-warm-800 border-b border-warm-100 pb-1 mb-2">💛 A Note From the Family</h2>
          <blockquote className="border-l-4 border-primary-300 pl-4 italic text-warm-700 text-sm">"{answers.e.e4}"</blockquote>
        </section>
      )}

      {/* Contact */}
      <section className="mb-6 break-inside-avoid">
        <h2 className="text-base font-bold text-warm-800 border-b border-warm-100 pb-1 mb-2">📞 Contact</h2>
        {answers.carer.name && <p className="text-sm text-warm-700">{answers.carer.name} ({answers.carer.relationship}) — {answers.carer.phone}</p>}
        {answers.carer.coordName && <p className="text-sm text-warm-700">Care coordinator: {answers.carer.coordName}{answers.carer.coordPhone ? ` — ${answers.carer.coordPhone}` : ''}</p>}
      </section>

      {/* Footer */}
      <p className="text-xs text-warm-400 border-t border-warm-100 pt-4">
        Created with Transition Ready (transitionready.app). This supports but does not replace clinical assessment. Not a medical record. Last updated {today}.
      </p>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function CommunicationPassport() {
  const [savedAnswers, setSavedAnswers] = useLocalStorage<PassportAnswers>('transition-communication-passport', defaultAnswers)
  const [answers, setAnswers] = useState<PassportAnswers>(savedAnswers)
  const [carePlanData] = useLocalStorage<{ name?: string }>('transition-care-plan', {})
  const [mode, setMode] = useState<'intro' | 'build' | 'view'>(
    savedAnswers.lastUpdated ? 'view' : 'intro'
  )
  const [section, setSection] = useState<SectionKey>('a')
  const [questionIndex, setQuestionIndex] = useState(0)

  const name = answers.e.e2 || carePlanData?.name || 'your young person'

  // Auto-save on every change
  useEffect(() => {
    setSavedAnswers({ ...answers, lastUpdated: new Date().toISOString() })
  }, [answers, setSavedAnswers])

  const updateA = useCallback((field: keyof PassportAnswers['a'], value: string | string[]) => {
    setAnswers(prev => ({ ...prev, a: { ...prev.a, [field]: value } }))
  }, [])
  const updateB = useCallback((field: keyof PassportAnswers['b'], value: string | string[]) => {
    setAnswers(prev => ({ ...prev, b: { ...prev.b, [field]: value } }))
  }, [])
  const updateC = useCallback((field: keyof PassportAnswers['c'], value: string | string[]) => {
    setAnswers(prev => ({ ...prev, c: { ...prev.c, [field]: value } }))
  }, [])
  const updateD = useCallback((field: keyof PassportAnswers['d'], value: string | string[]) => {
    setAnswers(prev => ({ ...prev, d: { ...prev.d, [field]: value } }))
  }, [])
  const updateE = useCallback((field: keyof PassportAnswers['e'], value: string | string[]) => {
    setAnswers(prev => ({ ...prev, e: { ...prev.e, [field]: value } }))
  }, [])
  const updateF = useCallback((field: keyof PassportAnswers['f'], value: string | string[]) => {
    setAnswers(prev => ({ ...prev, f: { ...prev.f, [field]: value } }))
  }, [])
  const updateCarer = useCallback((field: keyof PassportAnswers['carer'], value: string) => {
    setAnswers(prev => ({ ...prev, carer: { ...prev.carer, [field]: value } }))
  }, [])

  const toggleChip = (arr: string[], val: string): string[] =>
    arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val]

  // Sections and questions
  const sections: SectionKey[] = ['a', 'b', 'c', 'd', 'e', 'f', 'carer']
  const sectionLabels: Record<SectionKey, string> = {
    a: `How ${name} communicates`,
    b: 'Sensory needs',
    c: 'Behaviour and distress',
    d: 'Health information',
    e: `About ${name}`,
    f: 'What makes a good appointment',
    carer: 'Your details',
  }

  const questionsBySection: Record<SectionKey, ReactElement[]> = {
    a: [
      <div key="a1">
        <QuestionBubble text={`How does ${name} let you know what they want or need?`} />
        <Chips
          options={['Uses words', 'Uses phrases', 'Points or gestures', 'Pictures or symbols', 'Communication device', 'Eye gaze', 'Sounds and expressions', 'Other']}
          selected={answers.a.a1}
          onToggle={v => updateA('a1', toggleChip(answers.a.a1, v))}
          otherValue={answers.a.a1other}
          onOtherChange={v => updateA('a1other', v)}
        />
      </div>,
      ...(answers.a.a1.some(x => ['Uses words', 'Uses phrases'].includes(x)) ? [
        <div key="a2">
          <QuestionBubble text={`How much speech does ${name} have?`} />
          <SingleChips
            options={['Single words only', 'Short phrases', 'Can make requests', 'Can have simple conversations']}
            selected={answers.a.a2}
            onSelect={v => updateA('a2', v)}
          />
        </div>
      ] : []),
      ...(answers.a.a1.some(x => ['Pictures or symbols', 'Communication device'].includes(x)) ? [
        <div key="a3">
          <QuestionBubble text={`What communication system do they use? (e.g. PECS, Makaton, tablet app, symbol board)`} />
          <TextInput value={answers.a.a3} onChange={v => updateA('a3', v)} placeholder="e.g. PECS book, Grid 3 on tablet..." />
        </div>
      ] : []),
      <div key="a4">
        <QuestionBubble text={`How does ${name} show they understand what you say?`} />
        <Chips
          options={['Follows simple instructions', 'Responds to their name', 'Understands routines', 'Understands pictures', 'Hard to tell', 'Other']}
          selected={answers.a.a4}
          onToggle={v => updateA('a4', toggleChip(answers.a.a4, v))}
          otherValue={answers.a.a4other}
          onOtherChange={v => updateA('a4other', v)}
        />
      </div>,
      <div key="a5">
        <QuestionBubble text={`What helps ${name} understand better?`} />
        <Chips
          options={['Short sentences', 'Give them time', 'Show — don\'t tell', 'One thing at a time']}
          selected={answers.a.a5}
          onToggle={v => updateA('a5', toggleChip(answers.a.a5, v))}
        />
        <TextInput value={answers.a.a5text} onChange={v => updateA('a5text', v)} placeholder="Anything else..." />
      </div>,
      <div key="a6">
        <QuestionBubble text="What makes communication harder?" />
        <TextInput value={answers.a.a6} onChange={v => updateA('a6', v)} placeholder="e.g. long sentences, speaking too fast..." multiline />
      </div>,
      <div key="a7">
        <QuestionBubble text={`Can ${name} say yes and no reliably?`} />
        <SingleChips
          options={['Yes — always', 'Usually', 'Sometimes', 'Not reliably', 'No']}
          selected={answers.a.a7}
          onSelect={v => updateA('a7', v)}
        />
      </div>,
    ],
    b: [
      <div key="b1">
        <QuestionBubble text={`Does ${name} have any sensory sensitivities?`} />
        <Chips
          options={['Touch', 'Sound', 'Bright lights', 'Smells', 'Crowds', 'Medical equipment', 'None that I know of', 'Other']}
          selected={answers.b.b1}
          onToggle={v => updateB('b1', toggleChip(answers.b.b1, v))}
          otherValue={answers.b.b1other}
          onOtherChange={v => updateB('b1other', v)}
        />
      </div>,
      ...(answers.b.b1.length > 0 && !answers.b.b1.includes('None that I know of') ? [
        <div key="b2">
          <QuestionBubble text="What specifically causes a reaction, and what does it look like?" />
          <TextInput value={answers.b.b2} onChange={v => updateB('b2', v)} placeholder="e.g. loud unexpected sounds cause covering ears and rocking..." multiline />
        </div>
      ] : []),
      <div key="b3">
        <QuestionBubble text={`What helps ${name} feel calm in an unfamiliar place?`} />
        <Chips
          options={['Music / headphones', 'A specific object', 'Familiar person present', 'Dim lighting', 'Quiet space', 'Other']}
          selected={answers.b.b3}
          onToggle={v => updateB('b3', toggleChip(answers.b.b3, v))}
          otherValue={answers.b.b3other}
          onOtherChange={v => updateB('b3other', v)}
        />
        <TextInput value={answers.b.b3text} onChange={v => updateB('b3text', v)} placeholder="Anything else..." />
      </div>,
      <div key="b4">
        <QuestionBubble text="Are there things in a clinical setting that are particularly hard? (e.g. antiseptic smell, blood pressure cuff, paper gowns)" />
        <TextInput value={answers.b.b4} onChange={v => updateB('b4', v)} placeholder="e.g. antiseptic smell causes immediate distress..." multiline />
      </div>,
      <div key="b5">
        <QuestionBubble text={`Does ${name} have a comfort object or sensory tool? What is it?`} />
        <TextInput value={answers.b.b5} onChange={v => updateB('b5', v)} placeholder="e.g. small blue fidget toy called Bluey..." />
      </div>,
    ],
    c: [
      <div key="c1">
        <QuestionBubble text={`When ${name} is getting overwhelmed, what are the early signs?`} />
        <Chips
          options={['Goes quiet', 'Rocks or stimms', 'Makes repetitive sounds', 'Covers ears or eyes', 'Tries to leave', 'Becomes agitated', 'Other']}
          selected={answers.c.c1}
          onToggle={v => updateC('c1', toggleChip(answers.c.c1, v))}
          otherValue={answers.c.c1other}
          onOtherChange={v => updateC('c1other', v)}
        />
      </div>,
      <div key="c2">
        <QuestionBubble text="What are the most common triggers in a medical setting?" />
        <Chips
          options={['Long waits', 'Unexpected changes', 'Being touched without warning', 'Strangers', 'Noise', 'Not understanding what is happening', 'Other']}
          selected={answers.c.c2}
          onToggle={v => updateC('c2', toggleChip(answers.c.c2, v))}
          otherValue={answers.c.c2other}
          onOtherChange={v => updateC('c2other', v)}
        />
      </div>,
      <div key="c3">
        <QuestionBubble text={`What helps when ${name} is starting to get upset?`} />
        <TextInput value={answers.c.c3} onChange={v => updateC('c3', v)} placeholder="e.g. acknowledge calmly, reduce stimulation, short walk..." multiline />
      </div>,
      <div key="c4">
        <QuestionBubble text="What should people definitely avoid doing?" />
        <TextInput value={answers.c.c4} onChange={v => updateC('c4', v)} placeholder="e.g. do not hold down, do not raise voice..." multiline />
      </div>,
      <div key="c5">
        <QuestionBubble text={`Does ${name} show pain differently from what you might expect? (e.g. laughing when hurt, going very still)`} />
        <SingleChips
          options={['Yes — I will explain', 'No', 'Not sure']}
          selected={answers.c.c5}
          onSelect={v => updateC('c5', v)}
        />
        {answers.c.c5 === 'Yes — I will explain' && (
          <TextInput value={answers.c.c5text} onChange={v => updateC('c5text', v)} placeholder="e.g. often laughs when in pain, especially with headaches..." multiline />
        )}
      </div>,
      <div key="c6">
        <QuestionBubble text="Is there a de-escalation strategy that reliably works?" />
        <TextInput value={answers.c.c6} onChange={v => updateC('c6', v)} placeholder="e.g. quiet corner, favourite song on headphones..." multiline />
      </div>,
    ],
    d: [
      <div key="d1">
        <QuestionBubble text="What is their full name and date of birth?" />
        <div className="space-y-2 mt-2">
          <TextInput value={answers.d.d1name} onChange={v => updateD('d1name', v)} placeholder="Full name" />
          <TextInput value={answers.d.d1dob} onChange={v => updateD('d1dob', v)} placeholder="Date of birth (e.g. 14 March 2005)" />
        </div>
      </div>,
      <div key="d2">
        <QuestionBubble text={`Does ${name} have any conditions a clinician needs to know about immediately?`} />
        <Chips
          options={['Epilepsy', 'Autism', 'Learning disability', 'Cerebral palsy', 'Heart condition', 'Other']}
          selected={answers.d.d2}
          onToggle={v => updateD('d2', toggleChip(answers.d.d2, v))}
        />
        <TextInput value={answers.d.d2text} onChange={v => updateD('d2text', v)} placeholder="Any other conditions..." />
      </div>,
      ...(answers.d.d2.includes('Epilepsy') ? [
        <div key="d3">
          <QuestionBubble text={`Tell us about the seizures so a clinician does not misread them. What do they look like?`} />
          <TextInput value={answers.d.d3} onChange={v => updateD('d3', v)} placeholder="e.g. tonic-clonic seizures, also absence seizures — brief staring that can look like non-compliance..." multiline />
        </div>
      ] : []),
      <div key="d4">
        <QuestionBubble text={`Are there medications that affect how ${name} behaves or communicates?`} />
        <TextInput value={answers.d.d4} onChange={v => updateD('d4', v)} placeholder="e.g. sodium valproate causes slower engagement in the morning..." multiline />
      </div>,
      <div key="d5">
        <QuestionBubble text="Are there medical procedures that are particularly difficult?" />
        <Chips
          options={['Blood tests', 'Cannulas', 'Examinations', 'Injections', 'MRI / scans', 'Other']}
          selected={answers.d.d5}
          onToggle={v => updateD('d5', toggleChip(answers.d.d5, v))}
          otherValue={answers.d.d5other}
          onOtherChange={v => updateD('d5other', v)}
        />
        <TextInput value={answers.d.d5text} onChange={v => updateD('d5text', v)} placeholder="Any others..." />
      </div>,
      <div key="d6">
        <QuestionBubble text="What helps for difficult procedures?" />
        <TextInput value={answers.d.d6} onChange={v => updateD('d6', v)} placeholder="e.g. EMLA cream 60 min before blood tests, mother present, specialist phlebotomist..." multiline />
      </div>,
      <div key="d7">
        <QuestionBubble text="Any allergies or other urgent medical information?" />
        <TextInput value={answers.d.d7} onChange={v => updateD('d7', v)} placeholder="e.g. penicillin allergy (rash)..." />
      </div>,
    ],
    e: [
      <div key="e1">
        <QuestionBubble text={`What does ${name} enjoy?`} />
        <Chips
          options={['Music', 'TV / films', 'Animals', 'Water', 'Outdoors', 'Food', 'Routine', 'People', 'Other']}
          selected={answers.e.e1}
          onToggle={v => updateE('e1', toggleChip(answers.e.e1, v))}
          otherValue={answers.e.e1other}
          onOtherChange={v => updateE('e1other', v)}
        />
        <TextInput value={answers.e.e1text} onChange={v => updateE('e1text', v)} placeholder="Anything specific they love..." />
      </div>,
      <div key="e2">
        <QuestionBubble text={`What name or nickname does ${name} like to be called?`} />
        <TextInput value={answers.e.e2} onChange={v => updateE('e2', v)} placeholder="e.g. Jordan, Jordy..." />
      </div>,
      <div key="e3">
        <QuestionBubble text={`Who is the most important person in ${name}'s life — and should they always be at appointments?`} />
        <TextInput value={answers.e.e3} onChange={v => updateE('e3', v)} placeholder="e.g. Mum Sarah — yes, always present..." multiline />
      </div>,
      <div key="e4">
        <QuestionBubble text={`How would you describe ${name} as a person? Something that helps a clinician see them as an individual.`} />
        <TextInput value={answers.e.e4} onChange={v => updateE('e4', v)} placeholder="e.g. Jordan is a gentle, funny young man who loves Robbie Williams and his cat Biscuit..." multiline />
      </div>,
    ],
    f: [
      <div key="f1">
        <QuestionBubble text="What is the one thing that makes the biggest difference to whether an appointment goes well?" />
        <TextInput value={answers.f.f1} onChange={v => updateF('f1', v)} placeholder="e.g. introduce yourself to them directly, not just to me..." multiline />
      </div>,
      <div key="f2">
        <QuestionBubble text={`What would you ask all clinical staff to do before starting an examination with ${name}?`} />
        <Chips
          options={['Introduce themselves', 'Explain what they will do', 'Ask permission before touching', 'Give a countdown', 'Let me explain it first', 'Other']}
          selected={answers.f.f2}
          onToggle={v => updateF('f2', toggleChip(answers.f.f2, v))}
          otherValue={answers.f.f2other}
          onOtherChange={v => updateF('f2other', v)}
        />
        <TextInput value={answers.f.f2text} onChange={v => updateF('f2text', v)} placeholder="Anything else..." />
      </div>,
      <div key="f3">
        <QuestionBubble text="Is there a time of day that works better for appointments?" />
        <SingleChips
          options={['Morning is best', 'Afternoon is best', 'Avoid late in the day', 'No strong preference']}
          selected={answers.f.f3}
          onSelect={v => updateF('f3', v)}
        />
      </div>,
      <div key="f4">
        <QuestionBubble text="Anything else you want to make sure is in this document?" />
        <TextInput value={answers.f.f4} onChange={v => updateF('f4', v)} placeholder="Anything you always find yourself having to explain from scratch..." multiline />
      </div>,
    ],
    carer: [
      <div key="carer">
        <QuestionBubble text="Finally — your details so clinicians know who to contact." />
        <div className="space-y-2 mt-2">
          <TextInput value={answers.carer.name} onChange={v => updateCarer('name', v)} placeholder="Your full name" />
          <TextInput value={answers.carer.relationship} onChange={v => updateCarer('relationship', v)} placeholder="Your relationship (e.g. Mother, Father, Carer)" />
          <TextInput value={answers.carer.phone} onChange={v => updateCarer('phone', v)} placeholder="Your phone number" />
          <p className="text-xs text-warm-400 pt-1">Care coordinator (optional)</p>
          <TextInput value={answers.carer.coordName} onChange={v => updateCarer('coordName', v)} placeholder="Care coordinator name" />
          <TextInput value={answers.carer.coordPhone} onChange={v => updateCarer('coordPhone', v)} placeholder="Care coordinator phone" />
        </div>
      </div>,
    ],
  }

  const currentQuestions = questionsBySection[section]
  const currentQuestion = currentQuestions[questionIndex]
  const sectionIndex = sections.indexOf(section)
  const isFirstQuestion = sectionIndex === 0 && questionIndex === 0
  const isLastQuestion = sectionIndex === sections.length - 1 && questionIndex === currentQuestions.length - 1

  const goNext = () => {
    if (questionIndex < currentQuestions.length - 1) {
      setQuestionIndex(questionIndex + 1)
    } else if (sectionIndex < sections.length - 1) {
      setSection(sections[sectionIndex + 1])
      setQuestionIndex(0)
    } else {
      setMode('view')
    }
  }

  const goBack = () => {
    if (questionIndex > 0) {
      setQuestionIndex(questionIndex - 1)
    } else if (sectionIndex > 0) {
      const prevSection = sections[sectionIndex - 1]
      setSection(prevSection)
      setQuestionIndex(questionsBySection[prevSection].length - 1)
    }
  }

  const overallProgress = Math.round(
    ((sectionIndex * 10 + questionIndex) / (sections.length * 10)) * 100
  )

  // ─── Intro Screen ─────────────────────────────────────────────────────────

  if (mode === 'intro') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-6 pb-24 md:pb-8 space-y-6 animate-fade-in">
        <header className="space-y-3">
          <Link to="/care-plan" className="inline-flex items-center gap-2 text-sm text-warm-500 hover:text-primary-600">
            ← Back to Care Plan
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-3xl">🗂️</span>
            <div>
              <h1 className="text-2xl font-bold text-warm-800">Communication Passport</h1>
              <p className="text-sm text-warm-500">Help clinicians understand {name}</p>
            </div>
          </div>
        </header>

        <div className="bg-white rounded-2xl border border-warm-200 p-6 shadow-card space-y-4">
          <p className="text-warm-700 leading-relaxed">
            This passport tells any healthcare professional exactly how to communicate with {name}, what helps them, and what to avoid.
          </p>
          <p className="text-warm-700 leading-relaxed">
            It takes about <strong>15–20 minutes</strong> to build, and you can save your progress and come back any time.
          </p>
          <div className="bg-accent-50 rounded-xl p-4 border border-accent-100">
            <p className="text-accent-800 text-sm">
              💡 <strong>You know {name} best.</strong> There are no right or wrong answers — just tell us what you know in your own words.
            </p>
          </div>
          <p className="text-warm-500 text-sm">
            This won't replace any medical records. It's a document you control, to give to whoever you choose.
          </p>
          <button
            onClick={() => setMode('build')}
            className="w-full px-5 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold shadow-card hover:shadow-card-hover transition-all"
          >
            Let's build the passport →
          </button>
        </div>
      </div>
    )
  }

  // ─── View / Print Mode ────────────────────────────────────────────────────

  if (mode === 'view') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-6 pb-24 md:pb-8 animate-fade-in">
        <header className="space-y-3 mb-6 print:hidden">
          <Link to="/care-plan" className="inline-flex items-center gap-2 text-sm text-warm-500 hover:text-primary-600">
            ← Back to Care Plan
          </Link>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🗂️</span>
              <div>
                <h1 className="text-2xl font-bold text-warm-800">Communication Passport</h1>
                <p className="text-sm text-warm-500">{name}</p>
              </div>
            </div>
          </div>
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => window.print()}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white text-sm font-semibold shadow-card"
            >
              🖨️ Print / Save PDF
            </button>
            <button
              onClick={() => { setMode('build'); setSection('a'); setQuestionIndex(0) }}
              className="px-4 py-2 rounded-xl border border-warm-200 text-warm-600 text-sm"
            >
              ✏️ Edit answers
            </button>
          </div>
        </header>

        <PrintPassport answers={answers} name={name} />
      </div>
    )
  }

  // ─── Build Mode ───────────────────────────────────────────────────────────

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 pb-24 md:pb-8 animate-fade-in">
      <header className="space-y-3 mb-6">
        <Link to="/care-plan" className="inline-flex items-center gap-2 text-sm text-warm-500 hover:text-primary-600">
          ← Back to Care Plan
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-3xl">🗂️</span>
          <div>
            <h1 className="text-2xl font-bold text-warm-800">Communication Passport</h1>
            <p className="text-sm text-warm-500">{sectionLabels[section]}</p>
          </div>
        </div>
      </header>

      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-xs text-warm-400 mb-1">
          <span>Section {sectionIndex + 1} of {sections.length}</span>
          <span>{overallProgress}% complete</span>
        </div>
        <div className="h-2 bg-warm-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary-400 to-accent-400 rounded-full transition-all duration-300"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
        {/* Section pills */}
        <div className="flex gap-1 mt-2 flex-wrap">
          {sections.map((s, i) => (
            <span key={s} className={`text-xs px-2 py-0.5 rounded-full ${i === sectionIndex ? 'bg-primary-100 text-primary-700 font-medium' : i < sectionIndex ? 'bg-accent-100 text-accent-700' : 'bg-warm-100 text-warm-400'}`}>
              {i < sectionIndex ? '✓' : i + 1}
            </span>
          ))}
        </div>
      </div>

      {/* Question card */}
      <div className="bg-white rounded-2xl border border-warm-200 p-5 shadow-card min-h-48">
        {currentQuestion}
        <NavButtons
          onBack={goBack}
          onNext={goNext}
          onSkip={goNext}
          isFirst={isFirstQuestion}
          isLast={isLastQuestion}
        />
      </div>

      {/* Save & continue later */}
      <div className="mt-4 text-center">
        <button
          onClick={() => setMode('view')}
          className="text-sm text-warm-400 hover:text-primary-600"
        >
          💾 Save & view passport now
        </button>
      </div>
    </div>
  )
}
