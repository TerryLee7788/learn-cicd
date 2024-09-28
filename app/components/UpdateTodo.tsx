"use client";

import { useState } from "react";
import { mutate } from "swr";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import TodoForm from "./TodoForm";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { todoSchema, type TodoSchema } from "@/lib/zod";
import { Todo } from "@prisma/client";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { updateTodoApi } from "@/lib/todoApi";
import { todoUrl } from "@/lib/todoApi";

const defaultValues = {
  title: "",
  description: "",
  completed: false,
};

export default function UpdateTodo({ todo }: { todo: Todo }) {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const form = useForm<TodoSchema>({
    resolver: zodResolver(todoSchema),
    defaultValues,
  });
  const onSubmit = async (data: TodoSchema) => {
    console.log(data);
    setIsSubmitting(true);
    try {
      const res = await updateTodoApi({ data, id: todo.id });
      if (!res.ok) {
        throw new Error("Failed to update todo");
      }
      form.reset();
      setErrorMessage("");
      setDialogOpen(false);
      mutate(todoUrl);
    } catch (error) {
      console.error(error);
      const message =
        error instanceof Error ? error.message : "An error occurred";
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <Dialog
      open={dialogOpen}
      onOpenChange={() => {
        setDialogOpen(!dialogOpen);
      }}
    >
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-blue-500 bg-blue-100 hover:text-blue-700 hover:bg-blue mr-2"
        >
          <Pencil1Icon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent
        aria-describedby="dialog-description"
        className="sm:max-w-[425px] bg-white"
      >
        <DialogHeader>
          <DialogTitle>Update Todo</DialogTitle>
          <DialogDescription>Update New Todo Form</DialogDescription>
        </DialogHeader>
        {errorMessage && (
          <div className="text-red-500 text-sm mb-4">{errorMessage}</div>
        )}
        <TodoForm
          defaultValues={todo}
          onSubmit={onSubmit}
          submitButtonText="Update"
          isSubmitting={isSubmitting}
        />
      </DialogContent>
    </Dialog>
  );
}
