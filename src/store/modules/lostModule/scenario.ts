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
} from './index'
import remark from 'remark'
import html from 'remark-html'

export interface Scenario {
  id?: string
  name?: string
  md?: string // markdown
}
interface AstNode {
  type: string
  cheldren: AstNode[]
  position: Position
  depth?: number
}

export const initScenario: Scenario = { id: '', name: '', md: '' }
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
    const processor = remark().use(html)
    const parsed = processor.parse(scenario.md)
    const children = parsed.children as AstNode[]
    const tmps = []
    let tmp = []
    children.forEach((c) => {
      if (c.type === 'heading') {
        if (tmp.length !== 0) tmps.push(tmp)
        tmp = [c]
        return
      }
      tmp.push(c)
    })
    console.log('tmps', tmps)
    tmps.forEach((item) => {
      //const a = processor.stringify({ children: item })
      // console.log(a)
    })

    return {
      scenario,
      i18n,
      authUser,
      scenarioHandler: (e) => dispatch(setScenario({ ...scenario, md: e })),
    }
  })
