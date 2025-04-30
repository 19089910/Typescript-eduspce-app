
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, GraduationCap, Home, Users, BookText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile'

const Sidebar = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const isActive = (path: string) => location.pathname === path;

  const menuItems = [
    { path: '/', label: 'Dashboard', icon: Home },
    { path: '/students', label: 'Alunos', icon: Users },
    { path: '/courses', label: 'Cursos', icon: BookOpen },
    { path: '/enrollments', label: 'Matrículas', icon: GraduationCap },
  ];

  return (
    <div className={cn(
      "h-full py-6 glass-card rounded-r-xl flex flex-col min-w-[220px] animate-fade-in",
      isMobile ? "rounded-none w-full" : ""
    )}>
      <div className="px-6 mb-8">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-400 text-transparent bg-clip-text">
          EduSpace
        </h2>
      </div>
      
      <div className="flex flex-col flex-1 px-3">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-200 hover:bg-accent/80 my-1",
              isActive(item.path) ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-accent/60"
            )}
          >
            <item.icon className={cn("h-5 w-5", isActive(item.path) ? "text-primary-foreground" : "text-primary")} />
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </div>
      
      <div className="px-6 pt-6 mt-auto">
        <div className="rounded-lg bg-accent p-4">
          <div className="flex items-center gap-3">
            <BookText className="h-8 w-8 text-primary" />
            <div>
              <h4 className="text-sm font-semibold text-foreground">Sistema de Cursos</h4>
              <p className="text-xs text-muted-foreground">v1.0.0</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
