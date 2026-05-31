"use client";

import { FarmCollections } from "./FarmCollections";
import { FarmHeader } from "./FarmHeader";
import { FarmScene } from "./FarmScene";
import { FarmSidebar } from "./FarmSidebar";
import { useFarmPrototype } from "./useFarmPrototype";

export function FarmPrototype() {
  const farm = useFarmPrototype();

  return (
    <>
      <FarmHeader feed={farm.feed} seeds={farm.seeds} coins={farm.coins} />

      <section className="farmLayout">
        <FarmScene
          coins={farm.coins}
          plants={farm.plants}
          piggies={farm.piggies}
          dialogue={farm.dialogue}
        />
        <FarmSidebar
          level={farm.level}
          levelProgress={farm.levelProgress}
          xp={farm.xp}
          piggies={farm.piggies}
          feedPiggies={farm.feedPiggies}
          plantSeed={farm.plantSeed}
          completeSampleTask={farm.completeSampleTask}
          generateMemoryCard={farm.generateMemoryCard}
        />
      </section>

      <FarmCollections
        memories={farm.memories}
        recentRewards={farm.recentRewards}
        unlockedDecorations={farm.unlockedDecorations}
        level={farm.level}
      />
    </>
  );
}
