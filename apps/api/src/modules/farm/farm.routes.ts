import { Router } from "express";
import { deriveFundSummary } from "@piggy-days/core";
import { prisma } from "@piggy-days/database";
import { requireFamilyToken } from "../../middleware/familyAuth.js";
import { validateBody } from "../../middleware/validate.js";
import { serializeCoinEvent } from "../coins/coinSerializers.js";
import { ensureHouseholdUsers } from "../people/householdUsers.js";
import { feedPiggySchema, type FeedPiggyInput } from "./farm.schemas.js";

export const farmRouter = Router();

farmRouter.use(requireFamilyToken);

farmRouter.get("/summary", async (_req, res, next) => {
  try {
    await ensureHouseholdUsers();

    const events = await prisma.coinEvent.findMany({
      orderBy: {
        createdAt: "desc"
      },
      take: 8
    });
    const summary = deriveFundSummary(events);

    res.json({
      fundBalance: summary.balance,
      recentRewards: events.filter((event) => event.amount > 0).map(serializeCoinEvent),
      memoryCards: [],
      piggies: [],
      dialogue:
        summary.balance > 0
          ? `The farm is watching ${summary.balance} Piggy Coins grow.`
          : "Complete a task to start the real Piggy Fund."
    });
  } catch (error) {
    next(error);
  }
});

farmRouter.post("/actions/feed", validateBody(feedPiggySchema), (req, res) => {
  const input = req.body as FeedPiggyInput;

  res.json({
    ok: true,
    action: "feed",
    piggyName: input.piggyName,
    dialogue: "Snack time. The farm feels a little softer."
  });
});
