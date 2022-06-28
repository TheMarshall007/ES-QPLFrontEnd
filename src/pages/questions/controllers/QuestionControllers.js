import jwt from "jwt-decode";
import getQuestion from "../../../models/question/getQuestion";
import postQuestion from "../../../models/question/postQuestion";
import getSubjects from "../../../models/subject/getSubjects";

function successAlert(props) {
  props.onAddAlert("Pergunta inserida com sucesso!", "success");
  // props.history.push("/perguntas");
}

function genericError(onAddAlert) {
  onAddAlert("Erro ao inserir a pergunta", "danger");
}

export function performQuestion(data, props, loading, setState) {
  if (!loading) {
    const decodedToken = jwt(localStorage.getItem("token"));
    const userId = decodedToken?.userId;
    let answers = [];
    answers.push(data.answer_1);
    answers.push(data.answer_2);
    answers.push(data.answer_3);
    answers.push(data.answer_4);
    setState({ buttonLoading: true }, () => {
      postQuestion({
        question: data.question,
        answers,
        correctAnswer: data.correctAnswer,
        subjectId: parseInt(data.subjectId),
        professorId: userId,
      })
        .then((res) => {
          if (res.ok) {
            successAlert(props);
            props.onHide();
          }
        })
        .finally(() => {
          setState({ buttonLoading: false }, )
        });
    });
  }
}

export function performGetQuestion(loading, setTotalItems) {
  if (!loading) {
    const decodedToken = jwt(localStorage.getItem("token"));
    const userId = decodedToken?.userId;
    getQuestion({
      professorId: userId,
      page: 0,
    }).then((res) => {
      if (res) {
        setTotalItems(res);
      }
    });
  }
}

export function performSubject(props, setState) {
  setState({}, () => {
    getSubjects().then((res) => {
      let difficulty = [];
      res.forEach((element) => {
        difficulty.push({ label: element.name, value: element.id });
      });
      setState({ difficulty });
    });
  });
}
