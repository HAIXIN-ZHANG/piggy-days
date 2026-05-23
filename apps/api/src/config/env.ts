import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(4000),
  WEB_ORIGIN: z.string().url().default("http://localhost:3000"),
  FAMILY_API_TOKEN: z.string().min(1).optional(),
  FAMILY_PASSWORD: z.string().min(1).optional(),
  DATABASE_URL: z.string().min(1).optional()
});

export const env = envSchema.parse(process.env);

export type AppEnv = typeof env;
