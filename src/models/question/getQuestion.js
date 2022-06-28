import { alertActions } from "../../store/actions/AlertActions";
import { api } from "../config";

export default async function getQuestion(data) {
  try {
    const response = await api.post("/question/pagination", data);
    if (response.ok) {
      return response.data;
    }
    throw response;
  } catch (response) {
    alertActions.addAlert(
      response?.data?.message ?? "Erro ao recuperar as questões!"
    );
    return null;
  }
}
