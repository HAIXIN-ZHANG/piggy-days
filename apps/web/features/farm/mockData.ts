import type { FarmRewardEvent } from "@piggy-days/core";
import type { DecorationUnlock, MemoryCard, Piggy, Plant } from "./types";

export const startingRewards: FarmRewardEvent[] = [
  {
    id: "reward-1",
    resource: "feed",
    amount: 1,
    reason: "Set up Piggy Farm",
    createdAt: "Today"
  },
  {
    id: "reward-2",
    resource: "seeds",
    amount: 2,
    reason: "Saved the first farm idea",
    createdAt: "Today"
  }
];

export const startingPiggies: Piggy[] = [
  {
    name: "Momo",
    mood: "curious",
    favorite: "tiny grocery wins",
    variant: "rose",
    accessory: "bow"
  },
  {
    name: "Bun",
    mood: "sleepy",
    favorite: "weekend outings",
    variant: "peach",
    accessory: "scarf"
  }
];

export const startingPlants: Plant[] = [
  {
    id: "plant-1",
    stage: "bloom",
    label: "First idea"
  }
];

export const startingMemories: MemoryCard[] = [
  {
    id: "memory-1",
    title: "Farm started",
    note: "A private little place for tasks, dates, shopping wins, and memories."
  }
];

export const decorationUnlocks: DecorationUnlock[] = [
  {
    level: 1,
    name: "Cottage lights"
  },
  {
    level: 2,
    name: "Garden patch"
  },
  {
    level: 3,
    name: "Memory wall"
  },
  {
    level: 4,
    name: "Coin jar shelf"
  }
];
