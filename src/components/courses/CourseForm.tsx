import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { NewCourse } from "@/types";
import { createCourse, updateCourse } from '@/services/CourseService';

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
});

interface CourseFormProps {
  onSubmit: (data: NewCourse & { id?: string }) => void;
  defaultValues?: Partial<NewCourse & { id?: string }>;
}

export function CourseForm({ onSubmit, defaultValues }: CourseFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues || {
      name: "",
      description: "",
    },
  });

  
  const handleFormSubmit = async (data: z.infer<typeof formSchema>) => {
    const courseData = {
      ...data,
      id: defaultValues?.id, // pode ser undefined, o que é OK
    };
  
    try {
      if (courseData.id) {
        await updateCourse(courseData.id, courseData);
      } else {
        await createCourse(data as NewCourse); // criação (sem `id`)
      }
      onSubmit(courseData as NewCourse & { id?: string });
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
                <Input placeholder="Enter course name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Enter course description"
                  className="min-h-[100px]"
                  {...field} 
                />
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
