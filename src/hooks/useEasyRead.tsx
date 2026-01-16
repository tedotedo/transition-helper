import { createContext, useContext, type ReactNode } from 'react'
import { useLocalStorage } from './useLocalStorage'

interface EasyReadContextType {
  easyRead: boolean
  setEasyRead: (value: boolean) => void
  toggleEasyRead: () => void
}

const EasyReadContext = createContext<EasyReadContextType | undefined>(undefined)

export function EasyReadProvider({ children }: { children: ReactNode }) {
  const [easyRead, setEasyRead] = useLocalStorage<boolean>('transition-easy-read', false)

  const toggleEasyRead = () => setEasyRead(!easyRead)

  return (
    <EasyReadContext.Provider value={{ easyRead, setEasyRead, toggleEasyRead }}>
      {children}
    </EasyReadContext.Provider>
  )
}

export function useEasyRead() {
  const context = useContext(EasyReadContext)
  if (context === undefined) {
    throw new Error('useEasyRead must be used within an EasyReadProvider')
  }
  return context
}
