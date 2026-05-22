import "dotenv/config";
import { retailerCodes, type RetailerCode } from "@piggy-days/core";

type ScraperResult = {
  retailer: RetailerCode;
  status: "skipped";
  reason: string;
};

async function runMockScraper(): Promise<ScraperResult[]> {
  return retailerCodes.map((retailer) => ({
    retailer,
    status: "skipped",
    reason: "Retailer adapters will be implemented in the scraper MVP phase."
  }));
}

const results = await runMockScraper();
console.table(results);
