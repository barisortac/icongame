import {sampleSize} from "lodash";

export const gameState = {
  foundIcon: 0,
  sampleIconList: [],
  sampleIconNumber: 4,
  isSampleSet: false,
  generatedIconList: [],
  numberOfIcons: 35,
  difficultyLevel: "1",
  iconChangeMilliSeconds: 10000,
  startTimestamp: 0,
  // endTimestamp: 0,
}

export const INCREASE_FOUND_ICON = 'INCREASE_FOUND_ICON'
export const RESET_FOUND_ICON = 'RESET_FOUND_ICON'
export const SET_SAMPLE_ICONS = 'SET_SAMPLE_ICONS'
export const RESET_SAMPLE_ICONS = 'RESET_SAMPLE_ICONS'
export const SET_ICON_LIST = 'SET_ICON_LIST'
export const SHUFFLE_ICONS = 'SHUFFLE_ICONS'
export const SET_DIFFICULTY_LEVEL = 'SET_DIFFICULTY_LEVEL'
export const SET_START_TIMESTAMP = 'SET_START_TIMESTAMP'
// export const SET_END_TIMESTAMP = 'SET_END_TIMESTAMP'

export const gameReducer = (state, action) => {
  switch (action.type) {
    case INCREASE_FOUND_ICON:
      return {
        ...state,
        foundIcon: state.foundIcon + 1
      };
    case RESET_FOUND_ICON:
      return {
        ...state,
        foundIcon: 0
      };
    case SET_SAMPLE_ICONS:
      return {
        ...state,
        isSampleSet: true,
        sampleIconList: action.data || []
      }
    case RESET_SAMPLE_ICONS:
      return {
        ...state,
        isSampleSet: false,
      }
    case SET_ICON_LIST:
      return {
        ...state,
        generatedIconList: action.data || []
      }
    case SHUFFLE_ICONS:
      let newSample = sampleSize(state.generatedIconList, state.numberOfIcons);
      return {
        ...state,
        generatedIconList: newSample || []
      }
    case SET_START_TIMESTAMP:
      return {
        ...state,
        startTimestamp: action.data
      }
    // case SET_END_TIMESTAMP:
    //   return {
    //     ...state,
    //     endTimestamp: action.data
    //   }
    case SET_DIFFICULTY_LEVEL:
      let iconNumber;
      let iconChangeMSeconds;
      let totalIcons;
      if (action.data === "1") {
        iconNumber = 2;
        totalIcons = 9;
        iconChangeMSeconds = 20000;
      } else if (action.data === "2") {
        iconNumber = 3;
        totalIcons = 16;
        iconChangeMSeconds = 15000;
      } else if (action.data === "3") {
        iconNumber = 4;
        totalIcons = 25;
        iconChangeMSeconds = 10000;
      } else if (action.data === "4") {
        iconNumber = 5;
        totalIcons = 36;
        iconChangeMSeconds = 8000;
      } else {
        iconNumber = 2;
        totalIcons = 9;
        iconChangeMSeconds = 20000;
      }
      return {
        ...state,
        sampleIconNumber: iconNumber,
        numberOfIcons: totalIcons,
        iconChangeMilliSeconds: iconChangeMSeconds,
        difficultyLevel: action.data
      };
    default:
      return state;
  }
};

export const gameActions = (props) => {
  return {
    increaseFoundItem: (data) => props.dispatch({ type: INCREASE_FOUND_ICON, data}),
    resetFoundItem: (data) => props.dispatch({ type: RESET_FOUND_ICON, data}),
    setSampleIcons: (data) => props.dispatch({ type: SET_SAMPLE_ICONS, data}),
    resetSampleIcons: (data) => props.dispatch({ type: RESET_SAMPLE_ICONS, data}),
    setGeneratedIconList: (data) => props.dispatch({ type: SET_ICON_LIST, data}),
    shuffleIcons: (data) => props.dispatch({ type: SHUFFLE_ICONS, data}),
    setDifficultyLevel: (data) => props.dispatch({ type: SET_DIFFICULTY_LEVEL, data}),
    setStartTimestamp: (data) => props.dispatch({ type: SET_START_TIMESTAMP, data}),
    // setEndTimestamp: (data) => props.dispatch({ type: SET_END_TIMESTAMP, data}),
  }
}
