import fs from "fs";
import { initDatabase } from "../db/init";
import { sequelize, testDbPath } from "../db/sequelize";

export function setupE2eDatabase() {
  beforeAll(async () => {
    await initDatabase();
  });

  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();

    if (testDbPath && fs.existsSync(testDbPath)) {
      fs.unlinkSync(testDbPath);
    }
  });
}
