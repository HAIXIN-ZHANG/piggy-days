import cors from "cors";
import express, { type ErrorRequestHandler } from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import { pinoHttp } from "pino-http";
import { env } from "./config/env.js";
import { coinsRouter } from "./modules/coins/coins.routes.js";
import { farmRouter } from "./modules/farm/farm.routes.js";
import { fundRouter } from "./modules/fund/fund.routes.js";
import { leaderboardRouter } from "./modules/leaderboard/leaderboard.routes.js";
import { peopleRouter } from "./modules/people/people.routes.js";
import { tasksRouter } from "./modules/tasks/tasks.routes.js";

function isAllowedOrigin(origin: string | undefined) {
  if (!origin) {
    return true;
  }

  if (origin === env.WEB_ORIGIN) {
    return true;
  }

  return env.NODE_ENV !== "production" && /^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin);
}

const jsonErrorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  const message = error instanceof Error ? error.message : "Unexpected server error.";

  res.status(500).json({
    error: message
  });
};

export function createApp() {
  const app = express();

  app.disable("x-powered-by");
  app.use(helmet());
  app.use(
    pinoHttp({
      level: env.NODE_ENV === "test" ? "silent" : "info",
      redact: ["req.headers.authorization", "req.headers.cookie", "req.headers.x-family-token"]
    })
  );
  app.use(
    cors({
      origin(origin, callback) {
        if (isAllowedOrigin(origin)) {
          callback(null, true);
          return;
        }

        callback(new Error("Origin is not allowed by CORS."));
      }
    })
  );
  app.use(express.json({ limit: "1mb" }));
  app.use(
    "/api",
    rateLimit({
      legacyHeaders: false,
      limit: env.NODE_ENV === "production" ? 300 : 1000,
      standardHeaders: true,
      windowMs: 15 * 60 * 1000
    })
  );

  app.get("/health", (_req, res) => {
    res.json({
      ok: true,
      service: "piggy-days-api"
    });
  });

  app.use("/api/farm", farmRouter);
  app.use("/api/people", peopleRouter);
  app.use("/api/tasks", tasksRouter);
  app.use("/api/fund", fundRouter);
  app.use("/api/coins", coinsRouter);
  app.use("/api/leaderboard", leaderboardRouter);
  app.use(jsonErrorHandler);

  return app;
}
