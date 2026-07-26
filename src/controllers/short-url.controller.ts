import { Request, Response } from "express";
import { createShortUrlUseCase } from "../use-cases/create-short-url";
import { isValidUrl } from "../utils/isValidUrl";

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
