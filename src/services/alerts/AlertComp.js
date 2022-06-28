import React, { Component } from "react";
import "./AlertComp.css";
import { Alert } from "react-bootstrap";
import { alertActions } from "../../store/actions/AlertActions";
import { connect } from "react-redux";

class AlertComp extends Component {
  removeAlerts = (e) => {
    this.props.alerts.map((alert, idx) =>
      alert.alertPriority
        ? null
        : setTimeout(() => {
            this.props.onRemoveAlert(alert);
          }, alert.time + idx)
    );
  };

  render() {
    return (
      <div className="alert-comp-alert">
        {this.props.alerts.map((alert, idx) =>
          alert.alertPriority ? (
            <Alert
              key={idx}
              variant={alert.alertType}
              onClose={() => this.props.onRemoveAlert(alert)}
              dismissible
            >
              {alert.text}
            </Alert>
          ) : (
            <Alert key={idx} variant={alert.alertType}>
              {alert.text}
            </Alert>
          )
        )}
        {this.removeAlerts()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    alerts: state.alert.alerts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddAlert: (text, alertType, alertPriority) =>
      dispatch(alertActions.addAlert(text, alertType, alertPriority)),
    onRemoveAlert: (alert) => dispatch(alertActions.removeAlert(alert)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AlertComp);
