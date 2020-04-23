import { combineReducers } from '@reduxjs/toolkit'
import scenarioModule, { init as scenarioInit } from './modules/scenarioModule'
import entrySheetModule, { init as entryInit } from './modules/entrySheetModule'
import authModule, { init as authInit } from './modules/authModule'

export const rootReducer = combineReducers({
  scenario: scenarioModule.reducer,
  entrySheet: entrySheetModule.reducer,
  auth: authModule.reducer,
})

const rootPreloadedState = {
  scenario: scenarioInit,
  entrySheet: entryInit,
  auth: authInit,
}
export type RootState = typeof rootPreloadedState
