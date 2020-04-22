import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'

const initEntrySheet = {
  system: 'LOSTRPG ～廃墟の森の子供たち～',
  title: 'サバイバルデイズ',
  gmName: '',
  theme1: '無人島',
  theme2: '現代',
  theme3: 'サバイバル',
  isExtend: 2, // 1:延長あり 2:なし
  pcNumberMin: 4,
  pcNumberBest: 4,
  pcNumberMax: 4,
  serious: 4, // 1: 必須、2:必須ではないが重視, 3: あると嬉しい, 4: 不要
  role: 3, // 1: 必須、2:必須ではないが重視, 3: あると嬉しい, 4: 不要
  diceFace: 6,
  diceNumber: 2,
  requiredRule: 2, // 1: 必須 2: 不要
  requiredOther: 'スマホでルルブが見れます',
  charMake: 2, // 1: サンプルキャラあり、2:持込・作成可
  charOther: '特殊ルール', // キャラ作成備考
  trpgBeginer: 4, // TRPG初心者x人まで
  systemBeginer: 4, // システム初心者x任まで
  ruleBook: 4,
  summary: 4,
  equipOther: '特になし', // 準備その他
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
export const init = { entrySheet: initEntrySheet, pdfBase64: '' }

// actions と reducers の定義
const entrySheetModule = createSlice({
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
    (state: { entrySheet: ReturnType<typeof entrySheetModule.reducer> }) =>
      state.entrySheet.entrySheet,
  )
}

export const usePdf = () => {
  return useSelector(
    (state: { entrySheet: ReturnType<typeof entrySheetModule.reducer> }) =>
      state.entrySheet.pdfBase64,
  )
}

export default entrySheetModule
