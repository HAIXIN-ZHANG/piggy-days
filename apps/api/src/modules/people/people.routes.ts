import { Router } from "express";
import { requireFamilyToken } from "../../middleware/familyAuth.js";
import { listHouseholdUsers } from "./householdUsers.js";

export const peopleRouter = Router();

peopleRouter.use(requireFamilyToken);

peopleRouter.get("/", async (_req, res, next) => {
  try {
    const people = await listHouseholdUsers();

    res.json({
      people: people.map((person) => ({
        id: person.id,
        displayName: person.displayName,
        avatarLabel: person.avatarLabel
      }))
    });
  } catch (error) {
    next(error);
  }
});
