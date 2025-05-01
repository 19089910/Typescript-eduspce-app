
import React from 'react';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { CourseForm } from '@/components/courses/CourseForm';
import { NewCourse } from '@/types';
import { toast } from 'sonner';
import { createCourse } from '@/services/courseService';

const NewCoursePage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (course: NewCourse) => {
    try{
      await createCourse(course);
      toast.success(`Curso ${course.name} criado com sucesso!`);
      navigate('/courses');
    } catch (error) {
      toast.error('Erro ao criar aluno. Tente novamente.');
      console.error(error);
    }

  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Novo Curso</h1>
        <p className="text-muted-foreground">Cadastre um novo curso no sistema</p>
      </div>

      <Card className="glass-card">
        <CourseForm onSubmit={handleSubmit} />
      </Card>
    </div>
  );
};

export default NewCoursePage;
