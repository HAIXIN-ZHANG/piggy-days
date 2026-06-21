"use client";

import Link from "next/link";
import { Check, Languages, UserRound, Utensils } from "lucide-react";
import type { HouseholdUserId } from "@/lib/api/types";
import { useCurrentUser } from "@/lib/currentUser";
import { useI18n, type Locale } from "@/lib/i18n/useI18n";

const users: HouseholdUserId[] = ["me", "wife"];
const locales: Locale[] = ["zh-CN", "en"];

export function SettingsPage() {
  const { locale, setLocale, t } = useI18n();
  const { currentUser, setCurrentUser } = useCurrentUser();

  return (
    <section className="settingsPage" aria-labelledby="settings-title">
      <header className="pageHeader">
        <div>
          <p className="pageEyebrow">{t.settings.eyebrow}</p>
          <h1 id="settings-title">{t.settings.title}</h1>
          <p className="heroCopy">{t.settings.description}</p>
        </div>
      </header>

      <section className="settingsSection" aria-labelledby="settings-user-title">
        <span className="settingsIcon" aria-hidden="true">
          <UserRound size={22} />
        </span>
        <div className="settingsSectionBody">
          <h2 id="settings-user-title">{t.settings.currentUserTitle}</h2>
          <p>{t.settings.currentUserBody}</p>
          <div className="choiceGrid" role="group" aria-label={t.settings.currentUserTitle}>
            {users.map((user) => (
              <button
                className={`choiceButton ${currentUser === user ? "active" : ""}`}
                key={user}
                onClick={() => setCurrentUser(user)}
                type="button"
              >
                <span>{t.settings.users[user]}</span>
                {currentUser === user ? <Check size={16} aria-hidden="true" /> : null}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="settingsSection" aria-labelledby="settings-language-title">
        <span className="settingsIcon" aria-hidden="true">
          <Languages size={22} />
        </span>
        <div className="settingsSectionBody">
          <h2 id="settings-language-title">{t.settings.languageTitle}</h2>
          <p>{t.settings.languageBody}</p>
          <div className="choiceGrid" role="group" aria-label={t.settings.languageTitle}>
            {locales.map((nextLocale) => (
              <button
                className={`choiceButton ${locale === nextLocale ? "active" : ""}`}
                key={nextLocale}
                onClick={() => setLocale(nextLocale)}
                type="button"
              >
                <span>{t.settings.languages[nextLocale]}</span>
                {locale === nextLocale ? <Check size={16} aria-hidden="true" /> : null}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section
        className="settingsSection experimentSection"
        aria-labelledby="settings-prototype-title"
      >
        <span className="settingsIcon" aria-hidden="true">
          <Utensils size={22} />
        </span>
        <div className="settingsSectionBody">
          <h2 id="settings-prototype-title">{t.settings.prototypeTitle}</h2>
          <p>{t.settings.prototypeBody}</p>
          <Link className="secondaryActionLink" href="/kitchen">
            <span>{t.settings.openKitchen}</span>
          </Link>
        </div>
      </section>
    </section>
  );
}
