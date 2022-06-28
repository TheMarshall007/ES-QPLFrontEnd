import { alertActions } from "../../store/actions/AlertActions";
import { api } from "../config";

export default async function getByTrailId(data) {
  try {
    const response = await api.get("/trail/get_by_trail_id?id="+ data);
    if (response.ok) {
      return response.data;
    }
    throw response;
  } catch (response) {
    alertActions.addAlert(
      response?.data?.message ?? "Erro ao recuperar as fases!"
    );
    return null;
  }
}
