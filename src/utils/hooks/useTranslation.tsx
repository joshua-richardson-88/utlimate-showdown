import { useLocalStorage } from './useStorage'

type Language = { [key: string]: string | Language }
type Languages = { [key: string]: Language }

export default function useTranslation(languages: Languages) {
  const [language, setLanguage] = useLocalStorage('language', 'en')
  const [fallbackLanguage, setFallbackLanguage] = useLocalStorage(
    'fallbackLanguage',
    'en',
  )

  const getNestedTranslation = (obj: Language, keys: string[]): string => {
    const [key, ...rest] = keys
    const value = obj[key]

    if (value == null) return 'key'
    if (typeof value === 'string') return value

    return getNestedTranslation(value as Language, rest)
  }

  const translate = (key: string) => {
    if (language == null || fallbackLanguage == null) return
    const keys = key.split('.')

    return (
      getNestedTranslation(languages[language], keys) ??
      getNestedTranslation(languages[fallbackLanguage], keys) ??
      key
    )
  }

  return {
    language,
    setLanguage,
    fallbackLanguage,
    setFallbackLanguage,
    t: translate,
  }
}
