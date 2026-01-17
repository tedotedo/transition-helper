import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

export type UserRole = 'young-person' | 'parent-carer'

const ROLE_STORAGE_KEY = 'transition-app-role'

interface RoleContextType {
  role: UserRole
  setRole: (value: UserRole) => void
  isYoungPerson: boolean
}

const RoleContext = createContext<RoleContextType | undefined>(undefined)

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<UserRole>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(ROLE_STORAGE_KEY)
      if (stored === 'young-person' || stored === 'parent-carer') return stored
    }
    return 'young-person'
  })

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole)
    localStorage.setItem(ROLE_STORAGE_KEY, newRole)
  }

  // Sync with localStorage changes from other tabs
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === ROLE_STORAGE_KEY && e.newValue) {
        if (e.newValue === 'young-person' || e.newValue === 'parent-carer') {
          setRoleState(e.newValue)
        }
      }
    }
    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  return (
    <RoleContext.Provider value={{ role, setRole, isYoungPerson: role === 'young-person' }}>
      {children}
    </RoleContext.Provider>
  )
}

export function useRole() {
  const context = useContext(RoleContext)
  if (context === undefined) {
    throw new Error('useRole must be used within a RoleProvider')
  }
  return context
}
