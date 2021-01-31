import {gameState, gameReducer} from './gameReducer'


const initialState = {
  gameState,
}

const reducer = (state = initialState, action) => {
  return {
    gameState: gameReducer(state.gameState, action),
  }
}

export {initialState, reducer}
