import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  preflight: true,
  jsxFramework: "react",
  include: [
    "./app/**/*.{ts,tsx}",
    "./features/**/*.{ts,tsx}",
    "../../packages/ui/src/**/*.{ts,tsx}"
  ],
  exclude: [],
  outdir: "styled-system",
  theme: {
    extend: {
      tokens: {
        colors: {
          background: { value: "#fff9f2" },
          ink: { value: "#2f2926" },
          muted: { value: "#756c65" },
          line: { value: "#eadfd4" },
          berry: { value: "#c8556f" },
          leaf: { value: "#4f8f65" },
          sky: { value: "#6b9ac4" },
          gold: { value: "#e6a93f" }
        },
        radii: {
          panel: { value: "8px" }
        }
      }
    }
  }
});
