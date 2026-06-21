"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { en } from "./locales/en";
import {
  zhCN,
  type I18nDictionary,
  type Locale,
  type NavKey,
  type RouteKey
} from "./locales/zh-CN";

const STORAGE_KEY = "piggy-days-locale";
const dictionaries: Record<Locale, I18nDictionary> = {
  "zh-CN": zhCN,
  en
};

type I18nContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: I18nDictionary;
};

const I18nContext = createContext<I18nContextValue | null>(null);

function isLocale(value: string | null): value is Locale {
  return value === "zh-CN" || value === "en";
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("zh-CN");

  useEffect(() => {
    const storedLocale = window.localStorage.getItem(STORAGE_KEY);

    if (isLocale(storedLocale)) {
      setLocaleState(storedLocale);
    }
  }, []);

  const setLocale = (nextLocale: Locale) => {
    setLocaleState(nextLocale);
    window.localStorage.setItem(STORAGE_KEY, nextLocale);
    document.documentElement.lang = nextLocale;
  };

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      t: dictionaries[locale]
    }),
    [locale]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error("useI18n must be used inside I18nProvider");
  }

  return context;
}

export type { Locale, NavKey, RouteKey };
