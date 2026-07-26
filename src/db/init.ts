import { sequelize } from "./sequelize";
import "../models/short-url.model";

export async function initDatabase(): Promise<void> {
  await sequelize.authenticate();
  await sequelize.sync();
  console.log("Database connected");
}
