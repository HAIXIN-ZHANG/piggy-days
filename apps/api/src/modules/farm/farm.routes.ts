import { Router } from "express";
import { defaultFarmState } from "@piggy-days/core";
import { requireFamilyToken } from "../../middleware/familyAuth.js";
import { validateBody } from "../../middleware/validate.js";
import { feedPiggySchema, type FeedPiggyInput } from "./farm.schemas.js";

export const farmRouter = Router();

farmRouter.use(requireFamilyToken);

farmRouter.get("/summary", (_req, res) => {
  res.json(defaultFarmState);
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
