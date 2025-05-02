
import React,{ useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, BookOpen, GraduationCap, UserPlus, FolderPlus, FileSignature } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEnrollmentContext } from '@/contexts/use-enrollment';
import { useCourseContext } from '@/contexts/use-course';
import { getAllStudents } from '@/services/studentService';
import { Stats }from '@/types'

const Dashboard = () => {
  const { enrollments, refreshEnrollments } = useEnrollmentContext();
  const { courses, refreshCourses  } = useCourseContext();
  const [stats, setStats] = useState<Stats>({
    students: 0,
    courses: courses.length,
    enrollments: enrollments.length
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        await refreshEnrollments();
        await refreshCourses();
        const Students = await getAllStudents();
        
        setStats({
          students: Students.length,
          courses: courses.length,
          enrollments: enrollments.length
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } 
    };

    fetchStats();
  }, []);

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Bem-vindo ao Sistema de Gerenciamento de Cursos.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total de Alunos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">{stats.students}</div>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total de Cursos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">{stats.courses}</div>
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total de Matrículas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">{stats.enrollments}</div>
              <GraduationCap className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="gradient-card">
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
          <CardDescription>Gerencie alunos, cursos e matrículas com facilidade</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Link to="/students/new">
              <Button variant="outline" className="w-full glass-card flex items-center gap-2 h-auto py-4">
                <UserPlus className="h-5 w-5" />
                <div className="text-left">
                  <div className="font-medium">Novo Aluno</div>
                  <div className="text-xs text-muted-foreground">Adicionar um novo aluno</div>
                </div>
              </Button>
            </Link>
            
            <Link to="/courses/new">
              <Button variant="outline" className="w-full glass-card flex items-center gap-2 h-auto py-4">
                <FolderPlus className="h-5 w-5" />
                <div className="text-left">
                  <div className="font-medium">Novo Curso</div>
                  <div className="text-xs text-muted-foreground">Criar um novo curso</div>
                </div>
              </Button>
            </Link>
            
            <Link to="/enrollments/new">
              <Button variant="outline" className="w-full glass-card flex items-center gap-2 h-auto py-4">
                <FileSignature className="h-5 w-5" />
                <div className="text-left">
                  <div className="font-medium">Nova Matrícula</div>
                  <div className="text-xs text-muted-foreground">Matricular aluno em curso</div>
                </div>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
