import { ALERT_TYPES } from "../actions/AlertActions";

const INITIAL_VALUE = {
  alerts: [],
};

const alertFunctions = {
  [ALERT_TYPES.ADD_ALERT]: (state, { text, alertType, alertPriority }) => ({
    ...state,
    alerts: state.alerts.concat({
      text,
      alertType,
      alertPriority,
      time: 5000,
    }),
  }),
  [ALERT_TYPES.REMOVE_ALERT]: (state, { object }) => {
    const alerts = [...state.alerts];
    if (object.time > 0) {
      object.time = "0";
      alerts.splice(alerts.indexOf(object), 1);
    }
    return {
      ...state,
      alerts,
    };
  },
};

export default function AlertReducer(state = INITIAL_VALUE, action) {
  if (!alertFunctions[action.type]) {
    return state;
  }
  return alertFunctions[action.type](state, action);
}
