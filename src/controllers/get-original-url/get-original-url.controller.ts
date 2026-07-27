import { Request, Response } from "express";
import { getOriginalUrlUseCase } from "../../use-cases/get-original-url";
import { NotFoundError } from "../../use-cases/get-original-url/get-original-url.errors";
import { getOriginalUrlSchema } from "./get-original-url.schema";

export async function redirectToOriginalUrlController(
  req: Request,
  res: Response
) {
  const parsedParams = getOriginalUrlSchema.safeParse(req.params);

  if (!parsedParams.success) {
    return res.status(400).json({ error: "invalid short url" });
  }

  try {
    const { data } = parsedParams;
    const result = await getOriginalUrlUseCase.handle(data.shortUrl);

    return res.redirect(302, result.originalUrl);
  } catch (error) {
    if (error instanceof NotFoundError) {
      return res.status(404).json({ error: error.message });
    }

    return res.status(500).json({ error: "Internal server error" });
  }
}
