import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AppShell } from "../features/app/AppShell";
import { AppProviders } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Piggy Days",
  description: "A private todo and checklist game for tasks, Piggy Coins, Piggy Fund, and memories."
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="zh-CN">
      <body>
        <AppProviders>
          <AppShell>{children}</AppShell>
        </AppProviders>
      </body>
    </html>
  );
}
