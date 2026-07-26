import { Sequelize } from "sequelize";

const isTest = process.env.NODE_ENV === "test";

export const testDbPath = `test.${process.env.JEST_WORKER_ID ?? "0"}.sqlite`;

export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: isTest ? testDbPath : "data.sqlite",
  logging: false,
});
