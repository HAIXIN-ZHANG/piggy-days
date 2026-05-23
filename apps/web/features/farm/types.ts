import type { FarmRewardEvent, PiggyMood } from "@piggy-days/core";

export type Piggy = {
  name: string;
  mood: PiggyMood;
  favorite: string;
  variant: "rose" | "peach";
  accessory: "bow" | "scarf";
};

export type Plant = {
  id: string;
  stage: "sprout" | "bloom";
  label: string;
};

export type MemoryCard = {
  id: string;
  title: string;
  note: string;
};

export type DecorationUnlock = {
  level: number;
  name: string;
};

export type FarmPrototypeState = {
  feed: number;
  seeds: number;
  coins: number;
  xp: number;
  level: number;
  levelProgress: number;
  piggies: Piggy[];
  plants: Plant[];
  memories: MemoryCard[];
  recentRewards: FarmRewardEvent[];
  dialogue: string;
  unlockedDecorations: DecorationUnlock[];
};

export type FarmPrototypeActions = {
  feedPiggies: () => void;
  plantSeed: () => void;
  completeSampleTask: () => void;
  generateMemoryCard: () => void;
};
