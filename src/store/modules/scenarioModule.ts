import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'

const initScenario = {
  copy1: '己を鍛え、仲間を助け、未踏の道を切り開け。',
  copy2: '絶海の地より抜け出すために。',
  system: 'LOST ～廃墟の森の子供たち～ 現代編',
  title: '無人島漂流記',
  titleRuby: '                         サバイバルデイズ',
  subTitle: 'The Life and Strange Surprising Adventures of  XXXX',
  pcNumber: 4,
  limit: 3,
  type: '想定プレイ時間 5h',
}
export type Scenario = typeof initScenario
const init = { scenario: initScenario, pdfBase64: '' }

// actions と reducers の定義
const scenarioModule = createSlice({
  name: 'scenario',
  initialState: init,
  reducers: {
    update: (state, action: PayloadAction<Scenario>) => {
      state.scenario = action.payload
      state.pdfBase64 = ''
    },
    setPdf: (state, action: PayloadAction<string>) => {
      state.pdfBase64 = action.payload
    },
  },
})

export const useScenario = () => {
  return useSelector(
    (state: { scenario: ReturnType<typeof scenarioModule.reducer> }) =>
      state.scenario.scenario,
  )
}

export const usePdf = () => {
  return useSelector(
    (state: { scenario: ReturnType<typeof scenarioModule.reducer> }) =>
      state.scenario.pdfBase64,
  )
}

export default scenarioModule
