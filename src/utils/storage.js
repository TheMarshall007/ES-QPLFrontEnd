export const getView = () => localStorage.getItem("view");
export const isStudentView = () =>
  localStorage.getItem("view") === "student_view";
export const isTeacherView = () => localStorage.getItem("view") === "teacher_view";
export const setView = (isStudent) =>
  localStorage.setItem("view", isStudent ? "student_view" : "teacher_view");
