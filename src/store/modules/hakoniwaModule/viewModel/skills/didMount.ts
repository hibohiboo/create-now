import * as thunk from '~/store/modules/hakoniwaModule/card/thunk'

export interface PageContext {
  sheet: string
}
export const initPage = (ctx: PageContext, dispatch) => {
  dispatch(thunk.fetchCards(ctx.sheet))
}
