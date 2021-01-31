import { gameActions } from './gameReducer'

export const useActions = (state, dispatch) => {
  return {
    gameActions: gameActions({ state, dispatch }),
  }
}
