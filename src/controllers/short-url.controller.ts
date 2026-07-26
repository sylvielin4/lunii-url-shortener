import { Request, Response } from "express";
import { createShortUrlUseCase } from "../use-cases/create-short-url";
import { getOriginalUrlUseCase } from "../use-cases/get-original-url";
import { getAnalyticsUseCase } from "../use-cases/get-analytics";
import { isValidUrl } from "../utils/isValidUrl";
import { NotFoundError } from "../use-cases/get-original-url/get-original-url.errors";

export async function createShortUrlController(req: Request, res: Response) {
  const { originalUrl } = req.body;

  if (!originalUrl || typeof originalUrl !== "string") {
    return res.status(400).json({ error: "invalid url" });
  }

  if (!isValidUrl(originalUrl)) {
    return res.status(400).json({ error: "invalid url" });
  }

  try {
    const result = await createShortUrlUseCase.handle(originalUrl);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function getAnalyticsController(_req: Request, res: Response) {
  try {
    const result = await getAnalyticsUseCase.handle();

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function redirectToOriginalUrlController(
  req: Request,
  res: Response
) {
  const { shortUrl } = req.params;

  if (!shortUrl || typeof shortUrl !== "string") {
    return res.status(400).json({ error: "invalid short url" });
  }

  try {
    const result = await getOriginalUrlUseCase.handle(shortUrl);

    return res.redirect(302, result.originalUrl);
  } catch (error) {
    if (error instanceof NotFoundError) {
      return res.status(404).json({ error: error.message });
    }

    return res.status(500).json({ error: "Internal server error" });
  }
}
