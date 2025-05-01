import { Enrollment, ApiEnrollment} from "../types";
import api from "./api";

// Service to interact with the backend for enrollment operations

// Create a new enrollment
export const createEnrollment = async (enrollment: Enrollment): Promise<Enrollment> => {
  try {
    // Converter para o formato esperado pela API
    const apiEnrollment = {
      studentId: Number(enrollment.studentId),
      courseId: Number(enrollment.courseId)
    };
    
    const response = await api.post<ApiEnrollment>("/enrollment", apiEnrollment);
    
    // Converter a resposta de volta para o formato do nosso app
    return {
      id: String(response.data.id),
      studentId: String(response.data.studentId),
      studentName: response.data.student?.name || "",
      courseId: String(response.data.courseId),
      courseName: response.data.course?.name || "",
      enrollmentDate: new Date(response.data.enrollmentDate).toISOString().split('T')[0]
    };
  } catch (error) {
    console.error("Error creating enrollment:", error);
    throw error;
  }
};

// Get a list of students enrolled in a course by course name
export const getStudentsByCourse = async (courseName: string): Promise<Enrollment[]> => {
  try {
    const response = await api.get<Enrollment[]>(`/enrollment/curso/${courseName}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching students by course:", error);
    throw error;
  }
};

// Get a list of courses a student is enrolled in by student name
export const getCoursesByStudent = async (studentName: string): Promise<Enrollment[]> => {
  try {
    const response = await api.get<Enrollment[]>(`/enrollment/aluno/${studentName}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching courses by student:", error);
    throw error;
  }
};

// Get enrollment details by ID
export const getEnrollmentById = async (id: string): Promise<Enrollment> => {
  try {
    const response = await api.get<Enrollment>(`/enrollment/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching enrollment by ID:", error);
    throw error;
  }
};

// Get all enrollments
export const getAllEnrollments = async (): Promise<ApiEnrollment[]> => {
  try {
    const response = await api.get<ApiEnrollment[]>("/enrollment");
    return response.data;
  } catch (error) {
    console.error("Error fetching all enrollments:", error);
    throw error;
  }
};

// Delete an enrollment by ID
export const deleteEnrollment = async (id: string): Promise<void> => {
  try {
    await api.delete(`/enrollment/${id}`);
  } catch (error) {
    console.error("Error deleting enrollment:", error);
    throw error;
  }
};
