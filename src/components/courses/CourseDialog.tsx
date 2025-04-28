import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Course } from '@/types';
import { CourseForm } from './CourseForm';

interface CourseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  course: Course | null;
  onSave: (course: Course) => void;
}

const CourseDialog: React.FC<CourseDialogProps> = ({ 
  open, 
  onOpenChange,
  course,
  onSave
}) => {
  const handleSubmit = (values: Omit<Course, 'id' | 'enrolledStudents'>) => {
    onSave({
      ...values,
      id: course?.id || '',
      enrolledStudents: course?.enrolledStudents || 0
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-card sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{course ? 'Editar Curso' : 'Novo Curso'}</DialogTitle>
        </DialogHeader>
        <CourseForm onSubmit={handleSubmit} defaultValues={course || undefined} />
      </DialogContent>
    </Dialog>
  );
};

export default CourseDialog;
