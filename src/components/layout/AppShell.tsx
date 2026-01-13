import type { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import { Search } from './Search'
import { Notifications } from './Notifications'

interface AppShellProps {
  children: ReactNode
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-background text-warm-800 flex">
      {/* Sidebar - warm and welcoming */}
      <aside className="hidden md:flex w-64 flex-col border-r border-warm-200 bg-white/80 backdrop-blur-sm">
        <div className="h-16 flex items-center px-5 border-b border-warm-100">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-400 to-primary-500 text-sm font-bold text-white shadow-card">
            TC
          </span>
          <div className="ml-3 leading-tight">
            <p className="text-sm font-semibold text-warm-800">Transition Care</p>
            <p className="text-xs text-warm-500">Your move to adult care</p>
          </div>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1 text-sm">
          <NavItem to="/" label="Home" icon="🏠" />
          <NavItem to="/journey" label="My journey" icon="🚀" />
          <NavItem to="/rights" label="Know your rights" icon="⚖️" />
          <NavItem to="/money" label="Money & PIP" icon="💰" />
          <NavItem to="/planning" label="Planning tools" icon="📝" />
          <NavItem to="/videos" label="Videos & stories" icon="🎬" />
          <NavItem to="/resources" label="Resources" icon="📚" />
        </nav>
        <div className="px-4 py-4 text-xs text-warm-400 border-t border-warm-100">
          <p>This app gives general information for the UK. It does not replace medical or legal advice.</p>
        </div>
      </aside>

      <div className="flex-1 flex flex-col">
        {/* Header - clean and friendly */}
        <header className="h-16 flex items-center justify-between px-4 md:px-8 border-b border-warm-100 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
          <div className="flex items-center gap-2 md:hidden">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary-400 to-primary-500 text-xs font-bold text-white shadow-card">
              TC
            </span>
            <p className="text-sm font-semibold text-warm-800">Transition Care</p>
          </div>
          <div className="flex-1 flex items-center max-w-md ml-2 md:ml-0">
            <Search />
          </div>
          <div className="ml-3 flex items-center gap-3">
            <Notifications />
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-accent-400 to-accent-500 flex items-center justify-center text-xs font-bold text-white shadow-card">
              YP
            </div>
          </div>
        </header>

        <main className="flex-1 px-4 md:px-8 py-6 md:py-8 animate-fade-in">
          <div className="max-w-6xl mx-auto">{children}</div>
        </main>
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
