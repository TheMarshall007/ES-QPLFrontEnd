import React, { Component } from "react";
import { Modal, Row, Col, Button } from "react-bootstrap";
import { connect } from "react-redux";
import {  RadioGroup } from "../../genericComponents";
import { alertActions } from "../../store/actions/AlertActions";
import { FormFull } from "form-full";
import { performAnswers } from "./controllers/TrailControllers";

class ModalQuestionStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  render() {
    const { show, onHide, phaseSelect } = this.props;
    const {} = this.state;
    console.log(this.props)
    return (
      <Modal
        show={show}
        onHide={onHide}
        scrollable={true}
        centered
        backdrop="static"
        size="xl"
      >
        <Modal.Header closeButton>{`Fase - ${phaseSelect?.id}`}</Modal.Header>
        <Modal.Body>
        <FormFull
            formRef={(ref) => (this.formRef = ref)}
            onSubmit={(data) =>
              performAnswers(
                data,
                this.props,
              )
            }
          >
          {phaseSelect?.question?.map((item, key) => {
            return (
              <div key={key} className="pl-3 pb-5">
                <h5>{`Questão ${key+1}`}</h5>
                <RadioGroup
                  className="pl-3"
                  label={item.question}
                  name={""+item.id}
                  options={item.answers.map((item) => ({
                    label: item,
                    value: item,
                  }))}
                />
              </div>
            );
          })}
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
                    "Enviar"
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

export default connect(null, mapDispatchToProps)(ModalQuestionStudent);
