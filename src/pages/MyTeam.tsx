import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

interface TeamMember {
  id: string
  name: string
  role: string
  helpsWithWhat: string
  avatar: string
}

const STORAGE_KEY = 'transition-care-my-team'

const avatarOptions = ['👩‍⚕️', '👨‍⚕️', '👩‍🔬', '👨‍🔬', '🧑‍⚕️', '👩', '👨', '🧑', '👱‍♀️', '👱‍♂️', '👩‍🦰', '👨‍🦰', '👴', '👵', '🧓']

const roleExplanations = [
  {
    role: 'GP (General Practitioner)',
    emoji: '🏥',
    description: "Your GP is like your main doctor in the community. They're the first person you usually see when you're not feeling well, and they can send you to see specialists if needed. You might see them at your local health centre or surgery.",
    examples: ['Giving you prescriptions', "Checking how you're doing", 'Referring you to hospital']
  },
  {
    role: 'Hospital Doctor / Consultant',
    emoji: '👨‍⚕️',
    description: "A consultant is a doctor who knows a LOT about one particular thing - like hearts, lungs, or diabetes. They usually work at the hospital and see you for appointments about your specific condition.",
    examples: ['Being an expert on your condition', 'Making plans for your care', 'Doing special tests']
  },
  {
    role: 'Nurse / Specialist Nurse',
    emoji: '👩‍⚕️',
    description: "Nurses are brilliant! They help with your day-to-day care and often know you really well. Specialist nurses know lots about specific conditions and can give you advice and support between doctor appointments.",
    examples: ['Checking your health', 'Giving injections or medicines', 'Answering your questions']
  },
  {
    role: 'Therapist',
    emoji: '🤸',
    description: "Therapists help you move, communicate, or do everyday things better. There are different types: physios help with moving and exercises, occupational therapists (OTs) help with daily activities, and speech therapists help with talking and swallowing.",
    examples: ['Physio exercises', 'Help with handwriting', 'Speech practice']
  },
  {
    role: 'Pharmacist',
    emoji: '💊',
    description: "Pharmacists are medicine experts! They work at the pharmacy (chemist) and can answer questions about your medicines, check they're working well together, and give advice on minor health problems too.",
    examples: ['Explaining your medicines', 'Checking for side effects', 'Giving health advice']
  },
  {
    role: 'Receptionist / Admin Staff',
    emoji: '📞',
    description: "These are the friendly people who help everything run smoothly. They book your appointments, answer the phone, and help with letters and forms. They're often the first people you see when you arrive!",
    examples: ['Booking appointments', 'Answering phone calls', 'Helping with paperwork']
  }
]

function getStoredTeam(): TeamMember[] {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored) {
    try {
      return JSON.parse(stored)
    } catch {
      return []
    }
  }
  return []
}

function saveTeam(team: TeamMember[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(team))
}

export function MyTeam() {
  const [team, setTeam] = useState<TeamMember[]>([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [newMember, setNewMember] = useState<Omit<TeamMember, 'id'>>({
    name: '',
    role: '',
    helpsWithWhat: '',
    avatar: '👩‍⚕️'
  })
  const [saved, setSaved] = useState(false)
  const [expandedRole, setExpandedRole] = useState<string | null>(null)

  useEffect(() => {
    const stored = getStoredTeam()
    setTeam(stored)
  }, [])

  const handleAddMember = () => {
    if (!newMember.name.trim()) return

    const member: TeamMember = {
      id: Date.now().toString(),
      ...newMember
    }
    const updatedTeam = [...team, member]
    setTeam(updatedTeam)
    saveTeam(updatedTeam)
    setNewMember({ name: '', role: '', helpsWithWhat: '', avatar: '👩‍⚕️' })
    setShowAddForm(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const handleRemoveMember = (id: string) => {
    const updatedTeam = team.filter(m => m.id !== id)
    setTeam(updatedTeam)
    saveTeam(updatedTeam)
  }

  const toggleRoleExpand = (role: string) => {
    setExpandedRole(expandedRole === role ? null : role)
  }

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl">
      {/* Header */}
      <header className="space-y-3">
        <Link to="/journey" className="inline-flex items-center gap-2 text-sm text-warm-500 hover:text-primary-600 transition-colors">
          <span>←</span>
          <span>Back to My Journey</span>
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-3xl">👋</span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-warm-500">Ready Stage Activity</p>
            <h1 className="text-2xl md:text-3xl font-bold text-warm-800">Get to Know Your Team</h1>
          </div>
        </div>
      </header>

      {/* Introduction */}
      <section className="bg-gradient-to-br from-primary-50 to-white rounded-2xl border border-primary-100 p-5 shadow-card">
        <h2 className="text-lg font-semibold text-warm-800 mb-3">Who looks after your health? 🏥</h2>
        <p className="text-sm text-warm-600 leading-relaxed">
          Lots of different people might help look after you - doctors, nurses, therapists, and more!
          It's really useful to know who they are and what they do. That way, you know who to ask when you have questions.
        </p>
      </section>

      {/* Role Explanations */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-warm-800 flex items-center gap-2">
          <span>📖</span>
          <span>Who's who in healthcare?</span>
        </h2>
        <p className="text-sm text-warm-500">Click on each role to learn more about what they do!</p>

        <div className="grid gap-3 md:grid-cols-2">
          {roleExplanations.map((item) => (
            <button
              key={item.role}
              type="button"
              onClick={() => toggleRoleExpand(item.role)}
              className={`text-left rounded-2xl border p-4 transition-all duration-300 ${
                expandedRole === item.role
                  ? 'border-primary-300 bg-gradient-to-br from-primary-50 to-white shadow-card-hover'
                  : 'border-warm-200 bg-white hover:border-primary-200 hover:shadow-card'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{item.emoji}</span>
                <span className="font-semibold text-warm-800">{item.role}</span>
                <span className={`ml-auto text-warm-400 transition-transform duration-200 ${expandedRole === item.role ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </div>

              {expandedRole === item.role && (
                <div className="mt-4 space-y-3 animate-fade-in">
                  <p className="text-sm text-warm-600 leading-relaxed">{item.description}</p>
                  <div className="text-sm">
                    <p className="font-medium text-warm-700 mb-1">They help with things like:</p>
                    <ul className="space-y-1">
                      {item.examples.map((example, i) => (
                        <li key={i} className="flex items-center gap-2 text-warm-600">
                          <span className="text-primary-500">•</span>
                          <span>{example}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* My Team Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-warm-800 flex items-center gap-2">
            <span>⭐</span>
            <span>My Care Team</span>
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
            <h3 className="font-semibold text-warm-800">Add someone to your team</h3>

            {/* Avatar Selection */}
            <div>
              <label className="block text-sm font-medium text-warm-700 mb-2">Pick an avatar:</label>
              <div className="flex flex-wrap gap-2">
                {avatarOptions.map((avatar) => (
                  <button
                    key={avatar}
                    type="button"
                    onClick={() => setNewMember({ ...newMember, avatar })}
                    className={`w-10 h-10 rounded-full text-xl flex items-center justify-center transition-all ${
                      newMember.avatar === avatar
                        ? 'bg-primary-100 ring-2 ring-primary-400 scale-110'
                        : 'bg-warm-100 hover:bg-warm-200'
                    }`}
                  >
                    {avatar}
                  </button>
                ))}
              </div>
            </div>

            {/* Name */}
            <div>
              <label htmlFor="member-name" className="block text-sm font-medium text-warm-700 mb-1">Their name:</label>
              <input
                id="member-name"
                type="text"
                value={newMember.name}
                onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                placeholder="e.g. Dr. Smith, Nurse Sarah..."
                className="w-full px-4 py-2 rounded-xl border border-warm-200 bg-white text-warm-800 placeholder:text-warm-400 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all"
              />
            </div>

            {/* Role */}
            <div>
              <label htmlFor="member-role" className="block text-sm font-medium text-warm-700 mb-1">What's their job?</label>
              <select
                id="member-role"
                value={newMember.role}
                onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                className="w-full px-4 py-2 rounded-xl border border-warm-200 bg-white text-warm-800 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all"
              >
                <option value="">Select a role...</option>
                <option value="GP">GP</option>
                <option value="Hospital Doctor / Consultant">Hospital Doctor / Consultant</option>
                <option value="Nurse">Nurse</option>
                <option value="Specialist Nurse">Specialist Nurse</option>
                <option value="Physiotherapist">Physiotherapist</option>
                <option value="Occupational Therapist">Occupational Therapist</option>
                <option value="Speech Therapist">Speech Therapist</option>
                <option value="Pharmacist">Pharmacist</option>
                <option value="Receptionist">Receptionist</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* What they help with */}
            <div>
              <label htmlFor="member-helps" className="block text-sm font-medium text-warm-700 mb-1">What do they help you with?</label>
              <input
                id="member-helps"
                type="text"
                value={newMember.helpsWithWhat}
                onChange={(e) => setNewMember({ ...newMember, helpsWithWhat: e.target.value })}
                placeholder="e.g. My diabetes check-ups, my exercises..."
                className="w-full px-4 py-2 rounded-xl border border-warm-200 bg-white text-warm-800 placeholder:text-warm-400 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={handleAddMember}
                disabled={!newMember.name.trim()}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold shadow-card hover:shadow-card-hover transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <span>✓</span>
                <span>Add to Team</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false)
                  setNewMember({ name: '', role: '', helpsWithWhat: '', avatar: '👩‍⚕️' })
                }}
                className="px-5 py-2 rounded-xl border border-warm-200 text-warm-600 font-medium hover:border-warm-300 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Team Members Grid */}
        {team.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
                  <span className="text-4xl">{member.avatar}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-warm-800 truncate">{member.name}</p>
                    <p className="text-sm text-primary-600 font-medium">{member.role}</p>
                    {member.helpsWithWhat && (
                      <p className="mt-2 text-sm text-warm-500">{member.helpsWithWhat}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-warm-50 rounded-2xl border border-warm-200 border-dashed p-8 text-center">
            <span className="text-4xl">👥</span>
            <p className="mt-3 text-warm-600 font-medium">Your team is empty!</p>
            <p className="text-sm text-warm-500 mt-1">
              Click "Add Team Member" to start adding the people who help look after you.
            </p>
          </div>
        )}

        {/* Save Confirmation */}
        {saved && (
          <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 border border-green-200 rounded-xl px-4 py-3 animate-fade-in">
            <span>✓</span>
            <span>Team member added and saved!</span>
          </div>
        )}
      </section>

      {/* Tips Section */}
      <section className="bg-gradient-to-br from-accent-50 to-white rounded-2xl border border-accent-100 p-5">
        <div className="flex items-start gap-3">
          <span className="text-2xl">💡</span>
          <div className="text-sm text-warm-600 space-y-2">
            <p className="font-semibold text-warm-800">Top tip!</p>
            <p>
              Next time you go to an appointment, try to remember one person's name.
              You could ask them "What's your name?" or "What do you do?" - they'll be happy you asked!
            </p>
            <p>
              You can add them to your team here afterwards so you don't forget.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
