import {initialState, reducer} from './reducers'
import {useActions} from './actions'
import React, {createContext, useReducer} from 'react'

const StoreContext = createContext(initialState)

const StoreProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const actions = useActions(state, dispatch)
  const store = {state, dispatch, actions}

  const value = {
    ...store,
  }
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export {StoreContext, StoreProvider}
