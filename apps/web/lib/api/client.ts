import type {
  CoinEventsResponse,
  CompleteTaskInput,
  CreateTaskInput,
  FundSummaryResponse,
  HouseholdPerson,
  LeaderboardResponse,
  TaskDetailResponse,
  TasksResponse
} from "./types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";
const FAMILY_TOKEN_STORAGE_KEY = "piggy-days-family-token";

type ApiErrorPayload = {
  error?: string;
};

async function apiRequest<TResponse>(path: string, init?: RequestInit): Promise<TResponse> {
  const headers = new Headers(init?.headers);
  headers.set("Content-Type", "application/json");

  if (typeof window !== "undefined") {
    const familyToken = window.localStorage.getItem(FAMILY_TOKEN_STORAGE_KEY);

    if (familyToken) {
      headers.set("x-family-token", familyToken);
    }
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers
  });

  if (!response.ok) {
    let payload: ApiErrorPayload = {};

    try {
      payload = (await response.json()) as ApiErrorPayload;
    } catch {
      payload = {};
    }

    throw new Error(payload.error ?? `Request failed with status ${response.status}`);
  }

  return response.json() as Promise<TResponse>;
}

export function getPeople() {
  return apiRequest<{ people: HouseholdPerson[] }>("/api/people");
}

export function getTasks(status: "all" | "todo" | "in_progress" | "completed" = "all") {
  return apiRequest<TasksResponse>(`/api/tasks?status=${status}`);
}

export function createTask(input: CreateTaskInput) {
  return apiRequest<{ task: TasksResponse["tasks"][number] }>("/api/tasks", {
    method: "POST",
    body: JSON.stringify(input)
  });
}

export function getTask(taskId: string) {
  return apiRequest<TaskDetailResponse>(`/api/tasks/${taskId}`);
}

export function completeTask(taskId: string, input: CompleteTaskInput) {
  return apiRequest<{
    task: TaskDetailResponse["task"];
    checkIn: TaskDetailResponse["checkIn"];
    coinEvent: TaskDetailResponse["coinEvents"][number];
  }>(`/api/tasks/${taskId}/complete`, {
    method: "POST",
    body: JSON.stringify(input)
  });
}

export function getFundSummary() {
  return apiRequest<FundSummaryResponse>("/api/fund/summary");
}

export function getCoinEvents() {
  return apiRequest<CoinEventsResponse>("/api/coins/events");
}

export function getLeaderboard(range: "week" | "all") {
  return apiRequest<LeaderboardResponse>(`/api/leaderboard?range=${range}`);
}
