
export interface Student {
  id: string;
  name: string;
  email: string;
  birthDate: string;
  enrolledCourses: number;
}

export interface Course {
  id: string;
  name: string;
  description: string;
  enrolledStudents: number;
}

export interface Enrollment {
  id: string;
  studentId: string;
  studentName: string;
  courseId: string;
  courseName: string;
  enrollmentDate: string;
}

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

export type NewStudent = Omit<Student, "id" | "enrolledCourses">;
export type NewCourse = Omit<Course, "id" | "enrolledStudents">;

