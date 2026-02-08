import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'

const STORAGE_KEY = 'transition-tts-voice'

interface VoiceContextType {
  voiceName: string
  setVoiceName: (name: string) => void
  selectedVoice: SpeechSynthesisVoice | null
  voices: SpeechSynthesisVoice[]
}

const VoiceContext = createContext<VoiceContextType | undefined>(undefined)

// Filter out novelty/joke voices inappropriate for a care/health app
const noveltyNames = [
  'albert', 'bad news', 'bahh', 'bells', 'boing', 'bubbles',
  'cellos', 'good news', 'jester', 'organ', 'superstar',
  'trinoids', 'whisper', 'wobble', 'zarvox',
]

export function VoiceProvider({ children }: { children: ReactNode }) {
  const [voiceName, setVoiceNameState] = useState<string>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) || ''
    } catch {
      return ''
    }
  })
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])

  useEffect(() => {
    const synth = window.speechSynthesis
    if (!synth) return

    const loadVoices = () => {
      const allVoices = synth.getVoices()
      const englishVoices = allVoices.filter((v) => {
        if (!v.lang.startsWith('en')) return false
        const lower = v.name.toLowerCase()
        return !noveltyNames.some((n) => lower.includes(n))
      })
      setVoices(englishVoices)
    }

    loadVoices()
    synth.addEventListener('voiceschanged', loadVoices)
    return () => synth.removeEventListener('voiceschanged', loadVoices)
  }, [])

  const setVoiceName = useCallback((name: string) => {
    setVoiceNameState(name)
    try {
      localStorage.setItem(STORAGE_KEY, name)
    } catch { /* ignore */ }
  }, [])

  const selectedVoice = voices.find((v) => v.name === voiceName) || null

  return (
    <VoiceContext.Provider value={{ voiceName, setVoiceName, selectedVoice, voices }}>
      {children}
    </VoiceContext.Provider>
  )
}

export function useVoice() {
  const ctx = useContext(VoiceContext)
  if (!ctx) throw new Error('useVoice must be used within a VoiceProvider')
  return ctx
}
