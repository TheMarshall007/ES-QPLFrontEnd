import React, { Component } from "react";
import "./NavigationComp.css";

class NavigationItemComp extends Component {
  render() {
    const { icon, itemName, children } = this.props;

    return (
      <div className="py-3 pl-4">
        <div className={`navi-select ${icon ? "" : "pl-4"}`}>
          {icon ? <i className={`${icon} navi-item-icon`} /> : null}
          {itemName}
          {children}
        </div>
      </div>
    );
  }
}

export default NavigationItemComp;
