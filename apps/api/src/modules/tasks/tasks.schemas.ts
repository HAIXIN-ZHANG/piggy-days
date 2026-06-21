import { z } from "zod";
import { householdUserIds, taskAssignments, taskCategories } from "@piggy-days/core";

export const createTaskSchema = z.object({
  type: z.literal("simple").default("simple"),
  title: z.string().min(1).max(120),
  category: z.enum(taskCategories).default("other"),
  description: z.string().max(2000).optional(),
  place: z.string().max(160).optional(),
  plannedDate: z.string().datetime().optional(),
  createdByUserId: z.enum(householdUserIds),
  assignedTo: z.enum(taskAssignments),
  coinValue: z.number().int().min(1).max(100)
});

export const completeTaskSchema = z.object({
  completedByUserId: z.enum(householdUserIds),
  note: z.string().max(2000).optional(),
  costCents: z.number().int().nonnegative().optional(),
  place: z.string().max(160).optional(),
  photoUrl: z.string().url().optional()
});

export const listTasksQuerySchema = z.object({
  status: z.enum(["todo", "in_progress", "completed", "all"]).default("all"),
  assignedTo: z.enum(taskAssignments).optional(),
  category: z.enum(taskCategories).optional(),
  limit: z.coerce.number().int().min(1).max(50).default(30)
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type CompleteTaskInput = z.infer<typeof completeTaskSchema>;
export type ListTasksQuery = z.infer<typeof listTasksQuerySchema>;
