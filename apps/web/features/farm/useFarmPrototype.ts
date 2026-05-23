import { useMemo, useState } from "react";
import {
  calculateCompletionRewards,
  calculateFarmLevel,
  calculateFarmXp,
  calculateLevelProgress,
  pickPiggyDialogue,
  type FarmResource,
  type FarmRewardEvent
} from "@piggy-days/core";
import {
  decorationUnlocks,
  startingMemories,
  startingPiggies,
  startingPlants,
  startingRewards
} from "./mockData";
import type { FarmPrototypeActions, FarmPrototypeState, MemoryCard, Plant } from "./types";

function makeRewardEvent(resource: FarmResource, amount: number, reason: string): FarmRewardEvent {
  return {
    id: `${resource}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    resource,
    amount,
    reason,
    createdAt: "Just now"
  };
}

export function useFarmPrototype(): FarmPrototypeState & FarmPrototypeActions {
  const [feed, setFeed] = useState(2);
  const [seeds, setSeeds] = useState(2);
  const [coins, setCoins] = useState(6);
  const [xp, setXp] = useState(20);
  const [piggies, setPiggies] = useState(startingPiggies);
  const [plants, setPlants] = useState<Plant[]>(startingPlants);
  const [memories, setMemories] = useState<MemoryCard[]>(startingMemories);
  const [recentRewards, setRecentRewards] = useState(startingRewards);
  const [dialogue, setDialogue] = useState(pickPiggyDialogue("curious", "seeds"));

  const level = calculateFarmLevel(xp);
  const levelProgress = calculateLevelProgress(xp);

  const unlockedDecorations = useMemo(
    () => decorationUnlocks.filter((decoration) => decoration.level <= level),
    [level]
  );

  function addReward(resource: FarmResource, amount: number, reason: string) {
    const event = makeRewardEvent(resource, amount, reason);
    setRecentRewards((current) => [event, ...current].slice(0, 6));
    setDialogue(pickPiggyDialogue("happy", resource));
  }

  function feedPiggies() {
    if (feed <= 0) {
      setDialogue("The bowl is empty. Complete a tiny task to earn Feed.");
      setPiggies((current) =>
        current.map((piggy) => ({
          ...piggy,
          mood: "hungry"
        }))
      );
      return;
    }

    setFeed((current) => current - 1);
    setPiggies((current) =>
      current.map((piggy) => ({
        ...piggy,
        mood: "happy"
      }))
    );
    setDialogue("Snack time. The farm feels a little softer.");
  }

  function plantSeed() {
    if (seeds <= 0) {
      setDialogue("No Seeds yet. Add a check-in or finish an outing first.");
      return;
    }

    const nextPlantNumber = plants.length + 1;
    setSeeds((current) => current - 1);
    setPlants((current) => [
      ...current,
      {
        id: `plant-${Date.now()}`,
        stage: nextPlantNumber % 2 === 0 ? "sprout" : "bloom",
        label: `Memory ${nextPlantNumber}`
      }
    ]);
    setXp((current) => current + 4);
    setDialogue("A tiny new plant is growing from a real moment.");
  }

  function completeSampleTask() {
    const input = {
      hasCheckInPhoto: true,
      grocerySavingsCents: 500
    };
    const rewards = calculateCompletionRewards(input);

    for (const reward of rewards) {
      if (reward.resource === "feed") {
        setFeed((current) => current + reward.amount);
      }

      if (reward.resource === "seeds") {
        setSeeds((current) => current + reward.amount);
      }

      if (reward.resource === "coins") {
        setCoins((current) => current + reward.amount);
      }

      addReward(reward.resource, reward.amount, reward.reason);
    }

    setXp((current) => current + calculateFarmXp(input));
    setPiggies((current) =>
      current.map((piggy) => ({
        ...piggy,
        mood: "proud"
      }))
    );
  }

  function generateMemoryCard() {
    const nextMemoryNumber = memories.length + 1;

    setMemories((current) => [
      {
        id: `memory-${Date.now()}`,
        title: `Week ${nextMemoryNumber} tiny win`,
        note: "One completed task, one check-in, and one small grocery saving became farm progress."
      },
      ...current
    ]);
    setFeed((current) => current + 1);
    setXp((current) => current + 15);
    addReward("feed", 1, "Generate review memory");
    setDialogue(pickPiggyDialogue("celebrating"));
  }

  return {
    feed,
    seeds,
    coins,
    xp,
    level,
    levelProgress,
    piggies,
    plants,
    memories,
    recentRewards,
    dialogue,
    unlockedDecorations,
    feedPiggies,
    plantSeed,
    completeSampleTask,
    generateMemoryCard
  };
}
