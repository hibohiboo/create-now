import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useSelector, useDispatch } from 'react-redux'
export type CommandButton = 'x' | 'y' | 'a' | 'b'
type GameState = {
  hoge: string
}

export const init: GameState = {
  hoge: '',
}

// actions と reducers の定義
const gameModule = createSlice({
  name: 'game',
  initialState: init,
  reducers: {
    setHoge: (state, action: PayloadAction<string>) => {
      state.hoge = action.payload
    },
  },
})

export default gameModule
export type GameModule = ReturnType<typeof gameModule.reducer>
export const viewModel = () =>
  useSelector((state: { game: GameModule }) => {
    return {
      handleInput: (btn: CommandButton) => {
        console.log(btn)
      },
    }
  })
