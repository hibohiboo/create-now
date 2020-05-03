import { createContext, useState, useRef, useEffect } from 'react'
import rosetta from 'rosetta'
// import rosetta from 'rosetta/debug';

// 日本語をベース
import JA from '~/locales/ja.json'
type Dict = typeof JA
// type Language = 'ja' | 'en'
const i18n = rosetta<Dict>()

export const defaultLanguage = 'ja' // リテラル型
export const languages = [defaultLanguage, 'en'] as const // const assertion.TypeScript 3.4^. readonly["ja", "en"]. 配列の要素の型をstring[]ではなく["ja", "en"]とリテラル型にできる
type Language = typeof languages[number] // Union Typeに変換. T[number]は配列Tに対してnumber型のプロパティ名でアクセスできるプロパティの型 = 配列Tの要素の型
// Mapped Typesで定義。 languagesの定義を変更したときに足りなければ検知
export const contentLanguageMap: { [K in Language]: string } = {
  ja: 'ja-JP',
  en: 'en-US',
}

export const I18nContext = createContext(null)

// default language
i18n.locale(defaultLanguage)

export type I18n = {
  activeLocale: Language
  t: (...args: [keyof Dict | (string | number)[], any?, string?]) => string
  locale: (l: Language, dict: Dict) => void
}

const I18n: React.FC<{
  locale: Language
  lngDict: Dict
}> = ({ children, locale, lngDict }) => {
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

  const i18nWrapper: I18n = {
    activeLocale: activeLocaleRef.current,
    t: (...args) => i18n.t(...args), // https://qiita.com/uhyo/items/80ce7c00f413c1d1be56
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
export default I18n
