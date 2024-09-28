"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { useState } from "react";
import { mutate } from "swr";
import TodoForm from "./TodoForm";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { todoSchema, type TodoSchema } from "@/lib/zod";

const defaultValues = {
  title: "",
  description: "",
  completed: false,
};

export default function CreateTodo() {
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
      // await createTodoMutation.mutateAsync(data);
      const res = await fetch("/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        throw new Error("Failed to create todo");
      }
      form.reset();
      setDialogOpen(false);
      mutate("/api/todos");
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
        <Button>Add Todo</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Create New Todo</DialogTitle>
          <DialogDescription>Create New Todo Form</DialogDescription>
        </DialogHeader>
        {errorMessage && (
          <div className="text-red-500 text-sm mb-4">{errorMessage}</div>
        )}
        <TodoForm
          defaultValues={defaultValues}
          onSubmit={onSubmit}
          submitButtonText="Create"
          isSubmitting={isSubmitting}
        />
      </DialogContent>
    </Dialog>
  );
}
