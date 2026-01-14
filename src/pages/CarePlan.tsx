import { useCallback, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useLocalStorage } from '../hooks'

type SectionId = 'about' | 'conditions' | 'medications' | 'allergies' | 'preferences' | 'emergency' | 'goals' | 'notes'

interface AccordionSectionProps {
  id: SectionId
  emoji: string
  title: string
  summary: string
  isExpanded: boolean
  onToggle: () => void
  children: ReactNode
  hasData?: boolean
}

function AccordionSection({ id, emoji, title, summary, isExpanded, onToggle, children, hasData }: AccordionSectionProps) {
  return (
    <section
      id={id}
      className="bg-white rounded-2xl border border-warm-200 shadow-card print:shadow-none print:border-gray-300 overflow-hidden"
    >
      {/* Accordion Header - clickable */}
      <button
        onClick={onToggle}
        className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-warm-50/50 transition-colors print:hidden"
        aria-expanded={isExpanded}
        aria-controls={`${id}-content`}
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-2xl flex-shrink-0">{emoji}</span>
          <div className="min-w-0">
            <h2 className="text-base font-semibold text-warm-800">{title}</h2>
            {!isExpanded && (
              <p className="text-sm text-warm-500 truncate">{summary}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0 ml-3">
          {hasData && !isExpanded && (
            <span className="w-2 h-2 rounded-full bg-accent-400" title="Has data" />
          )}
          <span className={`text-warm-400 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </div>
      </button>

      {/* Print-only header (non-interactive) */}
      <div className="hidden print:flex px-5 py-4 items-center gap-2">
        <span className="text-xl">{emoji}</span>
        <h2 className="text-lg font-semibold text-warm-800">{title}</h2>
      </div>

      {/* Accordion Content */}
      <div
        id={`${id}-content`}
        className={`px-5 pb-5 print:block ${isExpanded ? 'block' : 'hidden'}`}
      >
        {children}
      </div>
    </section>
  )
}

interface Medication {
  name: string
  dose: string
  whatFor: string
  whenToTake: string
}

interface CarePlanData {
  // Personal info
  name: string
  dateOfBirth: string
  nhsNumber: string

  // Health conditions
  conditions: string[]
  conditionDescription: string

  // Medications
  medications: Medication[]

  // Allergies and reactions
  allergies: string[]

  // Appointment preferences
  appointmentPreferences: string[]
  customPreference: string

  // Emergency contacts
  emergencyContact: {
    name: string
    relationship: string
    phone: string
  }

  // Health goals
  healthGoals: string[]

  // Additional notes
  additionalNotes: string

  lastUpdated?: string
}

export const CARE_PLAN_STORAGE_KEY = 'transition-care-plan'

const defaultAppointmentPreferences = [
  'I need extra time to process information',
  'I prefer written information',
  'I like to bring a parent/carer with me',
  'I prefer one person to speak at a time',
  'I need breaks during long appointments',
  'I find it hard to make eye contact',
  'I prefer a quiet waiting area',
]

const initialData: CarePlanData = {
  name: '',
  dateOfBirth: '',
  nhsNumber: '',
  conditions: [''],
  conditionDescription: '',
  medications: [{ name: '', dose: '', whatFor: '', whenToTake: '' }],
  allergies: [''],
  appointmentPreferences: [],
  customPreference: '',
  emergencyContact: { name: '', relationship: '', phone: '' },
  healthGoals: ['', '', ''],
  additionalNotes: '',
}

export function CarePlan() {
  const [data, setData] = useLocalStorage<CarePlanData>(CARE_PLAN_STORAGE_KEY, initialData)
  const [expandedSections, setExpandedSections] = useState<Set<SectionId>>(new Set(['about']))

  const toggleSection = useCallback((sectionId: SectionId) => {
    setExpandedSections(prev => {
      const next = new Set(prev)
      if (next.has(sectionId)) {
        next.delete(sectionId)
      } else {
        // Close other sections on mobile for cleaner UX (optional: remove this to allow multiple open)
        next.clear()
        next.add(sectionId)
      }
      return next
    })
  }, [])

  // Helper functions to check if sections have data and generate summaries
  const hasAboutData = data.name || data.dateOfBirth || data.nhsNumber
  const aboutSummary = hasAboutData
    ? [data.name, data.dateOfBirth && `DOB: ${data.dateOfBirth}`].filter(Boolean).join(' • ') || 'Tap to add your details'
    : 'Tap to add your details'

  const hasConditionsData = data.conditions.some(c => c.trim()) || data.conditionDescription
  const conditionsSummary = hasConditionsData
    ? data.conditions.filter(c => c.trim()).join(', ') || 'Description added'
    : 'Tap to add your conditions'

  const hasMedicationsData = data.medications.some(m => m.name.trim())
  const medicationsSummary = hasMedicationsData
    ? `${data.medications.filter(m => m.name.trim()).length} medication(s) listed`
    : 'Tap to add medications'

  const hasAllergiesData = data.allergies.some(a => a.trim())
  const allergiesSummary = hasAllergiesData
    ? data.allergies.filter(a => a.trim()).join(', ')
    : 'Tap to add allergies'

  const hasPreferencesData = data.appointmentPreferences.length > 0 || !!data.customPreference
  const preferencesSummary = hasPreferencesData
    ? `${data.appointmentPreferences.length} preference(s) selected`
    : 'Tap to set preferences'

  const hasEmergencyData = data.emergencyContact.name || data.emergencyContact.phone
  const emergencySummary = hasEmergencyData
    ? [data.emergencyContact.name, data.emergencyContact.relationship].filter(Boolean).join(' • ')
    : 'Tap to add emergency contact'

  const hasGoalsData = data.healthGoals.some(g => g.trim())
  const goalsSummary = hasGoalsData
    ? `${data.healthGoals.filter(g => g.trim()).length} goal(s) set`
    : 'Tap to set your goals'

  const hasNotesData = !!data.additionalNotes.trim()
  const notesSummary = hasNotesData
    ? data.additionalNotes.slice(0, 50) + (data.additionalNotes.length > 50 ? '...' : '')
    : 'Tap to add notes'

  const updateField = useCallback(<K extends keyof CarePlanData>(field: K, value: CarePlanData[K]) => {
    setData(prev => ({ ...prev, [field]: value, lastUpdated: new Date().toISOString() }))
  }, [setData])

  const updateCondition = useCallback((index: number, value: string) => {
    setData(prev => {
      const newConditions = [...prev.conditions]
      newConditions[index] = value
      return { ...prev, conditions: newConditions, lastUpdated: new Date().toISOString() }
    })
  }, [setData])

  const addCondition = useCallback(() => {
    setData(prev => ({
      ...prev,
      conditions: [...prev.conditions, ''],
      lastUpdated: new Date().toISOString()
    }))
  }, [setData])

  const updateMedication = useCallback((index: number, field: keyof Medication, value: string) => {
    setData(prev => {
      const newMedications = [...prev.medications]
      newMedications[index] = { ...newMedications[index], [field]: value }
      return { ...prev, medications: newMedications, lastUpdated: new Date().toISOString() }
    })
  }, [setData])

  const addMedication = useCallback(() => {
    setData(prev => ({
      ...prev,
      medications: [...prev.medications, { name: '', dose: '', whatFor: '', whenToTake: '' }],
      lastUpdated: new Date().toISOString()
    }))
  }, [setData])

  const removeMedication = useCallback((index: number) => {
    setData(prev => ({
      ...prev,
      medications: prev.medications.filter((_, i) => i !== index),
      lastUpdated: new Date().toISOString()
    }))
  }, [setData])

  const updateAllergy = useCallback((index: number, value: string) => {
    setData(prev => {
      const newAllergies = [...prev.allergies]
      newAllergies[index] = value
      return { ...prev, allergies: newAllergies, lastUpdated: new Date().toISOString() }
    })
  }, [setData])

  const addAllergy = useCallback(() => {
    setData(prev => ({
      ...prev,
      allergies: [...prev.allergies, ''],
      lastUpdated: new Date().toISOString()
    }))
  }, [setData])

  const togglePreference = useCallback((preference: string) => {
    setData(prev => ({
      ...prev,
      appointmentPreferences: prev.appointmentPreferences.includes(preference)
        ? prev.appointmentPreferences.filter(p => p !== preference)
        : [...prev.appointmentPreferences, preference],
      lastUpdated: new Date().toISOString()
    }))
  }, [setData])

  const updateGoal = useCallback((index: number, value: string) => {
    setData(prev => {
      const newGoals = [...prev.healthGoals]
      newGoals[index] = value
      return { ...prev, healthGoals: newGoals, lastUpdated: new Date().toISOString() }
    })
  }, [setData])

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="space-y-6 animate-fade-in max-w-3xl">
      {/* Header */}
      <header className="space-y-3 print:hidden">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-warm-500 hover:text-primary-600 transition-colors">
          <span>←</span>
          <span>Back to Home</span>
        </Link>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">📋</span>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-warm-800">My Care Plan</h1>
              <p className="text-sm text-warm-500">Your personal health record to share with your team</p>
            </div>
          </div>
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white text-sm font-semibold shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all flex items-center gap-2"
          >
            <span>🖨️</span>
            <span>Print / Export</span>
          </button>
        </div>
      </header>

      {/* Print Header */}
      <div className="hidden print:block mb-6">
        <h1 className="text-2xl font-bold">My Care Plan</h1>
        <p className="text-sm text-gray-600">Printed from WARP Transition Helper</p>
      </div>

      {/* Personal Information */}
      <AccordionSection
        id="about"
        emoji="👤"
        title="About Me"
        summary={aboutSummary}
        isExpanded={expandedSections.has('about')}
        onToggle={() => toggleSection('about')}
        hasData={!!hasAboutData}
      >
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label htmlFor="cp-name" className="block text-sm font-medium text-warm-700 mb-1">Name</label>
            <input
              id="cp-name"
              type="text"
              value={data.name}
              onChange={(e) => updateField('name', e.target.value)}
              placeholder="Your full name"
              className="w-full px-4 py-2 rounded-xl border border-warm-200 bg-warm-50/50 text-warm-800 focus:outline-none focus:ring-2 focus:ring-primary-300 print:border-gray-300 print:bg-white"
            />
          </div>
          <div>
            <label htmlFor="cp-dob" className="block text-sm font-medium text-warm-700 mb-1">Date of Birth</label>
            <input
              id="cp-dob"
              type="date"
              value={data.dateOfBirth}
              onChange={(e) => updateField('dateOfBirth', e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-warm-200 bg-warm-50/50 text-warm-800 focus:outline-none focus:ring-2 focus:ring-primary-300 print:border-gray-300 print:bg-white"
            />
          </div>
          <div>
            <label htmlFor="cp-nhs" className="block text-sm font-medium text-warm-700 mb-1">NHS Number</label>
            <input
              id="cp-nhs"
              type="text"
              value={data.nhsNumber}
              onChange={(e) => updateField('nhsNumber', e.target.value)}
              placeholder="e.g. 123 456 7890"
              className="w-full px-4 py-2 rounded-xl border border-warm-200 bg-warm-50/50 text-warm-800 focus:outline-none focus:ring-2 focus:ring-primary-300 print:border-gray-300 print:bg-white"
            />
          </div>
        </div>
      </AccordionSection>

      {/* My Conditions */}
      <AccordionSection
        id="conditions"
        emoji="🏥"
        title="My Condition(s)"
        summary={conditionsSummary}
        isExpanded={expandedSections.has('conditions')}
        onToggle={() => toggleSection('conditions')}
        hasData={!!hasConditionsData}
      >
        <div className="space-y-3 mb-4">
          {data.conditions.map((condition, idx) => (
            <input
              key={idx}
              type="text"
              value={condition}
              onChange={(e) => updateCondition(idx, e.target.value)}
              placeholder={`Condition ${idx + 1} (e.g. Diabetes, Asthma...)`}
              className="w-full px-4 py-2 rounded-xl border border-warm-200 bg-warm-50/50 text-warm-800 focus:outline-none focus:ring-2 focus:ring-primary-300"
            />
          ))}
          <button
            onClick={addCondition}
            className="text-sm text-primary-600 hover:text-primary-700 font-medium print:hidden"
          >
            + Add another condition
          </button>
        </div>

        <div>
          <label htmlFor="cp-condition-desc" className="block text-sm font-medium text-warm-700 mb-1">
            In my own words, my condition means...
          </label>
          <textarea
            id="cp-condition-desc"
            value={data.conditionDescription}
            onChange={(e) => updateField('conditionDescription', e.target.value)}
            placeholder="Describe how your condition affects you day-to-day..."
            rows={3}
            className="w-full px-4 py-2 rounded-xl border border-warm-200 bg-warm-50/50 text-warm-800 focus:outline-none focus:ring-2 focus:ring-primary-300 resize-none"
          />
        </div>
      </AccordionSection>

      {/* Medications */}
      <AccordionSection
        id="medications"
        emoji="💊"
        title="My Medications"
        summary={medicationsSummary}
        isExpanded={expandedSections.has('medications')}
        onToggle={() => toggleSection('medications')}
        hasData={hasMedicationsData}
      >
        <div className="space-y-4">
          {data.medications.map((med, idx) => (
            <div key={idx} className="p-4 bg-warm-50 rounded-xl border border-warm-100 relative">
              {data.medications.length > 1 && (
                <button
                  onClick={() => removeMedication(idx)}
                  className="absolute top-2 right-2 w-6 h-6 rounded-full bg-warm-200 text-warm-500 hover:bg-red-100 hover:text-red-500 flex items-center justify-center text-sm print:hidden"
                >
                  ×
                </button>
              )}
              <div className="grid gap-3 md:grid-cols-2">
                <input
                  type="text"
                  value={med.name}
                  onChange={(e) => updateMedication(idx, 'name', e.target.value)}
                  placeholder="Medicine name"
                  className="w-full px-3 py-2 rounded-lg border border-warm-200 bg-white text-warm-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300"
                />
                <input
                  type="text"
                  value={med.dose}
                  onChange={(e) => updateMedication(idx, 'dose', e.target.value)}
                  placeholder="Dose (e.g. 10mg)"
                  className="w-full px-3 py-2 rounded-lg border border-warm-200 bg-white text-warm-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300"
                />
                <input
                  type="text"
                  value={med.whatFor}
                  onChange={(e) => updateMedication(idx, 'whatFor', e.target.value)}
                  placeholder="What it's for"
                  className="w-full px-3 py-2 rounded-lg border border-warm-200 bg-white text-warm-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300"
                />
                <input
                  type="text"
                  value={med.whenToTake}
                  onChange={(e) => updateMedication(idx, 'whenToTake', e.target.value)}
                  placeholder="When to take (e.g. morning)"
                  className="w-full px-3 py-2 rounded-lg border border-warm-200 bg-white text-warm-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300"
                />
              </div>
            </div>
          ))}
          <button
            onClick={addMedication}
            className="text-sm text-primary-600 hover:text-primary-700 font-medium print:hidden"
          >
            + Add another medication
          </button>
        </div>
      </AccordionSection>

      {/* Allergies */}
      <AccordionSection
        id="allergies"
        emoji="⚠️"
        title="My Allergies"
        summary={allergiesSummary}
        isExpanded={expandedSections.has('allergies')}
        onToggle={() => toggleSection('allergies')}
        hasData={hasAllergiesData}
      >
        <div className="space-y-2">
          {data.allergies.map((allergy, idx) => (
            <input
              key={idx}
              type="text"
              value={allergy}
              onChange={(e) => updateAllergy(idx, e.target.value)}
              placeholder={idx === 0 ? "e.g. Penicillin, Nuts..." : "Another allergy..."}
              className="w-full px-4 py-2 rounded-xl border border-warm-200 bg-warm-50/50 text-warm-800 focus:outline-none focus:ring-2 focus:ring-primary-300"
            />
          ))}
          <button
            onClick={addAllergy}
            className="text-sm text-primary-600 hover:text-primary-700 font-medium print:hidden"
          >
            + Add another allergy
          </button>
        </div>
      </AccordionSection>

      {/* Appointment Preferences */}
      <AccordionSection
        id="preferences"
        emoji="🤝"
        title="Things That Help Me at Appointments"
        summary={preferencesSummary}
        isExpanded={expandedSections.has('preferences')}
        onToggle={() => toggleSection('preferences')}
        hasData={hasPreferencesData}
      >
        <p className="text-sm text-warm-500 mb-4">Select any that apply to you:</p>

        <div className="space-y-2">
          {defaultAppointmentPreferences.map((pref) => (
            <button
              key={pref}
              onClick={() => togglePreference(pref)}
              className={`w-full text-left px-4 py-3 rounded-xl border transition-all print:py-1 ${
                data.appointmentPreferences.includes(pref)
                  ? 'border-primary-300 bg-primary-50 text-primary-700'
                  : 'border-warm-200 bg-warm-50 text-warm-700 hover:border-primary-200'
              }`}
            >
              <span className="mr-2">{data.appointmentPreferences.includes(pref) ? '✓' : '○'}</span>
              {pref}
            </button>
          ))}
        </div>

        <div className="mt-4">
          <label htmlFor="cp-custom-pref" className="block text-sm font-medium text-warm-700 mb-1">
            Anything else?
          </label>
          <input
            id="cp-custom-pref"
            type="text"
            value={data.customPreference}
            onChange={(e) => updateField('customPreference', e.target.value)}
            placeholder="Add your own preference..."
            className="w-full px-4 py-2 rounded-xl border border-warm-200 bg-warm-50/50 text-warm-800 focus:outline-none focus:ring-2 focus:ring-primary-300"
          />
        </div>
      </AccordionSection>

      {/* Emergency Contact */}
      <AccordionSection
        id="emergency"
        emoji="📞"
        title="Emergency Contact"
        summary={emergencySummary}
        isExpanded={expandedSections.has('emergency')}
        onToggle={() => toggleSection('emergency')}
        hasData={!!hasEmergencyData}
      >
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label htmlFor="ec-name" className="block text-sm font-medium text-warm-700 mb-1">Name</label>
            <input
              id="ec-name"
              type="text"
              value={data.emergencyContact.name}
              onChange={(e) => updateField('emergencyContact', { ...data.emergencyContact, name: e.target.value })}
              placeholder="Contact name"
              className="w-full px-4 py-2 rounded-xl border border-warm-200 bg-warm-50/50 text-warm-800 focus:outline-none focus:ring-2 focus:ring-primary-300"
            />
          </div>
          <div>
            <label htmlFor="ec-rel" className="block text-sm font-medium text-warm-700 mb-1">Relationship</label>
            <input
              id="ec-rel"
              type="text"
              value={data.emergencyContact.relationship}
              onChange={(e) => updateField('emergencyContact', { ...data.emergencyContact, relationship: e.target.value })}
              placeholder="e.g. Mum, Dad, Carer"
              className="w-full px-4 py-2 rounded-xl border border-warm-200 bg-warm-50/50 text-warm-800 focus:outline-none focus:ring-2 focus:ring-primary-300"
            />
          </div>
          <div>
            <label htmlFor="ec-phone" className="block text-sm font-medium text-warm-700 mb-1">Phone</label>
            <input
              id="ec-phone"
              type="tel"
              value={data.emergencyContact.phone}
              onChange={(e) => updateField('emergencyContact', { ...data.emergencyContact, phone: e.target.value })}
              placeholder="Phone number"
              className="w-full px-4 py-2 rounded-xl border border-warm-200 bg-warm-50/50 text-warm-800 focus:outline-none focus:ring-2 focus:ring-primary-300"
            />
          </div>
        </div>
      </AccordionSection>

      {/* Health Goals */}
      <AccordionSection
        id="goals"
        emoji="🎯"
        title="My Health Goals"
        summary={goalsSummary}
        isExpanded={expandedSections.has('goals')}
        onToggle={() => toggleSection('goals')}
        hasData={hasGoalsData}
      >
        <p className="text-sm text-warm-500 mb-4">What do you want to achieve with your health?</p>

        <div className="space-y-3">
          {data.healthGoals.map((goal, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-accent-100 to-accent-200 flex items-center justify-center text-sm font-bold text-accent-700">
                {idx + 1}
              </span>
              <input
                type="text"
                value={goal}
                onChange={(e) => updateGoal(idx, e.target.value)}
                placeholder={
                  idx === 0 ? "e.g. Feel more confident at appointments" :
                  idx === 1 ? "e.g. Manage my medicines myself" :
                  "e.g. Understand my condition better"
                }
                className="flex-1 px-4 py-2 rounded-xl border border-warm-200 bg-warm-50/50 text-warm-800 focus:outline-none focus:ring-2 focus:ring-primary-300"
              />
            </div>
          ))}
        </div>
      </AccordionSection>

      {/* Additional Notes */}
      <AccordionSection
        id="notes"
        emoji="📝"
        title="Additional Notes"
        summary={notesSummary}
        isExpanded={expandedSections.has('notes')}
        onToggle={() => toggleSection('notes')}
        hasData={hasNotesData}
      >
        <textarea
          value={data.additionalNotes}
          onChange={(e) => updateField('additionalNotes', e.target.value)}
          placeholder="Anything else your care team should know about you..."
          rows={4}
          className="w-full px-4 py-2 rounded-xl border border-warm-200 bg-warm-50/50 text-warm-800 focus:outline-none focus:ring-2 focus:ring-primary-300 resize-none"
        />
      </AccordionSection>

      {/* Print Button (bottom) */}
      <div className="flex justify-center print:hidden">
        <button
          onClick={handlePrint}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all flex items-center gap-2"
        >
          <span>🖨️</span>
          <span>Print My Care Plan</span>
        </button>
      </div>

      {/* Last updated */}
      {data.lastUpdated && (
        <p className="text-center text-xs text-warm-400 print:hidden">
          Last saved: {new Date(data.lastUpdated).toLocaleString()}
        </p>
      )}
    </div>
  )
}
