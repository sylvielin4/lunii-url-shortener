import { sequelize } from "./sequelize";
import "../models/short-url.model";

export async function initDatabase(): Promise<void> {
  await sequelize.authenticate();
  await sequelize.sync();

  if (process.env.NODE_ENV !== "test") {
    console.log("Database connected");
  }
}
