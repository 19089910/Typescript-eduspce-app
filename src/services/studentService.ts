import { Student, NewStudent } from "@/types";
import api from "./api";
// Service to interact with the backend for student operations

// Create a new student
export const createStudent = async (student: NewStudent): Promise<Student> => {
  try {
    const response = await api.post<Student>("/student", student);
    return response.data;
  } catch (error) {
    console.error("Error creating student:", error);
    throw error;
  }
};

// Update an existing student
export const updateStudent = async (id: number, student: Partial<Student>): Promise<Student> => {
  try {
    const response = await api.put<Student>(`/student/${id}`, student);
    return response.data;
  } catch (error) {
    console.error("Error updating student:", error);
    throw error;
  }
};

// Get a student by ID
export const getStudentById = async (id: number): Promise<Student> => {
  try {
    const response = await api.get<Student>(`/student/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching student:", error);
    throw error;
  }
};

// Get all students
export const getAllStudents = async (): Promise<Student[]> => {
  try {
    const response = await api.get<Student[]>("/student");
    return response.data;
  } catch (error) {
    console.error("Error fetching students:", error);
    throw error;
  }
};

// Delete a student by ID
export const deleteStudent = async (id: string): Promise<void> => {
  try {
    await api.delete(`/student/${id}`);
  } catch (error) {
    console.error("Error deleting student:", error);
    throw error;
  }
};
