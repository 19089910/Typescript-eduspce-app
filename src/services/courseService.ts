import api from "./api";
import { Course, NewCourse } from "../types";

// Create a new course
export const createCourse = async (course: NewCourse): Promise<Course> => {
  const response = await api.post<Course>("/course", course);
  return response.data;
};

// Update an existing course
export const updateCourse = async (id: string, course: Partial<Course>): Promise<Course> => {
  const response = await api.put<Course>(`/course/${id}`, course);
  return response.data;
};

// Get all courses
export const getAllCourses = async (): Promise<Course[]> => {
  const response = await api.get<Course[]>("/course");
  return response.data;
};

// Delete a course by ID
export const deleteCourse = async (id: string): Promise<void> => {
  await api.delete(`/course/${id}`);
};
