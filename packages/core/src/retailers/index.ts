export const retailerCodes = ["coles", "woolworths", "aldi"] as const;

export type RetailerCode = (typeof retailerCodes)[number];

export function isRetailerCode(value: string): value is RetailerCode {
  return retailerCodes.includes(value as RetailerCode);
}
