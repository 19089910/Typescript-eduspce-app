import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Course } from '@/types';

interface CourseStudentsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  course: Course;
}

const CourseStudentsDialog: React.FC<CourseStudentsDialogProps> = ({ 
  open, 
  onOpenChange,
  course
}) => {
  // Mock data for students - in a real app, this would come from an API
  const mockStudents = [
    { id: '1', name: 'Ana Silva', email: 'ana@email.com', enrollmentDate: '2024-04-15' },
    { id: '2', name: 'Bruno Santos', email: 'bruno@email.com', enrollmentDate: '2024-04-16' },
    { id: '3', name: 'Carlos Lima', email: 'carlos@email.com', enrollmentDate: '2024-04-17' },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-card sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Alunos Matriculados - {course.name}</DialogTitle>
        </DialogHeader>
        
        {course.enrolledStudents > 0 ? (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>E-mail</TableHead>
                  <TableHead>Data de Matrícula</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>{new Date(student.enrollmentDate).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            Nenhum aluno matriculado neste curso.
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CourseStudentsDialog;
