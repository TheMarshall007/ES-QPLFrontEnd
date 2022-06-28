import { GENERAL_PANEL_TYPES } from "../actions/GeneralPanelActions";

const INITIAL_VALUE = {
  firstGroupInfos: {},
  secondGroupInfos: {},
  thirdGroupInfos: {},
  fourthGroupInfos: {},
  fifthGroupInfos: {},
  sixthGroupInfos: [],
  seventhGroupInfos: {},
  firstGroupLoading: true,
  secondGroupLoading: true,
  thirdGroupLoading: true,
  fourthGroupLoading: true,
  fifthGroupLoading: true,
  sixthGroupLoading: true,
  seventhGroupLoading: true,
};

const generalPanelFunctions = {
  [GENERAL_PANEL_TYPES.REQUEST_DATA]: (state) => ({
    ...state,
    firstGroupLoading: true,
    secondGroupLoading: true,
    thirdGroupLoading: true,
    fourthGroupLoading: true,
    fifthGroupLoading: true,
    sixthGroupLoading: true,
    seventhGroupLoading: true,
  }),
  [GENERAL_PANEL_TYPES.SET_FIRST]: (state, action) => ({
    ...state,
    firstGroupLoading: false,
    firstGroupInfos: action.infos,
  }),
  [GENERAL_PANEL_TYPES.SET_SECOND]: (state, action) => ({
    ...state,
    secondGroupLoading: false,
    secondGroupInfos: action.infos,
  }),
  [GENERAL_PANEL_TYPES.SET_THIRD]: (state, action) => ({
    ...state,
    thirdGroupLoading: false,
    thirdGroupInfos: action.infos,
  }),
  [GENERAL_PANEL_TYPES.SET_FOURTH]: (state, action) => ({
    ...state,
    fourthGroupLoading: false,
    fourthGroupInfos: action.infos,
  }),
  [GENERAL_PANEL_TYPES.SET_FIFTH]: (state, action) => ({
    ...state,
    fifthGroupLoading: false,
    fifthGroupInfos: action.infos,
  }),
  [GENERAL_PANEL_TYPES.SET_SIXTH]: (state, action) => ({
    ...state,
    sixthGroupLoading: false,
    sixthGroupInfos: action.infos,
  }),
  [GENERAL_PANEL_TYPES.SET_SEVENTH]: (state, action) => ({
    ...state,
    seventhGroupLoading: false,
    seventhGroupInfos: action.infos,
  }),
};

export default function GeneralPanelReducer(state = INITIAL_VALUE, action) {
  if (!generalPanelFunctions[action.type]) {
    return state;
  }
  return generalPanelFunctions[action.type](state, action);
}
