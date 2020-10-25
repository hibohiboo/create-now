import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as _ from 'lodash'
import { initPage } from './didMount'
import cardEvent from './cardEvent'
import udonEvent from './udonEvent'
import type { HakoniwaState } from '../../index'
import type { PageContext } from './didMount'

export const useViewModel = (ctx: PageContext) =>
  useSelector((state: { hakoniwa: HakoniwaState }) => {
    const dispatch = useDispatch()
    const hState = state.hakoniwa

    useEffect(() => {
      initPage(ctx, dispatch)
    }, [])
    let filteredCards = hState.cards
    filteredCards = hState.filterType
      ? hState.cards.filter((card) => card.type === hState.filterType)
      : filteredCards
    filteredCards = hState.filterKind
      ? hState.cards.filter((card) => card.kind === hState.filterKind)
      : filteredCards
    filteredCards = hState.filterTag
      ? hState.cards.filter((card) => card.tags.includes(hState.filterTag))
      : filteredCards
    return {
      ...hState,
      filteredCards,
      ...cardEvent(dispatch, hState),
      ...udonEvent(hState),
    }
  })

export type ViewModel = ReturnType<typeof useViewModel>
