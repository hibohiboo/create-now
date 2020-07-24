import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useSelector, useDispatch } from 'react-redux'
class Actor {
  jump() {
    console.log('Jump')
  }
  fire() {
    console.log('Fire')
  }
  swap() {
    console.log('Swap')
  }
  lurchIneffectively() {
    console.log('LurchIneffectively')
  }
}
type GameState = {
  hoge: string
  actor: Actor
}

export const init: GameState = {
  hoge: '',
  actor: new Actor(),
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
    const { actor } = state.game
    return {
      handleInput: (btn: CommandButton) => {
        const command = inputHandler(btn)
        if (command) command.execute(actor)
      },
    }
  })
const inputHandler = (btn: CommandButton) => {
  const buttonX = new FireCommand()
  const buttonY = new JumpCommand()
  const buttonA = new LurchIneffectivelyCommand()
  const buttonB = new SwapCommand()
  if (isPressed('X', btn)) return buttonX
  if (isPressed('Y', btn)) return buttonY
  if (isPressed('A', btn)) return buttonA
  if (isPressed('B', btn)) return buttonB
  return null
}
export type CommandButton = 'X' | 'Y' | 'A' | 'B'
const isPressed = (expected: CommandButton, actual: CommandButton) =>
  expected === actual

interface Command {
  execute(actor: Actor): void
}
class JumpCommand implements Command {
  execute(actor: Actor) {
    actor.jump()
  }
}
class FireCommand implements Command {
  execute(actor: { fire: () => void }) {
    actor.fire()
  }
}

class SwapCommand implements Command {
  execute(actor: Actor) {
    actor.swap()
  }
}
class LurchIneffectivelyCommand implements Command {
  execute(actor: Actor) {
    actor.lurchIneffectively()
  }
}
