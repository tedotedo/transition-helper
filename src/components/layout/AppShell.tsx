import { useState, type ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Search } from './Search'
import { useRole } from '../../hooks'
import { CompactRoleToggle } from '../home/CompactRoleToggle'
import { FeedbackButton } from './FeedbackButton'
import { LanguageSwitcher, LanguageSwitcherCompact } from './LanguageSwitcher'

interface AppShellProps {
  children: ReactNode
}

export function AppShell({ children }: AppShellProps) {
  const [moreMenuOpen, setMoreMenuOpen] = useState(false)
  const { role, setRole, isYoungPerson } = useRole()
  const { t } = useTranslation()

  // Close more menu when route changes
  const closeMoreMenu = () => setMoreMenuOpen(false)

  return (
    <div className={`min-h-screen text-warm-800 flex ${isYoungPerson ? 'young-person-gradient' : 'bg-background'}`}>
      {/* Sidebar - desktop only */}
      <aside className="hidden md:flex w-64 flex-col border-r border-warm-200 bg-white/80 backdrop-blur-sm">
        <div className="h-16 flex items-center px-5 border-b border-warm-100">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-400 to-primary-500 text-sm font-bold text-white shadow-card">
            TC
          </span>
          <div className="ml-3 leading-tight">
            <p className="text-sm font-semibold text-warm-800">{t('home.welcome', 'Transition Ready')}</p>
            <p className="text-xs text-warm-500">{t('home.tagline')}</p>
          </div>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1 text-sm">
          <NavItem to="/" label={t('nav.home')} icon="🏠" />
          <NavItem to="/journey" label={t('nav.journey')} icon="🚀" />
          <NavItem to="/rights" label={t('nav.rights')} icon="⚖️" />
          <NavItem to="/money" label="Money & PIP" icon="💰" />
          <NavItem to="/planning" label="Planning tools" icon="📝" />
          <NavItem to="/videos" label={t('nav.videos')} icon="🎬" />
          <NavItem to="/resources" label={t('nav.resources')} icon="📚" />
          <NavItem to="/level-up" label={t('nav.levelUp')} icon="🎮" />
          <NavItem to="/about" label={t('nav.about')} icon="ℹ️" />
        </nav>
        {/* Language switcher in sidebar */}
        <div className="px-4 py-3 border-t border-warm-100">
          <p className="text-xs text-warm-500 mb-2">{t('language.select')}:</p>
          <LanguageSwitcher />
        </div>
        {/* Role toggle in sidebar */}
        <div className="px-4 py-3 border-t border-warm-100">
          <p className="text-xs text-warm-500 mb-2">{t('role.viewingAs')}</p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setRole('young-person')}
              className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                isYoungPerson
                  ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-sm'
                  : 'bg-warm-50 text-warm-600 hover:bg-warm-100'
              }`}
            >
              <span>🧑</span>
              <span>{t('role.youngPerson')}</span>
            </button>
            <button
              onClick={() => setRole('parent-carer')}
              className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                !isYoungPerson
                  ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-sm'
                  : 'bg-warm-50 text-warm-600 hover:bg-warm-100'
              }`}
            >
              <span>👨‍👩‍👧</span>
              <span>{t('role.parentCarer')}</span>
            </button>
          </div>
        </div>
        <div className="px-4 py-4 text-xs border-t border-warm-100 space-y-3">
          <p className="text-warm-500">{t('footer.disclaimer')}</p>
          <p className="text-warm-500">{t('footer.attribution')}</p>
          <NavLink to="/privacy" className="text-warm-500 hover:text-primary-600 underline transition-colors">
            {t('footer.privacyLink')}
          </NavLink>
        </div>
      </aside>

      <div className="flex-1 flex flex-col">
        {/* Header - desktop only */}
        <header className="hidden md:flex h-16 items-center justify-between px-8 border-b border-warm-100 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
          <div className="flex-1 flex items-center max-w-md">
            <Search />
          </div>
          <div className="ml-3 flex items-center gap-4">
            <CompactRoleToggle value={role} onChange={setRole} />
            <div className={`h-9 w-9 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-card ${
              isYoungPerson
                ? 'bg-gradient-to-br from-accent-400 to-accent-500'
                : 'bg-gradient-to-br from-primary-400 to-primary-500'
            }`}>
              {isYoungPerson ? 'YP' : 'PC'}
            </div>
          </div>
        </header>

        <main className="flex-1 px-4 md:px-8 py-4 md:py-8 pb-20 md:pb-8 animate-fade-in">
          <div className="max-w-6xl mx-auto">{children}</div>
        </main>

        {/* Bottom Navigation - Mobile only */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-warm-200 px-2 py-2 z-20">
          <div className="flex items-center justify-around">
            <BottomNavItem to="/" icon="🏠" label={t('nav.home')} />
            <BottomNavItem to="/checklist" icon="✅" label={t('nav.checklist')} />
            <BottomNavItem to="/care-plan" icon="📋" label={t('nav.carePlan')} />
            <BottomNavItem to="/care-team" icon="👥" label={t('nav.careTeam')} />
            <button
              onClick={() => setMoreMenuOpen(!moreMenuOpen)}
              className={`flex flex-col items-center justify-center px-3 py-1 rounded-xl transition-all ${
                moreMenuOpen ? 'text-primary-600' : 'text-warm-500'
              }`}
            >
              <span className="text-xl">☰</span>
              <span className="text-[10px] mt-0.5 font-medium">{t('nav.more')}</span>
            </button>
          </div>

          {/* More menu overlay */}
          {moreMenuOpen && (
            <>
              <div
                className="fixed inset-0 bg-black/20 z-10"
                onClick={closeMoreMenu}
              />
              <div className="absolute bottom-full left-0 right-0 bg-white border-t border-warm-200 rounded-t-2xl shadow-lg z-20 p-4 mb-0">
                {/* Language switcher for mobile */}
                <div className="mb-3 pb-3 border-b border-warm-100 flex justify-center">
                  <LanguageSwitcherCompact />
                </div>
                {/* Role toggle for mobile */}
                <div className="mb-4 pb-3 border-b border-warm-100">
                  <p className="text-xs text-warm-500 mb-2 text-center">{t('role.viewingAs')}</p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => { setRole('young-person'); closeMoreMenu(); }}
                      className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                        isYoungPerson
                          ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-sm'
                          : 'bg-warm-50 text-warm-600'
                      }`}
                    >
                      <span>🧑</span>
                      <span>{t('role.youngPerson')}</span>
                    </button>
                    <button
                      onClick={() => { setRole('parent-carer'); closeMoreMenu(); }}
                      className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                        !isYoungPerson
                          ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-sm'
                          : 'bg-warm-50 text-warm-600'
                      }`}
                    >
                      <span>👨‍👩‍👧</span>
                      <span>{t('role.parentCarer')}</span>
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 pb-16">
                  <MoreMenuItem to="/journey" icon="🚀" label={t('nav.journey')} onClick={closeMoreMenu} />
                  <MoreMenuItem to="/rights" icon="⚖️" label={t('nav.rights')} onClick={closeMoreMenu} />
                  <MoreMenuItem to="/money" icon="💰" label="Money & PIP" onClick={closeMoreMenu} />
                  <MoreMenuItem to="/appointments" icon="📅" label={t('nav.appointments')} onClick={closeMoreMenu} />
                  <MoreMenuItem to="/videos" icon="🎬" label={t('nav.videos')} onClick={closeMoreMenu} />
                  <MoreMenuItem to="/resources" icon="📚" label={t('nav.resources')} onClick={closeMoreMenu} />
                  <MoreMenuItem to="/level-up" icon="🎮" label={t('nav.levelUp')} onClick={closeMoreMenu} />
                  <MoreMenuItem to="/about" icon="ℹ️" label={t('nav.about')} onClick={closeMoreMenu} />
                  <MoreMenuItem to="/install" icon="📲" label={t('nav.install')} onClick={closeMoreMenu} />
                  <MoreMenuItem to="/privacy" icon="🔒" label={t('nav.privacy')} onClick={closeMoreMenu} />
                </div>
              </div>
            </>
          )}
        </nav>

        {/* Floating Feedback Button */}
        <FeedbackButton />
      </div>
    </div>
  )
}

interface NavItemProps {
  to: string
  label: string
  icon?: string
  disabled?: boolean
}

function NavItem({ to, label, icon, disabled }: NavItemProps) {
  if (disabled) {
    return (
      <div className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-warm-400 cursor-not-allowed">
        <span className="text-base opacity-50">{icon}</span>
        <span>{label}</span>
        <span className="ml-auto text-[0.6rem] font-medium uppercase tracking-wider bg-warm-100 text-warm-500 px-2 py-0.5 rounded-full">Soon</span>
      </div>
    )
  }

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          'flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-200',
          isActive
            ? 'bg-gradient-to-r from-primary-50 to-primary-100/50 text-primary-700 font-medium shadow-sm border border-primary-100'
            : 'text-warm-600 hover:bg-warm-50 hover:text-warm-800',
        ].join(' ')
      }
    >
      <span className="text-base">{icon}</span>
      <span>{label}</span>
    </NavLink>
  )
}

// Bottom navigation item for mobile
interface BottomNavItemProps {
  to: string
  icon: string
  label: string
}

function BottomNavItem({ to, icon, label }: BottomNavItemProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex flex-col items-center justify-center px-3 py-1 rounded-xl transition-all ${
          isActive
            ? 'text-primary-600'
            : 'text-warm-500'
        }`
      }
    >
      <span className="text-xl">{icon}</span>
      <span className="text-[10px] mt-0.5 font-medium">{label}</span>
    </NavLink>
  )
}

// More menu item for the expanded menu
interface MoreMenuItemProps {
  to: string
  icon: string
  label: string
  onClick: () => void
}

function MoreMenuItem({ to, icon, label, onClick }: MoreMenuItemProps) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className="flex flex-col items-center justify-center p-3 rounded-xl bg-warm-50 hover:bg-primary-50 transition-all"
    >
      <span className="text-2xl">{icon}</span>
      <span className="text-xs mt-1 font-medium text-warm-700">{label}</span>
    </NavLink>
  )
}
