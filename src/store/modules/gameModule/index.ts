import * as _ from 'lodash'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useSelector, useDispatch } from 'react-redux'

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
      tiles: getTiles(),
    }
  })

// コマンドパターン
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
// フライウェイトパターン
const getTiles = () => new World().generateTerrains()

type Texture = 'grass' | 'river' | 'hill'

export interface Terrain {
  moveCost: number
  isWater: boolean
  texture: Texture
}
const generateTerrain = (
  moveCost: number,
  isWater: boolean,
  texture: Texture,
): Terrain => ({ moveCost, isWater, texture })
class World {
  private grassTerrain: Terrain = generateTerrain(1, false, 'grass')
  private hillTerrain: Terrain = generateTerrain(3, false, 'hill')
  private riverTerrain: Terrain = generateTerrain(2, true, 'river')
  constructor(private cols = 8, private rows = 6) {}
  generateTerrains() {
    const tiles: Terrain[][] = Array(this.rows).fill(
      Array(this.cols).fill(this.grassTerrain),
    )
    const HILLS_RANDOM_RANGE = 10

    // 川を配置
    // TODO: randomを使うと、Prop `className` did not match. Serverのエラー
    const riverXpos = _.random(0, this.cols - 1)

    const result = tiles.map((row) =>
      row.map((cell, xIndex) => {
        // 川を配置
        if (riverXpos === xIndex) {
          return this.riverTerrain
        }

        // 丘を点在
        if (_.random(0, HILLS_RANDOM_RANGE) === 0) {
          return this.hillTerrain
        }

        return cell
      }),
    )

    return result
  }
}
