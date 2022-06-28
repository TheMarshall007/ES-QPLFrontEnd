import React, { Component } from "react";
import { Form, Button, Card } from "react-bootstrap";
import "./Login.css";
import { connect } from "react-redux";
import { alertActions } from "../../store/actions/AlertActions";
import packageJson from "../../../package.json";
import { performLogin } from "./controllers/LoginPageControllers";
import { InputPassword, InputEmail } from "../../genericComponents";
import { FormFull } from "form-full";

class Login extends Component {
  constructor(props) {
    super(props);
    this.mounted = true;
    this.state = {
      loginType: "cpf",
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
    const { buttonLoading } = this.state;

    return (
      <div>
        <div className="login-form w-100 h-100 d-flex">
          <div className="w-100 m-2 card-div">
            <Card className="login-form-wrapper" color="#c5c5c5">
              <FormFull
                formRef={(ref) => (this.formRef = ref)}
                onSubmit={(data) =>
                  performLogin(
                    data,
                    this.props,
                    this.state.buttonLoading,
                    this.performLoginCallback
                  )
                }
              >
                <Form.Row>
                  <InputEmail
                    name="username"
                    required="Campo obrigatório"
                    inputMaskProps={{
                      placeholder: `Informe seu Email`,
                    }}
                  />
                </Form.Row>
                <Form.Row>
                  <InputPassword
                    name="password"
                    required="Campo obrigatório"
                    inputMaskProps={{ placeholder: "Senha" }}
                  />
                </Form.Row>

                <div className="pt-3">
                  <Button
                    className="btn-block"
                    variant="success"
                    onClick={() => this.formRef.submit()}
                    disabled={buttonLoading}
                  >
                    {buttonLoading ? (
                      <div>
                        <i className="fas fa-circle-notch login-fa-spin-custom" />
                      </div>
                    ) : (
                      "Entrar"
                    )}
                  </Button>
                </div>
              </FormFull>
              <div className="text-center mt-1">
                <p>{packageJson.version}</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddAlert: (text, alertType, alertPriority) =>
      dispatch(alertActions.addAlert(text, alertType, alertPriority)),
  };
};

export default connect(null, mapDispatchToProps)(Login);
