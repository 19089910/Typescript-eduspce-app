import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Student, Course } from '@/types';

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
  // Mock data - would be fetched from API in a real app
  const courses: Course[] = [
    { id: '1', name: 'Matemática Avançada', description: 'Cálculo diferencial e integral, álgebra linear', enrolledStudents: 15 },
    { id: '2', name: 'Física Quântica', description: 'Princípios da mecânica quântica e aplicações', enrolledStudents: 8 },
    { id: '3', name: 'Literatura Brasileira', description: 'Estudo dos principais autores e obras brasileiras', enrolledStudents: 24 },
    { id: '4', name: 'História Mundial', description: 'Análise dos principais eventos históricos mundiais', enrolledStudents: 18 },
    { id: '5', name: 'Programação em Python', description: 'Fundamentos da programação usando Python', enrolledStudents: 30 },
  ];

  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);

  const handleToggleCourse = (courseId: string) => {
    setSelectedCourses(prevSelectedCourses =>
      prevSelectedCourses.includes(courseId)
        ? prevSelectedCourses.filter(id => id !== courseId)
        : [...prevSelectedCourses, courseId]
    );
  };

  const handleSave = () => {
    if (student && selectedCourses.length > 0) {
      onSave(student.id, selectedCourses);
      setSelectedCourses([]);
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
            {courses.map(course => (
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
                    {course.enrolledStudents} alunos matriculados
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