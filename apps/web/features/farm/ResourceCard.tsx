import { clsx } from "clsx";
import type { FarmResource } from "@piggy-days/core";

type ResourceCardProps = {
  label: string;
  value: number;
  tone: FarmResource;
};

export function ResourceCard({ label, value, tone }: ResourceCardProps) {
  return (
    <article className={clsx("resourceCard", tone)}>
      <span>{label}</span>
      <strong>{value}</strong>
    </article>
  );
}
