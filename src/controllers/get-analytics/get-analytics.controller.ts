import { Request, Response } from "express";
import { getAnalyticsUseCase } from "../../use-cases/get-analytics";

export async function getAnalyticsController(_req: Request, res: Response) {
  const result = await getAnalyticsUseCase.handle();

  return res.status(200).json(result);
}
