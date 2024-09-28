import { type TodoSchema } from "@/lib/zod";

const apiBasePath = process.env.NODE_ENV === "production" ? "/learn-cicd" : "";
export const todoUrl = `${apiBasePath}/api/todos`;

export const createTodoApi = (data: TodoSchema) =>
  fetch(todoUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

export const deleteTodoApi = (id: string) =>
  fetch(`${todoUrl}?id=${id}`, {
    method: "DELETE",
  });

export const updateTodoApi = ({ data, id }: { data: TodoSchema; id: string }) =>
  fetch(todoUrl, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...data, id }),
  });
