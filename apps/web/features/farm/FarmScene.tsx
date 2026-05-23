import type { CSSProperties } from "react";
import type { Piggy, Plant } from "./types";

type FarmSceneProps = {
  coins: number;
  plants: Plant[];
  piggies: Piggy[];
  dialogue: string;
};

export function FarmScene({ coins, plants, piggies, dialogue }: FarmSceneProps) {
  return (
    <div className="farmScene" aria-label="Interactive piggy farm">
      <div className="skyDecor sun" />
      <div className="cloud cloudOne" />
      <div className="cloud cloudTwo" />
      <div className="scenePath" />
      <div className="cottage">
        <span className="chimney" />
        <span className="door" />
        <span className="window windowOne" />
        <span className="window windowTwo" />
        <span className="cottageLight" />
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
        <PiggyAvatar index={index} key={piggy.name} piggy={piggy} />
      ))}
      <div className="dialogueBubble">{dialogue}</div>
    </div>
  );
}

function PiggyAvatar({ index, piggy }: { index: number; piggy: Piggy }) {
  return (
    <div
      className={`farmPiggy piggy-${index + 1} piggy-${piggy.variant} accessory-${piggy.accessory} mood-${piggy.mood}`}
      aria-label={`${piggy.name} is ${piggy.mood}`}
      title={`${piggy.name}: ${piggy.favorite}`}
    >
      <span className="piggyTail" />
      <span className="piggyEar earLeft" />
      <span className="piggyEar earRight" />
      <span className="piggyNose" />
      <span className="piggyEye eyeOne" />
      <span className="piggyEye eyeTwo" />
      <span className="piggyCheek cheekOne" />
      <span className="piggyCheek cheekTwo" />
      <span className="piggySmile" />
      <span className="piggyAccessory" />
      <span className="piggyLeg legOne" />
      <span className="piggyLeg legTwo" />
    </div>
  );
}
