import app from "./app";
import { initDatabase } from "./db/init";

const PORT = 3000;

async function start() {
  await initDatabase();
  app.listen(PORT, () => console.log(`Server running on ${PORT}`));
}

start().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
