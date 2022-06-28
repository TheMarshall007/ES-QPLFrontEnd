import { alertActions } from "../../store/actions/AlertActions";
import { api } from '../config';

export default async function getStudents() {
  try {
    const response = await api.get('/user/get_students');
    if (response.ok) {
      return response.data;
    }
    throw response;
  } catch (response) {
    alertActions.addAlert(response?.data?.message ?? 'Erro ao inserir o estudante!',);
    return null;
  }
}
