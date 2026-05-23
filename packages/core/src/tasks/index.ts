export const taskCategories = [
  "shopping",
  "cooking",
  "city-outing",
  "chore",
  "date",
  "other"
] as const;

export type TaskCategory = (typeof taskCategories)[number];

export const taskStatuses = ["todo", "completed"] as const;

export type TaskStatus = (typeof taskStatuses)[number];

export function isTaskCategory(value: string): value is TaskCategory {
  return taskCategories.includes(value as TaskCategory);
}
