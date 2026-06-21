"use client";

import { useEffect, useState } from "react";
import type { HouseholdUserId } from "./api/types";

export const CURRENT_USER_STORAGE_KEY = "piggy-days-current-user";

export function isHouseholdUser(value: string | null): value is HouseholdUserId {
  return value === "me" || value === "wife";
}

export function readCurrentUser(): HouseholdUserId {
  if (typeof window === "undefined") {
    return "me";
  }

  const storedUser = window.localStorage.getItem(CURRENT_USER_STORAGE_KEY);
  return isHouseholdUser(storedUser) ? storedUser : "me";
}

export function writeCurrentUser(user: HouseholdUserId) {
  window.localStorage.setItem(CURRENT_USER_STORAGE_KEY, user);
}

export function useCurrentUser() {
  const [currentUser, setCurrentUserState] = useState<HouseholdUserId>("me");

  useEffect(() => {
    setCurrentUserState(readCurrentUser());
  }, []);

  const setCurrentUser = (user: HouseholdUserId) => {
    setCurrentUserState(user);
    writeCurrentUser(user);
  };

  return {
    currentUser,
    setCurrentUser
  };
}
