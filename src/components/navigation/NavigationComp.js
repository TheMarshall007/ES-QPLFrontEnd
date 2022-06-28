import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./NavigationComp.css";
import NavigationItemComp from "./NavigationItemComp";

import { Button } from "react-bootstrap";
import { setView, isStudentView, getView } from "../../utils/storage";

class NavigationComp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inDebug: false,
      menuVisible: "",
      is_student: this.setInitialView(),
    };
  }

  setInitialView = () => {
    if (getView()) {
      return isStudentView();
    }
    return this.props.decodedToken.roles[0] === "ROLE_STUDENT";
  };

  openMenu = () => {
    this.setState({ menuVisible: "visible" });
  };

  closeMenu = () => {
    this.setState({ menuVisible: "hidden" });
  };

  toggleMenu = () => {
    this.setState((state) => ({
      menuVisible: state.menuVisible === "visible" ? "hidden" : "visible",
    }));
  };

  handleChangeView = () => {
    const is_student = !this.state.is_student;
    const isSetting = false;
    setView(is_student);
    this.setState({ is_student, isSetting });
  };

  renderLink = (itemName, path, iconClassName) => {
    return this.props.selectedPath === path ? (
      <div className="navi-td navi-selected">
        <NavigationItemComp icon={iconClassName} itemName={itemName} />
      </div>
    ) : (
      <div className="navi-td">
        <Link to={path} className="navi-unselected">
          <NavigationItemComp icon={iconClassName} itemName={itemName} />
        </Link>
      </div>
    );
  };

  render() {
    const { children } = this.props;
    const { menuVisible, is_student } = this.state;

    return (
      <Container fluid={true}>
        <Button
          variant="primary"
          className="menu-btn-container menu-btn header"
          onClick={this.toggleMenu}
        >
          <i className="fas fa-bars" />
        </Button>
        <Row xs>
          <div
            className={`navi-sidebar-background ${menuVisible}`}
            onClick={this.closeMenu}
          />
          <div
            className={`navi-sidebar ${menuVisible}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="navi-sidebar-header">
              <Col xs="auto" className="menu-btn-container">
                <Button
                  variant="primary"
                  className="menu-btn"
                  onClick={this.closeMenu}
                >
                  <i className="fas fa-times" />
                </Button>
              </Col>
            </div>{" "}
            {/* Estudantes */}
            {!is_student &&this.renderLink(
              "Estudantes",
              `/estudantes`,
              "fas fa-graduation-cap"
            )}
            {/* Perguntas */}
            {!is_student &&this.renderLink("Perguntas", `/perguntas`, "fas fa-clipboard")}
            {/* Trilha */}
            {this.renderLink("Trilha", `/trilha`, "fas fa-map")}
            {/* Respostas */}
            {this.renderLink("Respostas", `/respostas`, "fas fa-clipboard-check")}
            {/* Sair */}
            <div className="navi-td">
              <Link
                to="/"
                className="navi-unselected"
                onClick={() => {
                  localStorage.clear();
                }}
              >
                <NavigationItemComp icon="fas fa-door-open" itemName={"Sair"} />
              </Link>
            </div>
          </div>

          <Col xs className="navi-rest">
            {children}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default NavigationComp;
