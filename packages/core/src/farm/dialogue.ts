import type { FarmResource, PiggyMood } from "./types.js";

export function pickPiggyDialogue(mood: PiggyMood, resource?: FarmResource) {
  if (resource === "coins") {
    return "We saved a little today. Coin jar time.";
  }

  if (resource === "seeds") {
    return "The garden wants one more seed.";
  }

  switch (mood) {
    case "celebrating":
      return "This week deserves a tiny flower.";
    case "curious":
      return "What small adventure should we try next?";
    case "hungry":
      return "One task done. I am ready for a snack.";
    case "proud":
      return "That check-in feels like a good memory.";
    case "sleepy":
      return "I will nap here until the next tiny win.";
    case "happy":
    default:
      return "The farm is warmer when real life moves a little.";
  }
}
