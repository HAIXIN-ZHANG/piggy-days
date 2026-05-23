import { Router } from "express";
import { calculateCompletionRewards, calculateFarmXp } from "@piggy-days/core";
import { requireFamilyToken } from "../../middleware/familyAuth.js";
import { validateBody } from "../../middleware/validate.js";
import {
  completeTaskSchema,
  createTaskSchema,
  type CompleteTaskInput,
  type CreateTaskInput
} from "./tasks.schemas.js";

export const tasksRouter = Router();

tasksRouter.use(requireFamilyToken);

tasksRouter.get("/", (_req, res) => {
  res.json({
    tasks: []
  });
});

tasksRouter.post("/", validateBody(createTaskSchema), (req, res) => {
  const input = req.body as CreateTaskInput;
  const now = new Date().toISOString();

  res.status(201).json({
    task: {
      id: `task_${Date.now()}`,
      status: "todo",
      createdAt: now,
      updatedAt: now,
      ...input
    }
  });
});

tasksRouter.post("/:taskId/complete", validateBody(completeTaskSchema), (req, res) => {
  const input = req.body as CompleteTaskInput;
  const rewards = calculateCompletionRewards({
    hasCheckInPhoto: Boolean(input.photoUrl),
    isCityOuting: input.isCityOuting,
    grocerySavingsCents: input.grocerySavingsCents
  });
  const xp = calculateFarmXp({
    hasCheckInPhoto: Boolean(input.photoUrl),
    isCityOuting: input.isCityOuting,
    grocerySavingsCents: input.grocerySavingsCents
  });

  res.json({
    taskId: req.params.taskId,
    status: "completed",
    completedAt: new Date().toISOString(),
    checkIn: {
      note: input.note,
      costCents: input.costCents,
      place: input.place,
      photoUrl: input.photoUrl
    },
    farm: {
      xp,
      rewards
    }
  });
});
