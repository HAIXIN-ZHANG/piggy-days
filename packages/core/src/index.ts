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

export const retailerCodes = ["coles", "woolworths", "aldi"] as const;

export type RetailerCode = (typeof retailerCodes)[number];

export type FarmResource = "feed" | "seeds" | "coins";

export type PiggyMood =
  | "happy"
  | "hungry"
  | "sleepy"
  | "proud"
  | "curious"
  | "celebrating";

export type FarmRewardEvent = {
  id: string;
  resource: FarmResource;
  amount: number;
  reason: string;
  createdAt: string;
};

export type FarmState = {
  feed: number;
  seeds: number;
  coins: number;
  xp: number;
  level: number;
  recentRewards: FarmRewardEvent[];
};

export const defaultFarmState: FarmState = {
  feed: 0,
  seeds: 0,
  coins: 0,
  xp: 0,
  level: 1,
  recentRewards: []
};

export type CompletionRewardInput = {
  hasCheckInPhoto?: boolean;
  isCityOuting?: boolean;
  grocerySavingsCents?: number;
};

export function calculateCompletionRewards(input: CompletionRewardInput = {}) {
  const rewards: Array<Omit<FarmRewardEvent, "id" | "createdAt">> = [
    {
      resource: "feed",
      amount: 1,
      reason: "Complete task"
    }
  ];

  if (input.hasCheckInPhoto) {
    rewards.push({
      resource: "seeds",
      amount: 1,
      reason: "Upload check-in photo"
    });
  }

  if (input.isCityOuting) {
    rewards.push({
      resource: "seeds",
      amount: 2,
      reason: "Complete city outing"
    });
  }

  const savingsDollars = Math.floor((input.grocerySavingsCents ?? 0) / 100);

  if (savingsDollars > 0) {
    rewards.push({
      resource: "coins",
      amount: savingsDollars,
      reason: "Estimated grocery savings"
    });
  }

  return rewards;
}

export function calculateFarmLevel(xp: number) {
  return Math.max(1, Math.floor(xp / 40) + 1);
}

export function calculateFarmXp(input: CompletionRewardInput = {}) {
  let xp = 5;

  if (input.hasCheckInPhoto) {
    xp += 10;
  }

  if (input.isCityOuting) {
    xp += 20;
  }

  if ((input.grocerySavingsCents ?? 0) > 0) {
    xp += 10;
  }

  return xp;
}

export function pickPiggyDialogue(mood: PiggyMood, resource?: FarmResource) {
  if (resource === "coins") {
    return "We saved a little today. Coin jar time.";
  }

  if (resource === "seeds") {
    return "The garden wants one more seed.";
  }

  switch (mood) {
    case "celebrating":
      return "This week deserves a tiny flower.";
    case "curious":
      return "What small adventure should we try next?";
    case "hungry":
      return "One task done. I am ready for a snack.";
    case "proud":
      return "That check-in feels like a good memory.";
    case "sleepy":
      return "I will nap here until the next tiny win.";
    case "happy":
    default:
      return "The farm is warmer when real life moves a little.";
  }
}

export function isRetailerCode(value: string): value is RetailerCode {
  return retailerCodes.includes(value as RetailerCode);
}
