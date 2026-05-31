import { FarmPrototype } from "../features/farm/FarmPrototype";
import { PiggyKitchen } from "../features/kitchen/PiggyKitchen";

export default function HomePage() {
  return (
    <main className="appShell">
      <FarmPrototype />
      <PiggyKitchen />
    </main>
  );
}
