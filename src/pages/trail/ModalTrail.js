import React, { Component } from "react";
import { Modal, Row, Col, Button,  } from "react-bootstrap";
import {
  Input,
  Select,
} from "../../genericComponents";
import { FormFull } from "form-full";
import { performTrail } from "./controllers/TrailControllers";
import { connect } from "react-redux";
import { alertActions } from "../../store/actions/AlertActions";
import {
  performGetQuestion,
  performSubject,
} from "../questions/controllers/QuestionControllers";

class ModalTrail extends Component {
  constructor(props) {
    super(props);
    this.mounted = true;
    this.state = {
      buttonLoading: false,
      difficulty: [],
      questions: [],
      phaseNumber: [{ label: 1 }, { label: 2 }, { label: 3 }],
    };
  }
  componentDidMount() {
    performSubject(this.props, this.performLoginCallback);
    performGetQuestion(false, this.performQuestionCallback);
  }
  componentWillUnmount() {
    this.mounted = false;
  }

  performQuestionCallback = (questions) => {
    let data = [];
    questions.content
      .map((item) =>
        data.push({
          label: item.question,
          value: item.id,
        })
      )
      .sort((a, b) => (a.id > b.id ? 1 : -1));
    this.setState({ questions: data });
  };

  performLoginCallback = (state, callback) => {
    if (this.mounted) {
      this.setState(state, callback);
    }
  };

  render() {
    const { show, onHide } = this.props;
    const { difficulty, questions, phaseNumber } = this.state;
    return (
      <Modal
        show={show}
        onHide={onHide}
        scrollable={true}
        centered
        backdrop="static"
        size="xl"
      >
        <Modal.Header closeButton>Trilha</Modal.Header>
        <Modal.Body>
          <FormFull
            formRef={(ref) => (this.formRef = ref)}
            onSubmit={(data) =>
              performTrail(
                data,
                this.props,
                this.state.buttonLoading,
                this.performLoginCallback
              )
            }
          >
            <Input name={"name"} label="Nome" required="Campo obrigatório" />
            <Select
              label="Dificuldade da pergunta"
              name="difficulty"
              required="Campo obrigatório"
              placeholder="Selecione uma dificuldade"
              options={difficulty.map((item) => ({
                label: item.label,
                value: item.label,
              }))}
            />
            {/* FASE 1 */}
            <h5 className="pl-3 pt-3">{"Fase 1"}</h5>
            <Select
              label="Número da fase"
              name="index_1"
              required="Campo obrigatório"
              placeholder="Selecione um numero para fase"
              options={phaseNumber.map((item) => ({
                label: item.label,
                value: item.label,
              }))}
            />
            <Select
              label="Pergunta 1"
              name="question_1"
              required="Campo obrigatório"
              placeholder="Selecione uma pergunta"
              options={questions.map((item) => ({
                label: item.label,
                value: item.value,
              }))}
            />
            <Select
              label="Pergunta 2"
              name="question_2"
              required="Campo obrigatório"
              placeholder="Selecione uma pergunta"
              options={questions.map((item) => ({
                label: item.label,
                value: item.value,
              }))}
            />
            <Select
              label="Pergunta 3"
              name="question_3"
              required="Campo obrigatório"
              placeholder="Selecione uma pergunta"
              options={questions.map((item) => ({
                label: item.label,
                value: item.value,
              }))}
            />
            <Select
              label="Pergunta 4"
              name="question_4"
              required="Campo obrigatório"
              placeholder="Selecione uma pergunta"
              options={questions.map((item) => ({
                label: item.label,
                value: item.value,
              }))}
            />
            {/* FASE 2 */}
            <h5 className="pl-3 pt-3">{"Fase 2"}</h5>
            <Select
              label="Número da fase"
              name="index_2"
              required="Campo obrigatório"
              placeholder="Selecione um numero para fase"
              options={phaseNumber.map((item) => ({
                label: item.label,
                value: item.label,
              }))}
            />
            <Select
              label="Pergunta 1"
              name="question_5"
              required="Campo obrigatório"
              placeholder="Selecione uma pergunta"
              options={questions.map((item) => ({
                label: item.label,
                value: item.value,
              }))}
            />
            <Select
              label="Pergunta 2"
              name="question_6"
              required="Campo obrigatório"
              placeholder="Selecione uma pergunta"
              options={questions.map((item) => ({
                label: item.label,
                value: item.value,
              }))}
            />
            <Select
              label="Pergunta 3"
              name="question_7"
              required="Campo obrigatório"
              placeholder="Selecione uma pergunta"
              options={questions.map((item) => ({
                label: item.label,
                value: item.value,
              }))}
            />
            <Select
              label="Pergunta 4"
              name="question_8"
              required="Campo obrigatório"
              placeholder="Selecione uma pergunta"
              options={questions.map((item) => ({
                label: item.label,
                value: item.value,
              }))}
            />
            {/* FASE 3 */}
            <h5 className="pl-3 pt-3">{"Fase 3"}</h5>
            <Select
              label="Número da fase"
              name="index_3"
              required="Campo obrigatório"
              placeholder="Selecione um numero para fase"
              options={phaseNumber.map((item) => ({
                label: item.label,
                value: item.label,
              }))}
            />
            <Select
              label="Pergunta 1"
              name="question_9"
              required="Campo obrigatório"
              placeholder="Selecione uma pergunta"
              options={questions.map((item) => ({
                label: item.label,
                value: item.value,
              }))}
            />
            <Select
              label="Pergunta 2"
              name="question_10"
              required="Campo obrigatório"
              placeholder="Selecione uma pergunta"
              options={questions.map((item) => ({
                label: item.label,
                value: item.value,
              }))}
            />
            <Select
              label="Pergunta 3"
              name="question_11"
              required="Campo obrigatório"
              placeholder="Selecione uma pergunta"
              options={questions.map((item) => ({
                label: item.label,
                value: item.value,
              }))}
            />
            <Select
              label="Pergunta 4"
              name="question_12"
              required="Campo obrigatório"
              placeholder="Selecione uma pergunta"
              options={questions.map((item) => ({
                label: item.label,
                value: item.value,
              }))}
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

export default connect(null, mapDispatchToProps)(ModalTrail);
