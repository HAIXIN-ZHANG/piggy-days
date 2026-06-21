import type { TaskAssignment, TaskCategory, TaskStatus } from "@piggy-days/core";

export type HouseholdUserId = "me" | "wife";

export type HouseholdPerson = {
  id: HouseholdUserId;
  displayName: string;
  avatarLabel: string;
};

export type TaskDto = {
  id: string;
  type: "simple";
  title: string;
  category: TaskCategory;
  description: string | null;
  place: string | null;
  plannedDate: string | null;
  status: TaskStatus;
  createdByUserId: HouseholdUserId;
  assignedTo: TaskAssignment;
  completedByUserId: HouseholdUserId | null;
  coinValue: number;
  completedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type CheckInDto = {
  id: string;
  note: string | null;
  costCents: number | null;
  place: string | null;
  photoUrl: string | null;
  createdAt: string;
};

export type CoinEventDto = {
  id: string;
  amount: number;
  reason: string;
  sourceType: string;
  taskId: string | null;
  earnedByUserId: HouseholdUserId | null;
  createdByUserId: HouseholdUserId;
  createdAt: string;
};

export type LeaderboardRowDto = {
  userId: HouseholdUserId;
  displayName: string;
  earnedCoins: number;
};

export type CreateTaskInput = {
  type: "simple";
  title: string;
  category: TaskCategory;
  description?: string;
  place?: string;
  plannedDate?: string;
  createdByUserId: HouseholdUserId;
  assignedTo: TaskAssignment;
  coinValue: number;
};

export type CompleteTaskInput = {
  completedByUserId: HouseholdUserId;
  note?: string;
  costCents?: number;
  place?: string;
  photoUrl?: string;
};

export type TasksResponse = {
  tasks: TaskDto[];
  nextCursor: string | null;
};

export type TaskDetailResponse = {
  task: TaskDto;
  checkIn: CheckInDto | null;
  coinEvents: CoinEventDto[];
  checklistItems: [];
};

export type FundSummaryResponse = {
  balance: number;
  earnedAllTime: number;
  redeemedAllTime: number;
  earnedThisWeek: number;
  recentEvents: CoinEventDto[];
};

export type CoinEventsResponse = {
  items: CoinEventDto[];
  nextCursor: string | null;
};

export type LeaderboardResponse = {
  range: "week" | "all";
  leaders: LeaderboardRowDto[];
};
