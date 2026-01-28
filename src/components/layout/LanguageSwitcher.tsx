import { useTranslation } from 'react-i18next'
import { languages, type LanguageCode } from '../../i18n'

export function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const currentLang = (i18n.language || 'en') as LanguageCode

  const handleChange = (lang: LanguageCode) => {
    i18n.changeLanguage(lang)
  }

  return (
    <div className="flex items-center gap-1 bg-warm-100 rounded-xl p-1">
      {(Object.keys(languages) as LanguageCode[]).map((lang) => (
        <button
          key={lang}
          onClick={() => handleChange(lang)}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
            currentLang === lang
              ? 'bg-white text-primary-600 shadow-sm'
              : 'text-warm-600 hover:text-warm-800 hover:bg-warm-50'
          }`}
          aria-label={`Switch to ${languages[lang].name}`}
        >
          <span className="mr-1">{languages[lang].flag}</span>
          <span>{languages[lang].nativeName}</span>
        </button>
      ))}
    </div>
  )
}

// Compact version for mobile
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
      className="flex items-center gap-2 px-3 py-2 rounded-xl bg-warm-100 hover:bg-warm-200 text-warm-700 text-sm font-medium transition-all"
      aria-label={`Switch to ${languages[otherLang].name}`}
    >
      <span>{languages[otherLang].flag}</span>
      <span>{languages[otherLang].nativeName}</span>
    </button>
  )
}
