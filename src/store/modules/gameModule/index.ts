import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useSelector, useDispatch } from 'react-redux'

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
    const buttonX = new FireCommand()
    const buttonY = new JumpCommand()
    const buttonA = new LurchIneffectivelyCommand()
    const buttonB = new SwapCommand()
    return {
      handleInput: (btn: CommandButton) => {
        if (isPressed('X', btn)) buttonX.execute()
        if (isPressed('Y', btn)) buttonY.execute()
        if (isPressed('A', btn)) buttonA.execute()
        if (isPressed('B', btn)) buttonB.execute()
      },
    }
  })
export type CommandButton = 'X' | 'Y' | 'A' | 'B'
const isPressed = (expected: CommandButton, actual: CommandButton) =>
  expected === actual
interface Command {
  execute: () => void
}
class JumpCommand implements Command {
  execute() {
    console.log('Jump')
  }
}
class FireCommand implements Command {
  execute() {
    console.log('Fire')
  }
}

class SwapCommand implements Command {
  execute() {
    console.log('Swap')
  }
}
class LurchIneffectivelyCommand implements Command {
  execute() {
    console.log('LurchIneffectively')
  }
}
