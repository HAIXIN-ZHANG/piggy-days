import { decorationUnlocks } from "./mockData";
import type { DecorationUnlock, MemoryCard } from "./types";
import type { FarmRewardEvent } from "@piggy-days/core";

type FarmCollectionsProps = {
  memories: MemoryCard[];
  recentRewards: FarmRewardEvent[];
  unlockedDecorations: DecorationUnlock[];
  level: number;
};

export function FarmCollections({
  memories,
  recentRewards,
  unlockedDecorations,
  level
}: FarmCollectionsProps) {
  return (
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
              className={decoration.level <= level ? "unlockItem" : "unlockItem locked"}
              key={decoration.name}
            >
              <strong>{decoration.name}</strong>
              <span>Level {decoration.level}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
