
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileSignature, Search, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Enrollment } from '@/types';
import { toast } from 'sonner';
import DeleteConfirmDialog from '@/components/shared/DeleteConfirmDialog';

const EnrollmentsPage = () => {
  // Mock data - would be fetched from API in a real app
  const initialEnrollments: Enrollment[] = [
    { id: '1', studentId: '1', studentName: 'Ana Silva', courseId: '1', courseName: 'Matemática Avançada', enrollmentDate: '2023-02-15' },
    { id: '2', studentId: '1', studentName: 'Ana Silva', courseId: '5', courseName: 'Programação em Python', enrollmentDate: '2023-03-05' },
    { id: '3', studentId: '2', studentName: 'Bruno Santos', courseId: '2', courseName: 'Física Quântica', enrollmentDate: '2023-02-10' },
    { id: '4', studentId: '2', studentName: 'Bruno Santos', courseId: '3', courseName: 'Literatura Brasileira', enrollmentDate: '2023-02-22' },
    { id: '5', studentId: '2', studentName: 'Bruno Santos', courseId: '4', courseName: 'História Mundial', enrollmentDate: '2023-03-15' },
    { id: '6', studentId: '4', studentName: 'Daniela Lima', courseId: '5', courseName: 'Programação em Python', enrollmentDate: '2023-03-18' },
  ];

  const [enrollments, setEnrollments] = useState<Enrollment[]>(initialEnrollments);
  const [studentSearchQuery, setStudentSearchQuery] = useState('');
  const [courseSearchQuery, setCourseSearchQuery] = useState('');
  
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [enrollmentToDelete, setEnrollmentToDelete] = useState<Enrollment | null>(null);

  // Filter enrollments based on search criteria
  const filteredEnrollments = enrollments.filter(enrollment => 
    enrollment.studentName.toLowerCase().includes(studentSearchQuery.toLowerCase()) &&
    enrollment.courseName.toLowerCase().includes(courseSearchQuery.toLowerCase())
  );

  const handleDeleteEnrollment = (enrollment: Enrollment) => {
    setEnrollmentToDelete(enrollment);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteEnrollment = () => {
    if (enrollmentToDelete) {
      setEnrollments(enrollments.filter(e => e.id !== enrollmentToDelete.id));
      toast.success(`Matrícula removida com sucesso!`);
      setDeleteDialogOpen(false);
      setEnrollmentToDelete(null);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Matrículas</h1>
          <p className="text-muted-foreground">Gerencie as matrículas dos alunos nos cursos</p>
        </div>
        <Link to="/enrollments/new">
          <Button className="gap-1">
            <FileSignature className="h-4 w-4" />
            Nova Matrícula
          </Button>
        </Link>
      </div>

      <Card className="glass-card">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative w-full">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Buscar por aluno..." 
                className="pl-8" 
                value={studentSearchQuery}
                onChange={(e) => setStudentSearchQuery(e.target.value)}
              />
            </div>
            <div className="relative w-full">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Buscar por curso..." 
                className="pl-8" 
                value={courseSearchQuery}
                onChange={(e) => setCourseSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Aluno</TableHead>
                  <TableHead>Curso</TableHead>
                  <TableHead>Data de Matrícula</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEnrollments.length > 0 ? (
                  filteredEnrollments.map((enrollment) => (
                    <TableRow key={enrollment.id}>
                      <TableCell className="font-medium">{enrollment.studentName}</TableCell>
                      <TableCell>{enrollment.courseName}</TableCell>
                      <TableCell>{new Date(enrollment.enrollmentDate).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" onClick={() => handleDeleteEnrollment(enrollment)}>
                          <X className="h-4 w-4" />
                          <span className="sr-only">Remover Matrícula</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center">
                      Nenhuma matrícula encontrada.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Remover Matrícula"
        description={`Tem certeza que deseja remover a matrícula de ${enrollmentToDelete?.studentName} no curso ${enrollmentToDelete?.courseName}?`}
        onConfirm={confirmDeleteEnrollment}
      />
    </div>
  );
};

export default EnrollmentsPage;
