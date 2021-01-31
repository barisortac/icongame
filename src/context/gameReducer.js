import {sampleSize} from "lodash";

export const gameState = {
  foundIcon: 0,
  sampleIconList: [],
  isSampleSet: false,
  generatedIconList: [],
  numberOfIcons: 35,
}

export const INCREASE_FOUND_ICON = 'INCREASE_FOUND_ICON'
export const SET_SAMPLE_ICONS = 'SET_SAMPLE_ICONS'
export const SET_ICON_LIST = 'SET_ICON_LIST'
export const SHUFFLE_ICONS = 'SHUFFLE_ICONS'

export const gameReducer = (state, action) => {
  switch (action.type) {
    case INCREASE_FOUND_ICON:
      return {
        ...state,
        foundIcon: state.foundIcon + 1
      };
    case SET_SAMPLE_ICONS:
      console.log("state")
      console.log(state)
      return {
        ...state,
        isSampleSet: true,
        sampleIconList: action.data || []
      }
    case SET_ICON_LIST:
      console.log("state")
      console.log(state)
      return {
        ...state,
        generatedIconList: action.data || []
      }
    case SHUFFLE_ICONS:
      let newSample = sampleSize(state.generatedIconList, 36);
      return {
        ...state,
        generatedIconList: newSample || []
      }
    default:
      return state;
  }
};

export const gameActions = (props) => {
  return {
    incrementFoundItem: (data) => props.dispatch({ type: INCREASE_FOUND_ICON, data}),
    setSampleIcons: (data) => props.dispatch({ type: SET_SAMPLE_ICONS, data}),
    setGeneratedIconList: (data) => props.dispatch({ type: SET_ICON_LIST, data}),
    shuffleIcons: (data) => props.dispatch({ type: SHUFFLE_ICONS, data}),
  }
}
