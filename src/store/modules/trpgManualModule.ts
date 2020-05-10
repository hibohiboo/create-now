import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'

const initEntrySheet = {
  name: 'ひぼ',
  id: '@hibohiboo',
  checkColor: '#80ff00',
  heartColor: '#ff0000',
  circleColor: '#ff0000',
  mystery: 0,
  battle: 0,
  horror: 0,
  grotesque: 0,
  gl: 0,
  bl: 0,
  love: 0,
  PvP: 0,
  depression: 0,
  decision: 0,
  exp: 0,
  voice: false,
  text: false,
  textWithVoice: false,
  onTheTable: false,
  ccfolia: false,
  dodontof: false,
  discord: false,
  skype: false,
  others: '',
  gm: 0,
  pl: 0,
  rpMany: false,
  rpOften: false,
  scenario: false,
  scenarioC: false,
  lostNo: false,
  lostYes: false,
  ruleStrict: false,
  ruleFasy: false,
  rulebook: ``,
  free: ``, // 自由記入欄
  nameFontSize: 30,
  idFontSize: 20,
  rulebookFontSize: 30,
  commentFontSize: 30,
}
export type EntrySheet = typeof initEntrySheet
type EntrySheetState = { entrySheet: EntrySheet; pdfBase64: string }
export const init: EntrySheetState = {
  entrySheet: initEntrySheet,
  pdfBase64: '',
}

// actions と reducers の定義
const trpgManualModule = createSlice({
  name: 'entrySheet',
  initialState: init,
  reducers: {
    update: (state, action: PayloadAction<EntrySheet>) => {
      state.entrySheet = action.payload
      state.pdfBase64 = ''
    },
    setPdf: (state, action: PayloadAction<string>) => {
      state.pdfBase64 = action.payload
    },
  },
})

export const useEntrySheet = () => {
  return useSelector(
    (state: { trpgManual: ReturnType<typeof trpgManualModule.reducer> }) =>
      state.trpgManual.entrySheet,
  )
}

export default trpgManualModule
