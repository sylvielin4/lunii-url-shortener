import express from "express";
import cors from "cors";
import { initDatabase } from "./db/init";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("hello world");
});

const PORT = 3000;

async function start() {
  await initDatabase();
  app.listen(PORT, () => console.log(`Server running on ${PORT}`));
}

start().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
