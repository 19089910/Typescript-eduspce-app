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
    const newStudent = {
      ...values,
      id: student?.id ?? 0,
      enrolledCourses: student?.enrolledCourses ?? 0 //futuramente ao criar usuario pode colocar ja curso
    };
    onSave(newStudent);
    onOpenChange(false);  // Fecha o modal após salvar
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
