import { alertActions } from "../../store/actions/AlertActions";
import { api } from '../config';

export default async function postLogin(data) {
  try {
    const response = await api.post('/auth/login', data);
    if (response.ok) {
      return response.data;
    }
    throw response;
  } catch (response) {
    alertActions.addAlert(response?.data?.message ?? 'Erro ao carregar o login!',);
    return null;
  }
}
