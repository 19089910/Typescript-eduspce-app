import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { NewStudent } from "@/types";
import { createStudent, updateStudent } from '@/services/studentService';

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
  onSubmit: (data: NewStudent & { id?: string }) => void;
  defaultValues?: Partial<NewStudent & { id?: string }>;
}

export function StudentForm({ onSubmit, defaultValues }: StudentFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues || {
      name: "",
      email: "",
      birthDate: "",
    },
  });

  const handleFormSubmit = async (data: z.infer<typeof formSchema>) => {
    const studentData = {
      ...data,
      id: defaultValues?.id, // pode ser undefined, o que é OK
    };
  
    try {
      if (studentData.id) {
        await updateStudent(studentData.id, studentData);
      } else {
        console.log(data)
        await createStudent(data as NewStudent); // criação (sem `id`)
      }
      onSubmit(studentData as NewStudent & { id?: string });
    } catch (error) {
      console.error("Erro ao salvar o aluno:", error);
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
