import { alertActions } from "../../store/actions/AlertActions";
import { api } from "../config";

export default async function getSubjects() {
  try {
    const response = await api.get("/subject/find_all");
    if (response.ok) {
      return response.data;
    }
    throw response;
  } catch (response) {
    alertActions.addAlert(
      response?.data?.message ?? "Erro ao recuperar as dificuldades!"
    );
    return null;
  }
}

