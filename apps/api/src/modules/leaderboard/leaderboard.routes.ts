import { Router } from "express";
import { z } from "zod";
import { deriveLeaderboard, getUtcWeekStart } from "@piggy-days/core";
import { prisma } from "@piggy-days/database";
import { requireFamilyToken } from "../../middleware/familyAuth.js";
import { listHouseholdUsers } from "../people/householdUsers.js";

const leaderboardQuerySchema = z.object({
  range: z.enum(["week", "all"]).default("week")
});

export const leaderboardRouter = Router();

leaderboardRouter.use(requireFamilyToken);

leaderboardRouter.get("/", async (req, res, next) => {
  try {
    const query = leaderboardQuerySchema.safeParse(req.query);

    if (!query.success) {
      res.status(400).json({
        error: "Invalid request query.",
        details: query.error.flatten()
      });
      return;
    }

    const people = await listHouseholdUsers();
    const range = query.data.range;
    const events = await prisma.coinEvent.findMany({
      where:
        range === "week"
          ? {
              createdAt: {
                gte: getUtcWeekStart(new Date())
              }
            }
          : undefined
    });
    const leaders = deriveLeaderboard(
      events,
      people.map((person) => ({
        userId: person.id,
        displayName: person.displayName,
        sortOrder: person.sortOrder
      }))
    );

    res.json({
      range,
      leaders
    });
  } catch (error) {
    next(error);
  }
});
