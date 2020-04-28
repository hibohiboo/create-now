import { combineReducers, Action } from '@reduxjs/toolkit'
import { ThunkAction } from 'redux-thunk'
import scenarioModule, { init as scenarioInit } from './modules/scenarioModule'
import entrySheetModule, { init as entryInit } from './modules/entrySheetModule'
import authModule, { init as authInit } from './modules/authModule'

const rootReducer = combineReducers({
  scenario: scenarioModule.reducer,
  entrySheet: entrySheetModule.reducer,
  auth: authModule.reducer,
})
export default rootReducer

const rootPreloadedState = {
  scenario: scenarioInit,
  entrySheet: entryInit,
  auth: authInit,
}

export type RootState = typeof rootPreloadedState
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>
