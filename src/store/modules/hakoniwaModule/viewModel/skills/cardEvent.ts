import { actions } from '../../index'
import type { HakoniwaState } from '../../index'
import * as _ from 'lodash'

export default (dispatch, state: HakoniwaState) => ({
  addSelectCard: (card) => {
    dispatch(
      actions.setSelectedCards([
        ...state.selectedCards,
        { ...card, uid: _.uniqueId(card.id) },
      ]),
    )
  },
  deleteSelectedCard: (uid) => {
    dispatch(
      actions.setSelectedCards(
        state.selectedCards.filter((c) => c.uid !== uid),
      ),
    )
  },
  changeFilterType: (str) => {
    dispatch(actions.setFilterType(str))
  },
  changeFilterKind: (str) => {
    dispatch(actions.setFilterKind(str))
  },
  changeFilterTag: (str) => {
    dispatch(actions.setFilterTag(str))
  },
})
