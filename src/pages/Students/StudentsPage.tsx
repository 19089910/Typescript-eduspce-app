
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { UserPlus, Search, Edit, Trash2, PlusCircle } from 'lucide-react';
import StudentDialog from '@/components/students/StudentDialog';
import { Student } from '@/types';
import { toast } from 'sonner';
import DeleteConfirmDialog from '@/components/shared/DeleteConfirmDialog';
import { useIsMobile } from '@/hooks/use-mobile';
import StudentsCourseDialog from '@/components/students/StudentsCourseDialog';

const StudentsPage = () => {
  // Mock data - would be fetched from API in a real app
  const initialStudents: Student[] = [
    { id: '1', name: 'Ana Silva', email: 'ana.silva@email.com', birthDate: '1995-05-15', enrolledCourses: 2 },
    { id: '2', name: 'Bruno Santos', email: 'bruno.santos@email.com', birthDate: '1990-08-22', enrolledCourses: 3 },
    { id: '3', name: 'Carlos Oliveira', email: 'carlos@email.com', birthDate: '1998-03-10', enrolledCourses: 0 },
    { id: '4', name: 'Daniela Lima', email: 'dani.lima@email.com', birthDate: '1992-11-27', enrolledCourses: 1 },
    { id: '5', name: 'Eduardo Costa', email: 'edu.costa@email.com', birthDate: '1997-07-03', enrolledCourses: 0 },
  ];

  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNoEnrollment, setShowNoEnrollment] = useState(false);
  
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState<Student | null>(null);
  const [addCourseDialogOpen, setAddCourseDialogOpen] = useState(false);
  const [studentForCourse, setStudentForCourse] = useState<Student | null>(null);
  const isMobile = useIsMobile();

  // Filter students based on search and filter criteria
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         student.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesEnrollmentFilter = showNoEnrollment ? student.enrolledCourses === 0 : true;
    return matchesSearch && matchesEnrollmentFilter;
  });

  const handleEditStudent = (student: Student) => {
    setCurrentStudent(student);
    setDialogOpen(true);
  };

  const handleDeleteStudent = (student: Student) => {
    setStudentToDelete(student);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteStudent = () => {
    if (studentToDelete) {
      setStudents(students.filter(s => s.id !== studentToDelete.id));
      toast.success(`Aluno ${studentToDelete.name} excluído com sucesso!`);
      setDeleteDialogOpen(false);
      setStudentToDelete(null);
    }
  };

  const handleNewEnrollment = (student: Student) => {
    setStudentForCourse(student);
    setAddCourseDialogOpen(true);
  };

  const handleSaveStudent = (student: Student) => {
    if (student.id) {
      // Update existing student
      setStudents(students.map(s => s.id === student.id ? student : s));
      toast.success(`Aluno ${student.name} atualizado com sucesso!`);
    } else {
      // Add new student with a generated ID
      const newStudent = { ...student, id: Date.now().toString(), enrolledCourses: 0 };
      setStudents([...students, newStudent]);
      toast.success(`Aluno ${student.name} criado com sucesso!`);
    }
    setDialogOpen(false);
  };

  
  const handleAddCourses = (studentId: string, courseIds: string[]) => {
    setStudents(students.map(student => {
      if (student.id === studentId) {
        return {
          ...student,
          enrolledCourses: student.enrolledCourses + courseIds.length
        };
      }
      return student;
    }));
    
    const studentName = students.find(s => s.id === studentId)?.name;
    toast.success(`${courseIds.length} curso(s) adicionado(s) para ${studentName}`);
    setAddCourseDialogOpen(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Alunos</h1>
          <p className="text-muted-foreground">Gerencie os alunos da sua instituição</p>
        </div>
        <Button onClick={() => { setCurrentStudent(null); setDialogOpen(true); }} className="gap-1">
          <UserPlus className="h-4 w-4" />
          Novo Aluno
        </Button>
      </div>

      <Card className="glass-card">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-between mb-6">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Buscar por nome ou email..." 
                className="pl-8" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="no-enrollment" 
                checked={showNoEnrollment}
                onCheckedChange={(checked) => setShowNoEnrollment(!!checked)}
              />
              <label htmlFor="no-enrollment" className="text-sm cursor-pointer">
                Mostrar apenas sem matrícula
              </label>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead className={isMobile ? "hidden" : ""}>E-mail</TableHead>
                  <TableHead className={isMobile ? "hidden" : ""}>Data de Nascimento</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell className={isMobile ? "hidden" : ""}>{student.email}</TableCell>
                      <TableCell className={isMobile ? "hidden" : ""}>
                        {new Date(student.birthDate).toLocaleDateString()}
                        </TableCell>
                      <TableCell>
                        {student.enrolledCourses > 0 ? (
                          <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                            {isMobile ? "Matriculado" : `Matriculado em ${student.enrolledCourses} curso${student.enrolledCourses > 1 ? 's' : ''}`}
                          </span>
                        ) : (
                          <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">
                            Sem matrícula
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleEditStudent(student)}>
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Editar</span>
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleDeleteStudent(student)}>
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Excluir</span>
                          </Button>
                          <Button 
                            className={isMobile ? "hidden" : ""} 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleNewEnrollment(student)}
                          >
                            <PlusCircle className="h-4 w-4" />
                            <span className="sr-only">Matricular</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      Nenhum aluno encontrado.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {dialogOpen && (
        <StudentDialog 
          open={dialogOpen} 
          onOpenChange={setDialogOpen}
          student={currentStudent}
          onSave={handleSaveStudent}
        />
      )}

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Excluir Aluno"
        description={`Tem certeza que deseja excluir ${studentToDelete?.name}? Esta ação não pode ser desfeita.`}
        onConfirm={confirmDeleteStudent}
      />

      <StudentsCourseDialog
        open={addCourseDialogOpen}
        onOpenChange={setAddCourseDialogOpen}
        student={studentForCourse}
        onSave={handleAddCourses}
      />
    </div>
  );
};

export default StudentsPage;
