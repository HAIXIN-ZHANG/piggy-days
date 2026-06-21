import { Router } from "express";
import { z } from "zod";
import { prisma } from "@piggy-days/database";
import { requireFamilyToken } from "../../middleware/familyAuth.js";
import { ensureHouseholdUsers } from "../people/householdUsers.js";
import { serializeCoinEvent, sourceTypeToPrisma } from "./coinSerializers.js";

const listCoinEventsQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(50).default(30),
  sourceType: z
    .enum(["task", "checklist_item", "kitchen", "explore", "review", "shopping", "manual"])
    .optional(),
  userId: z.enum(["me", "wife"]).optional()
});

export const coinsRouter = Router();

coinsRouter.use(requireFamilyToken);

coinsRouter.get("/events", async (req, res, next) => {
  try {
    await ensureHouseholdUsers();

    const query = listCoinEventsQuerySchema.safeParse(req.query);

    if (!query.success) {
      res.status(400).json({
        error: "Invalid request query.",
        details: query.error.flatten()
      });
      return;
    }

    const filters = query.data;
    const events = await prisma.coinEvent.findMany({
      where: {
        ...(filters.sourceType ? { sourceType: sourceTypeToPrisma[filters.sourceType] } : {}),
        ...(filters.userId ? { earnedByUserId: filters.userId } : {})
      },
      orderBy: {
        createdAt: "desc"
      },
      take: filters.limit
    });

    res.json({
      items: events.map(serializeCoinEvent),
      nextCursor: null
    });
  } catch (error) {
    next(error);
  }
});
