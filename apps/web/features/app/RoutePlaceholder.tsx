"use client";

import type { LucideIcon } from "lucide-react";
import { ArrowRight, CalendarCheck2, Coins, ListChecks } from "lucide-react";
import { useI18n, type RouteKey } from "@/lib/i18n/useI18n";

const routeIcons: Record<RouteKey, LucideIcon> = {
  today: CalendarCheck2,
  tasks: ListChecks,
  taskDetail: ListChecks,
  fund: Coins
};

export function RoutePlaceholder({ routeKey }: { routeKey: RouteKey }) {
  const { t } = useI18n();
  const copy = t.routes[routeKey];
  const Icon = routeIcons[routeKey];

  return (
    <section className="routePage" aria-labelledby={`${routeKey}-title`}>
      <header className="pageHeader">
        <div>
          <p className="pageEyebrow">{copy.eyebrow}</p>
          <h1 id={`${routeKey}-title`}>{copy.title}</h1>
          <p className="heroCopy">{copy.description}</p>
        </div>
        <span className="statusPill">{copy.status}</span>
      </header>

      <section className="emptyStatePanel" aria-label={t.common.routeOnly}>
        <span className="emptyStateIcon" aria-hidden="true">
          <Icon size={28} />
        </span>
        <div>
          <h2>{t.common.routeOnly}</h2>
          <p>{copy.nextStep}</p>
        </div>
      </section>

      <div className="previewList" aria-label="Route preview">
        {copy.preview.map((item) => (
          <article className="previewItem" key={item}>
            <ArrowRight size={16} aria-hidden="true" />
            <span>{item}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
