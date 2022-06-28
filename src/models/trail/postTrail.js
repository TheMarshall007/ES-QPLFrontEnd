import { alertActions } from "../../store/actions/AlertActions";
import { api } from '../config';

export default async function postTrail(data) {
  try {
    const response = await api.post('/trail/insert', data);
    if (response.ok) {
      return response;
    }
    throw response;
  } catch (response) {
    alertActions.addAlert(response?.data?.message ?? 'Erro ao inserir o trilha!',);
    return null;
  }
}
