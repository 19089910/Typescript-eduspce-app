import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { 
  createEnrollment, 
  deleteEnrollment, 
  getAllEnrollments 
} from "@/services/enrollmentService";
import { ApiEnrollment } from '@/types';

interface EnrollmentContextType {
  enrollments: ApiEnrollment[];
  addEnrollment: (studentId: string | number, courseId: string | number) => Promise<ApiEnrollment>;
  removeEnrollment: (id: string) => Promise<void>;
  refreshEnrollments: () => Promise<void>;
}

const EnrollmentContext = createContext<EnrollmentContextType | undefined>(undefined);

export const EnrollmentProvider = ({ children }: { children: ReactNode }) => {
  const [enrollments, setEnrollments] = useState<ApiEnrollment[]>([]);

  const refreshEnrollments = useCallback(async () => {
    try {
      const data = await getAllEnrollments();
      setEnrollments(data);
    } catch (error) {
      console.error('Erro ao buscar matrículas:', error);
    }
  }, []);

  const addEnrollment = useCallback(async (studentId: string | number, courseId: string | number): Promise<ApiEnrollment> => {
    try {
      const newEnrollment = await createEnrollment({ studentId, courseId });
      setEnrollments((prev) => [...prev, newEnrollment]);
      return newEnrollment;
    } catch (error) {
      console.error('Erro ao criar matrícula:', error);
      throw error;
    }
  }, []);

  const removeEnrollment = useCallback(async (id: string): Promise<void> => {
    try {
      await deleteEnrollment(id);
      setEnrollments((prev) => prev.filter((enrollment) => String(enrollment.id) !== id));
    } catch (error) {
      console.error('Erro ao excluir matrícula:', error);
      throw error;
    }
  }, []);

  return (
    <EnrollmentContext.Provider value={{ enrollments, addEnrollment, removeEnrollment, refreshEnrollments }}>
      {children}
    </EnrollmentContext.Provider>
  );
};

export const useEnrollmentContext = (): EnrollmentContextType => {
  const context = useContext(EnrollmentContext);
  if (!context) {
    throw new Error('useEnrollmentContext deve ser usado dentro de um <EnrollmentProvider>');
  }
  return context;
};
