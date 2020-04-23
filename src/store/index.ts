import {
  configureStore,
  getDefaultMiddleware,
  EnhancedStore,
} from '@reduxjs/toolkit'
import { rootReducer, rootPreloadedState } from './rootState'
import logger from 'redux-logger'
import { MakeStore } from 'next-redux-wrapper'
import { cloneDeep } from 'lodash'

export const setupStore = (preloadedState?): EnhancedStore => {
  const middlewares = [...getDefaultMiddleware()]

  if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger)
  }
  if (preloadedState) {
    return configureStore({
      reducer: rootReducer,
      middleware: middlewares,
      devTools: true,
      preloadedState,
    })
  }

  return configureStore({
    reducer: rootReducer,
    middleware: middlewares,
    devTools: true,
  })
}

export const makeStore: MakeStore = (initialState) => {
  const pre = cloneDeep(rootPreloadedState)
  for (const property in initialState) {
    pre[property] = initialState[property]
  }
  const store = setupStore(pre)

  // if (module.hot) {
  //   module.hot.accept('./reducer', () => {
  //     console.log('Replacing reducer')
  //     store.replaceReducer(require('./reducer').default)
  //   })
  // }

  return store
}
