import type { HomeDish, KitchenItem } from "@piggy-days/core";

export const startingKitchenItems: KitchenItem[] = [
  {
    id: "item-leftover-rice",
    name: "Leftover rice",
    category: "leftover",
    quantityLabel: "1 box",
    servings: 2,
    addedAtLabel: "Yesterday",
    expiresInDays: 1,
    status: "eat_soon",
    tags: ["rice", "cooked rice"]
  },
  {
    id: "item-braised-pork",
    name: "Braised pork",
    category: "leftover",
    quantityLabel: "half serve",
    servings: 1,
    addedAtLabel: "2 days ago",
    expiresInDays: 1,
    status: "eat_soon",
    tags: ["pork", "protein"]
  },
  {
    id: "item-eggs",
    name: "Eggs",
    category: "fresh",
    quantityLabel: "6",
    servings: 3,
    addedAtLabel: "This week",
    expiresInDays: 8,
    status: "normal",
    tags: ["egg", "protein"]
  },
  {
    id: "item-tomato",
    name: "Tomato",
    category: "fresh",
    quantityLabel: "3",
    servings: 2,
    addedAtLabel: "Sunday",
    expiresInDays: 3,
    status: "normal",
    tags: ["tomato"]
  },
  {
    id: "item-greens",
    name: "Greens",
    category: "fresh",
    quantityLabel: "half bag",
    servings: 2,
    addedAtLabel: "Friday",
    expiresInDays: 1,
    status: "eat_soon",
    tags: ["greens", "vegetable"]
  },
  {
    id: "item-tofu",
    name: "Tofu",
    category: "fresh",
    quantityLabel: "1 block",
    servings: 2,
    addedAtLabel: "Today",
    expiresInDays: 4,
    status: "normal",
    tags: ["tofu", "protein"]
  },
  {
    id: "item-beef",
    name: "Beef",
    category: "fresh",
    quantityLabel: "300g",
    servings: 2,
    addedAtLabel: "Today",
    expiresInDays: 2,
    status: "normal",
    tags: ["beef", "protein"]
  },
  {
    id: "item-pasta",
    name: "Pasta",
    category: "staple",
    quantityLabel: "1 pack",
    status: "normal",
    tags: ["pasta", "noodles"]
  },
  {
    id: "item-soy-sauce",
    name: "Soy sauce",
    category: "condiment",
    quantityLabel: "pantry",
    status: "normal",
    tags: ["soy sauce"]
  },
  {
    id: "item-curry-cubes",
    name: "Curry cubes",
    category: "condiment",
    quantityLabel: "4 cubes",
    status: "normal",
    tags: ["curry"]
  }
];

export const quickAddItems: KitchenItem[] = [
  {
    id: "quick-udon",
    name: "Udon",
    category: "staple",
    quantityLabel: "1 pack",
    status: "normal",
    tags: ["udon", "noodles"]
  },
  {
    id: "quick-capsicum",
    name: "Capsicum",
    category: "fresh",
    quantityLabel: "1",
    expiresInDays: 4,
    status: "normal",
    tags: ["capsicum", "pepper", "vegetable"]
  },
  {
    id: "quick-chicken-wings",
    name: "Chicken wings",
    category: "fresh",
    quantityLabel: "8 pieces",
    servings: 2,
    expiresInDays: 2,
    status: "normal",
    tags: ["chicken", "wings", "protein"]
  },
  {
    id: "quick-bread",
    name: "Bread",
    category: "staple",
    quantityLabel: "half loaf",
    status: "normal",
    tags: ["bread"]
  }
];

export const homeDishes: HomeDish[] = [
  {
    id: "tomato-egg",
    name: "Tomato egg",
    ingredients: [
      { name: "tomato", tags: ["tomato"] },
      { name: "egg", tags: ["egg"] }
    ],
    swappableIngredients: ["capsicum", "greens"],
    seasonings: ["salt", "sugar"],
    defaultPeople: 2,
    defaultAppetite: "normal",
    complexity: "quick",
    estimatedMinutes: 12,
    weeknightFriendly: true,
    cookOwner: "Both",
    likeLevel: 5,
    oftenCooked: true,
    lastCookedLabel: "Last week",
    tags: ["light", "protein", "rice"]
  },
  {
    id: "egg-fried-rice",
    name: "Egg fried rice",
    ingredients: [
      { name: "cooked rice", tags: ["rice"] },
      { name: "egg", tags: ["egg"] },
      { name: "soy sauce", tags: ["soy sauce"] },
      { name: "spring onion", required: false }
    ],
    swappableIngredients: ["braised pork", "greens", "corn"],
    seasonings: ["soy sauce", "white pepper"],
    defaultPeople: 2,
    defaultAppetite: "normal",
    complexity: "quick",
    estimatedMinutes: 15,
    weeknightFriendly: true,
    cookOwner: "Both",
    likeLevel: 5,
    oftenCooked: true,
    lastCookedLabel: "2 weeks ago",
    tags: ["rice"]
  },
  {
    id: "curry-rice",
    name: "Curry rice",
    ingredients: [
      { name: "rice", tags: ["rice"] },
      { name: "curry", tags: ["curry"] },
      { name: "potato", tags: ["potato"] },
      { name: "carrot", tags: ["carrot"] }
    ],
    swappableIngredients: ["beef", "chicken", "tofu"],
    seasonings: ["curry cubes"],
    defaultPeople: 2,
    defaultAppetite: "hungry",
    complexity: "normal",
    estimatedMinutes: 35,
    weeknightFriendly: true,
    cookOwner: "Both",
    likeLevel: 4,
    oftenCooked: true,
    lastCookedLabel: "This month",
    tags: ["curry", "rice"]
  },
  {
    id: "beef-capsicum",
    name: "Beef with capsicum",
    ingredients: [
      { name: "beef", tags: ["beef"] },
      { name: "capsicum", tags: ["capsicum", "pepper"] },
      { name: "soy sauce", tags: ["soy sauce"] }
    ],
    swappableIngredients: ["onion", "mushroom"],
    seasonings: ["soy sauce", "oyster sauce", "black pepper"],
    defaultPeople: 2,
    defaultAppetite: "normal",
    complexity: "normal",
    estimatedMinutes: 22,
    weeknightFriendly: true,
    cookOwner: "Both",
    likeLevel: 4,
    oftenCooked: false,
    lastCookedLabel: "A while ago",
    tags: ["protein", "rice"]
  },
  {
    id: "tomato-egg-soup",
    name: "Tomato egg soup",
    ingredients: [
      { name: "tomato", tags: ["tomato"] },
      { name: "egg", tags: ["egg"] }
    ],
    swappableIngredients: ["tofu", "greens"],
    seasonings: ["salt", "sesame oil"],
    defaultPeople: 2,
    defaultAppetite: "light",
    complexity: "quick",
    estimatedMinutes: 14,
    weeknightFriendly: true,
    cookOwner: "Both",
    likeLevel: 4,
    oftenCooked: true,
    lastCookedLabel: "Last week",
    tags: ["light", "protein"]
  },
  {
    id: "sandwich",
    name: "Egg sandwich",
    ingredients: [
      { name: "bread", tags: ["bread"] },
      { name: "egg", tags: ["egg"] },
      { name: "greens", tags: ["greens", "vegetable"] }
    ],
    swappableIngredients: ["ham", "tomato"],
    seasonings: ["mayo", "black pepper"],
    defaultPeople: 2,
    defaultAppetite: "light",
    complexity: "quick",
    estimatedMinutes: 10,
    weeknightFriendly: true,
    cookOwner: "Both",
    likeLevel: 3,
    oftenCooked: false,
    lastCookedLabel: "Rarely",
    tags: ["light", "protein"]
  },
  {
    id: "pasta",
    name: "Tomato pasta",
    ingredients: [
      { name: "pasta", tags: ["pasta", "noodles"] },
      { name: "tomato", tags: ["tomato"] },
      { name: "beef", required: false, tags: ["beef"] }
    ],
    swappableIngredients: ["mushroom", "tuna", "capsicum"],
    seasonings: ["olive oil", "black pepper"],
    defaultPeople: 2,
    defaultAppetite: "normal",
    complexity: "normal",
    estimatedMinutes: 24,
    weeknightFriendly: true,
    cookOwner: "Both",
    likeLevel: 4,
    oftenCooked: true,
    lastCookedLabel: "This month",
    tags: ["noodles", "protein"]
  },
  {
    id: "fried-udon",
    name: "Fried udon",
    ingredients: [
      { name: "udon", tags: ["udon", "noodles"] },
      { name: "egg", tags: ["egg"] },
      { name: "greens", tags: ["greens", "vegetable"] },
      { name: "soy sauce", tags: ["soy sauce"] }
    ],
    swappableIngredients: ["beef", "pork", "capsicum"],
    seasonings: ["soy sauce", "sesame oil"],
    defaultPeople: 2,
    defaultAppetite: "normal",
    complexity: "quick",
    estimatedMinutes: 16,
    weeknightFriendly: true,
    cookOwner: "Both",
    likeLevel: 4,
    oftenCooked: true,
    lastCookedLabel: "2 weeks ago",
    tags: ["noodles"]
  },
  {
    id: "hotpot",
    name: "Hotpot",
    ingredients: [
      { name: "greens", tags: ["greens", "vegetable"] },
      { name: "tofu", tags: ["tofu"] },
      { name: "beef", tags: ["beef"] },
      { name: "hotpot base", tags: ["hotpot"] }
    ],
    swappableIngredients: ["mushroom", "fish balls", "noodles"],
    seasonings: ["hotpot base", "chili sauce"],
    defaultPeople: 2,
    defaultAppetite: "hungry",
    complexity: "slow",
    estimatedMinutes: 45,
    weeknightFriendly: false,
    cookOwner: "Both",
    likeLevel: 5,
    oftenCooked: false,
    lastCookedLabel: "Last month",
    tags: ["hotpot", "protein"]
  },
  {
    id: "air-fryer-wings",
    name: "Air fryer chicken wings",
    ingredients: [
      { name: "chicken wings", tags: ["chicken", "wings"] },
      { name: "soy sauce", tags: ["soy sauce"] }
    ],
    swappableIngredients: ["drumsticks"],
    seasonings: ["soy sauce", "honey", "black pepper"],
    defaultPeople: 2,
    defaultAppetite: "normal",
    complexity: "normal",
    estimatedMinutes: 28,
    weeknightFriendly: true,
    cookOwner: "Both",
    likeLevel: 4,
    oftenCooked: false,
    lastCookedLabel: "This month",
    tags: ["protein"]
  }
];
