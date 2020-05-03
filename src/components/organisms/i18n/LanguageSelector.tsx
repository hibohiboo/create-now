import React, { useEffect } from 'react'
import JA from '~/locales/ja.json'
import EN from '~/locales/en.json'
import { I18n } from '~/lib/i18n'

const languageSelector: React.FC<{ i18n: I18n }> = ({ i18n }) => {
  useEffect(() => {
    if (i18n.activeLocale !== 'ja') return
    i18n.locale('ja', JA)
  }, [])
  return (
    <div style={{ padding: '5px' }}>
      <a
        href="#"
        onClick={() => {
          i18n.locale('en', EN)
        }}
      >
        English
      </a>

      <a
        href="#"
        style={{ marginLeft: '10px' }}
        onClick={() => {
          i18n.locale('ja', JA)
        }}
      >
        日本語
      </a>
    </div>
  )
}
export default languageSelector
