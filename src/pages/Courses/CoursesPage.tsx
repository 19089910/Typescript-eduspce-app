import React, { useState, useEffect } from 'react';
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
import { useDeleteItem } from '@/hooks/use-deleteItem';
import { useCourseContext } from '@/contexts/use-course';
import { deleteCourse } from '@/services/courseService';
import { useEnrollmentContext } from '@/contexts/use-enrollment';

const CoursesPage = () => {
  const { courses } = useCourseContext();
  const { enrollments } = useEnrollmentContext();
  const [newCourses, setNewCourses] = useState<Course[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentCourse, setCurrentCourse] = useState<Course | null>(null);
  const [studentsDialogOpen, setStudentsDialogOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  

    const prepareStudentsWithEnrollmentCount = async (
      CoursesData: Course[]
    ): Promise<Course[]> => {
      try {
        return CoursesData.map(course => {
          const enrolledCourses = enrollments.filter(
            enrollment => enrollment.courseId === Number(course.id)
          ).length;
          return {
            ...course,
            enrolledCourses
          };
        });
      } catch (error) {
        toast.error("Erro ao carregar as matrículas.");
        console.error("Erro ao buscar matrículas:", error);
        return CoursesData.map(course => ({
          ...course,
          enrolledCourses: 0
        }));
      }
    };

  // Function to search for courses from the API
  const fetchCourses = async () => {
    try {
      const studentsWithEnrollments = await prepareStudentsWithEnrollmentCount(courses);
      setNewCourses(studentsWithEnrollments);
    } catch (error) {
      toast.error("Erro ao carregar os cursos.");
      console.error("Erro ao buscar cursos:", error);
    }
  };

  // Load courses when assembling the component
  useEffect(() => {
    fetchCourses();
  }, []);
  
  // Hook to manage course deletions
  const { 
    itemToDelete: courseToDelete, 
    deleteDialogOpen, 
    isDeleting, 
    handleDeleteClick, 
    confirmDelete: confirmDeleteCourse, 
    setDeleteDialogOpen 
  } = useDeleteItem<Course>(deleteCourse, fetchCourses);

  const filteredCourses = newCourses.filter(course => 
    course.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.description?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    !searchQuery
  );

  const handleEditCourse = (course: Course) => {
    setCurrentCourse(course);
    setDialogOpen(true);
  };

  const handleViewStudents = (course: Course) => {
    setSelectedCourse(course);
    setStudentsDialogOpen(true);
  };

  const handleSaveCourse = (course: Course) => {
    try {
      if (course.id) {
        setNewCourses(newCourses.map(c => c.id === course.id ? course : c));
        toast.success(`Curso ${course.name} atualizado com sucesso!`);
      } else {
        const newCourse = { ...course, id: Date.now().toString(), enrolledStudents: 0 };
        setNewCourses([...newCourses, newCourse]);
        toast.success(`Curso ${course.name} criado com sucesso!`);
      }
      setDialogOpen(false);
      
    } catch (error) {
      console.error("Erro ao salvar curso:", error);
      toast.error("Erro ao salvar curso. Tente novamente.");
    }
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
                      <TableCell>{course.enrolledCourses || 0}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleEditCourse(course)}>
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Editar</span>
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleDeleteClick(course)} disabled={isDeleting}>
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Excluir</span>
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => toast.error("Funcionalidade em desenvolvimento.")} 
                            //onClick={() => handleViewStudents(course)}
                            >
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
