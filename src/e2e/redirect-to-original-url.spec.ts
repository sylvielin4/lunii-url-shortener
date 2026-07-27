import request from "supertest";
import app from "../app";
import { setupE2eDatabase } from "./setup";

describe("GET /api/shorturl/:shortUrl", () => {
  setupE2eDatabase();

  it("should redirect to the original url", async () => {
    const originalUrl = "https://www.lunii.com";

    const { body } = await request(app)
      .post("/api/shorturl/")
      .send({ originalUrl });

    const { shortUrl } = body;

    const { status, headers } = await request(app)
      .get(`/api/shorturl/${shortUrl}`)
      .redirects(0);

    expect(status).toBe(302);
    expect(headers.location).toBe(originalUrl);
  });

  it("should return an error for an unknown short url", async () => {
    const { status, body } = await request(app).get("/api/shorturl/unknown");

    expect(status).toBe(404);
    expect(body).toEqual({
      error: "original url not found for short url: unknown",
    });
  });

  it("should return an error for an invalid short url", async () => {
    const { status, body } = await request(app).get("/api/shorturl/ab");

    expect(status).toBe(400);
    expect(body).toEqual({ error: "invalid short url" });
  });
});
