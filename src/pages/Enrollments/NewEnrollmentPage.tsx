import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Student, Course, ApiEnrollment,CreateEnrollment  } from '@/types'; // <-- ajustado aqui
import { getCourses } from '@/services/courseService';
import { getAllStudents } from '@/services/studentService';
import { createEnrollment } from '@/services/enrollmentService';
import { Loader2 } from 'lucide-react';

const NewEnrollmentPage = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState<Student[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedStudentId, setSelectedStudentId] = useState<string>('');
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch students and courses on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentsData, coursesData] = await Promise.all([
          getAllStudents(),
          getCourses()
        ]);
        setStudents(studentsData);
        setCourses(coursesData);
      } catch (error) {
        toast.error("Erro ao carregar dados. Por favor, tente novamente.");
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleToggleCourse = (courseId: string) => {
    setSelectedCourses(prevSelectedCourses =>
      prevSelectedCourses.includes(courseId)
        ? prevSelectedCourses.filter(id => id !== courseId)
        : [...prevSelectedCourses, courseId]
    );
  };

  const handleCreateEnrollment = async () => {
    if (!selectedStudentId) {
      toast.error("Por favor, selecione um aluno.");
      return;
    }

    if (selectedCourses.length === 0) {
      toast.error("Por favor, selecione pelo menos um curso.");
      return;
    }

    setIsSubmitting(true);

    try {
      const successfulEnrollments: string[] = [];
      const failedEnrollments: { courseId: string, reason: string }[] = [];

      const studentName = students.find(s => s.id === Number(selectedStudentId))?.name;

      for (const courseId of selectedCourses) {
        const courseName = courses.find(c => c.id === courseId)?.name || courseId;

        try {
          const enrollmentData: Omit<CreateEnrollment, 'id'> = {
            studentId: selectedStudentId,
            courseId: courseId
          };

          await createEnrollment(enrollmentData);
          successfulEnrollments.push(courseId);
        } catch (error) {
          console.error(`Error enrolling in course ${courseId}:`, error);

          if (error.response?.data?.error === "The student is already enrolled in this course.") {
            failedEnrollments.push({
              courseId,
              reason: `Aluno já está matriculado em "${courseName}"`
            });
          } else {
            failedEnrollments.push({
              courseId,
              reason: "Erro desconhecido"
            });
          }
        }
      }

      if (successfulEnrollments.length > 0) {
        const successCourses = courses
          .filter(course => successfulEnrollments.includes(course.id))
          .map(course => course.name);

        toast.success(`Matrícula(s) realizada(s) com sucesso! Aluno: ${studentName}. Cursos: ${successCourses.join(', ')}`);
      }

      if (failedEnrollments.length > 0) {
        for (const { courseId, reason } of failedEnrollments) {
          const courseName = courses.find(c => c.id === courseId)?.name || courseId;
          toast.error(`Não foi possível matricular em "${courseName}": ${reason}`);
        }
      }

      if (successfulEnrollments.length > 0) {
        navigate('/enrollments');
      }
    } catch (error) {
      toast.error("Erro ao realizar matrícula. Por favor, tente novamente.");
      console.error("Error creating enrollments:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Nova Matrícula</h1>
        <p className="text-muted-foreground">Matricule um aluno em um ou mais cursos</p>
      </div>

      <Card className="gradient-card">
        <CardHeader>
          <CardTitle>Informações da Matrícula</CardTitle>
          <CardDescription>Selecione o aluno e os cursos para realizar a matrícula</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="student">Aluno</Label>
            <Select value={selectedStudentId} onValueChange={setSelectedStudentId}>
              <SelectTrigger className="glass-card">
                <SelectValue placeholder="Selecione um aluno" />
              </SelectTrigger>
              <SelectContent>
                {students.map(student => (
                  <SelectItem key={student.id} value={String(student.id)}>{student.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <Label>Selecione os Cursos</Label>
            {courses.length === 0 ? (
              <p className="text-muted-foreground">Nenhum curso disponível.</p>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {courses.map(course => (
                  <div
                    key={course.id}
                    className="glass-card flex items-center space-x-2 rounded-md p-4"
                  >
                    <Checkbox
                      id={`course-${course.id}`}
                      checked={selectedCourses.includes(course.id)}
                      onCheckedChange={() => handleToggleCourse(course.id)}
                    />
                    <label
                      htmlFor={`course-${course.id}`}
                      className="flex flex-col cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      <span>{course.name}</span>
                      <span className="text-muted-foreground text-xs mt-1">
                        {course.enrolledCourses} alunos matriculados
                      </span>
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={() => navigate('/enrollments')} disabled={isSubmitting}>
              Cancelar
            </Button>
            <Button onClick={handleCreateEnrollment} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processando...
                </>
              ) : (
                'Confirmar Matrícula'
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewEnrollmentPage;
