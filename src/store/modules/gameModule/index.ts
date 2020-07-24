import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useSelector, useDispatch } from 'react-redux'
import { sampleTable } from '~/data/lostrpg-en'
interface Actor {
  jump(): void
  fire(): void
  swap(): void
  lurchIneffectively(): void
}

class Actor implements Actor {
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
class Unit {
  constructor(public x = 0, public y = 0) {}

  moveTo(x: number, y: number) {
    console.log(`move from x:${this.x} y:${this.y} to x:${x} y:${y}`)
    this.x = x
    this.y = y
  }
}
interface Location {
  x: number
  y: number
}
type GameState = {
  unit: Location
}

export const init: GameState = {
  unit: { x: 0, y: 0 },
}

const getSelectedUnit = (state: GameState) =>
  new Unit(state.unit.x, state.unit.y)
let lastCommand: UndoCommand | null = null
const actor = new Actor()
// actions と reducers の定義
const gameModule = createSlice({
  name: 'game',
  initialState: init,
  reducers: {
    setCommand: (state, action: PayloadAction<CommandButton>) => {
      const btn = action.payload
      if (isPressed('B', btn) && lastCommand) return lastCommand.undo(state)
      const command = inputHandler(btn)
      if (command) return command.execute(actor)
      const unit = getSelectedUnit(state)
      const ucmd = inputHandle2(btn, unit)
      ucmd.execute(state)
      lastCommand = ucmd
    },
  },
})

export default gameModule
export type GameModule = ReturnType<typeof gameModule.reducer>
const actions = gameModule.actions
export const viewModel = () =>
  useSelector((state: { game: GameModule }) => {
    const dispatch = useDispatch()
    return {
      handleInput: (btn: CommandButton) => dispatch(actions.setCommand(btn)),
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
export type CommandButton = 'X' | 'Y' | 'A' | 'B' | 'UP' | 'DOWN'
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
type UndoCommand = {
  execute(state: GameState): void
  undo(state: GameState): void
}
class MoveUnitCommand implements UndoCommand {
  private xBefore = 0
  private yBefore = 0
  constructor(private unit: Unit, private x: number, private y: number) {}
  execute(state: GameState) {
    this.xBefore = this.unit.x
    this.yBefore = this.unit.y
    this.unit.moveTo(this.x, this.y)
    state.unit = { x: this.x, y: this.y }
  }
  undo(state: GameState) {
    this.unit.moveTo(this.xBefore, this.yBefore)
    state.unit = { x: this.x, y: this.y }
    lastCommand = null
  }
}

const inputHandle2 = (btn: CommandButton, unit: Unit) => {
  if (isPressed('UP', btn)) {
    return new MoveUnitCommand(unit, unit.x, unit.y - 1)
  }
  if (isPressed('DOWN', btn)) {
    return new MoveUnitCommand(unit, unit.x, unit.y + 1)
  }
  return null
}
