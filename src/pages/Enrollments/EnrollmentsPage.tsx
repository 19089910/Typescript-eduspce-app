import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileSignature, Search, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ApiEnrollment } from '@/types';
import { toast } from 'sonner';
import DeleteConfirmDialog from '@/components/shared/DeleteConfirmDialog';
import { getAllEnrollments, deleteEnrollment } from '@/services/enrollmentService';
import { useDeleteItem } from '@/hooks/use-deleteItem';

const EnrollmentsPage = () => {
  const [enrollments, setEnrollments] = useState<ApiEnrollment[]>([]);
  const [studentSearchQuery, setStudentSearchQuery] = useState('');
  const [courseSearchQuery, setCourseSearchQuery] = useState('');

  const fetchEnrollments = async () => {
    try {
      const response = await getAllEnrollments();
      setEnrollments(response);
    } catch (error) {
      toast.error('Erro ao carregar matrículas');
      console.error('Error fetching enrollments:', error);
    }
  };

  // Hook to manage enrollment deletions
  const { 
    itemToDelete: enrollmentToDelete, 
    deleteDialogOpen, 
    isDeleting, 
    handleDeleteClick, 
    confirmDelete: confirmDeleteEnrollment, 
    setDeleteDialogOpen 
  } = useDeleteItem<ApiEnrollment>(
    deleteEnrollment, 
    fetchEnrollments
  );

 // Load courses when assembling the component
  useEffect(() => {
    fetchEnrollments();
  }, []);

  const filteredEnrollments = enrollments.filter(enrollment =>
    enrollment.student?.name?.toLowerCase().includes(studentSearchQuery.toLowerCase()) &&
    enrollment.course?.name?.toLowerCase().includes(courseSearchQuery.toLowerCase())
  );

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
                      <TableCell className="font-medium">{enrollment.student?.name || "Nome não disponível"}</TableCell>
                      <TableCell>{enrollment.course?.name || "Curso não disponível"}</TableCell>
                      <TableCell>{new Date(enrollment.enrollmentDate).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleDeleteClick(enrollment)}
                          disabled={isDeleting}
                        >
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
        description={`Tem certeza que deseja remover a matrícula de ${enrollmentToDelete?.student?.name ?? ''} no curso ${enrollmentToDelete?.course?.name ?? ''}?`}
        onConfirm={confirmDeleteEnrollment}
      />
    </div>
  );
};

export default EnrollmentsPage;
