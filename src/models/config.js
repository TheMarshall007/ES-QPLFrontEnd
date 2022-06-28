import { create } from "apisauce";
import { setView } from "../utils/storage";
import jwt from "jwt-decode";

const BASE_URL = "https://quiz-backend-es.herokuapp.com";
// const BASE_URL = "http://localhost:8080";

export const api = create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    authorization: localStorage.getItem("token"),
  },
});

api.addRequestTransform((request) => {
  const token = localStorage.getItem("token");
  if (token) {
    request.headers.authorization = `${token}`;
  }
});

api.addMonitor((response) => {
  const responseToken = response?.data?.token;
  if (responseToken) {
    localStorage.setItem("token", "Bearer " + responseToken);
    if (localStorage.getItem("view") === null) {
      const is_student = jwt(responseToken).roles[0] === "ROLE_STUDENT";
      setView(is_student);
    }
  }
});

// api.addMonitor((response) => {
//   if (
//     response.config.url !== "/login" &&
//     (response.status === 401 || response.status === 403)
//   ) {
//     localStorage.removeItem("token");
//     window.location.href = "/";
//   }
// });
