"use client";

import { useState, type FormEvent } from "react";
import {
  ChefHat,
  Clock3,
  Leaf,
  Plus,
  Refrigerator,
  ShoppingBasket,
  Sparkles,
  Trash2,
  Users
} from "lucide-react";
import type {
  DinnerPlan,
  KitchenItem,
  KitchenItemCategory,
  KitchenItemStatus,
  LeftoverIntent,
  MealAppetite,
  MealComplexity,
  MealDirection
} from "@piggy-days/core";
import { quickAddItems } from "./mockData";
import { type DishWithReadiness, useKitchenPrototype } from "./useKitchenPrototype";

const appetiteOptions: Array<{ label: string; value: MealAppetite }> = [
  { label: "Snack", value: "snack" },
  { label: "Light", value: "light" },
  { label: "Normal", value: "normal" },
  { label: "Hungry", value: "hungry" }
];

const leftoverOptions: Array<{ label: string; value: LeftoverIntent }> = [
  { label: "No extra", value: "none" },
  { label: "Some", value: "some" },
  { label: "Tomorrow", value: "next_meal" },
  { label: "Batch", value: "batch" }
];

const complexityOptions: Array<{ label: string; value: MealComplexity }> = [
  { label: "Quick", value: "quick" },
  { label: "Dinner", value: "normal" },
  { label: "Slow", value: "slow" }
];

const directionOptions: Array<{ label: string; value: MealDirection }> = [
  { label: "Rice", value: "rice" },
  { label: "Light", value: "light" },
  { label: "Protein", value: "protein" },
  { label: "Noodles", value: "noodles" },
  { label: "Hotpot", value: "hotpot" },
  { label: "Curry", value: "curry" }
];

const categoryLabel: Record<KitchenItemCategory, string> = {
  leftover: "Leftover",
  fresh: "Fresh",
  staple: "Staple",
  condiment: "Pantry"
};

const statusLabel: Record<KitchenItemStatus, string> = {
  eat_soon: "Eat soon",
  normal: "Normal",
  freezer: "Freezer",
  tired: "Tired"
};

export function PiggyKitchen() {
  const kitchen = useKitchenPrototype();
  const selectedShoppingList = kitchen.selectedPlan?.shoppingList ?? [];

  return (
    <section className="kitchenModule" aria-labelledby="kitchen-title">
      <div className="kitchenHero">
        <div className="kitchenHeroText">
          <p className="projectName">Piggy Kitchen</p>
          <h2 id="kitchen-title">Tonight starts from what we already have.</h2>
          <p>
            A small home-kitchen loop for leftovers, fridge pressure, dinner mood, and the tiny
            shopping gaps between us and food.
          </p>
        </div>

        <KitchenScene selectedPlan={kitchen.selectedPlan} />
      </div>

      <div className="kitchenGrid">
        <KitchenInventory
          items={kitchen.items}
          mustUseItemIds={kitchen.mustUseItemIds}
          addCustomItem={kitchen.addCustomItem}
          addQuickItem={kitchen.addQuickItem}
          removeItem={kitchen.removeItem}
          toggleMustUse={kitchen.toggleMustUse}
        />

        <section className="kitchenPlanner" aria-label="Dinner planner">
          <div className="sectionTitle">
            <div>
              <span>Tonight settings</span>
              <h2>Pick the dinner shape</h2>
            </div>
            <Sparkles size={20} aria-hidden="true" />
          </div>

          <div className="mealControlStack">
            <PeopleStepper people={kitchen.portion.people} setPeople={kitchen.setPeople} />
            <SegmentedControl
              label="Appetite"
              options={appetiteOptions}
              value={kitchen.portion.appetite}
              onChange={kitchen.setAppetite}
            />
            <SegmentedControl
              label="Leftovers"
              options={leftoverOptions}
              value={kitchen.portion.leftoverIntent}
              onChange={kitchen.setLeftoverIntent}
            />
            <SegmentedControl
              label="Complexity"
              options={complexityOptions}
              value={kitchen.complexity}
              onChange={kitchen.setComplexity}
            />
            <SegmentedControl
              label="Direction"
              options={directionOptions}
              value={kitchen.direction}
              onChange={kitchen.setDirection}
            />
            <label className="avoidInput">
              <span>Not tonight</span>
              <input
                value={kitchen.avoidText}
                onChange={(event) => kitchen.setAvoidText(event.target.value)}
                placeholder="too spicy, noodles"
              />
            </label>
          </div>
        </section>
      </div>

      <section className="recommendationBand" aria-label="Dinner recommendations">
        <div className="sectionTitle">
          <div>
            <span>2-3 useful answers</span>
            <h2>Tonight's plans</h2>
          </div>
          <ChefHat size={20} aria-hidden="true" />
        </div>

        <div className="planGrid">
          {kitchen.plans.map((plan) => (
            <DinnerPlanCard
              isSelected={plan.id === kitchen.selectedPlan?.id}
              key={plan.id}
              plan={plan}
              selectPlan={kitchen.selectPlan}
            />
          ))}
        </div>
      </section>

      <section className="shoppingGap" aria-label="Shopping gap for selected dinner">
        <div>
          <span className="miniLabel">If we choose</span>
          <h2>{kitchen.selectedPlan?.dishName ?? "a dinner plan"}</h2>
        </div>
        <div className="shoppingGapList">
          <ShoppingBasket size={20} aria-hidden="true" />
          {selectedShoppingList.length > 0 ? (
            <p>Buy {selectedShoppingList.join(", ")}.</p>
          ) : (
            <p>No shopping needed. This one can be cooked from home.</p>
          )}
        </div>
      </section>

      <DishLibrary dishes={kitchen.dishes} setDirection={kitchen.setDirection} />
    </section>
  );
}

function KitchenScene({ selectedPlan }: { selectedPlan: DinnerPlan | undefined }) {
  return (
    <div className="kitchenScene" aria-label="Kitchen counter preview">
      <div className="fridgeBlock">
        <span className="fridgeHandle" />
        <span className="fridgeNote">eat soon</span>
      </div>
      <div className="counterBlock">
        <span className="cuttingBoard" />
        <span className="sauceBottle" />
        <span className="tinyBowl bowlOne" />
        <span className="tinyBowl bowlTwo" />
      </div>
      <div className="steamPot">
        <span className="potLid" />
        <span className="steam steamOne" />
        <span className="steam steamTwo" />
      </div>
      <article className="tonightTicket">
        <span>Tonight</span>
        <strong>{selectedPlan?.dishName ?? "Pick from home"}</strong>
        <p>{selectedPlan?.summary ?? "Use what is already in the kitchen first."}</p>
      </article>
    </div>
  );
}

type KitchenInventoryProps = {
  items: KitchenItem[];
  mustUseItemIds: string[];
  addCustomItem: (name: string) => void;
  addQuickItem: (templateId: string) => void;
  removeItem: (itemId: string) => void;
  toggleMustUse: (itemId: string) => void;
};

function KitchenInventory({
  items,
  mustUseItemIds,
  addCustomItem,
  addQuickItem,
  removeItem,
  toggleMustUse
}: KitchenInventoryProps) {
  const [draft, setDraft] = useState("");

  function submitItem(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    addCustomItem(draft);
    setDraft("");
  }

  return (
    <section className="kitchenInventory" aria-label="Kitchen inventory">
      <div className="sectionTitle">
        <div>
          <span>Fridge and pantry</span>
          <h2>What we should use</h2>
        </div>
        <Refrigerator size={20} aria-hidden="true" />
      </div>

      <form className="kitchenAddForm" onSubmit={submitItem}>
        <input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Add ingredient or leftover"
          aria-label="Add ingredient or leftover"
        />
        <button type="submit" aria-label="Add kitchen item">
          <Plus size={18} aria-hidden="true" />
          Add
        </button>
      </form>

      <div className="quickAddRow" aria-label="Quick add kitchen items">
        {quickAddItems.map((item) => (
          <button key={item.id} type="button" onClick={() => addQuickItem(item.id)}>
            <Plus size={14} aria-hidden="true" />
            {item.name}
          </button>
        ))}
      </div>

      <div className="inventoryList">
        {items.map((item) => (
          <article className="inventoryItem" key={item.id}>
            <div className="inventoryTopLine">
              <div>
                <strong>{item.name}</strong>
                <span>
                  {categoryLabel[item.category]} / {item.quantityLabel}
                </span>
              </div>
              <button
                type="button"
                className="iconOnlyButton"
                onClick={() => removeItem(item.id)}
                aria-label={`Remove ${item.name}`}
              >
                <Trash2 size={16} aria-hidden="true" />
              </button>
            </div>
            <div className="inventoryMeta">
              <span className={`statusDot status-${item.status}`}>{statusLabel[item.status]}</span>
              {typeof item.expiresInDays === "number" ? (
                <span>{item.expiresInDays}d left</span>
              ) : null}
              {item.servings ? <span>{item.servings} serves</span> : null}
            </div>
            <button
              type="button"
              className={`mustUseButton ${mustUseItemIds.includes(item.id) ? "selected" : ""}`}
              onClick={() => toggleMustUse(item.id)}
            >
              {mustUseItemIds.includes(item.id) ? "Using tonight" : "Try to use"}
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

function PeopleStepper({
  people,
  setPeople
}: {
  people: number;
  setPeople: (people: number) => void;
}) {
  return (
    <div className="peopleStepper">
      <span>
        <Users size={16} aria-hidden="true" />
        People
      </span>
      <div>
        {[1, 2, 3, 4].map((value) => (
          <button
            className={people === value ? "selected" : ""}
            key={value}
            type="button"
            onClick={() => setPeople(value)}
          >
            {value}
          </button>
        ))}
      </div>
    </div>
  );
}

type SegmentedControlProps<T extends string> = {
  label: string;
  options: Array<{ label: string; value: T }>;
  value: T;
  onChange: (value: T) => void;
};

function SegmentedControl<T extends string>({
  label,
  options,
  value,
  onChange
}: SegmentedControlProps<T>) {
  return (
    <div className="segmentedControl">
      <span>{label}</span>
      <div>
        {options.map((option) => (
          <button
            className={option.value === value ? "selected" : ""}
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function DinnerPlanCard({
  plan,
  isSelected,
  selectPlan
}: {
  plan: DinnerPlan;
  isSelected: boolean;
  selectPlan: (planId: string) => void;
}) {
  return (
    <button
      type="button"
      className={`planCard ${isSelected ? "selected" : ""}`}
      onClick={() => selectPlan(plan.id)}
    >
      <span className="planTitle">{plan.title}</span>
      <strong>{plan.dishName}</strong>
      <p>{plan.reason}</p>
      <div className="planFacts">
        <span>
          <Clock3 size={15} aria-hidden="true" />
          {plan.estimatedMinutes} min
        </span>
        <span>{plan.complexity}</span>
        <span>{plan.portion.people} people</span>
      </div>
      <div className="planUseGrid">
        <div>
          <span>Uses</span>
          <p>{plan.uses.length > 0 ? plan.uses.join(", ") : "Pantry basics"}</p>
        </div>
        <div>
          <span>Missing</span>
          <p>{plan.missing.length > 0 ? plan.missing.join(", ") : "Nothing"}</p>
        </div>
      </div>
    </button>
  );
}

function DishLibrary({
  dishes,
  setDirection
}: {
  dishes: DishWithReadiness[];
  setDirection: (direction: MealDirection) => void;
}) {
  return (
    <section className="dishLibrary" aria-label="Home dish library">
      <div className="sectionTitle">
        <div>
          <span>We know how to cook</span>
          <h2>Home dish library</h2>
        </div>
        <Leaf size={20} aria-hidden="true" />
      </div>

      <div className="dishGrid">
        {dishes.map((dish) => {
          const primaryDirection = dish.tags[0] ?? "light";

          return (
            <article className="dishCard" key={dish.id}>
              <div>
                <span className={`readinessBadge ${dish.ready ? "ready" : ""}`}>
                  {dish.ready ? "Ready" : `${dish.missing.length} missing`}
                </span>
                <h3>{dish.name}</h3>
                <p>
                  {dish.estimatedMinutes} min / {dish.complexity} / {dish.cookOwner}
                </p>
              </div>
              <div className="dishMeta">
                <span>Uses: {dish.uses.length > 0 ? dish.uses.join(", ") : "nothing yet"}</span>
                <span>Need: {dish.missing.length > 0 ? dish.missing.join(", ") : "nothing"}</span>
              </div>
              <button type="button" onClick={() => setDirection(primaryDirection)}>
                Lean this way
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
}
