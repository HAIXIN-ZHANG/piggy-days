import type { CalculatedFarmReward, CompletionRewardInput, FarmState } from "./types.js";

export const defaultFarmState = {
  feed: 0,
  seeds: 0,
  coins: 0,
  xp: 0,
  level: 1,
  recentRewards: []
} satisfies FarmState;

export function calculateCompletionRewards(
  input: CompletionRewardInput = {}
): CalculatedFarmReward[] {
  const rewards: CalculatedFarmReward[] = [
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
