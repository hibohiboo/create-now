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

interface Scene {
  name: string
  lines: string[]
}
interface Phase {
  name: string
  scenes: []
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
export const mdToScenario = (md: string): Scenario => {
  const processor = remark().use(html)
  const parsed = processor.parse(md)
  const children = parsed.children as AstNode[]
  let scenario = initScenario
  const phases: Phase[] = []
  let phase = null
  let scenes = null
  let scene = null
  let lines: string[] = []

  children.forEach((c) => {
    if (c.type === 'heading' && c.depth === 1) {
      scenario = { ...scenario, name: _.get(c, 'children[0].value') }
      return
    }
    if (c.type === 'heading' && c.depth === 2) {
      if (phase !== null) phases.push(phase)
      phase = { name: _.get(c, 'children[0].value'), scenes: [] }
      scenes = []
      return
    }
    if (c.type === 'heading' && c.depth === 3) {
      if (scene !== null) {
        scene.lines = lines
        scenes.push(scene)
      }
      scene = { name: _.get(c, 'children[0].value'), lines: [] }
      return
    }
    if (c.type === 'paragraph') {
      lines = [...lines, ...getValues(c.children, []).reverse()]
    }
  })
  if (scene !== null) {
    scene.lines = lines
    scenes.push(scene)
  }
  if (scenes !== null) phase.scenes = scenes
  if (phase !== null) phases.push(phase)

  console.log(phases)
  console.log(children)
  return { ...scenario, md, phases }
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
