import {
  configureStore,
  getDefaultMiddleware,
  EnhancedStore,
} from '@reduxjs/toolkit'
import { rootReducer } from './rootState'
import logger from 'redux-logger'

export const setupStore = (): EnhancedStore => {
  const middlewares = [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['@@reactReduxFirebase/LOGIN'],
      },
    }),
  ]

  if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger)
  }

  return configureStore({
    reducer: rootReducer,
    middleware: middlewares,
    devTools: true,
  })
}
