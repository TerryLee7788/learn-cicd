"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Loading from "./Loading";
import { Todo } from "@prisma/client";
import useSWR from "swr";
import DeleteTodo from "./DeleteTodo";
import UpdateTodo from "./UpdateTodo";
import { CheckIcon } from "@radix-ui/react-icons";
const fetcher = (url: string) => fetch(url).then((res) => res.json());
import { cn } from "@/lib/utils";
import { todoUrl } from "@/lib/todoApi";

export default function TodoList() {
  const { data, error, isLoading } = useSWR<Todo[]>(todoUrl, fetcher);
  const todoList = data || [];

  if (isLoading) return <Loading />;

  if (error) return <div>Error: {error.message}</div>;

  if (todoList?.length === 0)
    return (
      <Card>
        <CardContent className="text-center py-10">
          <p className="text-muted-foreground">All done for today!</p>
        </CardContent>
      </Card>
    );

  return (
    <Card className="relative">
      <CardHeader>
        <CardTitle>Todo List</CardTitle>
      </CardHeader>
      <CardContent>
        <ul>
          {todoList.map((todo: Todo) => (
            <li
              key={todo.id}
              className="group relative hover:bg-secondary/50 p-5"
            >
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100">
                <UpdateTodo todo={todo} />
                <DeleteTodo id={todo.id} />
              </div>
              <h3 className="text-lg font-medium flex items-center gap-2">
                <span
                  className={cn({
                    "line-through": todo.completed,
                  })}
                >
                  title: {todo.title}
                </span>
                {todo.completed && (
                  <CheckIcon className="w-5 h-5 text-green-700 font-bold" />
                )}
              </h3>
              <p className="text-sm text-muted-foreground">
                {!!todo.description && `description: ${todo.description}`}
              </p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
