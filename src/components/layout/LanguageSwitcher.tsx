import { useTranslation } from 'react-i18next'
import { languages, type LanguageCode } from '../../i18n'

// Prominent language switcher with flags - for header/visible position
export function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const currentLang = (i18n.language || 'en') as LanguageCode

  const handleChange = (lang: LanguageCode) => {
    i18n.changeLanguage(lang)
  }

  return (
    <div className="flex items-center gap-2">
      {(Object.keys(languages) as LanguageCode[]).map((lang) => (
        <button
          key={lang}
          onClick={() => handleChange(lang)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
            currentLang === lang
              ? 'bg-primary-500 text-white shadow-md scale-105'
              : 'bg-white border-2 border-warm-200 text-warm-700 hover:border-primary-300 hover:bg-primary-50'
          }`}
          aria-label={`Switch to ${languages[lang].name}`}
          aria-pressed={currentLang === lang}
        >
          <span className="text-xl">{languages[lang].flag}</span>
          <span>{languages[lang].nativeName}</span>
        </button>
      ))}
    </div>
  )
}

// Floating language toggle button - fixed position, always visible
// Positioned bottom-left to avoid overlapping with content and feedback button
export function FloatingLanguageToggle() {
  const { i18n } = useTranslation()
  const currentLang = (i18n.language || 'en') as LanguageCode

  const toggleLanguage = () => {
    const newLang = currentLang === 'en' ? 'ur' : 'en'
    i18n.changeLanguage(newLang)
  }

  const otherLang = currentLang === 'en' ? 'ur' : 'en'

  return (
    <button
      onClick={toggleLanguage}
      className="fixed bottom-24 md:bottom-6 left-4 md:left-6 z-50 flex items-center gap-2 px-3 py-2 md:px-4 md:py-3 rounded-xl md:rounded-2xl bg-white border-2 border-warm-200 shadow-lg hover:shadow-xl hover:border-primary-400 hover:scale-105 transition-all"
      aria-label={`Switch to ${languages[otherLang].name}`}
      title={`Switch to ${languages[otherLang].name}`}
    >
      <span className="text-xl md:text-2xl">{languages[otherLang].flag}</span>
      <span className="font-semibold md:font-bold text-sm md:text-base text-warm-800">{languages[otherLang].nativeName}</span>
    </button>
  )
}

// Compact version for mobile menu
export function LanguageSwitcherCompact() {
  const { i18n } = useTranslation()
  const currentLang = (i18n.language || 'en') as LanguageCode

  const toggleLanguage = () => {
    const newLang = currentLang === 'en' ? 'ur' : 'en'
    i18n.changeLanguage(newLang)
  }

  const otherLang = currentLang === 'en' ? 'ur' : 'en'

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-3 px-5 py-3 rounded-xl bg-gradient-to-r from-primary-50 to-accent-50 border-2 border-primary-200 hover:border-primary-400 text-warm-800 font-semibold transition-all"
      aria-label={`Switch to ${languages[otherLang].name}`}
    >
      <span className="text-2xl">{languages[otherLang].flag}</span>
      <span>Switch to {languages[otherLang].nativeName}</span>
    </button>
  )
}
