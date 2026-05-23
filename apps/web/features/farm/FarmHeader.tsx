import { ResourceCard } from "./ResourceCard";

type FarmHeaderProps = {
  feed: number;
  seeds: number;
  coins: number;
};

export function FarmHeader({ feed, seeds, coins }: FarmHeaderProps) {
  return (
    <section className="farmHeader" aria-label="Piggy farm status">
      <div>
        <p className="projectName">Piggy Days</p>
        <h1>Our tiny farm is open.</h1>
        <p className="heroCopy">
          Complete real-life tasks, collect gentle rewards, feed the piggies, plant memories, and
          let the farm grow without pressure.
        </p>
      </div>

      <div className="resourceBar" aria-label="Farm resources">
        <ResourceCard label="Feed" value={feed} tone="feed" />
        <ResourceCard label="Seeds" value={seeds} tone="seeds" />
        <ResourceCard label="Coins" value={coins} tone="coins" />
      </div>
    </section>
  );
}
