import React, { Component } from "react";
import { Modal, Row, Col, Button } from "react-bootstrap";
import { InputEmail, InputName, InputNumber } from "../../genericComponents";
import { FormFull } from "form-full";
import { performStudent } from "./controllers/StudentControllers";
import { connect } from "react-redux";
import { alertActions } from "../../store/actions/AlertActions";

class ModalStudent extends Component {
  constructor(props) {
    super(props);
    this.mounted = true;
    this.state = {
      buttonLoading: false,
    };
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  performLoginCallback = (state, callback) => {
    if (this.mounted) {
      this.setState(state, callback);
    }
  };

  render() {
    const { show, onHide } = this.props;

    return (
      <Modal show={show} onHide={onHide} centered backdrop="static" size="md">
        <Modal.Header closeButton>Estudantes</Modal.Header>
        <Modal.Body>
          <FormFull
            formRef={(ref) => (this.formRef = ref)}
            onSubmit={(data) =>
              performStudent(
                data,
                this.props,
                this.state.buttonLoading,
                this.performLoginCallback
              )
            }
          >
            <InputName
              name={"username"}
              label="Nome"
              required="Campo obrigatório"
            />
            <InputEmail
              name={"email"}
              label="E-mail"
              required="Campo obrigatório"
            />
            <InputNumber
              name={"registration"}
              label="Código de Matricula"
              required="Campo obrigatório"
            />
            <Row>
              <Col>
                <Button
                  variant="secondary"
                  className="w-100 button-without-rounded"
                  onClick={onHide}
                >
                  Voltar
                </Button>
              </Col>
              <Col>
                <Button
                  variant="success"
                  className="w-100 button-without-rounded"
                  onClick={() => this.formRef.submit()}
                >
                  {this.state.buttonLoading ? (
                    <div>
                      <i className="fas fa-circle-notch login-fa-spin-custom" />
                    </div>
                  ) : (
                    "Entrar"
                  )}
                </Button>
              </Col>
            </Row>
          </FormFull>
        </Modal.Body>
      </Modal>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
    return {
      onAddAlert: (text, alertType, alertPriority) =>
        dispatch(alertActions.addAlert(text, alertType, alertPriority)),
    };
  };
  
  export default connect(null, mapDispatchToProps)(ModalStudent)