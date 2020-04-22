import { combineReducers } from '@reduxjs/toolkit'
import scenarioModule, {
  Scenario,
  init as scenarioInit,
} from './modules/scenarioModule'
import entrySheetModule, {
  EntrySheet,
  init as entryInit,
} from './modules/entrySheetModule'
import authModule, { init as authInit } from './modules/authModule'

export interface RootState {
  scenario: Scenario
  entrySheet: EntrySheet
}

export const rootReducer = combineReducers({
  scenario: scenarioModule.reducer,
  entrySheet: entrySheetModule.reducer,
  auth: authModule.reducer,
})

export const rootPreloadedState = {
  scenario: scenarioInit,
  entrySheet: entryInit,
  auth: authInit,
}
