import { z } from "zod";
import { taskCategories } from "@piggy-days/core";

export const createTaskSchema = z.object({
  title: z.string().min(1).max(120),
  category: z.enum(taskCategories).default("other"),
  description: z.string().max(2000).optional(),
  place: z.string().max(160).optional(),
  plannedDate: z.string().datetime().optional()
});

export const completeTaskSchema = z.object({
  note: z.string().max(2000).optional(),
  costCents: z.number().int().nonnegative().optional(),
  place: z.string().max(160).optional(),
  photoUrl: z.string().url().optional(),
  isCityOuting: z.boolean().default(false),
  grocerySavingsCents: z.number().int().nonnegative().default(0)
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type CompleteTaskInput = z.infer<typeof completeTaskSchema>;
