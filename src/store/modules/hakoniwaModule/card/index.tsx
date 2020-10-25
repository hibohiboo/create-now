import { PayloadAction } from '@reduxjs/toolkit'
export type Card = {
  type: string
  name: string
  timing: string
  count: number
  target: string
  range: string
  tags: string[]
  effect: string
  description: string
  id: string
  image: null | { text: string; url: string }
  maxLevel: null | number
  level: null | number
  link: 0 | 1 | 2
}
export const init = { cards: [] as Card[] }
export const reducers = {
  setCards: (state, action: PayloadAction<Card[]>) => {
    state.cards = action.payload
  },
}
