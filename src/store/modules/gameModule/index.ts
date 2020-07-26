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
/// リクエストをオブジェクトとしてカプセル化する
/// これによって、異なるリクエスト/キュー/ログリクエストをもったクライアントの
/// パラメータ化および取り消し可能なオペレーションが実装できるようになる。
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
// フライウェイト
/// 共有を利用することで、多数の細かいオブジェクトを効率よく処理する
const getTiles = () => {
  const world = new World()
  const tiles = world.generateTerrains()
  console.log('grass', world.getTerrain(0, 1))
  console.log('hill', world.getTerrain(0, 0))
  console.log('river', world.getTerrain(3, 0))
  return tiles
}

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
  private tiles: Terrain[][] | null = null
  constructor(private colNumber = 8, private rowNumber = 6) {}
  generateTerrains() {
    const tiles: Terrain[][] = Array(this.rowNumber).fill(
      Array(this.colNumber).fill(this.grassTerrain),
    )

    // 川を配置
    // TODO: randomを使うと、Prop `className` did not match. Serverのエラー
    // const HILLS_RANDOM_RANGE = 10
    const riverXpos = 3 //_.random(0, this.colNumber - 1)

    this.tiles = tiles.map((row, yIndex) =>
      row.map((cell, xIndex) => {
        // 川を配置
        if (riverXpos === xIndex) {
          return this.riverTerrain
        }

        // 丘を点在
        // if (_.random(0, HILLS_RANDOM_RANGE) === 0) {
        //   return this.hillTerrain
        // }
        if ((xIndex === 0 && yIndex === 0) || (xIndex === 4 && yIndex === 4)) {
          return this.hillTerrain
        }

        return cell
      }),
    )

    return this.tiles
  }

  getTerrain(x: number, y: number) {
    if (!this.tiles) throw new Error('not terrains. please generate use before')
    if (y >= this.colNumber || x >= this.rowNumber)
      throw new Error(
        `out of range: col:${this.colNumber} x:${x} row:${this.rowNumber} y:${y} `,
      )
    return this.tiles[y][x]
  }
}

// オブザーバ
/// オブジェクト間に一対多の依存関係を定義する
/// これにより、あるオブジェクトが状態を変えた時に、
/// 依存関係にある全てのオブジェクトにその変化が知らされ、
/// 必要な更新が行わるようにする

// 現在は、クラスより関数で実装するほうが多い
type Entity = any
type ObserveEvent = 'EVENT_ENTITY_FELL'
type AchievementName = 'ACHEIEVEMENT_FELL_OF_BRIDGE'

interface Observer {
  onNotify(entity: Entity, event: ObserveEvent): void
  // TODO: 破棄時にサブジェクトにobeserverから外させる処理があるとよりよい
  // 無効リスナー問題（Lapsed Listener Problem)
}
class Achievements implements Observer {
  public heroIsOnBridge = false
  onNotify(entity: Entity, event: ObserveEvent) {
    switch (event) {
      case 'EVENT_ENTITY_FELL':
        if (entity.isHero() && this.heroIsOnBridge) {
          this.unlock('ACHEIEVEMENT_FELL_OF_BRIDGE')
        }
    }
  }
  unlock(achievement: AchievementName) {
    // まだ与えられていない場合は達成バッジを与える
    console.log(achievement)
  }
}

class Subject {
  observers: Observer[] = []
  numObservers = 0
  addObserver(observer: Observer) {
    this.observers.push(observer)
    this.numObservers++
  }
  removeObserver(observer: Observer) {
    // https://lodash.com/docs/4.17.15#pull
    this.observers = _.pull(this.observers, observer)
    this.numObservers--
  }
  noify(entity: Entity, event: ObserveEvent) {
    this.observers.forEach((observer) => {
      observer.onNotify(entity, event)
    })
  }
}

// TODO: 実際に使った例。
/// https://qiita.com/41semicolon/items/0d2f2509d4ac1558badb

// プロトタイプ
/// あるインスタンスをプロトタイプとして使うことで、
/// 作成するオブジェクトの種類を特定する
/// そのプロトタイプをコピーすることで、新しいオブジェクトを作成する

interface Monster {
  clone(): Monster
}
class Ghost implements Monster {
  clone() {
    return new Ghost()
  }
}
class Demon implements Monster {
  clone() {
    return new Demon()
  }
}
class Sorcerer implements Monster {
  clone() {
    return new Sorcerer()
  }
}
interface Spawner {
  spawnMonster: () => Monster
}
class GhostSpawner implements Spawner {
  spawnMonster() {
    return new Ghost()
  }
}
class DemonSpawner implements Spawner {
  spawnMonster() {
    return new Demon()
  }
}
class SorcererSpawner implements Spawner {
  spawnMonster() {
    return new Sorcerer()
  }
}
