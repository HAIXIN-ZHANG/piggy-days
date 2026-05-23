import type { NextFunction, Request, Response } from "express";
import { env } from "../config/env.js";

export function requireFamilyToken(req: Request, res: Response, next: NextFunction) {
  if (!env.FAMILY_API_TOKEN) {
    next();
    return;
  }

  if (req.header("x-family-token") !== env.FAMILY_API_TOKEN) {
    res.status(401).json({ error: "Missing or invalid family token." });
    return;
  }

  next();
}
