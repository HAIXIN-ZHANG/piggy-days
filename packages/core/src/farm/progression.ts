export const farmXpPerLevel = 40;

export function calculateFarmLevel(xp: number) {
  return Math.max(1, Math.floor(Math.max(0, xp) / farmXpPerLevel) + 1);
}

export function calculateLevelProgress(xp: number) {
  const level = calculateFarmLevel(xp);
  const currentLevelBaseXp = (level - 1) * farmXpPerLevel;
  const nextLevelXp = level * farmXpPerLevel;

  return Math.min(
    100,
    ((Math.max(0, xp) - currentLevelBaseXp) / (nextLevelXp - currentLevelBaseXp)) * 100
  );
}
