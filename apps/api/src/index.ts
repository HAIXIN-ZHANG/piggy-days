import cors from "cors";
import "dotenv/config";
import express, { type NextFunction, type Request, type Response } from "express";
import { defaultFarmState } from "@piggy-days/core";

const app = express();
const port = Number(process.env.PORT ?? 4000);
const webOrigin = process.env.WEB_ORIGIN ?? "http://localhost:3000";

app.use(cors({ origin: webOrigin }));
app.use(express.json());

function requireFamilyToken(req: Request, res: Response, next: NextFunction) {
  const expectedToken = process.env.FAMILY_API_TOKEN;

  if (!expectedToken) {
    next();
    return;
  }

  if (req.header("x-family-token") !== expectedToken) {
    res.status(401).json({ error: "Missing or invalid family token." });
    return;
  }

  next();
}

app.get("/health", (_req, res) => {
  res.json({
    ok: true,
    service: "piggy-days-api"
  });
});

app.get("/api/farm/summary", requireFamilyToken, (_req, res) => {
  res.json(defaultFarmState);
});

app.listen(port, () => {
  console.log(`Piggy Days API listening on http://localhost:${port}`);
});
