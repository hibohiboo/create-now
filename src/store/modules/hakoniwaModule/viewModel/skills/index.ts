import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as _ from 'lodash'
import { initPage } from './didMount'
import { actions } from '../../index'
import type { HakoniwaState } from '../../index'
import type { PageContext } from './didMount'

export const useViewModel = (ctx: PageContext) =>
  useSelector((state: { hakoniwa: HakoniwaState }) => {
    const dispatch = useDispatch()
    const hState = state.hakoniwa

    useEffect(() => {
      initPage(ctx, dispatch)
    }, [])

    return {
      ...hState,
      addSelectCard: (card) => {
        dispatch(
          actions.setSelectedCards([
            ...hState.selectedCards,
            { ...card, uid: _.uniqueId(card.id) },
          ]),
        )
      },
      deleteSelectedCard: (uid) => {
        dispatch(
          actions.setSelectedCards(
            hState.selectedCards.filter((c) => c.uid !== uid),
          ),
        )
      },
    }
  })

export type ViewModel = ReturnType<typeof useViewModel>
