import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  createSimpleTaskDraft,
  createTaskCompletionCoinEvent,
  deriveFundSummary,
  deriveLeaderboard
} from "../index.js";

describe("simple task core loop", () => {
  it("normalizes a simple task creation request", () => {
    const task = createSimpleTaskDraft({
      title: "  Water the plants  ",
      category: "chore",
      createdByUserId: "me",
      assignedTo: "wife",
      coinValue: 4
    });

    assert.deepEqual(task, {
      type: "simple",
      title: "Water the plants",
      category: "chore",
      description: undefined,
      place: undefined,
      plannedDate: undefined,
      status: "todo",
      createdByUserId: "me",
      assignedTo: "wife",
      coinValue: 4
    });
  });

  it("creates one positive CoinEvent command when a simple task is completed", () => {
    const coinEvent = createTaskCompletionCoinEvent({
      taskId: "task_123",
      title: "Water the plants",
      coinValue: 4,
      completedByUserId: "wife"
    });

    assert.deepEqual(coinEvent, {
      amount: 4,
      reason: "Complete task: Water the plants",
      sourceType: "task",
      taskId: "task_123",
      earnedByUserId: "wife",
      createdByUserId: "wife"
    });
  });

  it("derives Piggy Fund totals from immutable coin events", () => {
    const summary = deriveFundSummary(
      [
        {
          amount: 5,
          earnedByUserId: "me",
          createdAt: "2026-06-16T08:00:00.000Z"
        },
        {
          amount: 3,
          earnedByUserId: "wife",
          createdAt: "2026-06-20T08:00:00.000Z"
        },
        {
          amount: -2,
          earnedByUserId: null,
          createdAt: "2026-06-20T09:00:00.000Z"
        }
      ],
      new Date("2026-06-20T12:00:00.000Z")
    );

    assert.deepEqual(summary, {
      balance: 6,
      earnedAllTime: 8,
      redeemedAllTime: 2,
      earnedThisWeek: 8
    });
  });

  it("derives leaderboard totals from positive earned events only", () => {
    const leaders = deriveLeaderboard(
      [
        {
          amount: 5,
          earnedByUserId: "me",
          createdAt: "2026-06-19T08:00:00.000Z"
        },
        {
          amount: 7,
          earnedByUserId: "wife",
          createdAt: "2026-06-20T08:00:00.000Z"
        },
        {
          amount: -4,
          earnedByUserId: "wife",
          createdAt: "2026-06-20T09:00:00.000Z"
        }
      ],
      [
        { userId: "me", displayName: "Me", sortOrder: 1 },
        { userId: "wife", displayName: "Piggy", sortOrder: 2 }
      ]
    );

    assert.deepEqual(leaders, [
      {
        userId: "wife",
        displayName: "Piggy",
        earnedCoins: 7
      },
      {
        userId: "me",
        displayName: "Me",
        earnedCoins: 5
      }
    ]);
  });
});
