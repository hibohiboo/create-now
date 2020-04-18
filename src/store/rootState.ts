import { combineReducers } from '@reduxjs/toolkit'
import scenarioModule, { Scenario } from './modules/scenarioModule'
import entrySheetModule, { EntrySheet } from './modules/entrySheetModule'
import firebase from './firebase'
import fireStore from './firestore'

export interface RootState {
  scenario: Scenario
  entrySheet: EntrySheet
}

export const rootReducer = combineReducers({
  scenario: scenarioModule.reducer,
  entrySheet: entrySheetModule.reducer,
  firebase: firebase.reducer,
  fireStore: fireStore.reducer,
})
