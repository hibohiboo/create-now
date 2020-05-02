import { createContext, useState, useRef, useEffect } from 'react'
import rosetta from 'rosetta'
// import rosetta from 'rosetta/debug';

const i18n = rosetta()

export const defaultLanguage = 'ja'
export const languages = ['ja', 'en']
export const contentLanguageMap = { ja: 'ja-JP', en: 'en-US' }

export const I18nContext = createContext(null)

// default language
i18n.locale(defaultLanguage)

export default function I18n({ children, locale, lngDict }) {
  const [activeDict, setActiveDict] = useState(() => lngDict)
  const activeLocaleRef = useRef(locale || defaultLanguage)
  const [, setTick] = useState(0)
  const firstRender = useRef(true)

  // for initial SSR render
  if (locale && firstRender.current === true) {
    firstRender.current = false
    i18n.locale(locale)
    i18n.set(locale, activeDict)
  }

  useEffect(() => {
    if (locale) {
      i18n.locale(locale)
      i18n.set(locale, activeDict)
      activeLocaleRef.current = locale
      // force rerender
      setTick((tick) => tick + 1)
    }
  }, [locale, activeDict])

  const i18nWrapper = {
    activeLocale: activeLocaleRef.current,
    t: (...args) => i18n.t(...(args as [any, ...any[]])), // https://qiita.com/uhyo/items/80ce7c00f413c1d1be56
    locale: (l, dict) => {
      i18n.locale(l)
      activeLocaleRef.current = l
      if (dict) {
        i18n.set(l, dict)
        setActiveDict(dict)
      } else {
        setTick((tick) => tick + 1)
      }
    },
  }

  return (
    <I18nContext.Provider value={i18nWrapper}>{children}</I18nContext.Provider>
  )
}
