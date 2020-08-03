import { combineReducers, Action } from '@reduxjs/toolkit'
import { ThunkAction } from 'redux-thunk'
import scenarioModule, { init as scenarioInit } from './modules/scenarioModule'
import entrySheetModule, { init as entryInit } from './modules/entrySheetModule'
import authModule, { init as authInit } from './modules/authModule'
import lostModule, { init as lostInit } from './modules/lostModule'
import memoListModule, { init as memoListInit } from './modules/memoListModule'
import trpgManualModule, {
  init as trpgManualInit,
} from './modules/trpgManualModule'
import gameModule, { init as gameInit } from './modules/gameModule'
import tyranoudonModule, { init as tyranoudonInit } from './modules/tyranoudon'

const rootReducer = combineReducers({
  scenario: scenarioModule.reducer,
  entrySheet: entrySheetModule.reducer,
  auth: authModule.reducer,
  lost: lostModule.reducer,
  memoList: memoListModule.reducer,
  trpgManual: trpgManualModule.reducer,
  game: gameModule.reducer,
  tyranoudon: tyranoudonModule.reducer,
})
export default rootReducer

const rootPreloadedState = {
  scenario: scenarioInit,
  entrySheet: entryInit,
  auth: authInit,
  lost: lostInit,
  memoList: memoListInit,
  trpgManual: trpgManualInit,
  game: gameInit,
  tyranoudon: tyranoudonInit,
}

export type RootState = typeof rootPreloadedState
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>
