
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Student, Course } from '@/types';

const NewEnrollmentPage = () => {
  const navigate = useNavigate();

  // Mock data - would be fetched from API in a real app
  const students: Student[] = [
    { id: '1', name: 'Ana Silva', email: 'ana.silva@email.com', birthDate: '1995-05-15', enrolledCourses: 2 },
    { id: '2', name: 'Bruno Santos', email: 'bruno.santos@email.com', birthDate: '1990-08-22', enrolledCourses: 3 },
    { id: '3', name: 'Carlos Oliveira', email: 'carlos@email.com', birthDate: '1998-03-10', enrolledCourses: 0 },
    { id: '4', name: 'Daniela Lima', email: 'dani.lima@email.com', birthDate: '1992-11-27', enrolledCourses: 1 },
    { id: '5', name: 'Eduardo Costa', email: 'edu.costa@email.com', birthDate: '1997-07-03', enrolledCourses: 0 },
  ];

  const courses: Course[] = [
    { id: '1', name: 'Matemática Avançada', description: 'Cálculo diferencial e integral, álgebra linear', enrolledStudents: 15 },
    { id: '2', name: 'Física Quântica', description: 'Princípios da mecânica quântica e aplicações', enrolledStudents: 8 },
    { id: '3', name: 'Literatura Brasileira', description: 'Estudo dos principais autores e obras brasileiras', enrolledStudents: 24 },
    { id: '4', name: 'História Mundial', description: 'Análise dos principais eventos históricos mundiais', enrolledStudents: 18 },
    { id: '5', name: 'Programação em Python', description: 'Fundamentos da programação usando Python', enrolledStudents: 30 },
  ];

  const [selectedStudentId, setSelectedStudentId] = useState<string>('');
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);

  const handleToggleCourse = (courseId: string) => {
    setSelectedCourses(prevSelectedCourses =>
      prevSelectedCourses.includes(courseId)
        ? prevSelectedCourses.filter(id => id !== courseId)
        : [...prevSelectedCourses, courseId]
    );
  };

  const handleCreateEnrollment = () => {
    if (!selectedStudentId) {
      toast.error("Por favor, selecione um aluno.");
      return;
    }

    if (selectedCourses.length === 0) {
      toast.error("Por favor, selecione pelo menos um curso.");
      return;
    }

    const studentName = students.find(s => s.id === selectedStudentId)?.name;
    const selectedCoursesNames = courses
      .filter(course => selectedCourses.includes(course.id))
      .map(course => course.name);

    toast.success(`Matrícula realizada com sucesso! Aluno: ${studentName}. Cursos: ${selectedCoursesNames.join(', ')}`);
    navigate('/enrollments');
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
                  <SelectItem key={student.id} value={student.id}>{student.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <Label>Selecione os Cursos</Label>
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
                      {course.enrolledStudents} alunos matriculados
                    </span>
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={() => navigate('/enrollments')}>Cancelar</Button>
            <Button onClick={handleCreateEnrollment}>Confirmar Matrícula</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewEnrollmentPage;
