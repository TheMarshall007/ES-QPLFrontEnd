import postTrail from "../../../models/trail/postTrail";
import jwt from "jwt-decode";
import getTrailPagination from "../../../models/trail/getTrailPagination";
import getByTrailId from "../../../models/trail/getByTrailId";
import postAnswer from "../../../models/trail/postAnswer";

function successAlert(props) {
  props.onAddAlert("Trilha inserida com sucesso!", "success");
}

function genericError(onAddAlert) {
  onAddAlert("Erro ao inserir trilha", "danger");
}

export function performTrail(data, props, loading, setState) {
  if (!loading) {
    setState({ buttonLoading: true }, () => {
      postTrail({
        name: data.name,
        difficulty: data.difficulty.toUpperCase(),
        phases: [
          {
            index: parseInt(data.index_1),
            questionsIds: [
              parseInt(data.question_1),
              parseInt(data.question_2),
              parseInt(data.question_3),
              parseInt(data.question_4),
            ],
          },
          {
            index: parseInt(data.index_2),
            questionsIds: [
              parseInt(data.question_5),
              parseInt(data.question_6),
              parseInt(data.question_7),
              parseInt(data.question_8),
            ],
          },
          {
            index: parseInt(data.index_3),
            questionsIds: [
              parseInt(data.question_9),
              parseInt(data.question_10),
              parseInt(data.question_11),
              parseInt(data.question_12),
            ],
          },
        ],
      })
        .then((res) => {
          if (res) {
            successAlert(props);
            props.onHide();
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

export function performGetTrail(loading, setTotalItems) {
  if (!loading) {
    const decodedToken = jwt(localStorage.getItem("token"));
    const userId = decodedToken?.userId;
    getTrailPagination({
      professorId: userId,
      page: 0,
    }).then((res) => {
      if (res) {
        setTotalItems(res);
      }
    });
  }
}

export function performGetByTrailId(data, setPhases) {
  getByTrailId(data).then((res) => {
    if (res) {
      setPhases(res);
    }
  });
}

export function performAnswers(data, props) {
  let answers = [];
  Object.keys(data).map((item) => {
    answers.push({ questionId: parseInt(item), answer: data[item] });
  });
  postAnswer({
    trailId: props.trailId,
    answers,
  }).then((res) => {
    if (res.ok) {
      props.onAddAlert("Respostas enviadas com sucesso!", "success");
      props.onHide();
    }
  });
}
