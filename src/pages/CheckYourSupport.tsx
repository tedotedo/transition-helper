import { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useLocalStorage } from '../hooks'

interface SupportData {
  currentSituation: string
  educationSupport: {
    hasSupport: boolean
    type: string
    contactPerson: string
    details: string
  }
  workSupport: {
    hasSupport: boolean
    type: string
    contactPerson: string
    details: string
  }
  homeSupport: {
    hasSupport: boolean
    type: string
    contactPerson: string
    details: string
  }
  benefitsReceiving: string[]
  socialWorker: string
  socialWorkerContact: string
  keyContacts: { name: string; role: string; phone: string }[]
  emergencyContact: string
  notes: string
  lastUpdated?: string
}

const STORAGE_KEY = 'transition-care-support-check'

const situationOptions = [
  { id: 'school', label: 'Still at school (sixth form)', emoji: '🏫' },
  { id: 'college', label: 'At college', emoji: '📚' },
  { id: 'uni', label: 'At university', emoji: '🎓' },
  { id: 'apprentice', label: 'Doing an apprenticeship', emoji: '🔧' },
  { id: 'working', label: 'Working', emoji: '💼' },
  { id: 'looking', label: 'Looking for work or training', emoji: '🔍' },
  { id: 'not-working', label: 'Not working (health reasons)', emoji: '🏠' },
  { id: 'other', label: 'Something else', emoji: '✨' }
]

const benefitOptions = [
  { id: 'pip', label: 'PIP (Personal Independence Payment)' },
  { id: 'uc', label: 'Universal Credit' },
  { id: 'esa', label: 'Employment Support Allowance (ESA)' },
  { id: 'carers', label: "Carer's Allowance (someone claims for you)" },
  { id: 'housing', label: 'Housing Benefit' },
  { id: 'council-tax', label: 'Council Tax reduction' },
  { id: 'blue-badge', label: 'Blue Badge' },
  { id: 'bus-pass', label: 'Disabled bus pass / freedom pass' },
  { id: 'student-dsa', label: "Disabled Students' Allowance (DSA)" },
  { id: 'access-work', label: 'Access to Work' },
  { id: 'none', label: "I don't receive any benefits" },
  { id: 'unsure', label: "I'm not sure what I receive" }
]

const defaultSupport = { hasSupport: false, type: '', contactPerson: '', details: '' }

const initialData: SupportData = {
  currentSituation: '',
  educationSupport: { ...defaultSupport },
  workSupport: { ...defaultSupport },
  homeSupport: { ...defaultSupport },
  benefitsReceiving: [],
  socialWorker: '',
  socialWorkerContact: '',
  keyContacts: [],
  emergencyContact: '',
  notes: ''
}

export function CheckYourSupport() {
  const [data, setData] = useLocalStorage<SupportData>(STORAGE_KEY, initialData)
  const [saved, setSaved] = useState(false)
  const [showAddContact, setShowAddContact] = useState(false)
  const [newContact, setNewContact] = useState({ name: '', role: '', phone: '' })

  // Destructure for easier access
  const {
    currentSituation,
    educationSupport,
    workSupport,
    homeSupport,
    benefitsReceiving,
    socialWorker,
    socialWorkerContact,
    keyContacts,
    emergencyContact,
    notes
  } = data

  // Helper to update any field
  const updateField = useCallback(<K extends keyof SupportData>(field: K, value: SupportData[K]) => {
    setData(prev => ({ ...prev, [field]: value }))
  }, [setData])

  const handleSave = useCallback(() => {
    setData(prev => ({
      ...prev,
      lastUpdated: new Date().toISOString()
    }))
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }, [setData])

  const toggleBenefit = useCallback((id: string) => {
    setData(prev => ({
      ...prev,
      benefitsReceiving: prev.benefitsReceiving.includes(id)
        ? prev.benefitsReceiving.filter(b => b !== id)
        : [...prev.benefitsReceiving, id]
    }))
  }, [setData])

  const addKeyContact = useCallback(() => {
    if (newContact.name.trim()) {
      setData(prev => ({
        ...prev,
        keyContacts: [...prev.keyContacts, newContact]
      }))
      setNewContact({ name: '', role: '', phone: '' })
      setShowAddContact(false)
    }
  }, [newContact, setData])

  const removeKeyContact = useCallback((index: number) => {
    setData(prev => ({
      ...prev,
      keyContacts: prev.keyContacts.filter((_, i) => i !== index)
    }))
  }, [setData])

  const showEducation = ['school', 'college', 'uni', 'apprentice'].includes(currentSituation)
  const showWork = ['working', 'apprentice'].includes(currentSituation)

  return (
    <div className="space-y-8 animate-fade-in max-w-3xl">
      {/* Header */}
      <header className="space-y-3">
        <Link to="/journey" className="inline-flex items-center gap-2 text-sm text-warm-500 hover:text-primary-600 transition-colors">
          <span>←</span>
          <span>Back to My Journey</span>
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-3xl">🛡️</span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-warm-500">Adult Stage Activity</p>
            <h1 className="text-2xl md:text-3xl font-bold text-warm-800">Check Your Support</h1>
          </div>
        </div>
      </header>

      {/* Introduction */}
      <section className="bg-gradient-to-br from-primary-50 to-white rounded-2xl border border-primary-100 p-5 shadow-card">
        <h2 className="text-lg font-semibold text-warm-800 mb-3">Making sure you have what you need 💪</h2>
        <div className="space-y-3 text-sm text-warm-600 leading-relaxed">
          <p>
            As you move into adult life, it's important to check you have the right support in place - whether that's at college,
            work, or home. Support needs can change, so it's good to review this regularly.
          </p>
          <p>
            This page helps you keep track of what support you have and who to contact if things change.
          </p>
        </div>
      </section>

      {/* Current Situation */}
      <section className="bg-white rounded-2xl border border-warm-200 p-5 shadow-card">
        <h2 className="text-lg font-semibold text-warm-800 mb-4 flex items-center gap-2">
          <span>📍</span>
          <span>Your current situation</span>
        </h2>
        <p className="text-sm text-warm-500 mb-4">What are you doing at the moment?</p>
        <div className="grid gap-2 md:grid-cols-2">
          {situationOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => updateField('currentSituation', option.id)}
              className={`flex items-center gap-3 p-3 rounded-xl text-left transition-all ${
                currentSituation === option.id
                  ? 'bg-primary-50 border-2 border-primary-300 ring-1 ring-primary-200'
                  : 'bg-warm-50 border-2 border-transparent hover:bg-warm-100'
              }`}
            >
              <span className="text-xl">{option.emoji}</span>
              <span className="text-sm font-medium text-warm-700">{option.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Education Support */}
      {showEducation && (
        <section className="bg-white rounded-2xl border border-warm-200 p-5 shadow-card animate-fade-in">
          <h2 className="text-lg font-semibold text-warm-800 mb-4 flex items-center gap-2">
            <span>📚</span>
            <span>Education support</span>
          </h2>

          <label className="flex items-center gap-3 mb-4 cursor-pointer">
            <input
              type="checkbox"
              checked={educationSupport.hasSupport}
              onChange={(e) => updateField('educationSupport', { ...educationSupport, hasSupport: e.target.checked })}
              className="w-5 h-5 rounded border-warm-300 text-primary-600 focus:ring-primary-300"
            />
            <span className="text-sm text-warm-700">I have support in place at school/college/uni</span>
          </label>

          {educationSupport.hasSupport && (
            <div className="space-y-4 animate-fade-in">
              <div>
                <label htmlFor="edu-type" className="block text-sm font-medium text-warm-700 mb-1">
                  Type of support (e.g. EHCP, DSA, learning support)
                </label>
                <input
                  id="edu-type"
                  type="text"
                  value={educationSupport.type}
                  onChange={(e) => updateField('educationSupport', { ...educationSupport, type: e.target.value })}
                  placeholder="e.g. EHCP, Disabled Students' Allowance, exam adjustments"
                  className="w-full px-4 py-2 rounded-xl border border-warm-200 bg-warm-50/50 text-warm-800 placeholder:text-warm-400 focus:outline-none focus:ring-2 focus:ring-primary-300 transition-all"
                />
              </div>
              <div>
                <label htmlFor="edu-contact" className="block text-sm font-medium text-warm-700 mb-1">
                  Contact person (e.g. SENCO, disability advisor)
                </label>
                <input
                  id="edu-contact"
                  type="text"
                  value={educationSupport.contactPerson}
                  onChange={(e) => updateField('educationSupport', { ...educationSupport, contactPerson: e.target.value })}
                  placeholder="Name and how to contact them"
                  className="w-full px-4 py-2 rounded-xl border border-warm-200 bg-warm-50/50 text-warm-800 placeholder:text-warm-400 focus:outline-none focus:ring-2 focus:ring-primary-300 transition-all"
                />
              </div>
            </div>
          )}
        </section>
      )}

      {/* Work Support */}
      {showWork && (
        <section className="bg-white rounded-2xl border border-warm-200 p-5 shadow-card animate-fade-in">
          <h2 className="text-lg font-semibold text-warm-800 mb-4 flex items-center gap-2">
            <span>💼</span>
            <span>Work support</span>
          </h2>

          <label className="flex items-center gap-3 mb-4 cursor-pointer">
            <input
              type="checkbox"
              checked={workSupport.hasSupport}
              onChange={(e) => updateField('workSupport', { ...workSupport, hasSupport: e.target.checked })}
              className="w-5 h-5 rounded border-warm-300 text-primary-600 focus:ring-primary-300"
            />
            <span className="text-sm text-warm-700">I have adjustments or support at work</span>
          </label>

          {workSupport.hasSupport && (
            <div className="space-y-4 animate-fade-in">
              <div>
                <label htmlFor="work-type" className="block text-sm font-medium text-warm-700 mb-1">
                  Type of support (e.g. Access to Work, reasonable adjustments)
                </label>
                <input
                  id="work-type"
                  type="text"
                  value={workSupport.type}
                  onChange={(e) => updateField('workSupport', { ...workSupport, type: e.target.value })}
                  placeholder="e.g. Flexible hours, equipment, support worker"
                  className="w-full px-4 py-2 rounded-xl border border-warm-200 bg-warm-50/50 text-warm-800 placeholder:text-warm-400 focus:outline-none focus:ring-2 focus:ring-primary-300 transition-all"
                />
              </div>
              <div>
                <label htmlFor="work-contact" className="block text-sm font-medium text-warm-700 mb-1">
                  Contact person (e.g. HR, manager, Access to Work advisor)
                </label>
                <input
                  id="work-contact"
                  type="text"
                  value={workSupport.contactPerson}
                  onChange={(e) => updateField('workSupport', { ...workSupport, contactPerson: e.target.value })}
                  placeholder="Name and how to contact them"
                  className="w-full px-4 py-2 rounded-xl border border-warm-200 bg-warm-50/50 text-warm-800 placeholder:text-warm-400 focus:outline-none focus:ring-2 focus:ring-primary-300 transition-all"
                />
              </div>
            </div>
          )}
        </section>
      )}

      {/* Home Support */}
      <section className="bg-white rounded-2xl border border-warm-200 p-5 shadow-card">
        <h2 className="text-lg font-semibold text-warm-800 mb-4 flex items-center gap-2">
          <span>🏠</span>
          <span>Support at home</span>
        </h2>

        <label className="flex items-center gap-3 mb-4 cursor-pointer">
          <input
            type="checkbox"
            checked={homeSupport.hasSupport}
            onChange={(e) => updateField('homeSupport', { ...homeSupport, hasSupport: e.target.checked })}
            className="w-5 h-5 rounded border-warm-300 text-primary-600 focus:ring-primary-300"
          />
          <span className="text-sm text-warm-700">I have care or support at home</span>
        </label>

        {homeSupport.hasSupport && (
          <div className="space-y-4 animate-fade-in">
            <div>
              <label htmlFor="home-type" className="block text-sm font-medium text-warm-700 mb-1">
                Type of support
              </label>
              <input
                id="home-type"
                type="text"
                value={homeSupport.type}
                onChange={(e) => updateField('homeSupport', { ...homeSupport, type: e.target.value })}
                placeholder="e.g. Care package, personal assistant, family carer"
                className="w-full px-4 py-2 rounded-xl border border-warm-200 bg-warm-50/50 text-warm-800 placeholder:text-warm-400 focus:outline-none focus:ring-2 focus:ring-primary-300 transition-all"
              />
            </div>
            <div>
              <label htmlFor="home-contact" className="block text-sm font-medium text-warm-700 mb-1">
                Contact person or agency
              </label>
              <input
                id="home-contact"
                type="text"
                value={homeSupport.contactPerson}
                onChange={(e) => updateField('homeSupport', { ...homeSupport, contactPerson: e.target.value })}
                placeholder="e.g. Care agency name, social worker"
                className="w-full px-4 py-2 rounded-xl border border-warm-200 bg-warm-50/50 text-warm-800 placeholder:text-warm-400 focus:outline-none focus:ring-2 focus:ring-primary-300 transition-all"
              />
            </div>
          </div>
        )}
      </section>

      {/* Benefits */}
      <section className="bg-white rounded-2xl border border-warm-200 p-5 shadow-card">
        <h2 className="text-lg font-semibold text-warm-800 mb-3 flex items-center gap-2">
          <span>💰</span>
          <span>Benefits and financial support</span>
        </h2>
        <p className="text-sm text-warm-500 mb-4">Tick any that apply to you:</p>

        <div className="grid gap-2 md:grid-cols-2">
          {benefitOptions.map((benefit) => (
            <label
              key={benefit.id}
              className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                benefitsReceiving.includes(benefit.id)
                  ? 'bg-primary-50 border border-primary-200'
                  : 'bg-warm-50 border border-transparent hover:bg-warm-100'
              }`}
            >
              <input
                type="checkbox"
                checked={benefitsReceiving.includes(benefit.id)}
                onChange={() => toggleBenefit(benefit.id)}
                className="w-5 h-5 rounded border-warm-300 text-primary-600 focus:ring-primary-300"
              />
              <span className="text-sm text-warm-700">{benefit.label}</span>
            </label>
          ))}
        </div>
      </section>

      {/* Social Worker */}
      <section className="bg-white rounded-2xl border border-warm-200 p-5 shadow-card">
        <h2 className="text-lg font-semibold text-warm-800 mb-4 flex items-center gap-2">
          <span>👤</span>
          <span>Social worker / care coordinator</span>
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="social-worker" className="block text-sm font-medium text-warm-700 mb-1">
              Name
            </label>
            <input
              id="social-worker"
              type="text"
              value={socialWorker}
              onChange={(e) => updateField('socialWorker', e.target.value)}
              placeholder="If you have one"
              className="w-full px-4 py-2 rounded-xl border border-warm-200 bg-warm-50/50 text-warm-800 placeholder:text-warm-400 focus:outline-none focus:ring-2 focus:ring-primary-300 transition-all"
            />
          </div>
          <div>
            <label htmlFor="social-worker-contact" className="block text-sm font-medium text-warm-700 mb-1">
              Contact number/email
            </label>
            <input
              id="social-worker-contact"
              type="text"
              value={socialWorkerContact}
              onChange={(e) => updateField('socialWorkerContact', e.target.value)}
              placeholder="Phone or email"
              className="w-full px-4 py-2 rounded-xl border border-warm-200 bg-warm-50/50 text-warm-800 placeholder:text-warm-400 focus:outline-none focus:ring-2 focus:ring-primary-300 transition-all"
            />
          </div>
        </div>
      </section>

      {/* Key Contacts */}
      <section className="bg-white rounded-2xl border border-warm-200 p-5 shadow-card space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-warm-800 flex items-center gap-2">
            <span>📞</span>
            <span>Other key contacts</span>
          </h2>
          {!showAddContact && (
            <button
              type="button"
              onClick={() => setShowAddContact(true)}
              className="px-3 py-1.5 rounded-lg bg-primary-100 text-primary-700 text-sm font-medium hover:bg-primary-200 transition-all"
            >
              + Add
            </button>
          )}
        </div>

        {showAddContact && (
          <div className="bg-warm-50 rounded-xl p-4 space-y-3 animate-fade-in">
            <div className="grid gap-3 md:grid-cols-3">
              <input
                type="text"
                value={newContact.name}
                onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                placeholder="Name"
                className="px-3 py-2 rounded-lg border border-warm-200 bg-white text-sm"
              />
              <input
                type="text"
                value={newContact.role}
                onChange={(e) => setNewContact({ ...newContact, role: e.target.value })}
                placeholder="Role"
                className="px-3 py-2 rounded-lg border border-warm-200 bg-white text-sm"
              />
              <input
                type="text"
                value={newContact.phone}
                onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                placeholder="Phone/email"
                className="px-3 py-2 rounded-lg border border-warm-200 bg-white text-sm"
              />
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={addKeyContact}
                className="px-3 py-1.5 rounded-lg bg-primary-500 text-white text-sm font-medium"
              >
                Add
              </button>
              <button
                type="button"
                onClick={() => setShowAddContact(false)}
                className="px-3 py-1.5 rounded-lg border border-warm-200 text-warm-600 text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {keyContacts.length > 0 && (
          <div className="space-y-2">
            {keyContacts.map((contact, index) => (
              <div key={index} className="flex items-center justify-between bg-warm-50 rounded-xl p-3">
                <div>
                  <p className="font-medium text-warm-800 text-sm">{contact.name}</p>
                  <p className="text-xs text-warm-500">{contact.role} • {contact.phone}</p>
                </div>
                <button
                  type="button"
                  onClick={() => removeKeyContact(index)}
                  className="text-warm-400 hover:text-red-500 transition-colors"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        <div>
          <label htmlFor="emergency-contact" className="block text-sm font-medium text-warm-700 mb-1">
            Emergency contact (family/friend)
          </label>
          <input
            id="emergency-contact"
            type="text"
            value={emergencyContact}
            onChange={(e) => updateField('emergencyContact', e.target.value)}
            placeholder="Name and phone number"
            className="w-full px-4 py-2 rounded-xl border border-warm-200 bg-warm-50/50 text-warm-800 placeholder:text-warm-400 focus:outline-none focus:ring-2 focus:ring-primary-300 transition-all"
          />
        </div>
      </section>

      {/* Notes */}
      <section className="bg-white rounded-2xl border border-warm-200 p-5 shadow-card">
        <h2 className="text-lg font-semibold text-warm-800 mb-3 flex items-center gap-2">
          <span>📝</span>
          <span>Notes</span>
        </h2>
        <textarea
          value={notes}
          onChange={(e) => updateField('notes', e.target.value)}
          placeholder="Anything else to remember about your support..."
          rows={3}
          className="w-full px-4 py-3 rounded-xl border border-warm-200 bg-warm-50/50 text-warm-800 placeholder:text-warm-400 focus:outline-none focus:ring-2 focus:ring-primary-300 transition-all resize-none"
        />
      </section>

      {/* Save Button */}
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={handleSave}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2"
        >
          <span>💾</span>
          <span>Save Support Info</span>
        </button>
      </div>

      {saved && (
        <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 border border-green-200 rounded-xl px-4 py-3 animate-fade-in">
          <span>✓</span>
          <span>Your support information has been saved!</span>
        </div>
      )}

      {/* Tips */}
      <section className="bg-gradient-to-br from-accent-50 to-white rounded-2xl border border-accent-100 p-5">
        <div className="flex items-start gap-3">
          <span className="text-2xl">💡</span>
          <div className="text-sm text-warm-600 space-y-2">
            <p className="font-semibold text-warm-800">When to review your support</p>
            <ul className="space-y-1">
              <li>• When your situation changes (new job, moving house, etc.)</li>
              <li>• If your health needs change</li>
              <li>• At least once a year</li>
              <li>• Before benefits renewals or reviews</li>
            </ul>
            <p className="mt-3">
              <strong>Need more support?</strong> Contact your local council's adult social care team for a care needs assessment.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
