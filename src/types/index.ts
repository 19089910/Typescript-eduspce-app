
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

export type NewStudent = Omit<Student, "id" | "enrolledCourses">;
export type NewCourse = Omit<Course, "id" | "enrolledStudents">;

