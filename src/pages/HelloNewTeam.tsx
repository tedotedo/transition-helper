import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

interface TeamMember {
  id: string
  name: string
  role: string
  contactInfo: string
  whenToContact: string
  notes: string
}

interface NewTeamData {
  team: TeamMember[]
  mainContactNumber: string
  emergencyNumber: string
  clinicAddress: string
  appointmentBooking: string
  prescriptionProcess: string
  notes: string
  lastUpdated: string
}

const STORAGE_KEY = 'transition-care-new-adult-team'

const roleOptions = [
  'Consultant / Specialist doctor',
  'Specialist nurse',
  'GP',
  'Practice nurse',
  'Care coordinator',
  'Social worker',
  'Physiotherapist',
  'Occupational therapist',
  'Psychologist / Counsellor',
  'Pharmacist',
  'Admin / Appointments',
  'Other'
]

function getStoredData(): NewTeamData | null {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored) {
    try {
      return JSON.parse(stored)
    } catch {
      return null
    }
  }
  return null
}

function saveData(data: NewTeamData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export function HelloNewTeam() {
  const [team, setTeam] = useState<TeamMember[]>([])
  const [mainContactNumber, setMainContactNumber] = useState('')
  const [emergencyNumber, setEmergencyNumber] = useState('')
  const [clinicAddress, setClinicAddress] = useState('')
  const [appointmentBooking, setAppointmentBooking] = useState('')
  const [prescriptionProcess, setPrescriptionProcess] = useState('')
  const [notes, setNotes] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)
  const [newMember, setNewMember] = useState({
    name: '',
    role: '',
    contactInfo: '',
    whenToContact: '',
    notes: ''
  })
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const stored = getStoredData()
    if (stored) {
      setTeam(stored.team || [])
      setMainContactNumber(stored.mainContactNumber || '')
      setEmergencyNumber(stored.emergencyNumber || '')
      setClinicAddress(stored.clinicAddress || '')
      setAppointmentBooking(stored.appointmentBooking || '')
      setPrescriptionProcess(stored.prescriptionProcess || '')
      setNotes(stored.notes || '')
    }
  }, [])

  const handleSave = () => {
    const data: NewTeamData = {
      team,
      mainContactNumber,
      emergencyNumber,
      clinicAddress,
      appointmentBooking,
      prescriptionProcess,
      notes,
      lastUpdated: new Date().toISOString()
    }
    saveData(data)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const handleAddMember = () => {
    if (!newMember.name.trim()) return

    const member: TeamMember = {
      id: Date.now().toString(),
      ...newMember
    }
    setTeam([...team, member])
    setNewMember({ name: '', role: '', contactInfo: '', whenToContact: '', notes: '' })
    setShowAddForm(false)
  }

  const handleRemoveMember = (id: string) => {
    setTeam(team.filter(m => m.id !== id))
  }

  return (
    <div className="space-y-8 animate-fade-in max-w-3xl">
      {/* Header */}
      <header className="space-y-3">
        <Link to="/journey" className="inline-flex items-center gap-2 text-sm text-warm-500 hover:text-primary-600 transition-colors">
          <span>←</span>
          <span>Back to My Journey</span>
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-3xl">🤝</span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-warm-500">Adult Stage Activity</p>
            <h1 className="text-2xl md:text-3xl font-bold text-warm-800">Say Hello to Your New Team</h1>
          </div>
        </div>
      </header>

      {/* Introduction */}
      <section className="bg-gradient-to-br from-primary-50 to-white rounded-2xl border border-primary-100 p-5 shadow-card">
        <h2 className="text-lg font-semibold text-warm-800 mb-3">Welcome to adult services! 🎉</h2>
        <div className="space-y-3 text-sm text-warm-600 leading-relaxed">
          <p>
            You've made it to adult care! Things work a bit differently here, so it's good to get to know your new team
            and how everything works.
          </p>
          <p>
            Use this page to keep track of who's who, how to contact them, and any important information about your new service.
          </p>
        </div>
      </section>

      {/* Key Differences */}
      <section className="bg-white rounded-2xl border border-warm-200 p-5 shadow-card">
        <h2 className="text-lg font-semibold text-warm-800 mb-4 flex items-center gap-2">
          <span>🔄</span>
          <span>How adult care is different</span>
        </h2>
        <div className="grid gap-3 md:grid-cols-2">
          {[
            { icon: '📧', title: 'More responsibility', desc: "You'll arrange your own appointments and chase things up yourself" },
            { icon: '🗣️', title: 'Direct communication', desc: 'Staff will talk to you directly, not through your parents' },
            { icon: '📅', title: 'Fewer appointments', desc: "You might be seen less often if you're stable" },
            { icon: '☎️', title: 'Different contacts', desc: "You'll have new phone numbers and possibly new locations" }
          ].map((item) => (
            <div key={item.title} className="flex gap-3 p-3 bg-warm-50 rounded-xl">
              <span className="text-xl">{item.icon}</span>
              <div>
                <p className="font-medium text-warm-800 text-sm">{item.title}</p>
                <p className="text-xs text-warm-500 mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Important Numbers */}
      <section className="bg-white rounded-2xl border border-warm-200 p-5 shadow-card">
        <h2 className="text-lg font-semibold text-warm-800 mb-4 flex items-center gap-2">
          <span>📞</span>
          <span>Important contact information</span>
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="main-contact" className="block text-sm font-medium text-warm-700 mb-1">
              Main contact number
            </label>
            <input
              id="main-contact"
              type="tel"
              value={mainContactNumber}
              onChange={(e) => setMainContactNumber(e.target.value)}
              placeholder="e.g. 020 1234 5678"
              className="w-full px-4 py-2 rounded-xl border border-warm-200 bg-warm-50/50 text-warm-800 placeholder:text-warm-400 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all"
            />
          </div>
          <div>
            <label htmlFor="emergency-number" className="block text-sm font-medium text-warm-700 mb-1">
              Emergency/out of hours number
            </label>
            <input
              id="emergency-number"
              type="tel"
              value={emergencyNumber}
              onChange={(e) => setEmergencyNumber(e.target.value)}
              placeholder="e.g. 111 or hospital switchboard"
              className="w-full px-4 py-2 rounded-xl border border-warm-200 bg-warm-50/50 text-warm-800 placeholder:text-warm-400 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all"
            />
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="clinic-address" className="block text-sm font-medium text-warm-700 mb-1">
            Clinic/hospital address
          </label>
          <input
            id="clinic-address"
            type="text"
            value={clinicAddress}
            onChange={(e) => setClinicAddress(e.target.value)}
            placeholder="e.g. Adult Diabetes Clinic, St Mary's Hospital, London W2 1NY"
            className="w-full px-4 py-2 rounded-xl border border-warm-200 bg-warm-50/50 text-warm-800 placeholder:text-warm-400 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all"
          />
        </div>
      </section>

      {/* My New Team */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-warm-800 flex items-center gap-2">
            <span>👥</span>
            <span>My New Team</span>
          </h2>
          {!showAddForm && (
            <button
              type="button"
              onClick={() => setShowAddForm(true)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white text-sm font-semibold shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2"
            >
              <span>+</span>
              <span>Add Team Member</span>
            </button>
          )}
        </div>

        {/* Add Form */}
        {showAddForm && (
          <div className="bg-gradient-to-br from-accent-50 to-white rounded-2xl border border-accent-200 p-5 space-y-4 animate-fade-in">
            <h3 className="font-semibold text-warm-800">Add someone to your new team</h3>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="member-name" className="block text-sm font-medium text-warm-700 mb-1">Name</label>
                <input
                  id="member-name"
                  type="text"
                  value={newMember.name}
                  onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                  placeholder="e.g. Dr. Jones, Nurse Emma"
                  className="w-full px-4 py-2 rounded-xl border border-warm-200 bg-white text-warm-800 placeholder:text-warm-400 focus:outline-none focus:ring-2 focus:ring-primary-300 transition-all"
                />
              </div>
              <div>
                <label htmlFor="member-role" className="block text-sm font-medium text-warm-700 mb-1">Role</label>
                <select
                  id="member-role"
                  value={newMember.role}
                  onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-warm-200 bg-white text-warm-800 focus:outline-none focus:ring-2 focus:ring-primary-300 transition-all"
                >
                  <option value="">Select role...</option>
                  {roleOptions.map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="member-contact" className="block text-sm font-medium text-warm-700 mb-1">Contact info</label>
              <input
                id="member-contact"
                type="text"
                value={newMember.contactInfo}
                onChange={(e) => setNewMember({ ...newMember, contactInfo: e.target.value })}
                placeholder="e.g. Via main clinic number, direct line, email"
                className="w-full px-4 py-2 rounded-xl border border-warm-200 bg-white text-warm-800 placeholder:text-warm-400 focus:outline-none focus:ring-2 focus:ring-primary-300 transition-all"
              />
            </div>

            <div>
              <label htmlFor="member-when" className="block text-sm font-medium text-warm-700 mb-1">When to contact them</label>
              <input
                id="member-when"
                type="text"
                value={newMember.whenToContact}
                onChange={(e) => setNewMember({ ...newMember, whenToContact: e.target.value })}
                placeholder="e.g. For medication queries, if blood results are abnormal"
                className="w-full px-4 py-2 rounded-xl border border-warm-200 bg-white text-warm-800 placeholder:text-warm-400 focus:outline-none focus:ring-2 focus:ring-primary-300 transition-all"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={handleAddMember}
                disabled={!newMember.name.trim()}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold shadow-card hover:shadow-card-hover transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add to Team
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false)
                  setNewMember({ name: '', role: '', contactInfo: '', whenToContact: '', notes: '' })
                }}
                className="px-5 py-2 rounded-xl border border-warm-200 text-warm-600 font-medium hover:border-warm-300 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Team List */}
        {team.length > 0 ? (
          <div className="grid gap-4">
            {team.map((member) => (
              <div
                key={member.id}
                className="relative bg-white rounded-2xl border border-warm-200 p-5 shadow-card hover:shadow-card-hover transition-all group"
              >
                <button
                  type="button"
                  onClick={() => handleRemoveMember(member.id)}
                  className="absolute top-3 right-3 w-7 h-7 rounded-full bg-warm-100 text-warm-400 hover:bg-red-100 hover:text-red-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                  aria-label={`Remove ${member.name}`}
                >
                  ×
                </button>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center text-xl flex-shrink-0">
                    👤
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-warm-800">{member.name}</p>
                    <p className="text-sm text-primary-600">{member.role}</p>
                    {member.contactInfo && (
                      <p className="mt-2 text-sm text-warm-500">📞 {member.contactInfo}</p>
                    )}
                    {member.whenToContact && (
                      <p className="text-sm text-warm-500">📋 {member.whenToContact}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-warm-50 rounded-2xl border border-warm-200 border-dashed p-8 text-center">
            <span className="text-4xl">👥</span>
            <p className="mt-3 text-warm-600 font-medium">No team members added yet</p>
            <p className="text-sm text-warm-500 mt-1">
              Start adding the people from your new adult team.
            </p>
          </div>
        )}
      </section>

      {/* How Things Work */}
      <section className="bg-white rounded-2xl border border-warm-200 p-5 shadow-card space-y-4">
        <h2 className="text-lg font-semibold text-warm-800 flex items-center gap-2">
          <span>⚙️</span>
          <span>How things work here</span>
        </h2>

        <div>
          <label htmlFor="appointment-booking" className="block text-sm font-medium text-warm-700 mb-1">
            How do I book/change appointments?
          </label>
          <textarea
            id="appointment-booking"
            value={appointmentBooking}
            onChange={(e) => setAppointmentBooking(e.target.value)}
            placeholder="e.g. Call the appointments line, use NHS app, email admin..."
            rows={2}
            className="w-full px-4 py-3 rounded-xl border border-warm-200 bg-warm-50/50 text-warm-800 placeholder:text-warm-400 focus:outline-none focus:ring-2 focus:ring-primary-300 transition-all resize-none"
          />
        </div>

        <div>
          <label htmlFor="prescription-process" className="block text-sm font-medium text-warm-700 mb-1">
            How do I order repeat prescriptions?
          </label>
          <textarea
            id="prescription-process"
            value={prescriptionProcess}
            onChange={(e) => setPrescriptionProcess(e.target.value)}
            placeholder="e.g. Request via GP, hospital pharmacy, online..."
            rows={2}
            className="w-full px-4 py-3 rounded-xl border border-warm-200 bg-warm-50/50 text-warm-800 placeholder:text-warm-400 focus:outline-none focus:ring-2 focus:ring-primary-300 transition-all resize-none"
          />
        </div>

        <div>
          <label htmlFor="general-notes" className="block text-sm font-medium text-warm-700 mb-1">
            Other useful notes
          </label>
          <textarea
            id="general-notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="e.g. Parking info, best times to call, patient portal login..."
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-warm-200 bg-warm-50/50 text-warm-800 placeholder:text-warm-400 focus:outline-none focus:ring-2 focus:ring-primary-300 transition-all resize-none"
          />
        </div>
      </section>

      {/* Save Button */}
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={handleSave}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2"
        >
          <span>💾</span>
          <span>Save Everything</span>
        </button>
      </div>

      {saved && (
        <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 border border-green-200 rounded-xl px-4 py-3 animate-fade-in">
          <span>✓</span>
          <span>Your information has been saved!</span>
        </div>
      )}

      {/* Tips */}
      <section className="bg-gradient-to-br from-accent-50 to-white rounded-2xl border border-accent-100 p-5">
        <div className="flex items-start gap-3">
          <span className="text-2xl">💡</span>
          <div className="text-sm text-warm-600 space-y-2">
            <p className="font-semibold text-warm-800">Top tips for adult care</p>
            <ul className="space-y-1">
              <li>• Save these numbers in your phone</li>
              <li>• Don't be afraid to call if you're unsure about something</li>
              <li>• Keep a list of your conditions and medicines on your phone</li>
              <li>• Sign up for the NHS app if you haven't already</li>
              <li>• Ask about patient portals where you can see test results</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
