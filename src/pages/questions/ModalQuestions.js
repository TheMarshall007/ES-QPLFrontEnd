import React, { Component } from "react";
import { Modal, Row, Col, Button } from "react-bootstrap";
import { Input, Select } from "../../genericComponents";
import { FormFull } from "form-full";
import {
  performQuestion,
  performSubject,
} from "./controllers/QuestionControllers";
import { connect } from "react-redux";
import { alertActions } from "../../store/actions/AlertActions";

class ModalQuestions extends Component {
  constructor(props) {
    super(props);
    this.mounted = true;
    this.state = {
      buttonLoading: false,
      difficulty: [],
    };
  }

  componentDidMount() {
    performSubject(this.props, this.performCallback);
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  performCallback = (state, callback) => {
    this.setState(state, callback);
    console.log("ENTROI AQUI");
  };

  render() {
    const { show, onHide } = this.props;
    const { difficulty } = this.state;
    return (
      <Modal show={show} onHide={onHide} centered backdrop="static" size="md">
        <Modal.Header closeButton>Perguntas</Modal.Header>
        <Modal.Body>
          <FormFull
            formRef={(ref) => (this.formRef = ref)}
            onSubmit={(data) =>
              performQuestion(
                data,
                this.props,
                this.state.buttonLoading,
                this.performCallback
              )
            }
          >
            <Input
              name={"question"}
              label="Enunciado"
              required="Campo obrigatório"
            />
            <Input
              name={"correctAnswer"}
              label="Resposta"
              required="Campo obrigatório"
            />
            <Select
              label="Dificuldade da pergunta"
              name="subjectId"
              required="Campo obrigatório"
              placeholder="Selecione uma dificuldade"
              options={difficulty.map((item) => ({
                label: item.label,
                value: item.value,
              }))}
            />
            <Input
              name={"answer_1"}
              label="Alternativa 1"
              required="Campo obrigatório"
            />
            <Input
              name={"answer_2"}
              label="Alternativa 2"
              required="Campo obrigatório"
            />
            <Input
              name={"answer_3"}
              label="Alternativa 3"
              required="Campo obrigatório"
            />
            <Input
              name={"answer_4"}
              label="Alternativa 4"
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

export default connect(null, mapDispatchToProps)(ModalQuestions);
