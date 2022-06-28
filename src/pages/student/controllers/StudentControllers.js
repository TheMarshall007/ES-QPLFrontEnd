import getStudents from "../../../models/student/getStudent";
import postStudent from "../../../models/student/postStudent";

function successAlert(props) {
  props.onAddAlert("Estudante inserido com sucesso!", "success");
  props.history.push("/estudantes");
}

function genericError(onAddAlert) {
  onAddAlert("Erro ao inserir estudante", "danger");
}

export function performStudent(data, props, loading, setState) {
  if (!loading) {
    setState({ buttonLoading: true }, () => {
      postStudent({
        username: data.username,
        email: data.email,
        registration: data.registration,
      })
        .then((res) => {
          if (res) {
            successAlert(props);
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

export function performGetStudent(loading, setTotalItems) {
  if (!loading) {
    getStudents().then((res) => {
      if (res) {
        setTotalItems(res);
      }
    });
  }
}
