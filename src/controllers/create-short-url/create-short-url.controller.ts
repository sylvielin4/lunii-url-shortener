import { Request, Response } from "express";
import { BadRequestError } from "../../errors";
import { createShortUrlUseCase } from "../../use-cases/create-short-url";
import { createShortUrlSchema } from "./create-short-url.schema";

export async function createShortUrlController(req: Request, res: Response) {
  const parsedBody = createShortUrlSchema.safeParse(req.body);

  if (!parsedBody.success) {
    throw new BadRequestError("invalid url");
  }

  const result = await createShortUrlUseCase.handle(
    parsedBody.data.originalUrl
  );

  return res.status(201).json(result);
}
