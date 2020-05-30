import * as _ from 'lodash'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Router, { useRouter } from 'next/router'
import { AppThunk } from '~/store/rootState'
import { useAuth, createAuthClientSide } from '~/store/modules/authModule'
import {
  createScenario,
  updateScenario,
  deleteScenario,
  readScenarios,
  getScenario,
  readPrivateScenarios,
} from '~/firestore/scenario'
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
  columns: string[]
  rows: TableRow[]
}
interface Link {
  url: string
  value: string
}
interface EventItem {
  name: string
  type: string
}
interface Event {
  name: string
  type: string
  lines: string[]
  items: EventItem[]
  tables: Table[]
  links: Link[]
}

interface Scene {
  name: string
  lines: string[]
  events: Event[]
  type?: string
  alias?: string
  next?: string[]
}
interface Phase {
  name: string
  scenes: Scene[]
}

export interface Scenario {
  id?: string
  name?: string
  md?: string // markdown
  phases?: Phase[]
  players?: string
  time?: string
  lines?: string[]
  limit?: string
  caution?: string
  isPublish?: boolean
  imageUrl?: string
  createdAt?: any
  updatedAt?: any
  uid?: string
  creatorName?: string
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
  items: EventItem[]
  tables: Table[]
  tableTitle: string
  players: string
  time: string
  scenarioLines: string[]
  links: Link[]
  limit: string
  caution: string
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
  next: [],
}
const initEvent = {
  name: '',
  type: '',
  lines: [],
  items: [],
  tables: [],
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

### チェックポイント {.type-checkpoint}

#### 描写
チェックポイントの描写です
##### 道 {.path}

チェックポイントから延びる道について書きます

### 道 {.type-path}

#### 障害 {.lock}
障害について説明します。

#####  判定 {.roll}


## 決戦フェイズ

### 決戦の場

ヌシの描写をします。

#### ヌシ {.scenario}

[→ヌシシートへのリンク](https://create-now.now.sh/lostrpg/public/ja/scenario?id=ktrzE0GfeZ0wpDLGjYPj)

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
            type: 'view',
            lines: ['シナリオのモチベーションです'],
          },
        ],
        next: [],
      },
    ],
  },
  {
    name: '探索フェイズ',
    scenes: [
      {
        ...initScene,
        name: 'チェックポイント',
        type: 'checkpoint',
        events: [
          {
            ...initEvent,
            name: '描写',
            type: 'view',
            lines: [
              'チェックポイントの描写です',
              'チェックポイントから延びる道について書きます',
            ],
            items: [{ name: '道', type: 'path' }],
          },
        ],
        next: [],
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
            items: [{ name: '判定', type: 'roll' }],
          },
        ],
        next: [],
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
            type: 'scenario',
            name: 'ヌシ',
            links: [
              {
                url:
                  'https://create-now.now.sh/lostrpg/public/ja/scenario?id=ktrzE0GfeZ0wpDLGjYPj',
                value: '→ヌシシートへのリンク',
              },
            ],
          },
        ],
        next: [],
      },
    ],
  },
  {
    name: '結果フェイズ',
    scenes: [
      {
        ...initScene,
        name: 'エピローグ',
        events: [
          {
            ...initEvent,
            name: '描写',
            type: 'view',
            lines: ['セッションを終了して、経験点の計算を行なって下さい。'],
          },
        ],
        next: [],
      },
    ],
  },
]
export const initScenario: Scenario = {
  name: 'シナリオタイトル',
  md,
  phases,
  players: '〇人',
  time: '〇時間',
  limit: '〇',
  lines: ['シナリオの概要です。'],
  caution: '',
  isPublish: false,
  creatorName: '',
}

// Methods
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
    tableTitle: '',
    players: '',
    time: '',
    scenarioLines: [],
    links: [],
    limit: '',
    caution: '',
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
      } else if (key === 'limit') {
        payload.limit = val
        return
      } else if (key === 'caution') {
        payload.caution = val
        return
      }

      return
    }
    if (c.type === 'heading' && c.depth === 3) {
      pushScene(payload)
      const value = _.get(c, 'children[0].value')
      const name = _.get(c, 'children[0].value')
      const [val, ...maybeAttr] = getAttributes(value)
      const attr = (maybeAttr && maybeAttr.filter((m) => m)) || []
      const type = attr.find((a) => a.indexOf('type-') !== -1)
      const alias = attr.find((a) => a.indexOf('alias-') !== -1)
      const next = attr.find((a) => a.indexOf('next-') !== -1)
      payload.scene = {
        name: val || name,
        lines: [],
        events: [],
        type: (type && type.replace('type-', '')) || null,
        alias: (alias && alias.replace('alias-', '')) || null,
        next: (next && next.replace('next-', '').split('-')) || null,
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
        links: [],
      }

      payload.eventLines = []
      payload.items = []
      payload.tables = []
      payload.links = []
      return
    }
    if (c.type === 'heading' && c.depth === 5) {
      const [val, key] = getAttributes(_.get(c, 'children[0].value'))
      if (key === 'table') {
        payload.tableTitle = val
      }
      switch (key) {
        case 'item':
        case 'roll':
        case 'path':
        case 'prize':
          payload.items.push({ type: key, name: val })
          return
        default:
          return
      }
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
        payload.scenarioLines = [...payload.scenarioLines, ...lines]
        return
      }
      if (payload.event === null) {
        payload.sceneLines = [...payload.sceneLines, ...lines]
        return
      }
      payload.eventLines = [...payload.eventLines, ...lines]
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
    limit: payload.limit,
    caution: payload.caution,
  }
}

// thunks
interface ScenariosLoaded {
  scenarios: { name: string; id: string }[]
  next: string
  hasMore: boolean
}

const fetchScenariosCommon = async (
  next,
  limit,
  dispatch,
  action,
  searchName,
  uid = null,
) => {
  dispatch(setPagenationLoading(true))
  try {
    const ret: ScenariosLoaded = await readScenarios(next, limit, searchName)
    const privateData = uid ? await readPrivateScenarios(uid) : []
    dispatch(paginationLoaded(ret))
    dispatch(action([...privateData, ...ret.scenarios]))
  } catch (err) {
    dispatch(setError(err.toString()))
    dispatch(setPagenationLoading(false))
  }
}
const fetchScenarios = (
  limit: number,
  searchName = '',
  uid = null,
): AppThunk => async (dispatch) => {
  await fetchScenariosCommon(
    null,
    limit,
    dispatch,
    setScenarios,
    searchName,
    uid,
  )
}

const fetchScenariosMore = (
  next: string,
  limit: number,
  searchName: string,
): AppThunk => async (dispatch) => {
  await fetchScenariosCommon(next, limit, dispatch, addScenarios, searchName)
}

const fetchScenario = (id: string): AppThunk => async (dispatch) => {
  const data = await getScenario(id)
  dispatch(setScenario(data))
}

//ViewModel
export const useScenarioEditViewModel = () =>
  useSelector((state: { lost: LostModule }) => {
    const authUser = useAuth()
    const i18n = useI18n()
    const t = i18n.t
    const dispatch = useDispatch()
    const router = useRouter()
    const scenario = state.lost.scenario
    const id = router.query.id as string
    const beforePage = `/lostrpg/scenario/${i18n.activeLocale}/list`
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
    useEffect(() => {
      if (!id && authUser) {
        dispatch(
          setScenario({
            ...initScenario,
            creatorName: authUser.displayName,
          }),
        )
      }
      if (id && authUser) {
        dispatch(fetchScenario(id))
      }
    }, [authUser])
    const [file, setFile] = useState<File>(null)
    const [tabValue, setTabValue] = useState(0)
    return {
      id,
      scenario,
      i18n,
      authUser,
      tabValue,
      tabs: {
        import: t('common_import'),
        preview: t('common_preview'),
        chart: t('common_chart'),
      },
      beforePage,
      scenarioHandler: (e) => dispatch(setMarkdownForScenario(e)),
      creatorNameHandler: (e) => dispatchSetScenario(e, 'creatorName'),
      changeTabHandler: (e, v) => setTabValue(v),
      setImageHandler: (file: File) => setFile(file),
      editHandler: async () => {
        if (!scenario.name) {
          alert(`${t('common_name')}:${t('message_required')}`)
          window.scrollTo(0, 0)
          return
        }

        let retId = id
        if (!retId) {
          retId = await createScenario(
            { ...scenario, uid: authUser.uid },
            authUser,
            file,
          )
        } else {
          await updateScenario(
            id,
            { ...scenario, uid: authUser.uid },
            authUser.uid,
            file,
          )
        }

        Router.push(
          {
            pathname: `/lostrpg/public/[lng]/[view]`,
            query: { id: retId },
          },
          `/lostrpg/public/${i18n.activeLocale}/scenario?id=${retId}`,
        )
      },

      deleteHandler: async () => {
        if (confirm(t('message_are_you_sure_remove'))) {
          await deleteScenario(id, authUser.uid)
          Router.push(beforePage)
        }
      },
      publishHandler: (e) =>
        dispatch(
          setScenario({
            ...scenario,
            isPublish: e.target.checked,
          }),
        ),
    }
  })
