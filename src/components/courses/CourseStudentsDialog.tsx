import React, { useState }  from 'react';
import { Dialog, DialogContent, DialogHeader, DialogDescription } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';
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
  const initialStudents = [
    { id: '1', name: 'Ana Silva', email: 'ana@email.com', enrollmentDate: '2024-04-15' },
    { id: '2', name: 'Bruno Santos', email: 'bruno@email.com', enrollmentDate: '2024-04-16' },
    { id: '3', name: 'Carlos Lima', email: 'carlos@email.com', enrollmentDate: '2024-04-17' },
  ];

  const [students, setStudents] = useState(initialStudents);

  const handleRemoveStudent = (studentId: string) => {
    setStudents(students.filter(student => student.id !== studentId));
    toast.success('Aluno removido do curso com sucesso');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-card sm:max-w-[800px]">
        <DialogHeader>
          <DialogDescription>
            Total de {students.length} alunos matriculados neste curso
          </DialogDescription>
        </DialogHeader>
        
        {students.length > 0 ? (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>E-mail</TableHead>
                  <TableHead>Data de Matrícula</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>{new Date(student.enrollmentDate).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveStudent(student.id)}
                        className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Remover aluno</span>
                      </Button>
                    </TableCell>
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
