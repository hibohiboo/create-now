import {
  configureStore,
  getDefaultMiddleware,
  EnhancedStore,
} from '@reduxjs/toolkit'
import rootReducer from './rootState'
import logger from 'redux-logger'

export const setupStore = (preloadedState?): EnhancedStore => {
  const middlewares = [...getDefaultMiddleware()]

  if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger)
  }

  const store = configureStore({
    reducer: rootReducer,
    middleware: middlewares,
    devTools: true,
    preloadedState,
  })

  if (module.hot) {
    module.hot.accept('./rootState', () => {
      console.log('Replacing reducer')
      store.replaceReducer(require('./rootState').default)
    })
  }
  return store
}
