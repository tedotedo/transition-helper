import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import en from './locales/en.json'
import ur from './locales/ur.json'

export const languages = {
  en: { name: 'English', nativeName: 'English', dir: 'ltr', flag: '🇬🇧' },
  ur: { name: 'Urdu', nativeName: 'اردو', dir: 'rtl', flag: '🇵🇰' },
} as const

export type LanguageCode = keyof typeof languages

export function isRTL(lang: string): boolean {
  return lang === 'ur'
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ur: { translation: ur },
    },
    fallbackLng: 'en',
    supportedLngs: ['en', 'ur'],
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'transition-app-language',
    },
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
