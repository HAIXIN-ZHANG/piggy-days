import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  buildDinnerPlans,
  type HomeDish,
  type KitchenItem,
  type KitchenRecommendationInput
} from "./index.js";

const items: KitchenItem[] = [
  {
    id: "rice",
    name: "Leftover rice",
    category: "leftover",
    quantityLabel: "1 box",
    servings: 2,
    expiresInDays: 1,
    status: "eat_soon",
    tags: ["rice"]
  },
  {
    id: "eggs",
    name: "Eggs",
    category: "fresh",
    quantityLabel: "6",
    status: "normal",
    tags: ["egg"]
  },
  {
    id: "greens",
    name: "Greens",
    category: "fresh",
    quantityLabel: "half bag",
    expiresInDays: 1,
    status: "eat_soon",
    tags: ["vegetable", "greens"]
  }
];

const dishes: HomeDish[] = [
  {
    id: "fried-rice",
    name: "Egg fried rice",
    ingredients: [
      { name: "cooked rice", tags: ["rice"] },
      { name: "egg", tags: ["egg"] },
      { name: "spring onion", required: false }
    ],
    swappableIngredients: ["greens", "ham", "corn"],
    seasonings: ["soy sauce"],
    defaultPeople: 2,
    defaultAppetite: "normal",
    complexity: "quick",
    estimatedMinutes: 15,
    weeknightFriendly: true,
    cookOwner: "both",
    likeLevel: 5,
    oftenCooked: true,
    tags: ["rice"]
  },
  {
    id: "green-soup",
    name: "Green tofu soup",
    ingredients: [
      { name: "greens", tags: ["greens"] },
      { name: "tofu", tags: ["tofu"] }
    ],
    swappableIngredients: ["egg"],
    seasonings: ["salt"],
    defaultPeople: 2,
    defaultAppetite: "light",
    complexity: "quick",
    estimatedMinutes: 18,
    weeknightFriendly: true,
    cookOwner: "both",
    likeLevel: 3,
    oftenCooked: false,
    tags: ["light", "protein"]
  },
  {
    id: "hotpot",
    name: "Hotpot",
    ingredients: [
      { name: "greens", tags: ["greens"] },
      { name: "beef", tags: ["beef"] },
      { name: "tofu", tags: ["tofu"] }
    ],
    swappableIngredients: ["fish balls", "mushrooms"],
    seasonings: ["hotpot base"],
    defaultPeople: 2,
    defaultAppetite: "hungry",
    complexity: "normal",
    estimatedMinutes: 35,
    weeknightFriendly: false,
    cookOwner: "both",
    likeLevel: 4,
    oftenCooked: false,
    tags: ["hotpot", "protein"]
  }
];

const input: KitchenRecommendationInput = {
  portion: {
    people: 2,
    appetite: "normal",
    leftoverIntent: "some"
  },
  complexity: "quick",
  mustUse: ["leftover rice"],
  avoid: [],
  direction: "rice"
};

describe("kitchen dinner recommendations", () => {
  it("returns distinct recommendation angles", () => {
    const plans = buildDinnerPlans(items, dishes, input);

    assert.equal(plans.length, 3);
    assert.deepEqual(
      plans.map((plan) => plan.strategy),
      ["fastest", "use_up", "craving"]
    );
    assert.equal(new Set(plans.map((plan) => plan.dishId)).size, 3);
  });

  it("prioritizes stocked ingredients and returns the shopping gap", () => {
    const [fastest] = buildDinnerPlans(items, dishes, input);

    assert.ok(fastest);
    assert.equal(fastest.dishName, "Egg fried rice");
    assert.deepEqual(fastest.uses, ["Leftover rice", "Eggs"]);
    assert.deepEqual(fastest.shoppingList, []);
  });

  it("filters avoided dishes from the recommendations", () => {
    const plans = buildDinnerPlans(items, dishes, {
      ...input,
      avoid: ["hotpot"]
    });

    assert.equal(
      plans.some((plan) => plan.dishName === "Hotpot"),
      false
    );
  });
});
