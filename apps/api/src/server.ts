import { env } from "./config/env.js";
import { createApp } from "./app.js";

export function startServer() {
  const app = createApp();

  return app.listen(env.PORT, () => {
    console.log(`Piggy Days API listening on http://localhost:${env.PORT}`);
  });
}
