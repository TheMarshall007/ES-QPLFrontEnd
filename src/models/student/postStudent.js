import { alertActions } from "../../store/actions/AlertActions";
import { api } from '../config';

export default async function postStudent(data) {
  try {
    const response = await api.post('/user/insert_student', data);
    if (response.ok) {
      return response.data;
    }
    throw response;
  } catch (response) {
    alertActions.addAlert(response?.data?.message ?? 'Erro ao inserir o estudante!',);
    return null;
  }
}
