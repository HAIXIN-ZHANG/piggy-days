import { PrismaClient } from "./generated/client/client.js";

const globalForPrisma = globalThis as unknown as {
  piggyDaysPrisma?: PrismaClient;
};

export const prisma = globalForPrisma.piggyDaysPrisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.piggyDaysPrisma = prisma;
}

export * from "./generated/client/client.js";
