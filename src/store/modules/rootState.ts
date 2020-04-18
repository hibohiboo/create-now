import { combineReducers } from '@reduxjs/toolkit'
import scenarioModule, { Scenario } from './scenarioModule'
import entrySheetModule, { EntrySheet } from './entrySheetModule'
import firebase from './firebase'
export interface RootState {
  scenario: Scenario
  entrySheet: EntrySheet
}

export const rootReducer = combineReducers({
  scenario: scenarioModule.reducer,
  entrySheet: entrySheetModule.reducer,
  firebase: firebase.reducer,
})
