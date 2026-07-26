import request from "supertest";
import app from "../app";
import { setupE2eDatabase } from "./setup";

describe("GET /api/shorturl/analytics", () => {
  setupE2eDatabase();

  it("should return the analytics", async () => {
    const originalUrl = "https://www.lunii.com";

    const { body } = await request(app)
      .post("/api/shorturl/")
      .send({ originalUrl });

    const { shortUrl } = body;

    await request(app).get(`/api/shorturl/${shortUrl}`).redirects(0);
    await request(app).get(`/api/shorturl/${shortUrl}`).redirects(0);

    const { status, body: analyticsBody } = await request(app).get(
      "/api/shorturl/analytics"
    );

    expect(status).toBe(200);
    expect(analyticsBody).toEqual([
      {
        originalUrl,
        shortUrl,
        nbClicks: 2,
      },
    ]);
  });
});
