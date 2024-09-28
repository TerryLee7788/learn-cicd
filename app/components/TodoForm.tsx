import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { Button } from "@/components/ui/button";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { todoSchema, type TodoSchema } from "@/lib/zod";

interface TodoFormProps {
  defaultValues: TodoSchema;
  onSubmit: (data: TodoSchema) => Promise<void>;
  submitButtonText: string;
  isSubmitting: boolean;
}

export default function TodoForm({
  defaultValues,
  onSubmit,
  submitButtonText,
  isSubmitting,
}: TodoFormProps) {
  const form = useForm<TodoSchema>({
    resolver: zodResolver(todoSchema),
    defaultValues,
  });
  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea className="resize-none" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="completed"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Mark as completed</FormLabel>
              </div>
            </FormItem>
          )}
        />
        <Button
          className="relative w-full"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting && (
            <div className="absolute w-full insert-0 flex items-center justify-center bg-primary rounded-md">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          {submitButtonText}
        </Button>
      </form>
    </Form>
  );
}
