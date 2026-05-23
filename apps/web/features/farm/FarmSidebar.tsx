import type { FarmPrototypeActions, Piggy } from "./types";

type FarmSidebarProps = FarmPrototypeActions & {
  level: number;
  levelProgress: number;
  xp: number;
  piggies: Piggy[];
};

export function FarmSidebar({
  level,
  levelProgress,
  xp,
  piggies,
  feedPiggies,
  plantSeed,
  completeSampleTask,
  generateMemoryCard
}: FarmSidebarProps) {
  return (
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
  );
}
