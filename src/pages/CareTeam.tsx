import { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useLocalStorage } from '../hooks'

interface TeamMember {
  id: string
  name: string
  role: string
  workplace: string
  contactInfo: string
  whatTheyHelpWith: string
  notes: string
}

interface CareTeamData {
  teamMembers: TeamMember[]
  lastUpdated?: string
}

export const CARE_TEAM_STORAGE_KEY = 'transition-care-team'

// Role keys for translation lookup
const roleKeys = [
  'gp',
  'consultant',
  'specialistNurse',
  'practiceNurse',
  'transitionCoordinator',
  'physio',
  'ot',
  'speechTherapist',
  'psychologist',
  'socialWorker',
  'pharmacist',
  'dietitian',
  'careCoordinator',
  'admin',
  'other'
]

// Role emojis (static, don't need translation)
const roleEmojis: Record<string, string> = {
  gp: '🏥',
  consultant: '👨‍⚕️',
  specialistNurse: '👩‍⚕️',
  practiceNurse: '👩‍⚕️',
  transitionCoordinator: '🌉',
  physio: '🤸',
  ot: '🧩',
  speechTherapist: '🗣️',
  psychologist: '💭',
  socialWorker: '🤝',
  pharmacist: '💊',
  dietitian: '🥗',
  careCoordinator: '📋',
  admin: '📞',
  other: '👤'
}

// Roles with descriptions
const rolesWithDescriptions = ['gp', 'consultant', 'specialistNurse', 'transitionCoordinator', 'physio', 'psychologist', 'socialWorker', 'pharmacist']

const initialData: CareTeamData = {
  teamMembers: []
}

export function CareTeam() {
  const { t } = useTranslation()
  const [data, setData] = useLocalStorage<CareTeamData>(CARE_TEAM_STORAGE_KEY, initialData)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [newMember, setNewMember] = useState<Omit<TeamMember, 'id'>>({
    name: '',
    role: '',
    workplace: '',
    contactInfo: '',
    whatTheyHelpWith: '',
    notes: ''
  })

  const { teamMembers } = data

  const handleAddMember = useCallback(() => {
    if (!newMember.name.trim()) return

    const member: TeamMember = {
      id: Date.now().toString(),
      ...newMember
    }

    setData(prev => ({
      ...prev,
      teamMembers: [...prev.teamMembers, member],
      lastUpdated: new Date().toISOString()
    }))

    setNewMember({
      name: '',
      role: '',
      workplace: '',
      contactInfo: '',
      whatTheyHelpWith: '',
      notes: ''
    })
    setShowAddForm(false)
  }, [newMember, setData])

  const handleUpdateMember = useCallback((id: string, updates: Partial<TeamMember>) => {
    setData(prev => ({
      ...prev,
      teamMembers: prev.teamMembers.map(m =>
        m.id === id ? { ...m, ...updates } : m
      ),
      lastUpdated: new Date().toISOString()
    }))
  }, [setData])

  const handleDeleteMember = useCallback((id: string) => {
    setData(prev => ({
      ...prev,
      teamMembers: prev.teamMembers.filter(m => m.id !== id),
      lastUpdated: new Date().toISOString()
    }))
    setEditingId(null)
  }, [setData])

  const updateNewMemberField = <K extends keyof typeof newMember>(
    field: K,
    value: typeof newMember[K]
  ) => {
    setNewMember(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="space-y-6 animate-fade-in max-w-3xl">
      {/* Header */}
      <header className="space-y-3">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-warm-500 hover:text-primary-600 transition-colors">
          <span>←</span>
          <span>{t('buttons.backToHome')}</span>
        </Link>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">👥</span>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-warm-800">{t('careTeam.title')}</h1>
              <p className="text-sm text-warm-500">
                {t('careTeam.teamMemberCount', { count: teamMembers.length })}
              </p>
            </div>
          </div>
          {!showAddForm && (
            <button
              onClick={() => setShowAddForm(true)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white text-sm font-semibold shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all"
            >
              + {t('careTeam.add')}
            </button>
          )}
        </div>
      </header>

      {/* Learn about roles link */}
      <div className="bg-gradient-to-br from-primary-50 to-white rounded-2xl border border-primary-100 p-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">📖</span>
          <div className="flex-1">
            <p className="font-medium text-warm-800">{t('careTeam.learnRoles')}</p>
            <p className="text-sm text-warm-600">{t('careTeam.learnRolesDesc')}</p>
          </div>
          <Link
            to="/journey/my-team"
            className="px-4 py-2 rounded-xl bg-white border border-primary-200 text-primary-600 text-sm font-medium hover:bg-primary-50 transition-all"
          >
            {t('buttons.learnMore')} →
          </Link>
        </div>
      </div>

      {/* Add Team Member Form */}
      {showAddForm && (
        <section className="bg-gradient-to-br from-accent-50 to-white rounded-2xl border border-accent-200 p-5 shadow-card space-y-4">
          <h2 className="font-semibold text-warm-800 flex items-center gap-2">
            <span>➕</span>
            <span>{t('careTeam.add')}</span>
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="tm-name" className="block text-sm font-medium text-warm-700 mb-1">
                {t('careTeam.nameRequired')}
              </label>
              <input
                id="tm-name"
                type="text"
                value={newMember.name}
                onChange={(e) => updateNewMemberField('name', e.target.value)}
                placeholder={t('careTeam.namePlaceholder')}
                className="w-full px-4 py-2 rounded-xl border border-warm-200 bg-white text-warm-800 placeholder:text-warm-400 focus:outline-none focus:ring-2 focus:ring-primary-300"
              />
            </div>
            <div>
              <label htmlFor="tm-role" className="block text-sm font-medium text-warm-700 mb-1">
                {t('careTeam.role')}
              </label>
              <select
                id="tm-role"
                value={newMember.role}
                onChange={(e) => updateNewMemberField('role', e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-warm-200 bg-white text-warm-800 focus:outline-none focus:ring-2 focus:ring-primary-300"
              >
                <option value="">{t('careTeam.selectRole')}</option>
                {roleKeys.map(roleKey => (
                  <option key={roleKey} value={roleKey}>{t(`careTeam.roles.${roleKey}`)}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="tm-workplace" className="block text-sm font-medium text-warm-700 mb-1">
                {t('careTeam.workplace')}
              </label>
              <input
                id="tm-workplace"
                type="text"
                value={newMember.workplace}
                onChange={(e) => updateNewMemberField('workplace', e.target.value)}
                placeholder={t('careTeam.workplacePlaceholder')}
                className="w-full px-4 py-2 rounded-xl border border-warm-200 bg-white text-warm-800 placeholder:text-warm-400 focus:outline-none focus:ring-2 focus:ring-primary-300"
              />
            </div>
            <div>
              <label htmlFor="tm-contact" className="block text-sm font-medium text-warm-700 mb-1">
                {t('careTeam.contactInfo')}
              </label>
              <input
                id="tm-contact"
                type="text"
                value={newMember.contactInfo}
                onChange={(e) => updateNewMemberField('contactInfo', e.target.value)}
                placeholder={t('careTeam.contactPlaceholder')}
                className="w-full px-4 py-2 rounded-xl border border-warm-200 bg-white text-warm-800 placeholder:text-warm-400 focus:outline-none focus:ring-2 focus:ring-primary-300"
              />
            </div>
          </div>

          <div>
            <label htmlFor="tm-helps" className="block text-sm font-medium text-warm-700 mb-1">
              {t('careTeam.whatTheyHelpWith')}
            </label>
            <input
              id="tm-helps"
              type="text"
              value={newMember.whatTheyHelpWith}
              onChange={(e) => updateNewMemberField('whatTheyHelpWith', e.target.value)}
              placeholder={t('careTeam.helpsPlaceholder')}
              className="w-full px-4 py-2 rounded-xl border border-warm-200 bg-white text-warm-800 placeholder:text-warm-400 focus:outline-none focus:ring-2 focus:ring-primary-300"
            />
          </div>

          <div>
            <label htmlFor="tm-notes" className="block text-sm font-medium text-warm-700 mb-1">
              {t('careTeam.notes')}
            </label>
            <textarea
              id="tm-notes"
              value={newMember.notes}
              onChange={(e) => updateNewMemberField('notes', e.target.value)}
              placeholder={t('careTeam.notesPlaceholder')}
              rows={2}
              className="w-full px-4 py-2 rounded-xl border border-warm-200 bg-white text-warm-800 placeholder:text-warm-400 focus:outline-none focus:ring-2 focus:ring-primary-300 resize-none"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={handleAddMember}
              disabled={!newMember.name.trim()}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold shadow-card hover:shadow-card-hover transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {t('careTeam.addToTeam')}
            </button>
            <button
              onClick={() => {
                setShowAddForm(false)
                setNewMember({
                  name: '',
                  role: '',
                  workplace: '',
                  contactInfo: '',
                  whatTheyHelpWith: '',
                  notes: ''
                })
              }}
              className="px-5 py-2 rounded-xl border border-warm-200 text-warm-600 font-medium hover:border-warm-300"
            >
              {t('buttons.cancel')}
            </button>
          </div>
        </section>
      )}

      {/* Team Members List */}
      {teamMembers.length === 0 ? (
        <div className="bg-warm-50 rounded-2xl border border-warm-200 border-dashed p-8 text-center">
          <span className="text-4xl">👥</span>
          <p className="mt-3 text-warm-600 font-medium">{t('careTeam.emptyTitle')}</p>
          <p className="text-sm text-warm-500 mt-1">
            {t('careTeam.emptyDescription')}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {teamMembers.map(member => (
            <TeamMemberCard
              key={member.id}
              member={member}
              isEditing={editingId === member.id}
              onToggleEdit={() => setEditingId(editingId === member.id ? null : member.id)}
              onUpdate={(updates) => handleUpdateMember(member.id, updates)}
              onDelete={() => handleDeleteMember(member.id)}
              roleKey={member.role}
            />
          ))}
        </div>
      )}

      {/* Tips */}
      <section className="bg-gradient-to-br from-accent-50 to-white rounded-2xl border border-accent-100 p-4">
        <div className="flex items-start gap-3">
          <span className="text-xl">💡</span>
          <div className="text-sm text-warm-600">
            <p className="font-semibold text-warm-800">{t('careTeam.tipTitle')}</p>
            <p>
              {t('careTeam.tipContent')}
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

interface TeamMemberCardProps {
  member: TeamMember
  isEditing: boolean
  onToggleEdit: () => void
  onUpdate: (updates: Partial<TeamMember>) => void
  onDelete: () => void
  roleKey: string
}

function TeamMemberCard({
  member,
  isEditing,
  onToggleEdit,
  onUpdate,
  onDelete,
  roleKey
}: TeamMemberCardProps) {
  const { t } = useTranslation()
  const emoji = roleEmojis[roleKey] || '👤'
  const hasDescription = rolesWithDescriptions.includes(roleKey)

  return (
    <div className="bg-white rounded-2xl border border-warm-200 p-4 shadow-card hover:shadow-card-hover transition-all">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-4 flex-1">
          <span className="text-3xl">{emoji}</span>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-warm-800">{member.name}</h3>
            {member.role && (
              <p className="text-sm text-primary-600 font-medium">{t(`careTeam.roles.${roleKey}`)}</p>
            )}
            {member.workplace && (
              <p className="text-sm text-warm-500">📍 {member.workplace}</p>
            )}
            {member.whatTheyHelpWith && (
              <p className="text-sm text-warm-600 mt-1">{member.whatTheyHelpWith}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={onToggleEdit}
            className="p-2 rounded-lg bg-warm-100 text-warm-500 hover:bg-primary-100 hover:text-primary-600 transition-all"
            title={t('buttons.edit')}
          >
            {isEditing ? '▲' : '▼'}
          </button>
          <button
            onClick={onDelete}
            className="p-2 rounded-lg bg-warm-100 text-warm-400 hover:bg-red-100 hover:text-red-500 transition-all"
            title={t('buttons.delete')}
          >
            ×
          </button>
        </div>
      </div>

      {isEditing && (
        <div className="mt-4 pt-4 border-t border-warm-200 space-y-3">
          {member.contactInfo && (
            <div>
              <p className="text-xs font-medium text-warm-500 mb-1">{t('careTeam.contactInfo')}</p>
              <input
                type="text"
                value={member.contactInfo}
                onChange={(e) => onUpdate({ contactInfo: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-warm-200 bg-warm-50/50 text-sm text-warm-700 focus:outline-none focus:ring-2 focus:ring-primary-300"
              />
            </div>
          )}
          {!member.contactInfo && (
            <div>
              <p className="text-xs font-medium text-warm-500 mb-1">{t('careTeam.addContact')}</p>
              <input
                type="text"
                placeholder={t('careTeam.phonePlaceholder')}
                onChange={(e) => onUpdate({ contactInfo: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-warm-200 bg-warm-50/50 text-sm text-warm-700 focus:outline-none focus:ring-2 focus:ring-primary-300"
              />
            </div>
          )}
          {member.notes && (
            <div>
              <p className="text-xs font-medium text-warm-500 mb-1">{t('careTeam.notes')}</p>
              <p className="text-sm text-warm-600 bg-warm-50 rounded-lg p-2">{member.notes}</p>
            </div>
          )}
          {hasDescription && (
            <div className="bg-primary-50 rounded-lg p-3">
              <p className="text-xs font-medium text-primary-700">{t('careTeam.aboutRole')}</p>
              <p className="text-sm text-primary-600">{t(`careTeam.roles.${roleKey}Desc`)}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// Export helper function for getting team count (used by Home page)
export function getCareTeamCount(): number {
  const stored = localStorage.getItem(CARE_TEAM_STORAGE_KEY)
  if (!stored) return 0

  try {
    const data: CareTeamData = JSON.parse(stored)
    return data.teamMembers.length
  } catch {
    return 0
  }
}
