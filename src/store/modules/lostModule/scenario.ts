import * as _ from 'lodash'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Router, { useRouter } from 'next/router'
import { AppThunk } from '~/store/rootState'
import { useAuth, createAuthClientSide } from '~/store/modules/authModule'
import {
  createBoss,
  updateBoss,
  deleteBoss,
  readBosses,
  getBoss,
  readPrivateBosses,
} from '~/firestore/boss'
import useI18n from '~/hooks/use-i18n'
import * as lostData from '~/data/lostrpg'
import * as lostDataEn from '~/data/lostrpg-en'
import { defaultLanguage } from '~/lib/i18n'
import type { Ability } from './character'
import type { LostModule } from './index'
import {
  setPagenationLoading,
  paginationLoaded,
  setError,
  useListPagination,
  toggleBossDamage,
  setLocale,
  setScenario,
  setScenarios,
  addScenarios,
  setMarkdownForScenario,
} from './index'
import remark from 'remark'
import html from 'remark-html'
// import remark2rehype from 'remark-rehype'
interface TableRow {
  cells: string[]
}
interface Table {
  title?: string
  columns: TableRow[]
  rows: TableRow[]
}
interface Link {
  url: string
  value: string
}
interface Event {
  name: string
  type: string
  lines: string[]
  items: string[]
  tables: Table[]
  rolls: string[]
  paths: string[]
  links: Link[]
}

interface Scene {
  name: string
  lines: string[]
  events: Event[]
  type?: string
  alias?: string
}
interface Phase {
  name: string
  scenes: Scene[]
}
interface ScenarioPayload {
  phases: Phase[]
  phase: Phase
  scenes: Scene[]
  scene: Scene
  events: Event[]
  event: Event
  sceneLines: string[]
  eventLines: string[]
  items: string[]
  tables: Table[]
  rolls: string[]
  paths: string[]
  tableTitle: string
  players: string
  time: string
  scenarioLines: string[]
  links: Link[]
}
export interface Scenario {
  id?: string
  name?: string
  md?: string // markdown
  phases?: Phase[]
  players?: string
  time?: string
  lines?: string[]
}
interface AstNode {
  type: string
  children: AstNode[]
  position: Position
  depth?: number
  value?: string
}
const initScene = {
  name: '',
  lines: [],
  events: [],
  type: '',
  alias: '',
}
const initEvent = {
  name: '',
  type: '',
  lines: [],
  items: [],
  tables: [],
  rolls: [],
  paths: [],
  links: [],
}
const md = `# シナリオタイトル
## 〇人 {.players}
## 〇時間 {.time}

シナリオの概要です。

## キャンプフェイズ

### プロローグ

#### 描写

シナリオのモチベーションです。

## 探索フェイズ

### チェックポイント {.checkpoint .A}

#### 描写
チェックポイントの描写です
##### 道 {.path}

チェックポイントから延びる道について書きます

### 道 {.path}

#### 障害 {.lock}
障害について説明します。

#####  判定 {.roll}


## 決戦フェイズ

### 決戦の場

ヌシの描写をします。

#### ヌシ {.boss}

[→ヌシシートへのリンク](https://create-now.now.sh/lostrpg/public/ja/boss?id=ktrzE0GfeZ0wpDLGjYPj)

## 結果フェイズ
### エピローグ

セッションを終了して、経験点の計算を行なって下さい。`
const phases: Phase[] = [
  {
    name: 'キャンプフェイズ',
    scenes: [
      {
        ...initScene,
        name: 'プロローグ',
        events: [
          {
            ...initEvent,
            name: '描写',
            lines: ['シナリオのモチベーションです'],
          },
        ],
      },
    ],
  },
  {
    name: '探索フェイズ',
    scenes: [
      {
        ...initScene,
        name: 'チェックポイント',
        alias: 'A',
        type: 'checkpoint',
        events: [
          {
            ...initEvent,
            name: '描写',
            lines: [
              'チェックポイントの描写です',
              'チェックポイントから延びる道について書きます',
            ],
            paths: ['道'],
          },
        ],
      },
      {
        ...initScene,
        name: '道',
        type: 'path',
        events: [
          {
            ...initEvent,
            name: '障害',
            type: 'lock',
            lines: ['障害について説明します'],
            rolls: ['判定'],
          },
        ],
      },
    ],
  },
  {
    name: '決戦フェイズ',
    scenes: [
      {
        ...initScene,
        name: '決戦の場',
        lines: ['ヌシの描写をします'],
        events: [
          {
            ...initEvent,
            type: 'boss',
            name: 'ヌシ',
            links: [
              {
                url:
                  'https://create-now.now.sh/lostrpg/public/ja/boss?id=ktrzE0GfeZ0wpDLGjYPj',
                value: '→ヌシシートへのリンク',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: '結果フェイズフェイズ',
    scenes: [
      {
        ...initScene,
        name: 'エピローグ',
        events: [
          {
            ...initEvent,
            name: '描写',
            lines: ['セッションを終了して、経験点の計算を行なって下さい。'],
          },
        ],
      },
    ],
  },
]
export const initScenario: Scenario = {
  id: '',
  name: 'シナリオタイトル',
  md,
  phases,
  players: '〇人',
  time: '〇時間',
  lines: ['シナリオの概要です。'],
}
const getValues = (children: AstNode[], result: string[]) => {
  if (children.length === 0) return result
  const node = children.pop()
  if (node.type === 'text') result.push(node.value)
  if (node.children && node.children.length !== 0)
    result = [...result, ...getValues(node.children, [])]

  return getValues(children, result)
}
const getAttributes = (text: string) => {
  if (!text) return [null, null]
  const result = /\s*([^{]+)\s*\{\s*\.([^}]*)\s*\}\s*/g.exec(text)
  if (!result) return [null, null]
  const [original, val, attr] = result
  const attributes = attr.replace(/\s/, '').split('.')
  return [val, ...attributes.map((a) => a.trim().replace(/^\./, ''))]
}

export const mdToScenario = (md: string): Scenario => {
  const processor = remark().use(html)
  const parsed = processor.parse(md)
  const children = parsed.children as AstNode[]
  let scenario = initScenario

  const payload: ScenarioPayload = {
    phases: [],
    phase: null,
    scenes: [],
    scene: null,
    events: [],
    event: null,
    sceneLines: [],
    eventLines: [],
    items: [],
    tables: [],
    rolls: [],
    paths: [],
    tableTitle: '',
    players: '',
    time: '',
    scenarioLines: [],
    links: [],
  }
  const getTable = (node: AstNode, title: string) => {
    if (node.children.length < 2) return null
    const [columns, ...rows] = node.children
    return {
      title,
      columns: columns.children.map((cell) => _.get(cell, 'children[0].value')),
      rows: rows.map((row) => ({
        cells: row.children.map((cell) => _.get(cell, 'children[0].value')),
      })),
    }
  }

  const pushEvent = (payload: ScenarioPayload) => {
    if (payload.event === null) return
    payload.events.push({
      ...payload.event,
      lines: payload.eventLines,
      items: payload.items,
      tables: payload.tables,
      rolls: payload.rolls,
      paths: payload.paths,
      links: payload.links,
    })
  }

  const pushScene = (payload: ScenarioPayload) => {
    if (payload.scene === null) return
    pushEvent(payload)
    payload.scene.lines = payload.sceneLines
    payload.scene.events = payload.events
    payload.scenes.push(payload.scene)
  }
  const PushPhase = (payload: ScenarioPayload) => {
    if (payload.phase === null) return
    pushScene(payload)
    payload.phases.push({ ...payload.phase, scenes: payload.scenes })
  }
  children.forEach((c) => {
    if (c.type === 'heading' && c.depth === 1) {
      scenario = { ...scenario, name: _.get(c, 'children[0].value') }
      return
    }
    if (c.type === 'heading' && c.depth === 2) {
      const value = _.get(c, 'children[0].value')
      const [val, key] = getAttributes(value)
      if (!key) {
        PushPhase(payload)
        payload.phase = { name: value, scenes: [] }
        payload.scenes = []
        payload.scene = null
        return
      } else if (key === 'players') {
        payload.players = val
        return
      } else if (key === 'time') {
        payload.time = val
        return
      }

      return
    }
    if (c.type === 'heading' && c.depth === 3) {
      pushScene(payload)
      const value = _.get(c, 'children[0].value')
      const name = _.get(c, 'children[0].value')
      const [val, type, alias] = getAttributes(value)
      payload.scene = {
        name: val || name,
        lines: [],
        events: [],
        type,
        alias,
      }
      payload.sceneLines = []
      payload.events = []
      payload.event = null
      return
    }
    if (c.type === 'heading' && c.depth === 4) {
      pushEvent(payload)
      const value = _.get(c, 'children[0].value')
      const [val, key] = getAttributes(value)
      payload.event = {
        name: val || value,
        type: key || 'view',
        lines: [],
        items: [],
        tables: [],
        rolls: [],
        paths: [],
        links: [],
      }

      payload.eventLines = []
      payload.items = []
      payload.tables = []
      payload.rolls = []
      payload.paths = []
      payload.links = []
      return
    }
    if (c.type === 'heading' && c.depth === 5) {
      const [val, key] = getAttributes(_.get(c, 'children[0].value'))
      if (key === 'item') {
        payload.items.push(val)
      }
      if (key === 'roll') {
        payload.rolls.push(val)
      }
      if (key === 'path') {
        payload.paths.push(val)
      }
      if (key === 'table') {
        payload.tableTitle = val
      }
      return
    }
    if (
      c.type === 'paragraph' &&
      c.children.length > 0 &&
      c.children[0].type === 'link'
    ) {
      payload.links.push({
        url: _.get(c.children[0], 'url'),
        value: _.get(c.children[0], 'children[0].value'),
      })
      return
    }
    if (c.type === 'paragraph') {
      const lines = getValues(c.children, []).reverse()
      if (payload.phase === null) {
        payload.scenarioLines.push(lines)
        return
      }
      if (payload.event === null) {
        payload.sceneLines.push(lines)
        return
      }
      payload.eventLines.push(lines)
      return
    }
    if (c.type === 'table') {
      const table = getTable(c, payload.tableTitle)
      if (table) payload.tables.push(table)
      payload.tableTitle = ''
      return
    }
  })
  PushPhase(payload)

  // console.log(payload.phases)
  // console.log(children)
  return {
    ...scenario,
    md,
    phases: payload.phases,
    players: payload.players,
    time: payload.time,
    lines: payload.scenarioLines,
  }
}

//ViewModel
export const useScenarioEditViewModel = () =>
  useSelector((state: { lost: LostModule }) => {
    const authUser = useAuth()
    const i18n = useI18n()
    const t = i18n.t
    const dispatch = useDispatch()
    const scenario = state.lost.scenario
    const dispatchSetScenario = (e, prop: string) => {
      const r = { ...scenario }
      if (typeof r[prop] === 'number') {
        r[prop] = Number(e.target.value)
      } else {
        r[prop] = e.target.value
      }
      dispatch(setScenario(r))
    }
    useEffect(() => {
      dispatch(createAuthClientSide())
      dispatch(setLocale(i18n.activeLocale))
    }, [])
    const [tabValue, setTabValue] = useState(0)
    return {
      scenario,
      i18n,
      authUser,
      tabValue,
      tabs: { import: t('common_import'), preview: t('common_preview') },
      scenarioHandler: (e) => dispatch(setMarkdownForScenario(e)),
      changeTabHandler: (e, v) => setTabValue(v),
    }
  })
