import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import { pinoHttp } from "pino-http";
import { env } from "./config/env.js";
import { farmRouter } from "./modules/farm/farm.routes.js";
import { tasksRouter } from "./modules/tasks/tasks.routes.js";

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
  app.use(cors({ origin: env.WEB_ORIGIN }));
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
  app.use("/api/tasks", tasksRouter);

  return app;
}
