"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { CalendarDays, Coins, ListChecks, PiggyBank, Settings, Utensils } from "lucide-react";
import { useI18n, type NavKey } from "@/lib/i18n/useI18n";

type NavItem = {
  key: NavKey;
  href: string;
  Icon: LucideIcon;
};

const navItems: NavItem[] = [
  { key: "today", href: "/today", Icon: CalendarDays },
  { key: "tasks", href: "/tasks", Icon: ListChecks },
  { key: "fund", href: "/fund", Icon: Coins },
  { key: "farm", href: "/farm", Icon: PiggyBank },
  { key: "settings", href: "/settings", Icon: Settings }
];

function isActivePath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { t } = useI18n();
  const activeItem = navItems.find((item) => isActivePath(pathname, item.href));
  const activeLabel = pathname.startsWith("/kitchen")
    ? t.app.kitchenLabel
    : activeItem
      ? t.nav[activeItem.key]
      : t.nav.today;

  return (
    <div className="appFrame">
      <header className="appChrome" aria-label="Piggy Days navigation">
        <div className="appChromeInner">
          <Link className="brandHome" href="/today" aria-label="Piggy Days today">
            <span className="brandGlyph" aria-hidden="true">
              P
            </span>
            <span>
              <strong>{t.app.brand}</strong>
              <small>{t.app.tagline}</small>
            </span>
          </Link>

          <nav className="desktopNav" aria-label="Primary navigation">
            {navItems.map(({ key, href, Icon }) => (
              <Link
                aria-current={activeItem?.key === key ? "page" : undefined}
                className={`navLink ${activeItem?.key === key ? "active" : ""}`}
                href={href}
                key={key}
              >
                <Icon size={17} aria-hidden="true" />
                <span>{t.nav[key]}</span>
              </Link>
            ))}
          </nav>

          <Link className="prototypeLink" href="/kitchen">
            <Utensils size={17} aria-hidden="true" />
            <span>{t.app.kitchenLabel}</span>
          </Link>
        </div>
      </header>

      <main className="appShell">
        <div className="appPageMarker" aria-label={t.app.activeSection}>
          <span>{t.app.activeSection}</span>
          <strong>{activeLabel}</strong>
        </div>
        {children}
      </main>

      <nav className="mobileBottomNav" aria-label="Primary navigation">
        {navItems.map(({ key, href, Icon }) => (
          <Link
            aria-current={activeItem?.key === key ? "page" : undefined}
            className={`mobileNavLink ${activeItem?.key === key ? "active" : ""}`}
            href={href}
            key={key}
          >
            <Icon size={20} aria-hidden="true" />
            <span>{t.nav[key]}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
