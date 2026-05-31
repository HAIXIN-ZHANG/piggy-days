import type {
  DishReadiness,
  DinnerPlan,
  DinnerPlanStrategy,
  HomeDish,
  HomeDishIngredient,
  KitchenItem,
  KitchenRecommendationInput,
  MealAppetite,
  MealComplexity
} from "./types.js";

type DishEvaluation = {
  dish: HomeDish;
  uses: KitchenItem[];
  missing: string[];
  urgentUses: number;
  mustUseHits: number;
  avoidPenalty: number;
  score: number;
};

const complexityRank: Record<MealComplexity, number> = {
  quick: 0,
  normal: 1,
  slow: 2
};

const appetiteRank: Record<MealAppetite, number> = {
  snack: 0,
  light: 1,
  normal: 2,
  hungry: 3
};

export function buildDinnerPlans(
  items: KitchenItem[],
  dishes: HomeDish[],
  input: KitchenRecommendationInput
): DinnerPlan[] {
  const evaluations = dishes.map((dish) => evaluateDish(dish, items, input));
  const usable = evaluations.filter((evaluation) => evaluation.avoidPenalty < 30);
  const selected: DinnerPlan[] = [];

  addPlan(
    selected,
    "fastest",
    [...usable].sort((a, b) => {
      const missingDiff = a.missing.length - b.missing.length;
      const timeDiff = a.dish.estimatedMinutes - b.dish.estimatedMinutes;
      return timeDiff + missingDiff * 8 + b.mustUseHits * -4;
    }),
    input
  );

  addPlan(
    selected,
    "use_up",
    [...usable].sort((a, b) => {
      const urgentDiff = b.urgentUses - a.urgentUses;
      const useDiff = b.uses.length - a.uses.length;
      const missingDiff = a.missing.length - b.missing.length;
      return urgentDiff * 18 + useDiff * 8 + missingDiff * 6 + b.mustUseHits * 10;
    }),
    input
  );

  addPlan(
    selected,
    "craving",
    [...usable].sort((a, b) => b.score - a.score),
    input
  );

  if (selected.length < 3) {
    for (const evaluation of [...usable].sort((a, b) => b.score - a.score)) {
      addPlan(selected, "craving", [evaluation], input);
      if (selected.length >= 3) {
        break;
      }
    }
  }

  return selected;
}

export function getDishReadiness(dish: HomeDish, items: KitchenItem[]): DishReadiness {
  const requiredIngredients = dish.ingredients.filter(
    (ingredient) => ingredient.required !== false
  );
  const matchedItems = new Map<string, KitchenItem>();
  const missing: string[] = [];

  for (const ingredient of requiredIngredients) {
    const match = findMatchingItem(ingredient, items);

    if (match) {
      matchedItems.set(match.id, match);
    } else {
      missing.push(ingredient.name);
    }
  }

  return {
    dishId: dish.id,
    uses: unique([...matchedItems.values()].map((item) => item.name)),
    missing,
    ready: missing.length === 0
  };
}

function evaluateDish(
  dish: HomeDish,
  items: KitchenItem[],
  input: KitchenRecommendationInput
): DishEvaluation {
  const requiredIngredients = dish.ingredients.filter(
    (ingredient) => ingredient.required !== false
  );
  const matchedItems = new Map<string, KitchenItem>();
  const missing: string[] = [];

  for (const ingredient of requiredIngredients) {
    const match = findMatchingItem(ingredient, items);

    if (match) {
      matchedItems.set(match.id, match);
    } else {
      missing.push(ingredient.name);
    }
  }

  const uses = [...matchedItems.values()];
  const urgentUses = uses.filter(
    (item) => item.status === "eat_soon" || (item.expiresInDays ?? 99) <= 2
  ).length;
  const mustUseHits = countMustUseHits(input.mustUse, dish, uses);
  const avoidPenalty = countAvoidPenalty(input.avoid, dish);
  const complexityFit = complexityRank[input.complexity] - complexityRank[dish.complexity];
  const appetiteFit =
    2 - Math.abs(appetiteRank[input.portion.appetite] - appetiteRank[dish.defaultAppetite]);
  const directionScore = input.direction && dish.tags.includes(input.direction) ? 18 : 0;
  const weeknightScore = dish.weeknightFriendly ? 5 : 0;
  const leftoverScore =
    input.portion.leftoverIntent === "none"
      ? 0
      : Math.min(8, input.portion.people + dish.defaultPeople);

  const score =
    dish.likeLevel * 8 +
    uses.length * 13 +
    urgentUses * 12 +
    mustUseHits * 16 +
    directionScore +
    weeknightScore +
    appetiteFit * 4 +
    leftoverScore -
    missing.length * 11 -
    avoidPenalty -
    Math.max(0, -complexityFit) * 10 -
    Math.max(0, dish.estimatedMinutes - 35) * 0.4;

  return {
    dish,
    uses,
    missing,
    urgentUses,
    mustUseHits,
    avoidPenalty,
    score
  };
}

function addPlan(
  plans: DinnerPlan[],
  strategy: DinnerPlanStrategy,
  evaluations: DishEvaluation[],
  input: KitchenRecommendationInput
) {
  const evaluation = evaluations.find((candidate) =>
    plans.every((plan) => plan.dishId !== candidate.dish.id)
  );

  if (!evaluation) {
    return;
  }

  plans.push(toDinnerPlan(strategy, evaluation, input));
}

function toDinnerPlan(
  strategy: DinnerPlanStrategy,
  evaluation: DishEvaluation,
  input: KitchenRecommendationInput
): DinnerPlan {
  const uses = unique(evaluation.uses.map((item) => item.name));
  const shoppingList = unique(evaluation.missing);
  const title =
    strategy === "fastest"
      ? "Fastest plan"
      : strategy === "use_up"
        ? "Best use-up plan"
        : "Most tempting plan";

  return {
    id: `${strategy}-${evaluation.dish.id}`,
    strategy,
    title,
    dishId: evaluation.dish.id,
    dishName: evaluation.dish.name,
    summary: summarizePlan(evaluation),
    uses,
    missing: evaluation.missing,
    shoppingList,
    estimatedMinutes: evaluation.dish.estimatedMinutes,
    complexity: evaluation.dish.complexity,
    portion: input.portion,
    reason: explainPlan(strategy, evaluation, input),
    score: Math.round(evaluation.score)
  };
}

function summarizePlan(evaluation: DishEvaluation): string {
  if (evaluation.missing.length === 0) {
    return "Everything needed is already at home.";
  }

  if (evaluation.missing.length <= 2) {
    return `Mostly ready; only missing ${evaluation.missing.join(" and ")}.`;
  }

  return `Good fit, but needs ${evaluation.missing.length} extra items.`;
}

function explainPlan(
  strategy: DinnerPlanStrategy,
  evaluation: DishEvaluation,
  input: KitchenRecommendationInput
): string {
  const useText =
    evaluation.uses.length > 0
      ? `uses ${evaluation.uses.map((item) => item.name).join(", ")}`
      : "starts from pantry basics";
  const portionText = `${input.portion.people} people / ${input.portion.appetite}`;

  if (strategy === "fastest") {
    return `${evaluation.dish.name} is quick, ${useText}, and fits ${portionText}.`;
  }

  if (strategy === "use_up") {
    return `${evaluation.dish.name} clears ${evaluation.uses.length} home item${
      evaluation.uses.length === 1 ? "" : "s"
    }, including ${evaluation.urgentUses} eat-soon item${evaluation.urgentUses === 1 ? "" : "s"}.`;
  }

  return `${evaluation.dish.name} matches the current food direction while staying realistic for ${portionText}.`;
}

function findMatchingItem(
  ingredient: HomeDishIngredient,
  items: KitchenItem[]
): KitchenItem | undefined {
  const ingredientTokens = tokenSet([ingredient.name, ...(ingredient.tags ?? [])]);

  return items.find((item) => {
    const itemTokens = tokenSet([item.name, ...(item.tags ?? [])]);

    return ingredientTokens.some((ingredientToken) =>
      itemTokens.some(
        (itemToken) => itemToken === ingredientToken || itemToken.includes(ingredientToken)
      )
    );
  });
}

function countMustUseHits(mustUse: string[], dish: HomeDish, uses: KitchenItem[]): number {
  const haystack = tokenSet([
    dish.name,
    ...dish.tags,
    ...dish.ingredients.map((ingredient) => ingredient.name),
    ...uses.map((item) => item.name),
    ...uses.flatMap((item) => item.tags ?? [])
  ]);

  return tokenSet(mustUse).filter((token) =>
    haystack.some((candidate) => candidate === token || candidate.includes(token))
  ).length;
}

function countAvoidPenalty(avoid: string[], dish: HomeDish): number {
  const haystack = tokenSet([
    dish.name,
    ...dish.tags,
    ...dish.ingredients.map((ingredient) => ingredient.name),
    ...dish.seasonings
  ]);

  return (
    tokenSet(avoid).filter((token) =>
      haystack.some((candidate) => candidate === token || candidate.includes(token))
    ).length * 32
  );
}

function tokenSet(values: string[]): string[] {
  return unique(
    values.flatMap((value) => normalize(value).split(/\s+/u)).filter((value) => value.length > 0)
  );
}

function normalize(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/gu, " ")
    .trim();
}

function unique(values: string[]): string[] {
  return [...new Set(values)];
}
