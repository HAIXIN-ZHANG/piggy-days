"use client";

import { useMemo, useState } from "react";
import {
  buildDinnerPlans,
  getDishReadiness,
  type DinnerPlan,
  type HomeDish,
  type KitchenItem,
  type MealAppetite,
  type MealComplexity,
  type MealDirection,
  type MealPortion
} from "@piggy-days/core";
import { homeDishes, quickAddItems, startingKitchenItems } from "./mockData";

export type DishWithReadiness = HomeDish & {
  uses: string[];
  missing: string[];
  ready: boolean;
};

export type KitchenPrototypeState = {
  items: KitchenItem[];
  plans: DinnerPlan[];
  selectedPlan: DinnerPlan | undefined;
  dishes: DishWithReadiness[];
  portion: MealPortion;
  complexity: MealComplexity;
  direction: MealDirection;
  avoidText: string;
  mustUseItemIds: string[];
};

export type KitchenPrototypeActions = {
  addCustomItem: (name: string) => void;
  addQuickItem: (templateId: string) => void;
  removeItem: (itemId: string) => void;
  toggleMustUse: (itemId: string) => void;
  selectPlan: (planId: string) => void;
  setPeople: (people: number) => void;
  setAppetite: (appetite: MealAppetite) => void;
  setLeftoverIntent: (leftoverIntent: MealPortion["leftoverIntent"]) => void;
  setComplexity: (complexity: MealComplexity) => void;
  setDirection: (direction: MealDirection) => void;
  setAvoidText: (value: string) => void;
};

export function useKitchenPrototype(): KitchenPrototypeState & KitchenPrototypeActions {
  const [items, setItems] = useState<KitchenItem[]>(startingKitchenItems);
  const [portion, setPortion] = useState<MealPortion>({
    people: 2,
    appetite: "normal",
    leftoverIntent: "some"
  });
  const [complexity, setComplexity] = useState<MealComplexity>("quick");
  const [direction, setDirection] = useState<MealDirection>("rice");
  const [avoidText, setAvoidText] = useState("too oily");
  const [mustUseItemIds, setMustUseItemIds] = useState<string[]>([
    "item-leftover-rice",
    "item-greens"
  ]);
  const [selectedPlanId, setSelectedPlanId] = useState<string | undefined>();

  const mustUse = useMemo(
    () => items.filter((item) => mustUseItemIds.includes(item.id)).map((item) => item.name),
    [items, mustUseItemIds]
  );
  const avoid = useMemo(
    () =>
      avoidText
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    [avoidText]
  );

  const plans = useMemo(
    () =>
      buildDinnerPlans(items, homeDishes, {
        portion,
        complexity,
        mustUse,
        avoid,
        direction
      }),
    [avoid, complexity, direction, items, mustUse, portion]
  );
  const selectedPlan = plans.find((plan) => plan.id === selectedPlanId) ?? plans[0];
  const dishes = useMemo(
    () =>
      homeDishes.map((dish) => {
        const readiness = getDishReadiness(dish, items);
        return {
          ...dish,
          uses: readiness.uses,
          missing: readiness.missing,
          ready: readiness.ready
        };
      }),
    [items]
  );

  function addCustomItem(name: string) {
    const cleanName = name.trim();

    if (!cleanName) {
      return;
    }

    setItems((current) => [
      {
        id: `custom-${Date.now()}`,
        name: cleanName,
        category: "fresh",
        quantityLabel: "1 item",
        addedAtLabel: "Just now",
        expiresInDays: 4,
        status: "normal",
        tags: [cleanName]
      },
      ...current
    ]);
  }

  function addQuickItem(templateId: string) {
    const template = quickAddItems.find((item) => item.id === templateId);

    if (!template) {
      return;
    }

    setItems((current) => [
      {
        ...template,
        id: `${template.id}-${Date.now()}`,
        addedAtLabel: "Just now"
      },
      ...current
    ]);
  }

  function removeItem(itemId: string) {
    setItems((current) => current.filter((item) => item.id !== itemId));
    setMustUseItemIds((current) => current.filter((id) => id !== itemId));
  }

  function toggleMustUse(itemId: string) {
    setMustUseItemIds((current) =>
      current.includes(itemId) ? current.filter((id) => id !== itemId) : [...current, itemId]
    );
  }

  function setPeople(people: number) {
    setPortion((current) => ({
      ...current,
      people
    }));
  }

  function setAppetite(appetite: MealAppetite) {
    setPortion((current) => ({
      ...current,
      appetite
    }));
  }

  function setLeftoverIntent(leftoverIntent: MealPortion["leftoverIntent"]) {
    setPortion((current) => ({
      ...current,
      leftoverIntent
    }));
  }

  return {
    items,
    plans,
    selectedPlan,
    dishes,
    portion,
    complexity,
    direction,
    avoidText,
    mustUseItemIds,
    addCustomItem,
    addQuickItem,
    removeItem,
    toggleMustUse,
    selectPlan: setSelectedPlanId,
    setPeople,
    setAppetite,
    setLeftoverIntent,
    setComplexity,
    setDirection,
    setAvoidText
  };
}
