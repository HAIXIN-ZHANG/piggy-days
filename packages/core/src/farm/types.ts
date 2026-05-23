export type FarmResource = "feed" | "seeds" | "coins";

export type PiggyMood = "happy" | "hungry" | "sleepy" | "proud" | "curious" | "celebrating";

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

export type CompletionRewardInput = {
  hasCheckInPhoto?: boolean;
  isCityOuting?: boolean;
  grocerySavingsCents?: number;
};

export type CalculatedFarmReward = Omit<FarmRewardEvent, "id" | "createdAt">;
