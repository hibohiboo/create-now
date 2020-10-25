import type { HakoniwaState } from '../../index'
import { actions } from '../../index'

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
})
