import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  calculateCompletionRewards,
  calculateFarmLevel,
  calculateFarmXp,
  calculateLevelProgress
} from "./index.js";

describe("farm rewards", () => {
  it("always rewards feed for completing a task", () => {
    assert.deepEqual(calculateCompletionRewards(), [
      {
        resource: "feed",
        amount: 1,
        reason: "Complete task"
      }
    ]);
  });

  it("adds seeds for check-in photos and city outings", () => {
    assert.deepEqual(
      calculateCompletionRewards({
        hasCheckInPhoto: true,
        isCityOuting: true
      }),
      [
        {
          resource: "feed",
          amount: 1,
          reason: "Complete task"
        },
        {
          resource: "seeds",
          amount: 1,
          reason: "Upload check-in photo"
        },
        {
          resource: "seeds",
          amount: 2,
          reason: "Complete city outing"
        }
      ]
    );
  });

  it("converts whole-dollar grocery savings into coins", () => {
    assert.deepEqual(
      calculateCompletionRewards({
        grocerySavingsCents: 575
      }).at(-1),
      {
        resource: "coins",
        amount: 5,
        reason: "Estimated grocery savings"
      }
    );
  });

  it("calculates XP and level progress predictably", () => {
    assert.equal(
      calculateFarmXp({
        hasCheckInPhoto: true,
        grocerySavingsCents: 500
      }),
      25
    );
    assert.equal(calculateFarmLevel(0), 1);
    assert.equal(calculateFarmLevel(39), 1);
    assert.equal(calculateFarmLevel(40), 2);
    assert.equal(calculateLevelProgress(20), 50);
  });
});
