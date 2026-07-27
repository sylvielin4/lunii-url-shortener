import { Request, Response } from "express";
import { BadRequestError } from "../../errors";
import { getOriginalUrlUseCase } from "../../use-cases/get-original-url";
import { redirectToOriginalUrlSchema } from "./redirect-to-original-url.schema";

export async function redirectToOriginalUrlController(
  req: Request,
  res: Response
) {
  const parsedParams = redirectToOriginalUrlSchema.safeParse(req.params);

  if (!parsedParams.success) {
    throw new BadRequestError("invalid short url");
  }

  const result = await getOriginalUrlUseCase.handle(
    parsedParams.data.shortUrl
  );

  return res.redirect(302, result.originalUrl);
}
