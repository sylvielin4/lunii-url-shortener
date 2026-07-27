import { Request, Response } from "express";
import { createShortUrlUseCase } from "../../use-cases/create-short-url";
import { createShortUrlSchema } from "./create-short-url.schema";

export async function createShortUrlController(req: Request, res: Response) {
  const parsedBody = createShortUrlSchema.safeParse(req.body);

  if (!parsedBody.success) {
    return res.status(400).json({ error: "invalid url" });
  }

  try {
    const { data } = parsedBody;
    const result = await createShortUrlUseCase.handle(data.originalUrl);

    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}
