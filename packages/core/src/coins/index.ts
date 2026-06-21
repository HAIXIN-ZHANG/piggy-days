export type CoinEventSourceType =
  | "task"
  | "checklist_item"
  | "kitchen"
  | "explore"
  | "review"
  | "shopping"
  | "manual";

export type CoinEventForDerivation = {
  amount: number;
  earnedByUserId: string | null;
  createdAt: Date | string;
};

export type LeaderboardPerson = {
  userId: string;
  displayName: string;
  sortOrder?: number;
};

export type FundSummary = {
  balance: number;
  earnedAllTime: number;
  redeemedAllTime: number;
  earnedThisWeek: number;
};

export type LeaderboardRow = {
  userId: string;
  displayName: string;
  earnedCoins: number;
};

export function getUtcWeekStart(now: Date) {
  const start = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  const day = start.getUTCDay();
  const daysSinceMonday = (day + 6) % 7;
  start.setUTCDate(start.getUTCDate() - daysSinceMonday);
  return start;
}

export function deriveFundSummary(
  events: CoinEventForDerivation[],
  now: Date = new Date()
): FundSummary {
  const weekStart = getUtcWeekStart(now).getTime();

  return events.reduce<FundSummary>(
    (summary, event) => {
      summary.balance += event.amount;

      if (event.amount > 0) {
        summary.earnedAllTime += event.amount;

        if (new Date(event.createdAt).getTime() >= weekStart) {
          summary.earnedThisWeek += event.amount;
        }
      }

      if (event.amount < 0) {
        summary.redeemedAllTime += Math.abs(event.amount);
      }

      return summary;
    },
    {
      balance: 0,
      earnedAllTime: 0,
      redeemedAllTime: 0,
      earnedThisWeek: 0
    }
  );
}

export function deriveLeaderboard(
  events: CoinEventForDerivation[],
  people: LeaderboardPerson[]
): LeaderboardRow[] {
  const totals = new Map<string, number>();

  for (const event of events) {
    if (event.amount <= 0 || !event.earnedByUserId) {
      continue;
    }

    totals.set(event.earnedByUserId, (totals.get(event.earnedByUserId) ?? 0) + event.amount);
  }

  return people
    .map((person) => ({
      userId: person.userId,
      displayName: person.displayName,
      earnedCoins: totals.get(person.userId) ?? 0,
      sortOrder: person.sortOrder ?? 999
    }))
    .sort((first, second) => {
      if (second.earnedCoins !== first.earnedCoins) {
        return second.earnedCoins - first.earnedCoins;
      }

      return first.sortOrder - second.sortOrder;
    })
    .map(({ sortOrder: _sortOrder, ...row }) => row);
}
