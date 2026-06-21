export const taskCategories = [
  "daily",
  "shopping",
  "cooking",
  "explore",
  "chore",
  "date",
  "other"
] as const;

export type TaskCategory = (typeof taskCategories)[number];

export const taskStatuses = ["todo", "in_progress", "completed"] as const;

export type TaskStatus = (typeof taskStatuses)[number];

export const taskTypes = ["simple", "checklist"] as const;

export type TaskType = (typeof taskTypes)[number];

export const taskAssignments = ["me", "wife", "both"] as const;

export type TaskAssignment = (typeof taskAssignments)[number];

export const householdUserIds = ["me", "wife"] as const;

export type HouseholdUserId = (typeof householdUserIds)[number];

export function isTaskCategory(value: string): value is TaskCategory {
  return taskCategories.includes(value as TaskCategory);
}

export function isTaskAssignment(value: string): value is TaskAssignment {
  return taskAssignments.includes(value as TaskAssignment);
}

export function isHouseholdUserId(value: string): value is HouseholdUserId {
  return householdUserIds.includes(value as HouseholdUserId);
}

export type CreateSimpleTaskInput = {
  title: string;
  category?: TaskCategory;
  description?: string;
  place?: string;
  plannedDate?: string;
  createdByUserId: HouseholdUserId;
  assignedTo: TaskAssignment;
  coinValue: number;
};

export type SimpleTaskDraft = {
  type: "simple";
  title: string;
  category: TaskCategory;
  description?: string;
  place?: string;
  plannedDate?: string;
  status: "todo";
  createdByUserId: HouseholdUserId;
  assignedTo: TaskAssignment;
  coinValue: number;
};

export type CompleteSimpleTaskInput = {
  taskId: string;
  title: string;
  coinValue: number;
  completedByUserId: HouseholdUserId;
};

export type TaskCompletionCoinEventCommand = {
  amount: number;
  reason: string;
  sourceType: "task";
  taskId: string;
  earnedByUserId: HouseholdUserId;
  createdByUserId: HouseholdUserId;
};

export function createSimpleTaskDraft(input: CreateSimpleTaskInput): SimpleTaskDraft {
  const title = input.title.trim();

  if (!title) {
    throw new Error("Task title is required.");
  }

  if (!Number.isInteger(input.coinValue) || input.coinValue < 1) {
    throw new Error("Task coin value must be a positive integer.");
  }

  return {
    type: "simple",
    title,
    category: input.category ?? "other",
    description: input.description?.trim() || undefined,
    place: input.place?.trim() || undefined,
    plannedDate: input.plannedDate,
    status: "todo",
    createdByUserId: input.createdByUserId,
    assignedTo: input.assignedTo,
    coinValue: input.coinValue
  };
}

export function createTaskCompletionCoinEvent(
  input: CompleteSimpleTaskInput
): TaskCompletionCoinEventCommand {
  if (!Number.isInteger(input.coinValue) || input.coinValue < 1) {
    throw new Error("Completed task coin value must be a positive integer.");
  }

  return {
    amount: input.coinValue,
    reason: `Complete task: ${input.title}`,
    sourceType: "task",
    taskId: input.taskId,
    earnedByUserId: input.completedByUserId,
    createdByUserId: input.completedByUserId
  };
}
