const prefix = "GENERAL_PANEL_";

export const GENERAL_PANEL_TYPES = {
  REQUEST_DATA: prefix + "REQUEST_DATA",
  SET_FIRST: prefix + "SET_FIRST",
  SET_SECOND: prefix + "SET_SECOND",
  SET_THIRD: prefix + "SET_THIRD",
  SET_FOURTH: prefix + "SET_FOURTH",
  SET_FIFTH: prefix + "SET_FIFTH",
  SET_SIXTH: prefix + "SET_SIXTH",
  SET_SEVENTH: prefix + "SET_SEVENTH",
};

export const generalPanelActions = {
  requestData: () => ({
    type: GENERAL_PANEL_TYPES.REQUEST_DATA,
  }),
  setFirst: (infos) => ({
    type: GENERAL_PANEL_TYPES.SET_FIRST,
    infos,
  }),
  setSecond: (infos) => ({
    type: GENERAL_PANEL_TYPES.SET_SECOND,
    infos,
  }),
  setThird: (infos) => ({
    type: GENERAL_PANEL_TYPES.SET_THIRD,
    infos,
  }),
  setFourth: (infos) => ({
    type: GENERAL_PANEL_TYPES.SET_FOURTH,
    infos,
  }),
  setFifth: (infos) => ({
    type: GENERAL_PANEL_TYPES.SET_FIFTH,
    infos,
  }),
  setSixth: (infos) => ({
    type: GENERAL_PANEL_TYPES.SET_SIXTH,
    infos,
  }),
  setSeventh: (infos) => ({
    type: GENERAL_PANEL_TYPES.SET_SEVENTH,
    infos,
  }),
};
