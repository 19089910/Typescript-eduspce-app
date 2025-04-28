
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Student } from '@/types';
import { StudentForm } from './StudentForm';

interface StudentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  student: Student | null;
  onSave: (student: Student) => void;
}

const StudentDialog: React.FC<StudentDialogProps> = ({ 
  open, 
  onOpenChange,
  student,
  onSave
}) => {
  const handleSubmit = (values: Omit<Student, 'id' | 'enrolledCourses'>) => {
    onSave({
      ...values,
      id: student?.id || '',
      enrolledCourses: student?.enrolledCourses || 0
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-card sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{student ? 'Editar Aluno' : 'Novo Aluno'}</DialogTitle>
        </DialogHeader>
        <StudentForm onSubmit={handleSubmit} defaultValues={student || undefined} />
      </DialogContent>
    </Dialog>
  );
};

export default StudentDialog;
