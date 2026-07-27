import express from "express";
import cors from "cors";
import shortUrlRoutes from "./routes/short-url.routes";
import { errorHandlerMiddleware } from "./middlewares/error-handler.middleware";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("hello world");
});

app.use("/api/shorturl", shortUrlRoutes);
app.use(errorHandlerMiddleware);

export default app;
