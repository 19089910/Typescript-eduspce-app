import api from "./api";
import { Course } from "../types";

// Function to get all courses
export const getCourses = async (): Promise<Course[]> => {
  const response = await api.get<Course[]>("/course");
  return response.data;
};

// Function to create a new course
export const createCourse = async (course: Course): Promise<Course> => {
  const response = await api.post<Course>("/course", course);
  return response.data;
};

// Function to update an existing course
export const updateCourse = async (id: string, course: Partial<Course>): Promise<Course> => {
  const response = await api.put<Course>(`/course/${id}`, course);
  return response.data;
};

// Function to delete a course
export const deleteCourse = async (id: string): Promise<void> => {
  await api.delete(`/course/${id}`);
};
