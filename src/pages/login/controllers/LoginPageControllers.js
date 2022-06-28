import postLogin from "../../../models/login/postLogin";

function successAlert(props) {
  props.onAddAlert("Logado com sucesso!", "success");
  props.history.push("/");
}

function errorAlert(onAddAlert) {
  onAddAlert("Usuário e/ou senha inválido", "danger");
}
function noConnectionAlert(onAddAlert) {
  onAddAlert("Sem acesso ao serviço", "danger");
}

function genericError(onAddAlert) {
  onAddAlert("Erro ao logar", "danger");
}

export function performLogin(data, props, loading, setState) {
  if (!loading) {
    setState({ buttonLoading: true }, () => {
      postLogin({ password: data.password, username: data.username })
        .then((res) => {
          if (res) {
            successAlert(props);
          } else if (res.status === 500) {
            noConnectionAlert(props.onAddAlert);
          } else {
            errorAlert(props.onAddAlert);
          }
        })
        .catch(() => {
          genericError(props.onAddAlert);
        })
        .finally(() => {
          setState({ buttonLoading: false });
        });
    });
  }
}
