import { combineReducers } from "redux";
import alert from "./AlertReducer";
import generalPanel from "./GeneralPanelReducer";

export const reducerKeys = {
  alert: "alert",
  generalPanel: "generalPanel",
};

export default combineReducers({
  [reducerKeys.alert]: alert,
  [reducerKeys.generalPanel]: generalPanel,
});
