import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'

const initScenario = {
  copy1: 'それはすでに回収されたはずの魔法。',
  copy2: 'それはすでに改修されたはずの奇跡。',
  system: '魔導書大戦マギカロギア',
  title: 'その墓碑の名は',
  titleRuby: '                             ぼ    ひ            な',
  subTitle: 'Case of Accedia [cpitaph of XXXX]',
  pcNumber: 2,
  limit: 3,
  type: '協力型'
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
    }
  }
})

export const useScenario = () => {
  return useSelector(
    (state: { scenario: ReturnType<typeof scenarioModule.reducer> }) =>
      state.scenario.scenario
  )
}

export const usePdf = () => {
  return useSelector(
    (state: { scenario: ReturnType<typeof scenarioModule.reducer> }) =>
      state.scenario.pdfBase64
  )
}

export default scenarioModule
