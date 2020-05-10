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

  free: `・現代が舞台。日本はまだ終わっていない……はず
・漂流した経緯を各自考えておくこと。
  漂流表を振ってもよい。
・キャラ作成時に買い物なし。
・キャンプ・施設なし。
・25歳以上のPCも作成可能。
・島から脱出したいキャラクターであること。
  残してきたもの表をふってもよい。
・ニューエイジをサイキックと読み替え。
  【突然変異】のアビリティは取得不可。

`, // 自由記入欄
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
