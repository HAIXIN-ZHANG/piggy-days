"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Coins, ListChecks, Trophy } from "lucide-react";
import { getCoinEvents, getFundSummary, getLeaderboard } from "@/lib/api/client";
import { useI18n } from "@/lib/i18n/useI18n";

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(new Date(value));
}

export function FundPage() {
  const { t } = useI18n();
  const fundQuery = useQuery({
    queryKey: ["fund", "summary"],
    queryFn: getFundSummary
  });
  const eventsQuery = useQuery({
    queryKey: ["coins", "events"],
    queryFn: getCoinEvents
  });
  const weeklyLeaderboardQuery = useQuery({
    queryKey: ["leaderboard", "week"],
    queryFn: () => getLeaderboard("week")
  });
  const allTimeLeaderboardQuery = useQuery({
    queryKey: ["leaderboard", "all"],
    queryFn: () => getLeaderboard("all")
  });

  const summary = fundQuery.data;
  const events = eventsQuery.data?.items ?? [];

  return (
    <section className="fundPage" aria-labelledby="fund-title">
      <header className="pageHeader">
        <div>
          <p className="pageEyebrow">{t.fundPage.eyebrow}</p>
          <h1 id="fund-title">{t.fundPage.title}</h1>
          <p className="heroCopy">{t.fundPage.description}</p>
        </div>
        <Link className="primaryActionLink" href="/tasks">
          <ListChecks size={18} aria-hidden="true" />
          <span>{t.today.openTasks}</span>
        </Link>
      </header>

      {fundQuery.error ? <p className="formError">{fundQuery.error.message}</p> : null}

      <section className="fundSummaryGrid" aria-label={t.fundPage.title}>
        <article className="fundMetric primaryMetric">
          <span>{t.fundPage.balance}</span>
          <strong>{summary?.balance ?? 0}</strong>
          <p>{t.common.coins}</p>
        </article>
        <article className="fundMetric">
          <span>{t.fundPage.earnedThisWeek}</span>
          <strong>{summary?.earnedThisWeek ?? 0}</strong>
          <p>{t.common.coins}</p>
        </article>
        <article className="fundMetric">
          <span>{t.fundPage.earnedAllTime}</span>
          <strong>{summary?.earnedAllTime ?? 0}</strong>
          <p>{t.common.coins}</p>
        </article>
        <article className="fundMetric">
          <span>{t.fundPage.redeemedAllTime}</span>
          <strong>{summary?.redeemedAllTime ?? 0}</strong>
          <p>{t.common.coins}</p>
        </article>
      </section>

      <section className="fundContentGrid">
        <article className="detailPanel">
          <div className="sectionTitleRow">
            <Coins size={20} aria-hidden="true" />
            <h2>{t.fundPage.recentEvents}</h2>
          </div>
          {eventsQuery.isLoading ? <p className="mutedText">{t.common.loading}</p> : null}
          {eventsQuery.error ? <p className="formError">{eventsQuery.error.message}</p> : null}
          {!eventsQuery.isLoading && events.length === 0 ? (
            <p className="mutedText">{t.fundPage.noEvents}</p>
          ) : null}
          <div className="eventList">
            {events.map((event) => (
              <div className="eventRow" key={event.id}>
                <div>
                  <strong>{event.reason}</strong>
                  <span>{formatDateTime(event.createdAt)}</span>
                </div>
                <b>
                  {event.amount > 0 ? "+" : ""}
                  {event.amount}
                </b>
              </div>
            ))}
          </div>
        </article>

        <div className="leaderboardStack">
          <LeaderboardPanel
            title={t.fundPage.weeklyLeaderboard}
            rows={weeklyLeaderboardQuery.data?.leaders ?? []}
            isLoading={weeklyLeaderboardQuery.isLoading}
          />
          <LeaderboardPanel
            title={t.fundPage.allTimeLeaderboard}
            rows={allTimeLeaderboardQuery.data?.leaders ?? []}
            isLoading={allTimeLeaderboardQuery.isLoading}
          />
        </div>
      </section>
    </section>
  );
}

function LeaderboardPanel({
  title,
  rows,
  isLoading
}: {
  title: string;
  rows: { userId: string; displayName: string; earnedCoins: number }[];
  isLoading: boolean;
}) {
  const { t } = useI18n();

  return (
    <article className="detailPanel">
      <div className="sectionTitleRow">
        <Trophy size={20} aria-hidden="true" />
        <h2>{title}</h2>
      </div>
      {isLoading ? <p className="mutedText">{t.common.loading}</p> : null}
      {!isLoading && rows.length === 0 ? (
        <p className="mutedText">{t.fundPage.noLeaderboard}</p>
      ) : null}
      <div className="leaderboardList">
        {rows.map((row, index) => (
          <div className="leaderboardRow" key={row.userId}>
            <span>{index + 1}</span>
            <strong>{row.displayName}</strong>
            <b>
              {row.earnedCoins} {t.common.coins}
            </b>
          </div>
        ))}
      </div>
    </article>
  );
}
