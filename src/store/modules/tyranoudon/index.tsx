import actions from './actions'
import reducer, { initialState } from './reducer'

export const init = initialState()
export default {
  actions,
  reducer,
}
