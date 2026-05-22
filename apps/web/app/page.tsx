"use client";

import { useMemo, useState, type CSSProperties } from "react";
import {
  calculateCompletionRewards,
  calculateFarmLevel,
  calculateFarmXp,
  pickPiggyDialogue,
  type FarmResource,
  type FarmRewardEvent,
  type PiggyMood
} from "@piggy-days/core";

type Piggy = {
  name: string;
  mood: PiggyMood;
  favorite: string;
};

type Plant = {
  id: string;
  stage: "sprout" | "bloom";
  label: string;
};

type MemoryCard = {
  id: string;
  title: string;
  note: string;
};

const startingRewards: FarmRewardEvent[] = [
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

const startingPiggies: Piggy[] = [
  {
    name: "Momo",
    mood: "curious",
    favorite: "tiny grocery wins"
  },
  {
    name: "Bun",
    mood: "sleepy",
    favorite: "weekend outings"
  }
];

const decorationUnlocks = [
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

function makeRewardEvent(
  resource: FarmResource,
  amount: number,
  reason: string
): FarmRewardEvent {
  return {
    id: `${resource}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    resource,
    amount,
    reason,
    createdAt: "Just now"
  };
}

export default function HomePage() {
  const [feed, setFeed] = useState(2);
  const [seeds, setSeeds] = useState(2);
  const [coins, setCoins] = useState(6);
  const [xp, setXp] = useState(20);
  const [piggies, setPiggies] = useState(startingPiggies);
  const [plants, setPlants] = useState<Plant[]>([
    {
      id: "plant-1",
      stage: "bloom",
      label: "First idea"
    }
  ]);
  const [memories, setMemories] = useState<MemoryCard[]>([
    {
      id: "memory-1",
      title: "Farm started",
      note: "A private little place for tasks, dates, shopping wins, and memories."
    }
  ]);
  const [recentRewards, setRecentRewards] = useState(startingRewards);
  const [dialogue, setDialogue] = useState(
    pickPiggyDialogue("curious", "seeds")
  );

  const level = calculateFarmLevel(xp);
  const nextLevelXp = level * 40;
  const currentLevelBaseXp = (level - 1) * 40;
  const levelProgress = Math.min(
    100,
    ((xp - currentLevelBaseXp) / (nextLevelXp - currentLevelBaseXp)) * 100
  );

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
    const rewards = calculateCompletionRewards({
      hasCheckInPhoto: true,
      grocerySavingsCents: 500
    });

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

    setXp((current) =>
      current +
      calculateFarmXp({
        hasCheckInPhoto: true,
        grocerySavingsCents: 500
      })
    );
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

  return (
    <main className="appShell">
      <section className="farmHeader" aria-label="Piggy farm status">
        <div>
          <p className="projectName">Piggy Days</p>
          <h1>Our tiny farm is open.</h1>
          <p className="heroCopy">
            Complete real-life tasks, collect gentle rewards, feed the piggies,
            plant memories, and let the farm grow without pressure.
          </p>
        </div>

        <div className="resourceBar" aria-label="Farm resources">
          <Resource label="Feed" value={feed} tone="feed" />
          <Resource label="Seeds" value={seeds} tone="seeds" />
          <Resource label="Coins" value={coins} tone="coins" />
        </div>
      </section>

      <section className="farmLayout">
        <div className="farmScene" aria-label="Interactive piggy farm">
          <div className="skyDecor sun" />
          <div className="cloud cloudOne" />
          <div className="cloud cloudTwo" />
          <div className="cottage">
            <span className="door" />
            <span className="window windowOne" />
            <span className="window windowTwo" />
          </div>
          <div className="coinJar">
            <span>{coins}</span>
          </div>
          <div className="plantPatch">
            {plants.map((plant, index) => (
              <span
                className={`plant plant-${plant.stage}`}
                key={plant.id}
                style={{ "--plant-index": index } as CSSProperties}
                title={plant.label}
              />
            ))}
          </div>
          <div className="feedBowl">
            <span />
          </div>
          {piggies.map((piggy, index) => (
            <div
              className={`farmPiggy piggy-${index + 1} mood-${piggy.mood}`}
              key={piggy.name}
            >
              <span className="piggyEar" />
              <span className="piggyNose" />
              <span className="piggyEye" />
              <span className="piggyLeg legOne" />
              <span className="piggyLeg legTwo" />
            </div>
          ))}
          <div className="dialogueBubble">{dialogue}</div>
        </div>

        <aside className="farmPanel" aria-label="Farm controls">
          <div className="levelBlock">
            <div>
              <span>Farm Level</span>
              <strong>{level}</strong>
            </div>
            <div className="progressTrack" aria-label="Farm level progress">
              <span style={{ width: `${levelProgress}%` }} />
            </div>
            <p>{xp} XP collected from real-life progress</p>
          </div>

          <div className="actionGrid">
            <button type="button" onClick={feedPiggies}>
              Feed piggies
            </button>
            <button type="button" onClick={plantSeed}>
              Plant seed
            </button>
            <button type="button" onClick={completeSampleTask}>
              Complete task
            </button>
            <button type="button" onClick={generateMemoryCard}>
              Make memory
            </button>
          </div>

          <section className="piggyList" aria-label="Piggy moods">
            {piggies.map((piggy) => (
              <article className="piggyRow" key={piggy.name}>
                <div>
                  <strong>{piggy.name}</strong>
                  <span>{piggy.favorite}</span>
                </div>
                <p>{piggy.mood}</p>
              </article>
            ))}
          </section>
        </aside>
      </section>

      <section className="belowFarm">
        <div className="memoryWall">
          <div className="sectionTitle">
            <h2>Memory wall</h2>
            <span>{memories.length} cards</span>
          </div>
          <div className="memoryGrid">
            {memories.map((memory) => (
              <article className="memoryCard" key={memory.id}>
                <h3>{memory.title}</h3>
                <p>{memory.note}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="rewardLog">
          <div className="sectionTitle">
            <h2>Recent rewards</h2>
            <span>{recentRewards.length} events</span>
          </div>
          <div className="rewardList">
            {recentRewards.map((reward) => (
              <article className="rewardItem" key={reward.id}>
                <span className={`rewardDot ${reward.resource}`} />
                <div>
                  <strong>
                    +{reward.amount} {reward.resource}
                  </strong>
                  <p>{reward.reason}</p>
                </div>
                <time>{reward.createdAt}</time>
              </article>
            ))}
          </div>
        </div>

        <div className="unlockShelf">
          <div className="sectionTitle">
            <h2>Unlocked</h2>
            <span>{unlockedDecorations.length} items</span>
          </div>
          <div className="unlockGrid">
            {decorationUnlocks.map((decoration) => (
              <article
                className={
                  decoration.level <= level ? "unlockItem" : "unlockItem locked"
                }
                key={decoration.name}
              >
                <strong>{decoration.name}</strong>
                <span>Level {decoration.level}</span>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function Resource({
  label,
  value,
  tone
}: {
  label: string;
  value: number;
  tone: FarmResource;
}) {
  return (
    <article className={`resourceCard ${tone}`}>
      <span>{label}</span>
      <strong>{value}</strong>
    </article>
  );
}
