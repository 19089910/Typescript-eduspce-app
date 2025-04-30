
import React from 'react';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { StudentForm } from '@/components/students/StudentForm';
import { NewStudent } from '@/types';
import { createStudent } from '@/services/studentService'
import { toast } from 'sonner';

const NewStudentPage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (student: NewStudent) => {
    try {
      await createStudent(student);
      toast.success(`Aluno ${student.name} criado com sucesso!`);
      navigate('/students');
    } catch (error) {
      toast.error('Erro ao criar aluno. Tente novamente.');
      console.error(error);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Novo Aluno</h1>
        <p className="text-muted-foreground">Cadastre um novo aluno no sistema</p>
      </div>

      <Card className="glass-card">
        <StudentForm onSubmit={handleSubmit} />
      </Card>
    </div>
  );
};

export default NewStudentPage;
