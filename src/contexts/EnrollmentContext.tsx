import React, { createContext, useContext, useEffect, useState } from 'react';
import { ApiEnrollment } from '../types';

interface EnrollmentContextType {
  enrollments: (ApiEnrollment & { quantity: number })[];
  addEnrollment: (enrollment: ApiEnrollment) => void;
  deleteEnrollment: (id: number) => void;
  decreaseEnrollment: (id: number) => void;
  refreshEnrollments: () => void;
}

const EnrollmentContext = createContext<EnrollmentContextType | undefined>(undefined);

export const EnrollmentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [enrollments, setEnrollments] = useState<(ApiEnrollment & { quantity: number })[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('app:enrollments');
    if (stored) {
      setEnrollments(JSON.parse(stored));
    }
  }, []);

  const saveToLocalStorage = (data: (ApiEnrollment & { quantity: number })[]) => {
    localStorage.setItem('app:enrollments', JSON.stringify(data));
  };

  const addEnrollment = (enrollment: ApiEnrollment) => {
    const index = enrollments.findIndex(e => e.course.id === enrollment.course.id && e.student.id === enrollment.student.id);

    let updated: (ApiEnrollment & { quantity: number })[];

    if (index !== -1) {
      updated = [...enrollments];
      updated[index].quantity += 1;
    } else {
      updated = [...enrollments, { ...enrollment, quantity: 1 }];
    }

    setEnrollments(updated);
    saveToLocalStorage(updated);
  };

  const deleteEnrollment = (id: number) => {
    const updated = enrollments.filter(e => e.id !== id);
    setEnrollments(updated);
    saveToLocalStorage(updated);
  };

  const decreaseEnrollment = (id: number) => {
    const index = enrollments.findIndex(e => e.id === id);

    if (index === -1) return;

    const current = enrollments[index];
    if (current.quantity > 1) {
      const updated = [...enrollments];
      updated[index].quantity -= 1;
      setEnrollments(updated);
      saveToLocalStorage(updated);
    } else {
      deleteEnrollment(id);
    }
  };

  const refreshEnrollments = () => {
    const stored = localStorage.getItem('app:enrollments');
    if (stored) {
      setEnrollments(JSON.parse(stored));
    }
  };

  return (
    <EnrollmentContext.Provider value={{ enrollments, addEnrollment, deleteEnrollment, decreaseEnrollment, refreshEnrollments }}>
      {children}
    </EnrollmentContext.Provider>
  );
};

export const useEnrollment = () => {
  const context = useContext(EnrollmentContext);
  if (!context) throw new Error('useEnrollment must be used within EnrollmentProvider');
  return context;
};
