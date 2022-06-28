import { alertActions } from "../../store/actions/AlertActions";
import { api } from "../config";

export default async function postQuestion(data) {
  try {
    const response = await api.post("/question/insert", data);
    if (response.ok) {
      return response;
    }
    throw response;
  } catch (response) {
    alertActions.addAlert(
      response?.data?.message ?? "Erro ao inserir a questão!"
    );
    return null;
  }
}
