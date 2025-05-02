import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
    useCallback,
  } from "react";
  import {
    getAllCourses,
    createCourse,
    deleteCourse,
    updateCourse,
  } from "@/services/courseService";
  import { Course, NewCourse } from "@/types";
  
  interface CourseContextType {
    courses: Course[];
    addCourse: (course: NewCourse) => Promise<void>;
    removeCourse: (id: string) => Promise<void>;
    editCourse: (id: string, data: Partial<Course>) => Promise<void>;
    refreshCourses: () => Promise<void>;
  }
  
  const CourseContext = createContext<CourseContextType | undefined>(undefined);
  
  export const CourseProvider = ({ children }: { children: ReactNode }) => {
    const [courses, setCourses] = useState<Course[]>([]);
  
    const refreshCourses = useCallback(async () => {
      const data = await getAllCourses();
      setCourses(data);
    }, []);
  
    useEffect(() => {
      refreshCourses();
    }, [refreshCourses]);
  
    const addCourse = async (course: NewCourse) => {
      const newCourse = await createCourse(course);
      setCourses((prev) => [...prev, newCourse]);
    };
  
    const removeCourse = async (id: string) => {
      await deleteCourse(id);
      setCourses((prev) => prev.filter((course) => course.id !== id));
    };
  
    const editCourse = async (id: string, data: Partial<Course>) => {
      const updated = await updateCourse(id, data);
      setCourses((prev) =>
        prev.map((course) => (course.id === id ? updated : course))
      );
    };
  
    return (
      <CourseContext.Provider
        value={{ courses, addCourse, removeCourse, editCourse, refreshCourses }}
      >
        {children}
      </CourseContext.Provider>
    );
  };
  
  export const useCourseContext = (): CourseContextType => {
    const context = useContext(CourseContext);
    if (!context) {
      throw new Error("useCourseContext deve ser usado dentro de um CourseProvider");
    }
    return context;
  };
  