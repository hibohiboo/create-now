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
interface Event {
  name: string
  type: string
  lines: string[]
  items: string[]
  tables: Table[]
  rolls: string[]
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
}
export interface Scenario {
  id?: string
  name?: string
  md?: string // markdown
  phases?: Phase[]
}
interface AstNode {
  type: string
  children: AstNode[]
  position: Position
  depth?: number
  value?: string
}

export const initScenario: Scenario = { id: '', name: '', md: '', phases: [] }
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
  const result = /\s*([^\s]+)\s*\{\s*\.([^}]*)\s*\}\s*/g.exec(text)
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
  }
  const getTable = (node: AstNode) => {
    if (node.children.length < 2) return null
    const [columns, ...rows] = node.children
    return {
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
      PushPhase(payload)
      payload.phase = { name: _.get(c, 'children[0].value'), scenes: [] }
      payload.scenes = []
      payload.scene = null
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
      }

      payload.eventLines = []
      payload.items = []
      payload.tables = []
      payload.rolls = []
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
      return
    }
    if (c.type === 'paragraph') {
      if (payload.event === null) {
        payload.sceneLines.push(getValues(c.children, []).reverse())
        return
      }
      payload.eventLines.push(getValues(c.children, []).reverse())
    }
    if (c.type === 'table') {
      const table = getTable(c)
      if (table) payload.tables.push(table)
    }
  })
  PushPhase(payload)

  console.log(payload.phases)
  console.log(children)
  return { ...scenario, md, phases: payload.phases }
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

    return {
      scenario,
      i18n,
      authUser,
      scenarioHandler: (e) => dispatch(setMarkdownForScenario(e)),
    }
  })
