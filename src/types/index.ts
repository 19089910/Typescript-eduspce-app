
export interface Student {
  id: number;
  name: string;
  email: string;
  birthDate: string;
  enrolledCourses: number;
}

export interface Course {
  id: string;
  name: string;
  description: string;
  enrolledCourses: number;
}

export type CreateEnrollment = {
  studentId: string;
  courseId: string;
};
// Interface da resposta da API para Matrícula
export interface ApiEnrollment {
  id: number;
  studentId: number;
  student: {
    id: number;
    name: string;
    email: string;
    birthDate: string;
  };
  courseId: number;
  course: {
    id: number;
    name: string;
    description: string;
  };
  enrollmentDate: string;
}

export interface Stats {
  students: number;
  courses: number;
  enrollments: number;
}

export type NewStudent = Omit<Student, "id" | "enrolledCourses">;
export type NewCourse = Omit<Course, "id" | "enrolledStudents">;

