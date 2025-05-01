import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { NewStudent, Student } from "@/types";
import { createStudent, updateStudent } from '@/services/studentService';
import { toast } from "sonner";

// Definindo o schema de validação
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  birthDate: z.string().min(1, {
    message: "Birth date is required.",
  }),
});

interface StudentFormProps {
  onSubmit: (data: Student) => void;
  defaultValues?: Partial<Student>;
}

export function StudentForm({ onSubmit, defaultValues }: StudentFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: defaultValues?.name || "",
      email: defaultValues?.email || "",
      birthDate: defaultValues?.birthDate || "",
    },
  });

  const handleFormSubmit = async (data: z.infer<typeof formSchema>) => {
    const studentData = {
      ...data,
      id: defaultValues?.id || 0,
      enrolledCourses: defaultValues?.enrolledCourses || 0
    } as Student; // Type assertion segura pois garantimos os valores
  
    try {
      if (defaultValues?.id !== undefined) {
        await updateStudent(studentData.id, studentData);
      } else {
        await createStudent(studentData);
      }
      onSubmit(studentData);
    } catch (error) {
      console.error("Erro ao salvar o aluno:", error);
      toast.error("Erro ao salvar o aluno");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter student name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter student email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="birthDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Birth Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">Submit</Button>
      </form>
    </Form>
  );
}
