import { useMemo } from 'react'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import rootReducer from './reducer/RootReducer'

let store: any

const initialState = {
  user: {
    token: '',
    user: undefined,
    loggedIn: false
  },
  screenSize: {
    width: 0
  },
  prayerAdd: {
    prayer: {
      name: '',
      displayName: '',
      content: '',
      description: '',
      notificationContent: ''
    },
    notificationContent: {
      title: '',
      body: '',
      sound: true
    }
  },
  prayer: {
    prayers: [],
    count: 0
  }
}

const initStore = (preloadedState = initialState) => {
  return createStore(
    rootReducer,
    preloadedState,
    composeWithDevTools(applyMiddleware())
  )
}

const initializeStore = (preloadedState: any) => {
  let _store = store ?? initStore(preloadedState)

  if (preloadedState && store) {
    _store = initStore({
      ...store.getStore(),
      ...preloadedState
    })
    store = undefined
  }

  if (typeof window === 'undefined') return _store
  if (!store) store = _store

  return _store
}

export function useStore(initialState: any) {
  const store = useMemo(() => initializeStore(initialState), initialState)
  return store
}