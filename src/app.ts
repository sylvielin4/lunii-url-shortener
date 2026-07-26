import express from "express";
import cors from "cors";
import shortUrlRoutes from "./routes/short-url.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("hello world");
});

app.use("/api/shorturl", shortUrlRoutes);

export default app;
