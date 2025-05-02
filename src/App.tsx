
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import StudentsPage from "./pages/Students/StudentsPage";
import NewStudentPage from "./pages/Students/NewStudentPage";
import CoursesPage from "./pages/Courses/CoursesPage";
import NewCoursePage from "./pages/Courses/NewCoursePage";
import EnrollmentsPage from "./pages/Enrollments/EnrollmentsPage";
import NewEnrollmentPage from "./pages/Enrollments/NewEnrollmentPage";
import { EnrollmentProvider } from '@/contexts/use-enrollment';
import { CourseProvider } from '@/contexts/use-course';
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <EnrollmentProvider>
      <CourseProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppLayout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/students" element={<StudentsPage />} />
              <Route path="/students/new" element={<NewStudentPage />} />
              <Route path="/courses" element={<CoursesPage />} />
              <Route path="/courses/new" element={<NewCoursePage />} />
              <Route path="/enrollments" element={<EnrollmentsPage />} />
              <Route path="/enrollments/new" element={<NewEnrollmentPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AppLayout>
        </BrowserRouter>
      </CourseProvider>
      </EnrollmentProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
