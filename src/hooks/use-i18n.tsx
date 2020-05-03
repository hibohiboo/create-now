import { useContext } from 'react'
import { I18nContext, I18n } from '~/lib/i18n'

export default function useI18n() {
  const i18n: I18n = useContext(I18nContext)
  return i18n
}
