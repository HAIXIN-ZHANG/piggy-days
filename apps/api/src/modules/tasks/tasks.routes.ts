import { Router } from "express";
import {
  createSimpleTaskDraft,
  createTaskCompletionCoinEvent,
  type TaskAssignment,
  type TaskCategory,
  type TaskStatus
} from "@piggy-days/core";
import {
  prisma,
  type CheckIn,
  type CoinEvent,
  type Task,
  type TaskAssignment as PrismaTaskAssignment,
  type TaskCategory as PrismaTaskCategory,
  type TaskStatus as PrismaTaskStatus
} from "@piggy-days/database";
import { requireFamilyToken } from "../../middleware/familyAuth.js";
import { validateBody } from "../../middleware/validate.js";
import { ensureHouseholdUsers } from "../people/householdUsers.js";
import {
  completeTaskSchema,
  createTaskSchema,
  listTasksQuerySchema,
  type CompleteTaskInput,
  type CreateTaskInput
} from "./tasks.schemas.js";

export const tasksRouter = Router();

tasksRouter.use(requireFamilyToken);

const categoryToPrisma: Record<TaskCategory, PrismaTaskCategory> = {
  daily: "DAILY",
  shopping: "SHOPPING",
  cooking: "COOKING",
  explore: "EXPLORE",
  chore: "CHORE",
  date: "DATE",
  other: "OTHER"
};

const categoryFromPrisma: Record<PrismaTaskCategory, TaskCategory> = {
  DAILY: "daily",
  SHOPPING: "shopping",
  COOKING: "cooking",
  EXPLORE: "explore",
  CHORE: "chore",
  DATE: "date",
  OTHER: "other"
};

const assignmentToPrisma: Record<TaskAssignment, PrismaTaskAssignment> = {
  me: "ME",
  wife: "WIFE",
  both: "BOTH"
};

const assignmentFromPrisma: Record<PrismaTaskAssignment, TaskAssignment> = {
  ME: "me",
  WIFE: "wife",
  BOTH: "both"
};

const statusToPrisma: Record<TaskStatus, PrismaTaskStatus> = {
  todo: "TODO",
  in_progress: "IN_PROGRESS",
  completed: "COMPLETED"
};

const statusFromPrisma: Record<PrismaTaskStatus, TaskStatus> = {
  TODO: "todo",
  IN_PROGRESS: "in_progress",
  COMPLETED: "completed"
};

type TaskWithRelations = Task & {
  checkIn?: CheckIn | null;
  coinEvents?: CoinEvent[];
};

function serializeTask(task: TaskWithRelations) {
  return {
    id: task.id,
    type: "simple",
    title: task.title,
    category: categoryFromPrisma[task.category],
    description: task.description,
    place: task.place,
    plannedDate: task.plannedDate?.toISOString() ?? null,
    status: statusFromPrisma[task.status],
    createdByUserId: task.createdByUserId,
    assignedTo: assignmentFromPrisma[task.assignedTo],
    completedByUserId: task.completedByUserId,
    coinValue: task.coinValue,
    completedAt: task.completedAt?.toISOString() ?? null,
    createdAt: task.createdAt.toISOString(),
    updatedAt: task.updatedAt.toISOString()
  };
}

function serializeCheckIn(checkIn: CheckIn | null | undefined) {
  if (!checkIn) {
    return null;
  }

  return {
    id: checkIn.id,
    note: checkIn.note,
    costCents: checkIn.costCents,
    place: checkIn.place,
    photoUrl: checkIn.photoUrl,
    createdAt: checkIn.createdAt.toISOString()
  };
}

function serializeCoinEvent(event: CoinEvent) {
  return {
    id: event.id,
    amount: event.amount,
    reason: event.reason,
    sourceType: event.sourceType.toLowerCase(),
    taskId: event.taskId,
    earnedByUserId: event.earnedByUserId,
    createdByUserId: event.createdByUserId,
    createdAt: event.createdAt.toISOString()
  };
}

tasksRouter.get("/", async (req, res, next) => {
  try {
    await ensureHouseholdUsers();

    const query = listTasksQuerySchema.safeParse(req.query);

    if (!query.success) {
      res.status(400).json({
        error: "Invalid request query.",
        details: query.error.flatten()
      });
      return;
    }

    const filters = query.data;
    const tasks = await prisma.task.findMany({
      where: {
        ...(filters.status !== "all" ? { status: statusToPrisma[filters.status] } : {}),
        ...(filters.assignedTo ? { assignedTo: assignmentToPrisma[filters.assignedTo] } : {}),
        ...(filters.category ? { category: categoryToPrisma[filters.category] } : {})
      },
      orderBy: [
        {
          status: "asc"
        },
        {
          updatedAt: "desc"
        }
      ],
      take: filters.limit
    });

    res.json({
      tasks: tasks.map(serializeTask),
      nextCursor: null
    });
  } catch (error) {
    next(error);
  }
});

tasksRouter.post("/", validateBody(createTaskSchema), async (req, res, next) => {
  try {
    await ensureHouseholdUsers();

    const input = req.body as CreateTaskInput;
    const draft = createSimpleTaskDraft(input);
    const task = await prisma.task.create({
      data: {
        type: "SIMPLE",
        title: draft.title,
        category: categoryToPrisma[draft.category],
        description: draft.description,
        place: draft.place,
        plannedDate: draft.plannedDate ? new Date(draft.plannedDate) : undefined,
        status: "TODO",
        createdByUserId: draft.createdByUserId,
        assignedTo: assignmentToPrisma[draft.assignedTo],
        coinValue: draft.coinValue
      }
    });

    res.status(201).json({
      task: serializeTask(task)
    });
  } catch (error) {
    next(error);
  }
});

tasksRouter.get("/:taskId", async (req, res, next) => {
  try {
    await ensureHouseholdUsers();

    const task = await prisma.task.findUnique({
      where: {
        id: req.params.taskId
      },
      include: {
        checkIn: true,
        coinEvents: {
          orderBy: {
            createdAt: "desc"
          }
        }
      }
    });

    if (!task) {
      res.status(404).json({
        error: "Task not found."
      });
      return;
    }

    res.json({
      task: serializeTask(task),
      checkIn: serializeCheckIn(task.checkIn),
      coinEvents: task.coinEvents.map(serializeCoinEvent),
      checklistItems: []
    });
  } catch (error) {
    next(error);
  }
});

tasksRouter.post("/:taskId/complete", validateBody(completeTaskSchema), async (req, res, next) => {
  try {
    await ensureHouseholdUsers();

    const input = req.body as CompleteTaskInput;
    const existingTask = await prisma.task.findUnique({
      where: {
        id: req.params.taskId
      }
    });

    if (!existingTask) {
      res.status(404).json({
        error: "Task not found."
      });
      return;
    }

    if (existingTask.status === "COMPLETED") {
      res.status(409).json({
        error: "Task is already completed."
      });
      return;
    }

    const coinEventCommand = createTaskCompletionCoinEvent({
      taskId: existingTask.id,
      title: existingTask.title,
      coinValue: existingTask.coinValue,
      completedByUserId: input.completedByUserId
    });

    const completed = await prisma.$transaction(async (tx) => {
      const completedAt = new Date();
      const task = await tx.task.update({
        where: {
          id: existingTask.id
        },
        data: {
          status: "COMPLETED",
          completedAt,
          completedByUserId: input.completedByUserId
        }
      });
      const checkIn = await tx.checkIn.create({
        data: {
          taskId: existingTask.id,
          note: input.note,
          costCents: input.costCents,
          place: input.place,
          photoUrl: input.photoUrl
        }
      });
      const coinEvent = await tx.coinEvent.create({
        data: {
          amount: coinEventCommand.amount,
          reason: coinEventCommand.reason,
          sourceType: "TASK",
          taskId: coinEventCommand.taskId,
          earnedByUserId: coinEventCommand.earnedByUserId,
          createdByUserId: coinEventCommand.createdByUserId
        }
      });

      return {
        task,
        checkIn,
        coinEvent
      };
    });

    res.json({
      task: serializeTask(completed.task),
      checkIn: serializeCheckIn(completed.checkIn),
      coinEvent: serializeCoinEvent(completed.coinEvent)
    });
  } catch (error) {
    next(error);
  }
});
