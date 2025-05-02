import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Student, Course } from '@/types';
import { useCourseContext } from '@/contexts/use-course';
import { createEnrollment } from '@/services/enrollmentService';
import { toast } from 'sonner';
import { useEnrollmentContext } from '@/contexts/use-enrollment';

interface AddCourseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  student: Student | null;
  onSave: (studentId: number, courseIds: string[]) => void;
}

const AddCourseDialog: React.FC<AddCourseDialogProps> = ({ 
  open, 
  onOpenChange,
  student,
  onSave
}) => {
  const { courses } = useCourseContext();
  const { enrollments, refreshEnrollments } = useEnrollmentContext();
  const [newCourse, setNewCourse] = useState<Course[]>([]);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  useEffect(() => {
    const fetchAndPrepareCourses = async () => {
      try {
        const enrichedCourses = await prepareStudentsWithEnrollmentCount(courses);
        setNewCourse(enrichedCourses);
      } catch (error) {
        console.error('Erro ao buscar cursos:', error);
        toast.error("Erro ao buscar cursos.");
      }
    };
  
    if (open) {
      fetchAndPrepareCourses();
    }
  }, [open]);

  const handleToggleCourse = (courseId: string) => {
    setSelectedCourses(prev =>
      prev.includes(courseId)
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    );
  };
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

  const handleSave = async () => {
    if (student && selectedCourses.length > 0) {
      try {
        const results = await Promise.allSettled(
          selectedCourses.map(courseId =>
            createEnrollment({
              studentId: student.id,
              courseId: courseId,
            }).then(result => {
              refreshEnrollments();
              return result;
            }).catch(error => {
              const course = newCourse.find(c => c.id === courseId);
              const courseName = course ? course.name : 'curso desconhecido';
  
              let errorMsg = `Não foi possível matricular em "${courseName}"`;
  
              if (error.response?.data?.message) {
                errorMsg += `: ${error.response.data.message}`;
              }

              toast.error(
                `Não foi possível matricular em "${courseName}"  Aluno já está matriculado em ${courseName}`
              );
              throw error;
            })
          )
        );
  
        const allSucceeded = results.every(result => result.status === 'fulfilled');
  
        if (allSucceeded) {
          toast.success("Matrículas realizadas com sucesso!");
          onSave(student.id, selectedCourses);
          setSelectedCourses([]);
          onOpenChange(false);
        }
      } catch (e) {
        console.error("Erro inesperado ao salvar matrículas:", e);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-card sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Adicionar Cursos</DialogTitle>
          <DialogDescription>
            Selecione os cursos para matricular {student?.name}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 my-4">
          <div className="grid gap-4">
            {newCourse.map(course => (
              <div
                key={course.id}
                className="glass-card flex items-center space-x-2 rounded-md p-3"
              >
                <Checkbox
                  id={`course-${course.id}`}
                  checked={selectedCourses.includes(course.id)}
                  onCheckedChange={() => handleToggleCourse(course.id)}
                />
                <label
                  htmlFor={`course-${course.id}`}
                  className="flex flex-col cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 w-full"
                >
                  <span>{course.name}</span>
                  <span className="text-muted-foreground text-xs mt-1">
                    {course.enrolledCourses} alunos matriculados
                  </span>
                </label>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
          <Button onClick={handleSave} disabled={selectedCourses.length === 0}>
            Confirmar Matrícula
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddCourseDialog;
