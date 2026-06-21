"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, ListChecks, Utensils } from "lucide-react";
import { getCoinEvents, getFundSummary, getLeaderboard, getTasks } from "@/lib/api/client";
import { useI18n } from "@/lib/i18n/useI18n";

export function TodayPage() {
  const { t } = useI18n();
  const copy = t.routes.today;
  const tasksQuery = useQuery({
    queryKey: ["tasks", "todo"],
    queryFn: () => getTasks("todo")
  });
  const fundQuery = useQuery({
    queryKey: ["fund", "summary"],
    queryFn: getFundSummary
  });
  const leaderboardQuery = useQuery({
    queryKey: ["leaderboard", "week"],
    queryFn: () => getLeaderboard("week")
  });
  const coinEventsQuery = useQuery({
    queryKey: ["coins", "events"],
    queryFn: getCoinEvents
  });
  const openTaskCount = tasksQuery.data?.tasks.length ?? 0;
  const fundBalance = fundQuery.data?.balance ?? 0;
  const topLeader = leaderboardQuery.data?.leaders[0];
  const recentReward = coinEventsQuery.data?.items[0];
  const cards = [
    {
      title: t.today.realTasksTitle,
      value: String(openTaskCount),
      body:
        openTaskCount > 0
          ? tasksQuery.data?.tasks
              .slice(0, 2)
              .map((task) => task.title)
              .join(" · ")
          : t.today.realTasksEmpty
    },
    {
      title: "Piggy Fund",
      value: `${fundBalance} ${t.common.coins}`,
      body: t.today.realFundBody
    },
    {
      title: t.fundPage.weeklyLeaderboard,
      value: topLeader ? `${topLeader.displayName} ${topLeader.earnedCoins}` : "0",
      body: t.today.realLeaderboardBody
    },
    {
      title: t.fundPage.recentEvents,
      value: recentReward ? `+${recentReward.amount}` : "0",
      body: recentReward?.reason ?? t.today.realRewardsEmpty
    }
  ];

  return (
    <section className="todayPage" aria-labelledby="today-title">
      <header className="pageHeader">
        <div>
          <p className="pageEyebrow">{copy.eyebrow}</p>
          <h1 id="today-title">{copy.title}</h1>
          <p className="heroCopy">{copy.description}</p>
        </div>

        <Link className="primaryActionLink" href="/tasks">
          <ListChecks size={18} aria-hidden="true" />
          <span>{t.today.openTasks}</span>
        </Link>
      </header>

      <div className="todayDashboard" aria-label="Today dashboard">
        {cards.map((card) => (
          <article className="dashboardTile" key={card.title}>
            <span>{card.title}</span>
            <strong>{card.value}</strong>
            <p>{card.body}</p>
          </article>
        ))}
      </div>

      <section className="prototypeEntry" aria-label={t.today.prototypeTitle}>
        <div className="prototypeEntryIcon" aria-hidden="true">
          <Utensils size={24} />
        </div>
        <div>
          <h2>{t.today.prototypeTitle}</h2>
          <p>{t.today.prototypeBody}</p>
        </div>
        <Link className="secondaryActionLink" href="/kitchen">
          <span>{t.today.openKitchen}</span>
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </section>
    </section>
  );
}
