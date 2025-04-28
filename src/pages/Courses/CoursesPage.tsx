import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FolderPlus, Search, Edit, Trash2, Users } from 'lucide-react';
import CourseDialog from '@/components/courses/CourseDialog';
import { Course } from '@/types';
import { toast } from 'sonner';
import DeleteConfirmDialog from '@/components/shared/DeleteConfirmDialog';
import CourseStudentsDialog from '@/components/courses/CourseStudentsDialog';

const CoursesPage = () => {
  const initialCourses: Course[] = [
    { id: '1', name: 'Matemática Avançada', description: 'Cálculo diferencial e integral, álgebra linear', enrolledStudents: 15 },
    { id: '2', name: 'Física Quântica', description: 'Princípios da mecânica quântica e aplicações', enrolledStudents: 8 },
    { id: '3', name: 'Literatura Brasileira', description: 'Estudo dos principais autores e obras brasileiras', enrolledStudents: 24 },
    { id: '4', name: 'História Mundial', description: 'Análise dos principais eventos históricos mundiais', enrolledStudents: 18 },
    { id: '5', name: 'Programação em Python', description: 'Fundamentos da programação usando Python', enrolledStudents: 30 },
  ];

  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentCourse, setCurrentCourse] = useState<Course | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState<Course | null>(null);
  const [studentsDialogOpen, setStudentsDialogOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const filteredCourses = courses.filter(course => 
    course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEditCourse = (course: Course) => {
    setCurrentCourse(course);
    setDialogOpen(true);
  };

  const handleDeleteCourse = (course: Course) => {
    setCourseToDelete(course);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteCourse = () => {
    if (courseToDelete) {
      setCourses(courses.filter(c => c.id !== courseToDelete.id));
      toast.success(`Curso ${courseToDelete.name} excluído com sucesso!`);
      setDeleteDialogOpen(false);
      setCourseToDelete(null);
    }
  };

  const handleViewStudents = (course: Course) => {
    setSelectedCourse(course);
    setStudentsDialogOpen(true);
  };

  const handleSaveCourse = (course: Course) => {
    if (course.id) {
      setCourses(courses.map(c => c.id === course.id ? course : c));
      toast.success(`Curso ${course.name} atualizado com sucesso!`);
    } else {
      const newCourse = { ...course, id: Date.now().toString(), enrolledStudents: 0 };
      setCourses([...courses, newCourse]);
      toast.success(`Curso ${course.name} criado com sucesso!`);
    }
    setDialogOpen(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Cursos</h1>
          <p className="text-muted-foreground">Gerencie os cursos da sua instituição</p>
        </div>
        <Button onClick={() => { setCurrentCourse(null); setDialogOpen(true); }} className="gap-1">
          <FolderPlus className="h-4 w-4" />
          Novo Curso
        </Button>
      </div>

      <Card className="glass-card">
        <CardContent className="p-6">
          <div className="flex justify-between mb-6">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Buscar por nome do curso..." 
                className="pl-8" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead>Alunos Matriculados</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCourses.length > 0 ? (
                  filteredCourses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell className="font-medium">{course.name}</TableCell>
                      <TableCell>{course.description}</TableCell>
                      <TableCell>{course.enrolledStudents}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleEditCourse(course)}>
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Editar</span>
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleDeleteCourse(course)}>
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Excluir</span>
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleViewStudents(course)}>
                            <Users className="h-4 w-4" />
                            <span className="sr-only">Ver Alunos</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center">
                      Nenhum curso encontrado.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {dialogOpen && (
        <CourseDialog 
          open={dialogOpen} 
          onOpenChange={setDialogOpen}
          course={currentCourse}
          onSave={handleSaveCourse}
        />
      )}

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Excluir Curso"
        description={`Tem certeza que deseja excluir o curso ${courseToDelete?.name}? Esta ação não pode ser desfeita.`}
        onConfirm={confirmDeleteCourse}
      />

      {selectedCourse && (
        <CourseStudentsDialog 
          open={studentsDialogOpen}
          onOpenChange={setStudentsDialogOpen}
          course={selectedCourse}
        />
      )}
    </div>
  );
};

export default CoursesPage;
