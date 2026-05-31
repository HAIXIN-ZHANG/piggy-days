export type KitchenItemCategory = "leftover" | "fresh" | "staple" | "condiment";

export type KitchenItemStatus = "eat_soon" | "normal" | "freezer" | "tired";

export type MealAppetite = "snack" | "light" | "normal" | "hungry";

export type LeftoverIntent = "none" | "some" | "next_meal" | "batch";

export type MealComplexity = "quick" | "normal" | "slow";

export type MealDirection = "light" | "protein" | "rice" | "noodles" | "hotpot" | "curry";

export type MealPortion = {
  people: number;
  appetite: MealAppetite;
  leftoverIntent: LeftoverIntent;
};

export type KitchenItem = {
  id: string;
  name: string;
  category: KitchenItemCategory;
  quantityLabel: string;
  servings?: number;
  addedAtLabel?: string;
  expiresInDays?: number;
  status: KitchenItemStatus;
  tags?: string[];
};

export type HomeDishIngredient = {
  name: string;
  required?: boolean;
  tags?: string[];
};

export type HomeDish = {
  id: string;
  name: string;
  ingredients: HomeDishIngredient[];
  swappableIngredients: string[];
  seasonings: string[];
  defaultPeople: number;
  defaultAppetite: MealAppetite;
  complexity: MealComplexity;
  estimatedMinutes: number;
  weeknightFriendly: boolean;
  cookOwner: string;
  likeLevel: 1 | 2 | 3 | 4 | 5;
  oftenCooked: boolean;
  lastCookedLabel?: string;
  tags: MealDirection[];
};

export type KitchenRecommendationInput = {
  portion: MealPortion;
  complexity: MealComplexity;
  mustUse: string[];
  avoid: string[];
  direction?: MealDirection;
};

export type DinnerPlanStrategy = "fastest" | "use_up" | "craving";

export type DinnerPlan = {
  id: string;
  strategy: DinnerPlanStrategy;
  title: string;
  dishId: string;
  dishName: string;
  summary: string;
  uses: string[];
  missing: string[];
  shoppingList: string[];
  estimatedMinutes: number;
  complexity: MealComplexity;
  portion: MealPortion;
  reason: string;
  score: number;
};

export type DishReadiness = {
  dishId: string;
  uses: string[];
  missing: string[];
  ready: boolean;
};
