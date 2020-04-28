import {
  configureStore,
  getDefaultMiddleware,
  EnhancedStore,
} from '@reduxjs/toolkit'
import rootReducer from './rootState'
import logger from 'redux-logger'
import { MakeStore } from 'next-redux-wrapper'

export const setupStore = (preloadedState?): EnhancedStore => {
  const middlewares = [...getDefaultMiddleware()]

  if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger)
  }

  return configureStore({
    reducer: rootReducer,
    middleware: middlewares,
    devTools: true,
    preloadedState,
  })
}

export const makeStore: MakeStore = (initialState) => {
  const store = setupStore(initialState)

  if (module.hot) {
    module.hot.accept('./rootState', () => {
      console.log('Replacing reducer')
      store.replaceReducer(require('./rootState').default)
    })
  }

  return store
}
