import { alertActions } from "../../store/actions/AlertActions";
import { api } from "../config";

export default async function getTrailPagination(data) {
  try {
    const response = await api.post("/trail/pagination", data);
    if (response.ok) {
      return response.data;
    }
    throw response;
  } catch (response) {
    alertActions.addAlert(
      response?.data?.message ?? "Erro ao recuperar as trilha!"
    );
    return null;
  }
}
