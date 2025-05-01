import { ApiEnrollment } from "../types";
import api from "./api";

// Cria uma nova matrícula
export const createEnrollment = async (enrollment: {
  studentId: string | number;
  courseId: string | number;
}): Promise<ApiEnrollment> => {
  try {
    const payload = {
      studentId: Number(enrollment.studentId),
      courseId: Number(enrollment.courseId),
    };

    const response = await api.post<ApiEnrollment>("/enrollment", payload);
    return response.data;
  } catch (error) {
    console.error("Error creating enrollment:", error);
    throw error;
  }
};

// Lista de alunos matriculados em um curso por nome do curso
export const getStudentsByCourse = async (courseName: string): Promise<ApiEnrollment[]> => {
  try {
    const response = await api.get<ApiEnrollment[]>(`/enrollment/curso/${courseName}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching students by course:", error);
    throw error;
  }
};

// Lista de cursos em que o aluno está matriculado por nome do aluno
export const getCoursesByStudent = async (studentName: string): Promise<ApiEnrollment[]> => {
  try {
    const response = await api.get<ApiEnrollment[]>(`/enrollment/aluno/${studentName}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching courses by student:", error);
    throw error;
  }
};

// Busca matrícula por ID
export const getEnrollmentById = async (id: string): Promise<ApiEnrollment> => {
  try {
    const response = await api.get<ApiEnrollment>(`/enrollment/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching enrollment by ID:", error);
    throw error;
  }
};

// Lista todas as matrículas
export const getAllEnrollments = async (): Promise<ApiEnrollment[]> => {
  try {
    const response = await api.get<ApiEnrollment[]>("/enrollment");
    return response.data;
  } catch (error) {
    console.error("Error fetching all enrollments:", error);
    throw error;
  }
};

// Exclui uma matrícula por ID
export const deleteEnrollment = async (id: string): Promise<void> => {
  try {
    await api.delete(`/enrollment/${id}`);
  } catch (error) {
    console.error("Error deleting enrollment:", error);
    throw error;
  }
};
