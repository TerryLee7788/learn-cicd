import { z } from "zod";

export const todoSchema = z.object({
  title: z
    .string()
    .min(1, "Title 是必填的欄位")
    .max(100, "Title 必須小於 100 個字"),
  description: z.string().max(500, "Description 必須小於 500 個字").optional(),
  completed: z.boolean().default(false),
});

export type TodoSchema = z.infer<typeof todoSchema>;
