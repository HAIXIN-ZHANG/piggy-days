import type { CoinEvent, CoinEventSourceType } from "@piggy-days/database";

const sourceTypeFromPrisma: Record<CoinEventSourceType, string> = {
  TASK: "task",
  CHECKLIST_ITEM: "checklist_item",
  KITCHEN: "kitchen",
  EXPLORE: "explore",
  REVIEW: "review",
  SHOPPING: "shopping",
  MANUAL: "manual"
};

export const sourceTypeToPrisma: Record<string, CoinEventSourceType> = {
  task: "TASK",
  checklist_item: "CHECKLIST_ITEM",
  kitchen: "KITCHEN",
  explore: "EXPLORE",
  review: "REVIEW",
  shopping: "SHOPPING",
  manual: "MANUAL"
};

export function serializeCoinEvent(event: CoinEvent) {
  return {
    id: event.id,
    amount: event.amount,
    reason: event.reason,
    sourceType: sourceTypeFromPrisma[event.sourceType],
    taskId: event.taskId,
    earnedByUserId: event.earnedByUserId,
    createdByUserId: event.createdByUserId,
    createdAt: event.createdAt.toISOString()
  };
}
