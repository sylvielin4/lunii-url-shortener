import request from "supertest";
import app from "../app";
import { setupE2eDatabase } from "./setup";

describe("POST /api/shorturl", () => {
  setupE2eDatabase();

  it("should create a short url", async () => {
    const originalUrl = "https://www.lunii.com";

    const { status, body } = await request(app)
      .post("/api/shorturl/")
      .send({ originalUrl });

    expect(status).toBe(201);
    expect(body).toEqual({
      originalUrl,
      shortUrl: expect.any(String),
    });
  });

  it("should return an error for an invalid url", async () => {
    const { status, body } = await request(app)
      .post("/api/shorturl/")
      .send({ originalUrl: "https://lunii" });

    expect(status).toBe(400);
    expect(body).toEqual({ error: "invalid url" });
  });
});
