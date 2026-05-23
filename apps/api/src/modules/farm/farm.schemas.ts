import { z } from "zod";

export const feedPiggySchema = z.object({
  piggyName: z.string().min(1).max(40).default("Momo")
});

export type FeedPiggyInput = z.infer<typeof feedPiggySchema>;
