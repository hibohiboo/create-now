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
type SelectedCard = Card & { uid: string }
export const init = {
  cards: [] as Card[],
  selectedCards: [] as SelectedCard[],
}
type CardState = typeof init
export const reducers = {
  setCards: (state: CardState, action: PayloadAction<Card[]>) => {
    state.cards = action.payload
  },
  setSelectedCards: (
    state: CardState,
    action: PayloadAction<SelectedCard[]>,
  ) => {
    state.selectedCards = action.payload
  },
}
