const prefix = "ALERT_";

export const ALERT_TYPES = {
  ADD_ALERT: prefix + "ADD_ALERT",
  REMOVE_ALERT: prefix + "REMOVE_ALERT",
};

export const alertActions = {
  addAlert: (text, alertType, alertPriority) => ({
    type: ALERT_TYPES.ADD_ALERT,
    text,
    alertType,
    alertPriority,
  }),
  removeAlert: (alert) => ({
    type: ALERT_TYPES.REMOVE_ALERT,
    object: alert,
  }),
};
