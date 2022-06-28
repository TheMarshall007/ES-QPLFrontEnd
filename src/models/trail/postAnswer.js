import { alertActions } from "../../store/actions/AlertActions";
import { api } from '../config';

export default async function postAnswer(data) {
  try {
    const response = await api.post('/trail/answer', data);
    if (response.ok) {
      return response;
    }
    throw response;
  } catch (response) {
    alertActions.addAlert(response?.data?.message ?? 'Erro ao inserir o respostas!',);
    return null;
  }
}
