import { createContext, useContext, type ReactNode } from 'react'
import { useLocalStorage } from './useLocalStorage'

interface SimpleLanguageContextType {
  simpleLanguage: boolean
  setSimpleLanguage: (value: boolean) => void
  toggleSimpleLanguage: () => void
}

const SimpleLanguageContext = createContext<SimpleLanguageContextType | undefined>(undefined)

export function SimpleLanguageProvider({ children }: { children: ReactNode }) {
  const [simpleLanguage, setSimpleLanguage] = useLocalStorage<boolean>('transition-easy-read', false) // storage key kept as-is so saved settings carry over

  const toggleSimpleLanguage = () => setSimpleLanguage(!simpleLanguage)

  return (
    <SimpleLanguageContext.Provider value={{ simpleLanguage, setSimpleLanguage, toggleSimpleLanguage }}>
      {children}
    </SimpleLanguageContext.Provider>
  )
}

export function useSimpleLanguage() {
  const context = useContext(SimpleLanguageContext)
  if (context === undefined) {
    throw new Error('useSimpleLanguage must be used within an SimpleLanguageProvider')
  }
  return context
}
