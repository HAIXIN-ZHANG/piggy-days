import { Router } from "express";
import { deriveFundSummary } from "@piggy-days/core";
import { prisma } from "@piggy-days/database";
import { requireFamilyToken } from "../../middleware/familyAuth.js";
import { serializeCoinEvent } from "../coins/coinSerializers.js";
import { ensureHouseholdUsers } from "../people/householdUsers.js";

export const fundRouter = Router();

fundRouter.use(requireFamilyToken);

fundRouter.get("/summary", async (_req, res, next) => {
  try {
    await ensureHouseholdUsers();

    const events = await prisma.coinEvent.findMany({
      orderBy: {
        createdAt: "desc"
      }
    });
    const summary = deriveFundSummary(events);

    res.json({
      ...summary,
      recentEvents: events.slice(0, 8).map(serializeCoinEvent)
    });
  } catch (error) {
    next(error);
  }
});
