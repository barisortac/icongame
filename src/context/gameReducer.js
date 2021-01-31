export const gameState = {
  foundIcon: 0,
  sampleIconList: [],
  isSampleSet: false,
  generatedIconList: []
}

export const INCREASE_FOUND_ICON = 'INCREASE_FOUND_ICON'
export const SET_SAMPLE_ICONS = 'SET_SAMPLE_ICONS'
export const SET_ICON_LIST = 'SET_ICON_LIST'

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
    default:
      return state;
  }
};

export const gameActions = (props) => {
  return {
    incrementFoundItem: (data) => props.dispatch({ type: INCREASE_FOUND_ICON, data}),
    setSampleIcons: (data) => props.dispatch({ type: SET_SAMPLE_ICONS, data}),
    setGeneratedIconList: (data) => props.dispatch({ type: SET_ICON_LIST, data}),
  }
}
