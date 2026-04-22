import { useEffect, useState } from 'react'
import WelcomeIntro from './WelcomeIntro'
import { hasSeenIntro } from './introStorage'

export default function WelcomeIntroGate() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!hasSeenIntro()) {
      const t = setTimeout(() => setOpen(true), 500)
      return () => clearTimeout(t)
    }
  }, [])

  if (!open) return null
  return <WelcomeIntro onClose={() => setOpen(false)} />
}
