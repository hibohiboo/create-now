import { PayloadAction } from '@reduxjs/toolkit'
export type Card = {
  type: string
  kind: string
  name: string
  timing: string
  count: string
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
  exp: null | string
}
export type SelectedCard = Card & { uid: string; identifier: string }
export const init = {
  cards: [] as Card[],
  selectedCards: [] as SelectedCard[],
  filterType: '',
  filterTag: '',
  filterKind: '',
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
  setFilterType: (state: CardState, action: PayloadAction<string>) => {
    state.filterType = action.payload
  },
  setFilterKind: (state: CardState, action: PayloadAction<string>) => {
    state.filterKind = action.payload
  },
  setFilterTag: (state: CardState, action: PayloadAction<string>) => {
    state.filterTag = action.payload
  },
}
