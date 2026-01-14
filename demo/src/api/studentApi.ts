import api from "./axios";
import type{ Student } from "../types/student";
 type abc =
 { message : String;
  student : Student;

 }

//export const getStudents = () => api.get<Student[]>("/student");
export const getStudents = async (): Promise<Student[]> => {
  const res = await api.get<Student[]>("/student");
  return res.data;
};
export const addStudent = (student: Omit<Student, "id">) =>
  api.post<abc>("/student", student);
export const updateStudent = (student: Student) =>
  api.put<abc>(`/student/${student.id}`, student);

export const deleteStudent = (id: number) =>
  api.delete(`/student/${id}`);
